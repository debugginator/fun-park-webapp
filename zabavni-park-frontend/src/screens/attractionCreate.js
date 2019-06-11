import React, { useState } from 'react';
import AttractionForm from "../components/forms/AttractionForm";


function AttractionCreate() {
  const [attraction, setAttraction] = useState({
    naziv: "",
    opis: "",
    avatarUrl: "",
    ocjenaTezine: 0
  });


  const handleChange = name => event => {
    setAttraction({ ...attraction, [name]: event.target.value });
  };

  const submit = async () => {
    const rawResponse = await fetch('/atrakcija/create/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(attraction)
    });
    const content = await rawResponse.json();

    console.log(content);
  };

  return (<AttractionForm attraction={attraction} handleChange={handleChange} submit={submit}/>);
}

export default AttractionCreate;