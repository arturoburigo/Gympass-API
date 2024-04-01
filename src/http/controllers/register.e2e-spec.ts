import { app } from "@/app";
import request from "supertest";
import { Server } from "http"; // Importe o tipo Server

let server: Server; // Anote a variável server com o tipo Server

beforeAll((done) => {
  server = app.listen(4000, () => {
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

describe("Register (e2e)", () => {
  it("Should register a new user", async () => {
    const response = await request(server).post("/register").send({
      name: "Arturo Burigo",
      password: "123456",
      email: "burigoa21rturo@gmail.com"
    });
    expect(response.statusCode).toBe(201);
  });
});
