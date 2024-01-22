import { SearchResults } from "@/typing";

async function fetchFromTMDB(url: URL, cacheTime?: number) {
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("include_video", "false");
  url.searchParams.set("sort_by", "popularity.desc");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", "1");

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: {
      revalidate: cacheTime || 60 * 60 * 24, // 24 hours
    },
  };

  const response = await fetch(url.toString(), options);
  const data = (await response.json()) as SearchResults;

  return data;
}

async function fetchMovies(url: URL, cacheTime?: number) {
  const data = await fetchFromTMDB(url, cacheTime);
  return data.results;
}

export async function getUpcomingMovies() {
  return fetchMovies(new URL("https://api.themoviedb.org/3/movie/upcoming"));
}

export async function getTopRatedMovies() {
  return fetchMovies(new URL("https://api.themoviedb.org/3/movie/top_rated"));
}

export async function getPopularMovies() {
  return fetchMovies(new URL("https://api.themoviedb.org/3/movie/popular"));
}

export async function getDiscoverMovies(id?: string, keywords?: string) {
  const url = new URL("https://api.themoviedb.org/3/discover/movie");

  keywords && url.searchParams.set("with_keywords", keywords);
  id && url.searchParams.set("with_genres", id);

  return fetchMovies(url);
}

export async function getSearchedMovies(term: string) {
  const url = new URL("https://api.themoviedb.org/3/discover/movie");

  url.searchParams.set("query", term);
  return fetchMovies(url);
}
