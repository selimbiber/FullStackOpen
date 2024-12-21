require("dotenv").config();
const mongoose = require("mongoose");

const user = process.env.DB_USER;
const database = process.env.DB_NAME;
const cluster = process.env.DB_CLUSTER;
const password = encodeURIComponent(process.argv[2]);

const url = `mongodb+srv://${user}:${password}@${cluster}.tfv5wtu.mongodb.net/${database}?retryWrites=true&w=majority
`;

mongoose
  .connect(url)
  .then(async () => {
    console.log("Connected to MongoDB!");
    // await addSampleData();
    handleCommandLineArgs();
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
  },
});

const Person = mongoose.model("Person", personSchema);

async function handleCommandLineArgs() {
  const args = process.argv.slice(3);

  if (args.length === 0) {
    const persons = await Person.find({});
    console.log("Phonebook:");
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
  } else if (args.length === 2) {
    const name = args[0];
    const number = args[1];

    const person = new Person({ name, number });

    try {
      await person.save();
      console.log(`added ${name} number ${number} to phonebook`);
    } catch (error) {
      console.error(`Error adding person: ${error.message}`);
    }
  } else {
    console.log(
      "Invalid number of arguments. Provide either just the password or the password followed by a name and number."
    );
  }
  mongoose.connection.close();
}

// async function addSampleData() {
//   const samplePersons = [
//     { name: "Arto Hellas", number: "040-123456" },
//     { name: "Ada Lovelace", number: "39-44-5323523" },
//     { name: "Dan Abramov", number: "12-43-234345" },
//     { name: "Mary Poppendieck", number: "39-23-6423122" },
//   ];

//   for (const person of samplePersons) {
//     const newPerson = new Person(person);
//     try {
//       await newPerson.save();
//       console.log(`Sample person added: ${person.name}`);
//     } catch (error) {
//       console.error(`Error adding sample person: ${error.message}`);
//     }
//   }
// }
