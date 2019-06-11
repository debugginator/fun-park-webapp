import React, { useEffect, useState } from 'react';
import AttractionForm from "../components/forms/AttractionForm";


function AttractionEdit(props) {
  const [attraction, setAttraction] = useState({
    naziv: "",
    opis: "",
    avatarUrl: "",
    ocjenaTezine: 0
  });


  useEffect(() => {
    fetch("/atrakcija/" + props.match.params.id)
      .then(res => res.json())
      .then(setAttraction);
  }, []);

  const handleChange = name => event => {
    setAttraction({ ...attraction, [name]: event.target.value });
  };

  const submit = async () => {
    const rawResponse = await fetch('/atrakcija/edit/' + props.match.params.id, {
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

export default AttractionEdit;