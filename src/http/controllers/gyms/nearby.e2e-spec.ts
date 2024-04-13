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
describe("Nearby Gyms (e2e)", () => {
    it("should be able list nearby gyms", async () => {
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
        await request(server)
        .post("/gyms/create")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "JavaScript Gym",
          description: "Some description.",
          phone: "1199999999",
          latitude: -27.2092052,
          longitude: -49.6401091,
        });
  
      await request(server)
        .post("/gyms/create")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "TypeScript Gym",
          description: "Some description.",
          phone: "1199999999",
          latitude: -27.0610928,
          longitude: -49.5229501,
        });
  
      const response = await request(server)
        .get("/gyms/nearby")
        .query({
          latitude: -27.2092052,
          longitude: -49.6401091,
        })
        .set("Authorization", `Bearer ${token}`)
        .send();
  
      expect(response.statusCode).toEqual(200);
      expect(response.body.gyms).toHaveLength(1);
      expect(response.body.gyms).toEqual([
        expect.objectContaining({
          title: "JavaScript Gym",
        }),
      ]);
    });
  });