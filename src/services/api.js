const BASE_URL = "https://swapi.dev/api";

async function fetchAll(endpoint) {
  let results = [];
  let nextUrl = `${BASE_URL}/${endpoint}/`;

  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data = await response.json();

    results = [...results, ...data.results];
    nextUrl = data.next;
  }

  return results;
}

export async function getCharacters() {
  return fetchAll("people");
}

export async function getPlanets() {
  return fetchAll("planets");
}

export async function getFilms() {
  return fetchAll("films");
}

export async function getStarships() {
  return fetchAll("starships");
}

export async function getSpecies() {
  return fetchAll("species");
}