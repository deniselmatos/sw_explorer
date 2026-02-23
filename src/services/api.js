const BASE_URL = "https://swapi.dev/api";

async function fetchAllPages(endpoint) {
  let allResults = [];
  let url = `${BASE_URL}/${endpoint}/`;

  while (url) {
    const response = await fetch(url);
    const data = await response.json();

    allResults = [...allResults, ...data.results];
    url = data.next;
  }

  return allResults;
}



export async function getPeople() {
  return await fetchAllPages("people");
}

export async function searchPeople(name) {
  if (!name) return getPeople();

  const response = await fetch(
    `${BASE_URL}/people/?search=${name}`
  );
  const data = await response.json();
  return data.results;
}


export async function getPlanets() {
  return await fetchAllPages("planets");
}

export async function searchPlanets(name) {
  if (!name) return getPlanets();

  const response = await fetch(
    `${BASE_URL}/planets/?search=${name}`
  );
  const data = await response.json();
  return data.results;
}


export async function getFilms() {
  const response = await fetch(`${BASE_URL}/films/`);
  const data = await response.json();
  return data.results;
}


export async function getStarships() {
  return await fetchAllPages("starships");
}


export async function getSpecies() {
  return await fetchAllPages("species");
}