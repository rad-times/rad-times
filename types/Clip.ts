import {Person} from "@/types/Person";
import {Spot} from "@/types/Spot";

export type Comment = {
  id: number
  comment: string
  author: Person
  createDate: Date
}

export type Clip = {
  id: number
  imageUrl?: string
  likeCount?: string
  createDate?: Date
  comments: Comment[]
  spot: Spot
  owner: Person
}

export type NewClip = {
  photoData: string
  photoName: string
  createDate: number
  spotId: number
}
