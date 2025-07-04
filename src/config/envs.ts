import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars{
    PORT: number;
    DATABASE_URL: string;
    PRODUCTS_MICROSERVICES_HOST: string;
    PRODUCTS_MICROSERVICES_PORT: number;
}

const envVarsSchema = joi.object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    PRODUCTS_MICROSERVICES_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICES_PORT: joi.number().required(),
}).unknown(true);

const { error, value } = envVarsSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    databaseUrl: envVars.DATABASE_URL,
    productsMicroservicesHost: envVars.PRODUCTS_MICROSERVICES_HOST,
    productsMicroservicesPort: envVars.PRODUCTS_MICROSERVICES_PORT,
};