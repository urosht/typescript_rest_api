import jwt from "jsonwebtoken";
import config from "config";

export function signJWT(
    object: Object,
    keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
    options?: jwt.SignOptions | undefined
    ) {
    const signKey = Buffer.from(config.get<string>(keyName), "base64").toString("ascii");
    return jwt.sign(object, signKey, {
        ...(options && options),
        algorithm: "RS256"
    });
}

export function verifyJWT(token: string, keyName: "accessTokenPublicKey" | "refreshTokenPublicKey") {
    const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString("ascii");
    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded,
        }
    } catch (err: any) {
        return {
            valid: false,
            expired: err.message === "jwt expired",
            decoded: null,
        }
    }
}