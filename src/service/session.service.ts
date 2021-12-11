import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import Session, { SessionDocument } from "../models/session.model";
import { verifyJWT, signJWT } from "../utils/jwt.utils";
import { findUser } from "./user.service";
import config from "config";


export async function createSession(userId: string, userAgent: string) {
    const session = await Session.create({user: userId, userAgent});
    return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
    return Session.find(query).lean();
}

export async function updateSession(query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
    return Session.updateMany(query, update);
}

export async function reIssueAccessToken({ refreshToken }: {refreshToken: string}) {
    const { decoded } = verifyJWT(refreshToken);

    if (!decoded || !get(decoded, "_id")) {
        return false;
    }
    const session = await Session.findById(get(decoded, "session"));
    if (!session || !session.isValid) {
        return false;
    }

    const user = await findUser({_id: session.user });
    if (!user) {
        return false;
    }

    const accessToken = signJWT(
        { ...user, session: session._id },
        { expiresIn: config.get("accessTokenTtl") } // 15min
    );
    return accessToken;
}