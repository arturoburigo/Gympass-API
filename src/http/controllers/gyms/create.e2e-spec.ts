import { app } from "@/app";
import request from "supertest";
import { Server } from "http"; 
let server: Server; 
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
describe.skip("Create Gym (e2e)", () => {
    it("should be able to create a gym", async () => {
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
        console.log({token});
        const response = await request(server)
            .post("/gyms/create")
            .set("Authorization", `Bearer ${token}`)
            .send({
            title: "JavaScript Gym",
            description: "Some description.",
            phone: "1199999999",
            latitude: -27.2092052,
            longitude: -49.6401091,
            });
        expect(response.statusCode).toEqual(201);
    });
  });