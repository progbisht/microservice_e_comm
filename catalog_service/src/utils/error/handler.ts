import { Request, Response, NextFunction } from "express";
import { 
    AuthorizeError, 
    NotFoundError, 
    ValidationError } from "./errors";
import { logger } from "../logger";


export const HandleErrorWithLogger = (
    error: Error,
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    
    let reportError = true;
    let status = 500;
    let data = error.message;

    // skip known errors

    [NotFoundError, ValidationError, AuthorizeError].forEach(
        (typeOfError) => {
            if(error instanceof typeOfError){
                reportError = false;
                status = error.status;
                data = error.message;
            }
        }
    );

    if(reportError){
        // error reporting tools implementation eg Cloudwatch
        logger.error(error);
    }
    else{
        // ignore common error caused by user
        logger.warn(error);
    }

    return res.status(status).json(data);
}

export const HandleUnCaughtException = async (error: Error) => {
    // error report / monitoring tool
    logger.error(error);

    // recover
    process.exit(1);
}