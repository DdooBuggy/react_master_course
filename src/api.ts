const API_KEY = "4d9d00b720becb4f431355610730fd73";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [number];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovieDetail {
  adult: boolean;
  backdrop_path: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }
  ];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  release_date: string;
  runtime: number;
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }
  ];
  tagline: string;
  title: string;
  vote_average: number;
}

export function getMovies(movieCategory: string) {
  return fetch(`${BASE_PATH}/movie/${movieCategory}?api_key=${API_KEY}`).then(
    (res) => res.json()
  );
}

export function getMovieDetail(movieId: string) {
  return fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}
export function getMovieSimilar(movieId: string) {
  return fetch(`${BASE_PATH}/movie/${movieId}/similar?api_key=${API_KEY}`).then(
    (res) => res.json()
  );
}

export interface ITv {
  backdrop_path: string;
  first_air_date: string;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}
export interface ITvResult {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}
export interface ITvDetail {
  adult: boolean;
  backdrop_path: string;
  created_by: [
    {
      id: number;
      credit_id: string;
      name: string;
      profile_path: string;
    }
  ];
  episode_run_time: [number];
  first_air_date: string;
  genres: [
    {
      id: number;
      name: string;
    },
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  id: number;
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    runtime: number;
    season_number: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  };
  name: string;
  networks: [
    {
      name: string;
      id: number;
      logo_path: string;
      origin_country: string;
    }
  ];
  number_of_episodes: number;
  number_of_seasons: number;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }
  ];
  seasons: [
    {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string;
      season_number: number;
    },
    {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string;
      season_number: number;
    }
  ];
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }
  ];
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
}

export function getTvs(tvCategory: string) {
  return fetch(`${BASE_PATH}/tv/${tvCategory}?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}
export function getTvDetail(tvId: string) {
  return fetch(`${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}`).then((res) =>
    res.json()
  );
}
export function getTvSimilar(tvId: string) {
  return fetch(`${BASE_PATH}/tv/${tvId}/similar?api_key=${API_KEY}`).then(
    (res) => res.json()
  );
}
