export default {
    port: 1337,
    dbUri: "mongodb://localhost:27017/rest-api",
    saltWorkFactor: 10,
    accessTokenTtl: "15m",
    refreshTokenTtl: "1y",
    publicKey: `PUBLIC_KEY`,
    privateKey: `PRIVATE_KEY`
}
