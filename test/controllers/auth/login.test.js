const assert = require("chai").assert;
const request = require("supertest");

describe("Login Action", () => {
  describe("Sign Up User", async () => {
    it("Should Fail if Password is incorrect", async () => {
      const res = await request(sails.hooks.http.app)
        .post("/api/v1/user/login")
        .send({
          emailAddress: "adefeyitimi@gmail.com",
          password: "adeyeloja16",
        })
        .set("Accept", "application/json")
        .expect(401);

      assert.equal(res.status, 401);
    });

    it("Should Pass if Password is correct", async () => {
      const res = await request(sails.hooks.http.app)
        .post("/api/v1/user/login")
        .send({
          emailAddress: "adefeyitimi@gmail.com",
          password: "11235813",
        })
        .set("Accept", "application/json")
        .expect(200);

      assert.equal(res.status, 200);
    });
  });
});
