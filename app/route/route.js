/**
 * Created by Oluwaleke Fakorede on 15/12/2018.
 * objective: building to scale
 */
const config = require('../config/settings');

const routes = function routes(server, serviceLocator) {
    const triangle = serviceLocator.get('triangleController');
    server.get({
        path: '/',
        name: 'home',
        version: '1.0.0'
    }, (req, res) => res.send('Welcome to this API'));

    server.post({
       path: '/triangle/check',
       name: 'Triangle type check',
       version: '1.0.0'
    }, (req, res) => triangle.receiveTriangle(req, res));
};

module.exports = routes;
