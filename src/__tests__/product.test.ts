import supertest from "supertest";
import createServer from "../utils/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { createProduct } from "../service/product.service";

const app = createServer();
const userId = new mongoose.Types.ObjectId().toString();
export const productPayload = {
    user: userId,
    title: "Cannon E0S 1500D DSLR Camera with 18-55mm Lens",
    description: "Lorem Ipsum bla bla...",
    price: 999.81,
    image: "https://i.imgur.com/QlRphfQ.jpg",
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
        
    });
});