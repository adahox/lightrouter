/** modules */
const express = require('express');
const { isValidRouteResponse, getResponseType } = require('./src/Utils');
const path = require('path');
let fs = require('fs');
/** variables */
const router = express.Router();

class lightRoute {

    /**
     * handle the return of request based in type of json response attribute
     * @param {string} type
     */
    handleResponse(type, response, uri) {

        let resonseType = getResponseType(response);

        let callback = null;

        switch( resonseType ) {
            case 'object':
                callback = (req, res) => res.json(response);
            break;
            case 'file':
                callback = require(path.join(__dirname, '..', response ) + '.js');
            break;
        }
        router[type](uri, callback);

    }

    /**
     * build express routing from route config file.
     * @param {string} routeFile uri of routing config file
     */
    build(routeFile) {

        if ( ! fs.existsSync(routeFile) ) {
            throw new Error(`${routeFile} does not exist.`);
        }
        const routesConfig = require(routeFile);

        routesConfig.forEach((endpoint, index) => {

            let [uri] = Object.keys(endpoint);
            let defTypes = endpoint[uri];

            defTypes.forEach((requestType, defTypesIndex) => {

                if ( ! (requestType.hasOwnProperty('type') && requestType.hasOwnProperty('response')) ) {
                    throw new Error(`in ${routeFile} body: missing type or response atribute.`);
                }

                const { type, response } = requestType;

                if ( ! isValidRouteResponse(response) ) {
                    throw new Error('invalid response body property in routes.json');
                }

                this.handleResponse(  type, response, uri );
            });
        });

        return router;
    }
}

module.exports ={
    lightRoute
};