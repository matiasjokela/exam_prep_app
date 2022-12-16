const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

describe("tests for users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await helper.insertInitialUsers();
  });
  test("valid user can be added", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "rami",
      password: "ramses",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
  test("duplicate users cannot be added", async () => {
    const usersAtStart = await helper.usersInDb();
    const duplicateUser = {
      username: "Esteri",
      password: "jaahans",
    };
    await api.post("/api/users/").send(duplicateUser).expect(400);
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
  test("user not added if username or password missing", async () => {
    const usersAtStart = await helper.usersInDb();
    const noUsername = {
      password: "siikret",
    };
    const noPassword = {
      username: "Olavi",
    };
    const result = await api.post("/api/users").send(noUsername).expect(400);

    const anotherResult = await api
      .post("/api/users")
      .send(noPassword)
      .expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("length rules for username and password are enforced", async () => {
    const usersAtStart = await helper.usersInDb();
    const badUsername = {
      username: "X",
      password: "hyväsalasana",
    };
    const badPassword = {
      username: "RitariÄssä",
      password: "KITT",
    };
    const result = await api.post("/api/users").send(badUsername).expect(400);

    const anotherResult = await api
      .post("/api/users")
      .send(badPassword)
      .expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("user can be deleted", async () => {
    const usersAtStart = await helper.usersInDb();
    const userToDelete = usersAtStart[0];

    await api.delete(`/api/users/${userToDelete.id}`).expect(204);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length - 1);

    const users = usersAtEnd.map((user) => user.username);
    expect(users).not.toContain(userToDelete.username);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
