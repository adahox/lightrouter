/** modules */
const fs  = require('fs');
const path = require('path');
/**
 * acceptable responses
 */
const acceptable = [
    'object',
    'string'
];

/**
 * check if resonse is a object
 * @param {string} response
 * @returns {bool}
 */
const isJsonObject = (response) => {

    let parsedObject = null;
    let isJson = true;

    try {
        parsedObject = JSON.parse(response);
    } catch(error) {
        isJson = false;
    }

    return isJson;
}

/**
 * check if is a valid response setted in json config file.
 * @param {string} response
 * @return {bool}
 */
const isValidRouteResponse = (response) => {

    let isObject = isJsonObject(response);

    let isFile = false;

    if ( ! isObject ) {
        let file = path.join(__dirname, '..', response ) + '.js';
        isFile = fs.lstatSync(file).isFile();
    }

    return isFile || isObject;
}

/**
 * get type of response json object
 * @param {string} response
 * @return {bool}
 */
 const getResponseType = (response) => {

    let isObject = isJsonObject(response);
    let type = null;

    if ( isObject ) {
        type =  "object";
    } else if (fs.lstatSync(path.join(__dirname, '..', response ) + '.js').isFile()) {
        type =  "file";
    }

    return type;
}

module.exports = {
    isValidRouteResponse,
    getResponseType
}