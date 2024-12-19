import { expect } from "chai";
import sinon from "sinon";
import { fetchUsers } from "../fetchUsers.js";

describe("fetchUsers", function () {
  it("should return an array of users", async function () {
    const users = await fetchUsers();
    expect(users).to.be.an("array");
  });

  it("should return the same users as the API returns", async function () {
    let fetchStub = sinon.stub(global, "fetch");
    try {
      const testUsers = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ];
      fetchStub.resolves({ ok: true, json: async () => testUsers });
      const users = await fetchUsers();
      expect(users).to.deep.equal(testUsers);
    } finally {
      fetch.restore();
    }
  });

  it("should return undefined if the API request fails", async function () {
    let fetchStub = sinon.stub(global, "fetch");
    try {
      fetchStub.rejects(new Error("Network error"));
      const users = await fetchUsers();
      expect(users).to.be.undefined;
    } finally {
      fetchStub.restore();
    }
  });
  it("should fetch and print the user data", function (done) {
    fetchUsers();
    done();
  });
});
