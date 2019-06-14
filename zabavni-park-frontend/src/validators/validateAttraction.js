export function validateAttraction(attraction) {
  if (typeof attraction.naziv !== "string" || attraction.naziv.length <= 0)
    return "Nedostaje naziv";
  if (typeof attraction.opis !== "string" || attraction.opis.length <= 0)
    return "Nedostaje opis";
  if (typeof attraction.avatarURL !== "string" || attraction.avatarURL.length <= 0)
    return "Nedostaje URL";
  if (!_isURL(attraction.avatarURL)) {
    console.log(attraction.avatarURL);
    return `Neispravan URL: "${attraction.avatarURL}"`;
  }
  if (attraction.ocjenaTezine > 5 || attraction.ocjenaTezine < 1)
    return "Neispravna ocjena tezine (unesite broj između [1, 5])";


  return true;
}

export function BUG_validateAttraction(attraction) {
  return false;
}

function _isURL(url) {
  const URL_REGEX = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/;
  return URL_REGEX.test(url);
}