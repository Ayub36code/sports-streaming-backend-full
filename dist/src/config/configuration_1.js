"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT || '3000', 10),
    apiPrefix: process.env.API_PREFIX || 'api/v1',
    databaseUrl: process.env.DATABASE_URL,
    redis: {
        url: process.env.REDIS_URL,
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
    },
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    },
    playback: {
        tokenSecret: process.env.PLAYBACK_TOKEN_SECRET,
        cdnSigningSecret: process.env.CDN_SIGNING_SECRET,
        cdnBaseUrl: process.env.CDN_BASE_URL,
    },
});
//# sourceMappingURL=configuration_1.js.map