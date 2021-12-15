import supertest from "supertest";
import createServer from "../utils/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { createProduct } from "../service/product.service";
import { signJWT } from "../utils/jwt.utils";

const app = createServer();
const userId = new mongoose.Types.ObjectId().toString();
export const productPayload = {
    user: userId,
    title: "Cannon E0S 1500D DSLR Camera with 18-55mm Lens",
    description: "Designed for first-time DSLR owners who want impressive results out of the box and capture those magic moments on camera!",
    price: 999.81,
    image: "https://i.imgur.com/QlRphfQ.jpg",
}

export const userPayload = {
    _id: userId,
    email: "jane.doe@example.com",
    name: "Jane Doe"
}


describe("product", () => {
    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });
    
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe("get product route", () => {
        describe("given the product does not exist", () => {
            it("should return a 404", async () => {
                const productId = "product_123";
                await supertest(app).get(`/api/products/${productId}`).expect(404);
            });
        });
        describe("given the product does exist", () => {
            it("should return a 200 status and the product", async () => {
                const product = await createProduct(productPayload);
                const { body, statusCode } = await supertest(app).get(`/api/products/${product.productId}`);
                expect(statusCode).toBe(200);
                expect(body.productId).toBe(product.productId);
            });
        });
    });

    describe("create product route", () => {
        describe("given the user is not logged in", () => {
            it("should return a 403", async () => {
                const { statusCode } = await supertest(app).post("/api/products");
                expect(statusCode).toBe(403);
            });
        });
        describe("given the user is logged in", () => {
            it("should return a 200 and create a product", async () => {
                const jwt = signJWT(userPayload, "accessTokenPrivateKey");
                const { statusCode, body } = await supertest(app)
                    .post("/api/products")
                    .set("Authorization", `Bearer ${jwt}`)
                    .send(productPayload);

                expect(statusCode).toBe(200);
                expect(body).toStrictEqual({
                    __v: 0,
                    _id: expect.any(String),
                    createdAt: expect.any(String),
                    description: "Designed for first-time DSLR owners who want impressive results out of the box and capture those magic moments on camera!",
                    image: "https://i.imgur.com/QlRphfQ.jpg",
                    price: 999.81,
                    productId: expect.any(String),
                    title: "Cannon E0S 1500D DSLR Camera with 18-55mm Lens",
                    updatedAt: expect.any(String),
                    user: expect.any(String)
                    });
            });
        });
    });
});