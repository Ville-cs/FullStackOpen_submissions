const ContactDetails = ({ person, handleDelete }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => handleDelete(person)}>delete contact</button>
    </div>
  );
};

export default ContactDetails;
