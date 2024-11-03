import {Geolocation} from "@/types/Geolocation";

export interface Person {
  id: number
  first_name: string
  last_name: string
  email_address?: string
  bio?: string
  profile_image?: string
  location?: Geolocation
  crew?: Person[]
}

export const unknownUser: Person = {
  id: 0,
  first_name: 'Unknown',
  last_name: 'User'
};
