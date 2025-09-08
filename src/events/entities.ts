export interface EventEntry {
  organisation: string;
  type: string;
  event: string;
  date: string;
  location: string;
  district: string;
  json: string;
  id: string;
  dt: number;
  audio: string;
  audiom: string;
  image: string;
}

export interface FilterEntry {
  event: string[];
  date: string[];
  dt: number[];
}

export interface SearchContext {
  text: string;
  date: { from: string; to: string };
}
