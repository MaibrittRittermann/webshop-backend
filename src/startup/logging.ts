require('express-async-errors');
import winston from "winston";

export default function logging () {
    const logfile = new winston.transports.File({filename: 'logfile.log'});

    winston.rejections.handle(logfile);
    winston.exceptions.handle(logfile);
    winston.add(logfile);
}