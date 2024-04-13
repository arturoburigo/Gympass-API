import request from "supertest";
import { app } from "@/app";
import { Server } from "http"; 

let server: Server; 

beforeAll((done) => {
    server = app.listen(4020, () => {
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

describe.skip("Profile (e2e)", () => {
  it("should be able to get user profile", async () => {
    await request(server).post("/register").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const authResponse = await request(server).post("/sessions").send({
      email: "johndoe@example.com",
      password: "123456",
    });

    const { token } = authResponse.body;

    const profileResponse = await request(server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: "johndoe@example.com",
      }),
    );
  });
});