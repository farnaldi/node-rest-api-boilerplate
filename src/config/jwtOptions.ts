import * as env from './env';

const jwtOptions = {
    issuer: env.API_URL,
    expiresIn: env.JWT_EXPIRATION,
};

export default jwtOptions;
