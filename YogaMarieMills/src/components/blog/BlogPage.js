﻿import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as blogActions from '../../actions/blogActions';
import * as uploadActions from '../../actions/uploadActions';
import Admin from '../common/Admin';
import TextInput from '../common/TextInput';
import { CompositeDecorator, ContentBlock, ContentState, EditorState, convertFromRaw, convertToRaw, RichUtils } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
} from 'draft-js-buttons';

const inlineToolbarPlugin = createInlineToolbarPlugin({
    structure: [
        BoldButton,
        ItalicButton,
        UnderlineButton,
        HeadlineTwoButton,
        HeadlineThreeButton,
        UnorderedListButton,
        OrderedListButton,
        BlockquoteButton,
    ]
});

const plugins = [inlineToolbarPlugin];

const { InlineToolbar } = inlineToolbarPlugin;

class BlogPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        const decorator = new CompositeDecorator([
            {
                strategy: getEntityStrategy('MUTABLE'),
                component: TokenSpan,
            },
        ]);

        let blocks = convertFromRaw(blocks = { blocks: [{ text: '', type: 'unstyled', },], entityMap: { first: { type: 'TOKEN', mutability: 'MUTABLE', }, } });
        if (props.blog.description != "")
            blocks = convertFromRaw(JSON.parse(props.blog.description));

        this.state = {
            blog: Object.assign({}, props.blog),
            editorState: EditorState.createWithContent(
                blocks,
                decorator,
            ),
        };

        this.onChange = this.onChange.bind(this);
        this.focus = this.focus.bind(this);
        this.saveAction = this.saveAction.bind(this);
        this.deleteAction = this.deleteAction.bind(this);
        this.getTextFromEntity = this.getTextFromEntity.bind(this);
        this.updateBlogState = this.updateBlogState.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.blog.id != nextProps.blog.id) {
            this.setState({ blog: Object.assign({}, nextProps.blog) });
            const blocks = convertFromRaw(JSON.parse(nextProps.blog.description));
            const editorState = EditorState.push(this.state.editorState, blocks);
            this.setState({ editorState });

        }
    }

    onChange(editorState) {
        this.setState({ editorState });
    }

    focus() {
        this.refs.editor.focus();
    }

    getTextFromEntity(editorObj) {
        let descriptionBlocks = [];
        for (let prop in editorObj.blocks) {
            if (editorObj.blocks.hasOwnProperty(prop)) {
                descriptionBlocks.push(editorObj.blocks[prop].text)
            }
        }
        return descriptionBlocks.join("\\n ");
    }

    saveAction(event) {
        event.preventDefault();
        let blog = this.state.blog;
        blog.short = this.getTextFromEntity(convertToRaw(this.state.editorState.getCurrentContent()));
        blog.description = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
        this.setState({ blog: blog });
        this.props.actions.saveBlog(this.state.blog);
        this.context.router.push('/blogs');
    }

    deleteAction(event) {
        this.props.actions.deleteBlog(this.state.blog.id);
        this.props.actions.loadBlog();
        this.context.router.push('/blogs');
    }

    uploadImage(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            let blog = this.state.blog;
            blog.image = file.name
            this.props.upload.uploadFile(file);
            return this.setState({ blog: blog });
        }
        reader.readAsDataURL(file)
    }

    updateBlogState(event) {
        const field = event.target.name;
        let blog = this.state.blog;
        blog[field] = event.target.value;
        return this.setState({ blog: blog });
    }


    render() {
        const { blog } = this.props;
        let blogImg = blog.image ? require(`../../images/${blog.image}`) : ""
        const blogImage = {
            backgroundImage: 'url(' + blogImg + ')',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover"
        }

        return (
            <div className="mdl-grid dark-color">
                <div className="ribbon bg-image-landing b-border">
                    <div className="container">
                        <div className="row m-b-1-em">
                            <div className="col-xs-12">
                                <h1 className="color-white text-center">{blog.title}</h1>
                                <Admin uploadImage={this.uploadImage} blog={this.state.blog} saveAction={this.saveAction} deleteAction={this.deleteAction} />
                                <div className="mdl-card mdl-shadow--4dp">
                                    <div className="mdl-card__media v-h-40 image-text-container" style={blogImage}>
                                        <div className="col-xs-7 text-left align-bottom m-l-20 m-b-20">
                                            <TextInput
                                                name="title"
                                                label="Title"
                                                value={blog.title}
                                                onChange={this.updateBlogState} />
                                        </div>
                                    </div>
                                    <div className="col-xs-12 t-border-thin p-20">
                                        <div className="mdl-color-text--grey-700 col-xs-12 m-b-15">
                                            <div className="pull-left">
                                                <p><strong>{blog.postDate} by <Link to="/about">Marie Mills</Link></strong></p>
                                            </div>
                                            <div className="pull-right">
                                                <i className="glyphicon glyphicon-heart fa-lg" aria-hidden="true"></i> &nbsp;
                                                        <i className="glyphicon glyphicon-bookmark fa-lg" aria-hidden="true"></i> &nbsp;
                                                        <i className="fa fa-share-alt fa-lg" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                        <div id="editor" className="editor" onClick={this.focus}>
                                            <p>
                                                <Editor
                                                    editorState={this.state.editorState}
                                                    onChange={this.onChange}
                                                    ref="editor"
                                                    plugins={plugins}
                                                />
                                                <InlineToolbar />
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BlogPage.propTypes = {
    blog: PropTypes.object.isRequired,
    editorState: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    upload: PropTypes.object.isRequired,
    entityKey: PropTypes.object.isRequired,
};

BlogPage.contextTypes = {
    router: PropTypes.object
};

function getEntityStrategy(mutability) {
    return function (contentBlock, callback, contentState) {
        contentBlock.findEntityRanges(
            (character) => {
                const entityKey = character.getEntity();
                if (entityKey === null) {
                    return false;
                }
                return contentState.getEntity(entityKey).getMutability() === mutability;
            },
            callback
        );
    };
}

function getDecoratedStyle(mutability) {
    switch (mutability) {
        case 'MUTABLE': return null;
        default: return null;
    }
}

const TokenSpan = (props) => {
    const style = getDecoratedStyle(
        props.contentState.getEntity(props.entityKey).getMutability()
    );
    return (
        <span data-offset-key={props.offsetkey}>
            {props.children}
        </span>
    );
};


function getBlogById(blogs, id) {
    const blog = blogs.filter(blog => blog.id == id);
    if (blog.length) {
        return blog[0];
    }

    return null;
}

function mapStateToProps(state, ownProps) {
    const blogId = ownProps.params.id;
    let blog = { id: '', title: '', image: '', description: '', href: '', route: '', component: '' };
    if (blogId && state.blogs.length > 0) {
        blog = getBlogById(state.blogs, blogId);
    }

    return {
        blog: blog
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(blogActions, dispatch),
        upload: bindActionCreators(uploadActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);