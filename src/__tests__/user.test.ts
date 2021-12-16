import * as UserService from "../service/user.service";
import * as SessionService from "../service/session.service";
import mongoose from "mongoose";
import superstest from "supertest";
import createServer from "../utils/server";
import { createUserSessionHandler } from "../controller/session.controller";

const app = createServer();
const userId = new mongoose.Types.ObjectId().toString();
const userPayload = {
    _id: userId,
    email: "test@example.com",
    name: "Jane Doe",
}
const userInput = {
    email: "test@example.com",
    name: "Jane Doe",
    password: "Passw0rd123",
    passwordConfirmation: "Passw0rd123"
}
const sessionPayload = {
    _id: new mongoose.Types.ObjectId().toString(),
    user: userId,
    valid: true,
    userAgent: "PostmanRuntime/7.28.4",
    createdAt: new Date("2021-12-16T21:00:44.123Z"),
    updatedAt: new Date("2021-12-16T21:00:44.123Z"),
    __v: 0,
}

describe("user", () => {
    describe("user registration", () => {
        describe("given the username and password are valid", () => {
            it("should return the user payload", async () => {
                const createUserServiceMock = jest.spyOn(UserService, "createUser")
                // @ts-ignore
                .mockReturnValueOnce(userPayload);
                const { statusCode, body } = await superstest(app).post("/api/users").send(userInput);

                expect(statusCode).toBe(200);
                expect(body).toEqual(userPayload);
                expect(createUserServiceMock).toHaveBeenCalledWith(userInput);

            });
        });
        describe("given the passwords do not match", () => {
            it("should return 400", async () => {
                const createUserServiceMock = jest.spyOn(UserService, "createUser")
                // @ts-ignore
                .mockReturnValueOnce(userPayload);
                const { statusCode } = await superstest(app)
                    .post("/api/users")
                    .send({...userInput, passwordConfirmation: "doesnotmatch" });

                expect(statusCode).toBe(400);
                expect(createUserServiceMock).not.toHaveBeenCalled();
            });
        });
        describe("given an error happens", () => {
            it("should return 409", async () => {
                const createUserServiceMock = jest.spyOn(UserService, "createUser")
                .mockRejectedValue("Error happened!");
                const { statusCode } = await superstest(app)
                    .post("/api/users")
                    .send(userInput);

                expect(statusCode).toBe(409);
                expect(createUserServiceMock).toHaveBeenCalled();
            });
        });
    });

        describe("user session", () => {
            describe("given the username and password are valid", () => {
                it("should return a signed accessToken & refreshToken", async () => {
                    jest.spyOn(UserService, "validatePassword")
                        // @ts-ignore
                        .mockReturnValue(userPayload);
                    jest.spyOn(SessionService, "createSession")
                        // @ts-ignore
                        .mockReturnValue(sessionPayload);
                    
                    const req = {
                        body: {
                            email: "test@example.com",
                            password: "password123"
                        },
                        get: () => {
                            return "Some UserAgent"
                        }
                    }
                    const send = jest.fn()
                    const res = {
                        send
                    }
                    // @ts-ignore
                    await createUserSessionHandler(req, res);

                    expect(send).toHaveBeenCalledWith({
                        accessToken: expect.any(String),
                        refreshToken: expect.any(String)
                    });
                });
            });
        });
});