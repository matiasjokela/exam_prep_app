const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Question = require("../models/question");
const User = require("../models/user");

const api = supertest(app);

describe("tests for questions", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await helper.insertInitialUsers();
    await Question.deleteMany({});
    await Question.insertMany(helper.initialQuestions);
  });

  test("questions are returned as json", async () => {
    await api
      .get("/api/questions")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all questions are returned", async () => {
    const response = await api.get("/api/questions");
    const questions = response.body;
    expect(questions).toHaveLength(helper.initialQuestions.length);
  });

  test("valid question can be added", async () => {
    const newQuestion = helper.listWithOneQuestion[0];
    const questionsAtStart = await helper.questionsInDb();

    await api.post("/api/questions").send(newQuestion).expect(201);

    const questionsAtEnd = await helper.questionsInDb();
    expect(questionsAtEnd).toHaveLength(questionsAtStart.length + 1);

    const questions = questionsAtEnd.map((question) => question.question);
    expect(questions).toContain("Tiistai on?");
  });

  test("invalid questions not added and return 400", async () => {
    const badQuestion = {
      question: "Presidentti on?",
      option_a: "Kahvi",
      option_b: "Sauli",
      option_c: "Rapala",
      option_d: "on on",
    };
    const questionsAtStart = await helper.questionsInDb();

    await api.post("/api/questions").send(badQuestion).expect(400);

    const questionsAtEnd = await helper.questionsInDb();
    expect(questionsAtEnd).toHaveLength(questionsAtStart.length);

    const questions = questionsAtEnd.map((question) => question.question);
    expect(questions).not.toContain("Presidentti on?");
  });
  test("question can deleted", async () => {
    const questionsAtStart = await helper.questionsInDb();
    const questionToDelete = questionsAtStart[0];

    await api.delete(`/api/questions/${questionToDelete.id}`).expect(204);

    const questionsAtEnd = await helper.questionsInDb();
    expect(questionsAtEnd).toHaveLength(questionsAtStart.length - 1);

    const questions = questionsAtEnd.map((question) => question.question);
    expect(questions).not.toContain(questionToDelete.question);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
