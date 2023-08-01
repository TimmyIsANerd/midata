const assert = require("chai").assert;
const request = require("supertest");

describe("Registration Action", () => {
  describe("Sign Up User", async () => {
    it("Should Fail to sign up user if password is less than 8 characters: should return 400 status code", async () => {

      const res = await request(sails.hooks.http.app)
        .post("/api/v1/user/signup")
        .send({
          firstName: "Timmy",
          lastName: "Adeyeloja",
          emailAddress: "adefeyitimi@gmail.com",
          password: "1234567",
        })
        .set("Accept", "application/json")
        .expect(400);

      assert.equal(res.status, 400);
    });


    it("Successfully signs up user: should return 201 status code", async () => {
      const res = await request(sails.hooks.http.app)
        .post("/api/v1/user/signup")
        .send({
          firstName: "Timmy",
          lastName: "Adeyeloja",
          emailAddress: "adefeyitimi@gmail.com",
          password: "11235813",
        })
        .set("Accept", "application/json")
        .expect(201);

      assert.equal(res.status, 201);
    });

    it("Fails to sign up user if user with email already exists: should return 409 status code", async () => {
      const password = "11235813"

      const res = await request(sails.hooks.http.app)
        .post("/api/v1/user/signup")
        .send({
          firstName: "Timmy",
          lastName: "Adeyeloja",
          emailAddress: "adefeyitimi@gmail.com",
          password,
        })

        .set("Accept", "application/json")
        .expect(409);

      assert.equal(res.status, 409);
    });
  });
});
