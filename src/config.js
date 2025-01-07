"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getConfig = () => {
    return {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT ? Number(process.env.PORT) : 3005,
        MONGO_URI: process.env.MONGO_URI,
        JWTPKWEBSHOP: process.env.JWTPKWEBSHOP,
        MAIL_HOST: process.env.MAIL_HOST,
        MAIL_USERNAME: process.env.MAIL_USERNAME,
        MAIL_PASSWORD: process.env.MAIL_PASSWORD
    };
};
const getSanitizedConfig = (config) => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined)
            throw new Error(`Missing key ${key} in config`);
    }
    return config;
};
const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);
exports.default = sanitizedConfig;
