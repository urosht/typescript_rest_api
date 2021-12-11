import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import { createUserSchema } from "./schema/user.schema";
import validateResource from "./middleware/validateResource";
import { createUserSessionHandler, getUserSessionsHandler, deleteSessionHandler } from "./controller/session.controller";
import { createSessionSchema  } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";


function routes(app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => {
        res.sendStatus(200);
    });
    app.post("/api/users", validateResource(createUserSchema), createUserHandler);
    app.post("/api/sessions", validateResource(createSessionSchema), createUserSessionHandler);

    app.get("/api/sessions", requireUser, getUserSessionsHandler);
    app.delete("/api/sessions", requireUser, deleteSessionHandler);
}

export default routes;