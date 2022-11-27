const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
  const user = await User.findById(request.params.id);
  response.json(user);
});

usersRouter.post("/", async (request, response) => {
  const { username, password } = request.body;
  if (!username || !password) {
    return response.status(400).json({
      error: "Anna käyttäjätunnus ja salasana",
    });
  }
  if (username.length < 3 || username.length > 12) {
    return response.status(400).json({
      error: "Käyttäjätunnuksen pituuden tulee olla 3-12 merkkiä",
    });
  }
  if (password.length < 6) {
    return response.status(400).json({
      error: "Salasanan tulee olla vähintään kuusi merkkiä pitkä",
    });
  }
  if (await User.findOne({ username })) {
    return response.status(400).json({
      error: "Käyttäjätunnus varattu",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    username: username,
    passwordHash: passwordHash,
    physicsCorrect: 0,
    physicsTotal: 0,
    chemistryCorrect: 0,
    chemistryTotal: 0,
    biologyCorrect: 0,
    biologyTotal: 0,
    bestCorrect: 0,
    bestTotal: 0,
    bestCategory: "",
  });
  const savedUser = await newUser.save();
  response.status(201).json(savedUser);
});

usersRouter.delete("/:id", async (request, response) => {
  const user = await User.findById(request.params.id);
  if (user) {
    await User.findByIdAndRemove(request.params.id);
  }
  response.status(204).end();
});

usersRouter.put("/:id", async (request, response) => {
  const user = await User.findById(request.params.id);
  if (user) {
    await User.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
    });
    const updatedUser = await User.findById(request.params.id);
    response.json(updatedUser);
  }
});

module.exports = usersRouter;
