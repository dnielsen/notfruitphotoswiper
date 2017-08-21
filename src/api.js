var api = {
    getInfo(){
        var url='http://13.59.110.224:8000/notfruit/?format=json';
        return fetch(url).then((res) => res.json());
    }
};

module.exports = api;