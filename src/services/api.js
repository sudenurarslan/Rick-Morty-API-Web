const BASE_URL = "https://rickandmortyapi.com/api";

async function handleResponse(res) {
  if (!res.ok) {
    let message = "Failed to load data";

    try {
      const err = await res.json();
      if (err?.error) message = err.error;
    } catch {
     
    }

    throw new Error(message);
  }

  return res.json();
}

export async function fetchCharacters({ page = 1, name = "", status = "" } = {}) {
  const params = new URLSearchParams();
  params.set("page", page);
  if (name) params.set("name", name);
  if (status) params.set("status", status);

  const res = await fetch(`${BASE_URL}/character?${params.toString()}`);
  return handleResponse(res);
}

export async function fetchCharacter(id) {
  const res = await fetch(`${BASE_URL}/character/${id}`);
  return handleResponse(res);
}


export async function fetchEpisodes(page = 1) {
  const params = new URLSearchParams();
  params.set("page", page);
  const res = await fetch(`${BASE_URL}/episode?${params.toString()}`);
  return handleResponse(res);
}

export async function fetchEpisode(id) {
  const res = await fetch(`${BASE_URL}/episode/${id}`);
  return handleResponse(res);
}

export async function fetchLocations(page = 1) {
  const params = new URLSearchParams();
  params.set("page", page);
  const res = await fetch(`${BASE_URL}/location?${params.toString()}`);
  return handleResponse(res);
}
