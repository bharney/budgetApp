class CostApi {
  static getAllItems() {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3000/api/costs').then(function (response) {
        return response.json();
      }).then(function (costs) {
        resolve(Object.assign([], costs));
      });
    });
  }

  static saveCost(cost) {
    cost = Object.assign({}, cost);
    return new Promise((resolve, reject) => {
      if (cost.id) {
        fetch('http://localhost:3000/api/costs', {
          method: 'put',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cost)
        }).then(function (response) {
          return response.json();
        }).then(function (cost) {
          resolve(cost)
        }).catch(function (error) {
          console.log('Request failed', error);
        });
      } else {
        fetch('http://localhost:3000/api/costs', {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(cost)
        }).then(function (response) {
          return response.json();
        }).then(function (cost) {
          resolve(cost)
        }).catch(function (error) {
          console.log('Request failed', error);
        });
      }
    });
  }

  static deleteCost(costId) {
    return new Promise((resolve, reject) => {
      if (confirm("Are you sure you want to delete this cost forever?")) {
        if (costId) {
          fetch('http://localhost:3000/api/costs/' + costId, {
            method: 'delete'
          }).then(function (response) {
            resolve(console.log("cost deleted."));
          }).catch(function (error) {
            console.log('Delete failed', error);
          });
        }
      }
    });
  }
}

export default CostApi;
