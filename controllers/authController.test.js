// import "dotenv/config";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app.js"



const { DB_HOST, PORT } = process.env;

describe("test for login controller", ()=> {
    let server = null;
    beforeAll(async ()=> {
        await mongoose.connect(DB_HOST);
        // server = app.listen(3000);
        server = app;
    })

    afterAll(async ()=>{
        await mongoose.connection.close();
        // app.close();
    })

    test("sending a login request and return 200 status", async ()=> {

        const userLogin = {
            email: "Victoria@ukr.net",
            password: "12345678",
          };
        
        const {body, status} = await request(app).post("/users/login").send(userLogin);

        expect(status).toBe(200);
        expect(!!body.token).toBe(true);
        expect(!!body.user.email).toBe(true);
        expect(!!body.user.subscription).toBe(true);
        expect(typeof body.user.email).toBe("string");
        expect(typeof body.user.subscription).toBe("string");
    })
})