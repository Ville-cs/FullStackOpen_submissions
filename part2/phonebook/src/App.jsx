import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import ContactForm from "./components/ContactForm";
import Contacts from "./components/Contacts";
import Notification from "./components/Notifications";
import {
  getContacts,
  addContact,
  deleteContact,
  updateContact,
} from "./phonebookService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState();

  useEffect(() => {
    getContacts()
      .then((res) => setPersons(res))
      .catch((err) => console.log(err));
  }, []);

  const updateNotification = (message, success) => {
    setMessage(message);
    setSuccess(success);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const found = persons.find((person) => person.name === newName);
    if (found) {
      const replace = confirm(
        `Contact: ${newName} already exists in the phonebook. Replace their number?`,
      );
      if (!replace) return;
      try {
        const updatedContact = await updateContact({
          ...found,
          number: newNumber,
        });
        setPersons(
          persons.map((person) =>
            person.id === updatedContact.id ? updatedContact : person,
          ),
        );
        setMessage(`${newName} successfully added`);
        updateNotification(`${newName} successfully updated`, true);
        return;
      } catch (err) {
        console.log(err);
        updateNotification(`An error occurred: ${err}`, false);
      }
    }
    try {
      const newContact = await addContact({
        name: newName,
        number: newNumber,
      });
      setPersons([...persons, newContact]);
      updateNotification(`${newName} successfully added`, true);
    } catch (err) {
      console.log(err);
      updateNotification(`An error occurred: ${err}`, false);
    }
  };

  const handleDelete = async (person) => {
    if (
      confirm(`Are you sure you want to delete contact ${person.name}?`) ===
      true
    ) {
      try {
        await deleteContact(person.id);
        setPersons(persons.filter((p) => p.id !== person.id));
        updateNotification(`${person.name} successfully deleted`, true);
      } catch (err) {
        console.log(err);
        updateNotification(`An error occurred: ${err}`, false);
      }
    }
  };

  const personsToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase()),
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} success={success} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add new</h2>
      <ContactForm
        submitForm={submitForm}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      {persons && (
        <Contacts personsToShow={personsToShow} handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default App;
