const config = require('../config/settings');
const Response = require('../lib/responseManager');
const HttpStatus = require('../constants/httpStatus');

const output = config.outputDir;

class TriangleController {
    constructor(logger, service){
        this.logger = logger;
        this.triangleService = service;
    }

    receiveTriangle(req, res){
        const {a, b, c} = req.params;
        this.logger.info(`Triangle Request: ${JSON.stringify(req.params)}`);
        if(isNaN(a)){
            return Response.failure(res, {message: 'Param a (number type) is required'}, HttpStatus.BAD_REQUEST);
        }
        else if(isNaN(b)){
            return Response.failure(res, {message: 'Param b (number type) is required'}, HttpStatus.BAD_REQUEST);
        }
        else if(isNaN(c)){
            return Response.failure(res, {message: 'Param c (number type) is required'}, HttpStatus.BAD_REQUEST);
        }
        this.triangleService.checkTriangle(a,b,c)
            .then(response => {
                this.logger.info(response);
                Response.success(res, {message: 'Triangle Check complete:', response}, HttpStatus.OK);
        });

    }
}

module.exports = TriangleController;