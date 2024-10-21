import {Geolocation} from "@/types/Geolocation";

export interface Spot {
  spot_id: number
  spot_name?: string
  spot_image?: string
  spot_description?: string
  last_check_in?: string
  is_public?: boolean
  is_favorite?: boolean
  is_private?: boolean
  keywords?: Keyword[]
  location?: Geolocation
}

export interface Keyword {
  keyword_name: string
  description: string
  keyword_id: string
}
