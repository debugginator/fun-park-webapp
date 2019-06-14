export function fetchAllAttractions() {
  return fetch("http://localhost:3001/atrakcija")
    .then(res => res.json())
}

export function fetchAttraction(id) {
  return fetch("http://localhost:3001/atrakcija/" + id)
    .then(res => res.json())
}

export async function updateAttraction(id, body) {
  let rawResponse = await fetch('http://localhost:3001/atrakcija/edit/' + id, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return await rawResponse.json();
}

export async function createAttraction(body) {
  const rawResponse = await fetch('http://localhost:3001/atrakcija/create/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  return rawResponse.json();
}

export function resetDatabase() {
  return fetch("http://localhost:3001/reset/");
}