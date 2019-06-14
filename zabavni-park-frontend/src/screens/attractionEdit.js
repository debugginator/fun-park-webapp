import React, { useEffect, useState } from 'react';
import AttractionForm from "../components/forms/AttractionForm";
import { validateAttraction } from "../validators/validateAttraction";
import { updateAttraction } from "../DAL/attractions";


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
    let validateResult = validateAttraction(attraction);
    if (typeof validateResult === "string") {
      alert(validateResult);
      return;
    }
    const content = await updateAttraction(props.match.params.id, attraction);

    if (content) {
      document.location.pathname="attractions"
    }
  };

  return (<AttractionForm attraction={attraction} handleChange={handleChange} submit={submit}/>);
}

export default AttractionEdit;