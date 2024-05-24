import React, { useState } from 'react';
import { firestore } from './FirebaseComponent';
import { doc, setDoc } from "firebase/firestore"; 


const ClientsComponent = () => {
  const [client, setClient] = useState({
    name: '',
    type: '',
    address: '',
    country: '',
    taxCode: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add a new document in collection "cities"
    await setDoc(doc(firestore, "clienti", client.name), client);
      console.log('Client added successfully');
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={client.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="type"
        placeholder="Type"
        value={client.type}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={client.address}
        onChange={handleChange}
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={client.country}
        onChange={handleChange}
      />
      <input
        type="text"
        name="taxCode"
        placeholder="Tax Code"
        value={client.taxCode}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={client.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={client.phone}
        onChange={handleChange}
      />
      <button type="submit">Add Client</button>
    </form>
    </>
  );
};

export default ClientsComponent;
