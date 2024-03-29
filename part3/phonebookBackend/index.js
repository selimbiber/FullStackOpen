const express = require("express");
const morgan = require("morgan");
const app = express();

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);
// POST /api/persons 201 59 - 4.008 ms {"name":"Selim Pepper" "number":"123-456-7890"}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const personId = parseInt(req.params.id);
  const person = persons.find((person) => person.id === personId);

  if (!person) return res.status(404).json({ message: "Person not found" });
  res.json(person);
});

app.get("/info", (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
    `);
});

app.delete("/api/persons/:id", (req, res) => {
  const personId = parseInt(req.params.id);
  const personIndex = persons.findIndex((person) => person.id === personId);

  if (personIndex === -1) {
    return res.status(404).json({ message: "Person not found" });
  }

  persons.splice(personIndex, 1);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name or number is missing" });
  }

  if (persons.some((person) => person.name === body.name)) {
    return res.status(409).json({ error: "name must be unique" });
  }

  const person = {
    id: Math.floor(Math.random() * 1000000) + 1,
    name: body.name,
    number: body.number,
  };

  persons.push(person);

  res.status(201).json(person);
});

const port = 3001;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
