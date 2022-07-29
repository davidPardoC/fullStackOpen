const mongoose = require("mongoose");

const { 2: password, 3: personName, 4: number } = process.argv;

const url = `mongodb+srv://davidPardoC:${password}@cluster0.kt24p.mongodb.net/phoneBook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
});

const Person = mongoose.model("Person", personSchema);

const createPerson = () => {
  mongoose
    .connect(url)
    .then(() => {
      const person = new Person({ name: personName, number, date: new Date() });
      return person.save();
    })
    .then(() => {
      mongoose.connection.close();
      console.log(`added ${personName} number ${number} to phonebook`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getPersons = () => {
  mongoose
    .connect(url)
    .then(() => {
      Person.find({}).then((people) => {
        people.forEach((person) => {
          console.log(`${person.name} ${person.number}`);
        });
      });
      mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
};

const main = () => {
  if (!password) {
    console.log(
      `Password parameter must be passed: ex: "node mongo.js <password>"`
    );
    return;
  }
  if (!personName || !number) {
    getPersons();
    return;
  }
  createPerson();
};

main();
