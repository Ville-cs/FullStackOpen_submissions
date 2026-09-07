import ContactDetails from "./ContactDetails";

const Contacts = ({ personsToShow, handleDelete }) => {
  return personsToShow.map((person) => (
    <ContactDetails
      key={person.name}
      person={person}
      handleDelete={handleDelete}
    />
  ));
};

export default Contacts;
