import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as blogActions from '../../actions/blogActions';
import BlogTile from '../blog/BlogTile';
import SocialMediaBar from '../common/SocialMediaBar';
import landing from '../../images/landing.jpg';
import yogaImg1 from '../../images/yogaImg1.jpg';
import yogaImg2 from '../../images/yogaImg2.jpg';
import yogaImg3 from '../../images/yogaImg3.jpg';


const landingImg = {
    backgroundImage: 'url(' + landing + ')',
    backgroundSize: 'cover',
    backgroundPosition: "center",
    height: "100%"
};

const divider = {
    backgroundImage: 'url(' + landing + ')',
    backgroundSize: 'cover',
    backgroundPosition: "center",
    height: "250px"
};

class HomePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    blogTile(blog, index) {
        return <div key={index}>{blog.title}</div>
    }

    render() {
        const {blogs} = this.props;

        return (
            <div>
                <section style={landingImg} className="featured">
                    <div className="container-fluid">
                        <div className="row p-b-30 m-b-30 m-t-20">
                            <div className="col-md-6 col-md-offset-3 text-center bright-color anchor ">
                                <h1 className="page-header banner">Yoga with Marie Mills</h1>
                                <h2 banner>
                                    Stress Reduction Specialist
                                    </h2>
                                <h3>Bakers street, Thurles, Co. Tipperary<br />
                                    086 – 1778369 | <a className="color-white" href="mailto:marie@yogamariemills.com">marie@yogamariemills.com</a></h3>
                                <div className="row text-center">
                                    <Link to="YogaThurles/Schedule">
                                        <button className="btn btn-default btn-lg btn-round-lg color-black">Find Yoga Classes</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container-fluid light-bg-color color-blur t-border">
                        <div className="container">
                            <div className="row text-center p-t-20 p-b-30 m-t-20">
                                <div className="col-xs-offset-1 col-xs-10">
                                    <h2>Marie is a Yoga practitioner in Thurles.</h2>
                                    <div className="line-thru"><span>
                                        <img src={require('../../images/greenlotus.png')} className="bg-color-transparent img-thru p-l-10 p-r-10" width="65" /></span>
                                    </div>
                                    <h3>Yoga and Ayurveda are integral to Traditional Indian Medicine and easily adapted
                                        to the modern life. Learn Yoga, Ayeruveda and more.</h3>
                                    <div className="col-xs-4 p-t-5 p-b-40 p-l-15 p-r-15">
                                        <Link to="">
                                            <div className="icon-circle mdl-shadow--4dp lotus-flower bg-color-purple"></div>
                                        </Link>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <h4>Contemporary Ayeruveda</h4>
                                            </div>
                                        </div>
                                        <div className="col-xs-offset-2 col-xs-8">
                                            <hr />
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <Link className="color" to="YogaThurlesSchedule">
                                                    <p>Learn More</p>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-4 p-t-5 p-b-40 p-l-15 p-r-15">
                                        <Link to="">
                                            <div className="icon-circle mdl-shadow--4dp om bright-bg-color"></div>
                                        </Link>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <h4>Yoga Workshops and Bespoke Yoga</h4>
                                            </div>
                                        </div>
                                        <div className="col-xs-offset-2 col-xs-8">
                                            <hr />
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <Link className="color" to="yogathurlescost">
                                                    <p>Learn More</p>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-4 p-t-5 p-b-40 p-l-15 p-r-15">
                                        <Link to="">
                                            <div className="icon-circle mdl-shadow--4dp yoga-mat bg-color-green"></div>
                                        </Link>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <h4>Dietary Consultation</h4>
                                            </div>
                                        </div>
                                        <div className="col-xs-offset-2 col-xs-8">
                                            <hr />
                                        </div>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <Link className="color" to="Contemporary">
                                                    <p>Learn More</p>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container-fluid t-border">
                        <div className="row" style={divider}>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container-fluid bg-color color-blur t-border">
                        <div className="container">
                            <h2 className="text-center">Specialties</h2>
                            <div className="text-center">
                                <h4>
                                    Yoga with Marie Mills is a family friendly studio that offers a wide variety of classes and child care.
                                        No matter what stage of life you are in, Yoga with Marie Mills offers something for everyone.
                                        Yoga Marie Mills offers Yoga, Ayurveda, and Kids Yoga.
                                    </h4>
                            </div>

                            <div className="row m-t-30 p-t-40 p-b-40 text-center">

                                <div className="col-xs-4 p-l-15 p-r-15">
                                    <img className="img-circle img-responsive mdl-shadow--4dp" src={yogaImg1} />
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Contemporary Ayeruveda</h4>
                                        </div>
                                    </div>
                                    <div className="col-xs-offset-2 col-xs-8">
                                        <hr />
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">

                                            <Link className="color" to="YogaThurlesSchedule">
                                                <p>Learn More</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-4 p-l-15 p-r-15">
                                    <img className="img-circle img-responsive mdl-shadow--4dp" src={yogaImg2} />
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Yoga Workshops and Bespoke Yoga</h4>
                                        </div>
                                    </div>
                                    <div className="col-xs-offset-2 col-xs-8">
                                        <hr />
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <Link className="color" to="yogathurlescost">
                                                <p>Learn More</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-4 p-l-15 p-r-15">
                                    <img className="img-circle img-responsive mdl-shadow--4dp" src={yogaImg3} />
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <h4>Dietary Consultation</h4>
                                        </div>
                                    </div>
                                    <div className="col-xs-offset-2 col-xs-8">
                                        <hr />
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-12">
                                            <Link className="color" to="Contemporary">
                                                <p>Learn More</p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="container-fluid dark-bg-color t-border">
                        <div className="row p-t-40 p-b-40 row-center color-white">
                            <div className="col-xs-offset-1 col-xs-10">
                                <h2 className="text-center">My Blog</h2>
                                <p className="text-center">Read useful information on Yoga and Ayurveda</p>
                                <div className="col-3-masonry">
                                {blogs.map(blog =>
                                    <BlogTile blog={blog} />)
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="bg-color-white p-t-30 p-b-30">
                    <p className="footer text-center">Share, Like, and Heart my Story!</p>
                    <SocialMediaBar />
                </div>
            </div >
        );
    }
}


HomePage.propTypes = {
    blogs: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        blogs: state.blogs
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(blogActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
