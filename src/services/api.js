const BASE_URL = "https://swapi.dev/api";

export async function getPeople() {
  let allPeople = [];
  let url = `${BASE_URL}/people`;

  while (url) {
    const response = await fetch(url);
    const data = await response.json();

    allPeople = [...allPeople, ...data.results];
    url = data.next; 
  }

  return allPeople;
}

export async function searchPeople(name) {
  const response = await fetch(
    `${BASE_URL}/people/?search=${name}`
  );
  const data = await response.json();
  return data.results;
}

export async function searchPlanets(name) {
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
  const response = await fetch(`${BASE_URL}/starships/`);
  const data = await response.json();
  return data.results;
}