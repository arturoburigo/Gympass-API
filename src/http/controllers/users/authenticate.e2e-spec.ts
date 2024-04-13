import request from "supertest";
import { Server } from "http"; 
import { app } from "@/app";
let server: Server; 

beforeAll((done) => {
    server = app.listen(3000, () => {
      console.log("Test server running on port 4000");
      done();
    });
  });
  
afterAll((done) => {
  server.close(() => {
    console.log("Test server closed");
    done();
  });
});

describe("Authenticate (e2e)", () => {
  it("should be able to authenticate", async () => {
    await request(server).post("/register").send({
      name: "John Doe",
      email: "johndoe1@example.com",
      password: "123456",
    });


    const response = await request(server).post("/sessions").send({
      email: "johndoe1@example.com",
      password: "123456",
    });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
