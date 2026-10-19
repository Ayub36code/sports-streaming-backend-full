declare const _default: () => {
    port: number;
    apiPrefix: string;
    databaseUrl: string;
    redis: {
        url: string;
        host: string;
        port: number;
    };
    jwt: {
        accessSecret: string;
        refreshSecret: string;
        accessExpiresIn: string;
        refreshExpiresIn: string;
    };
    playback: {
        tokenSecret: string;
        cdnSigningSecret: string;
        cdnBaseUrl: string;
    };
};
export default _default;
