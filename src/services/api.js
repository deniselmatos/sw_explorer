const BASE_URL = "https://swapi.dev/api";

export async function getCharacters() {
  const response = await fetch(`${BASE_URL}/people/`);
  const data = await response.json();
  return data.results;
}

export async function getPlanets() {
  const response = await fetch(`${BASE_URL}/planets/`);
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

export async function getSpecies() {
  const response = await fetch(`${BASE_URL}/species/`);
  const data = await response.json();
  return data.results;
}