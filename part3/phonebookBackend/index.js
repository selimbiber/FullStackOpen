require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const Person = require("./models/Person");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("dist"));

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

const errorHandler = (error, req, res, _) => {
  console.error("Error:", error.message);
  console.error(error.stack);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "Malformatted Id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  return res.status(500).json({ error: "Internal server error!" });
};

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello MongoDB!");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

const validatePerson = (name, number) => {
  if (!name && !number) {
    return { error: "Name and number missing!" };
  }
  if (!name) {
    return { error: "Name missing!" };
  }
  if (!number) {
    return { error: "Number missing!" };
  }
  return null;
};

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;
  const validationError = validatePerson(name, number);
  if (validationError) {
    return res.status(400).json(validationError);
  }

  const person = new Person({ name, number });
  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  const person = { name, number };

  const updateOptions = {
    new: true,
    runValidators: true,
    context: "query",
  };

  Person.findByIdAndUpdate(req.params.id, person, updateOptions)
    .then((updatedPerson) => {
      if (!updatedPerson) {
        return res.status(404).end();
      }
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  Person.find({}).then((persons) => {
    res.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
      `);
  });
});

const unknownEndpoint = (request, res) => {
  res.status(404).send({ error: "Unknown endpoint!" });
};
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
