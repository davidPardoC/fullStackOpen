import React from "react";

const Contact = ({ contact }) => {
  return (
    <li>
      {contact.name} {contact.number}
    </li>
  );
};

export default Contact;
