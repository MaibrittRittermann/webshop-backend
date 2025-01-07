interface ENV {
    NODE_ENV: string | undefined;
    PORT: number | undefined;
    MONGO_URI: string | undefined;
    JWTPKWEBSHOP: string | undefined;
    MAIL_HOST: string | undefined;
    MAIL_USERNAME: string | undefined;
    MAIL_PASSWORD: string | undefined;
}

interface Config {
    NODE_ENV: string;
    PORT: number;
    MONGO_URI: string;
    JWTPKWEBSHOP: string;
    MAIL_HOST: string;
    MAIL_USERNAME: string;
    MAIL_PASSWORD: string;
}

const getConfig = ():ENV => {
    return {
        NODE_ENV : process.env.NODE_ENV,
        PORT : process.env.PORT ? Number(process.env.PORT) : 3005,
        MONGO_URI : process.env.MONGO_URI, 
        JWTPKWEBSHOP : process.env.JWTPKWEBSHOP,
        MAIL_HOST: process.env.MAIL_HOST,
        MAIL_USERNAME: process.env.MAIL_USERNAME,
        MAIL_PASSWORD: process.env.MAIL_PASSWORD
    };
};

const getSanitizedConfig = (config : ENV) : Config => {
    for(const [key, value] of Object.entries(config)) {
        if(value === undefined)
            throw new Error(`Missing key ${key} in config`)
    }
    return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;