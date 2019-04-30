export interface IApiResults {
  info: IPagesInfo;
  results: ICharacter[];
}
export interface IPagesInfo {
  count?: number;
  next?: string;
  pages?: number;
  prev?: string;
}
export interface ICharacter {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string,
    url: string
  };
  name: string;
  origin: {
    name: string,
    url: string
  };
  species: string;
  status: string;
  type: string;
  url: string;
}
export interface IDialogData {
  character: ICharacter;
  location?: ILocation;
  episodes?: IEpisodes;
}
export interface ILocation {
  id: 1;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}
export interface IEpisodes {
  id: 1;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
export interface IFilterType {
  search: string;
  status: string;
  gender: string;
}
export interface IApiScope {
  filterValues: IFilterType;
  pageNumber: number;
  currentUrl?: string;
  url: string;
}
