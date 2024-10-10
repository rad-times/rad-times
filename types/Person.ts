import {Geolocation} from "@/types/Geolocation";
import {Href} from "expo-router";

export type Person = {
  id: number
  first_name?: string
  last_name?: string
  email_address?: string
  bio?: string
  profile_image?: string
  is_favorite?: boolean
  language_code?: string
  socials?: SocialDetails[]
  location?: Geolocation
  crew?: Person[]
}

export type SocialDetails = {
  id: number
  social_type: string
  url_link: Href
}

export const unknownUser: Person = {
  id: 0,
  first_name: 'Unknown',
  last_name: 'User'
};
