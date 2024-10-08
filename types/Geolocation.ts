export type Geolocation = {
  lat: number,
  lng: number,
  street_number: string,
  street_name: string,
  city_name: string,
  state_name: string,
  country_name: string,
  postal_code: string,
  location_id: number
}

export type GoogleSearchResult = {
  place_id: string,
  location_name: string
}
