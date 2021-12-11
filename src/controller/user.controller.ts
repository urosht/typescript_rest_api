import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateuserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";

export async function createUserHandler(req: Request<{}, {}, CreateuserInput["body"]>, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), "password"));
    } catch (error: any) {
        logger.error(error);
        return res.status(409).send(error.message);
    }
}