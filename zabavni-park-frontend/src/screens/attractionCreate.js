import React, { useState } from 'react';
import AttractionForm from "../components/forms/AttractionForm";
import { createAttraction } from "../DAL/attractions";
import { validateAttraction } from "../validators/validateAttraction";


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
    let validateResult = validateAttraction(attraction);
    if (typeof validateResult === "string") {
      alert(validateResult);
      return;
    }

    const content = await createAttraction(attraction);

    if (content) {
      document.location.pathname="attractions"
    }
  };

  return (<AttractionForm attraction={attraction} handleChange={handleChange} submit={submit}/>);
}

export default AttractionCreate;