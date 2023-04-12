import { IComment } from './comment.interface'

export interface IMemory {
  userId: string | null | undefined
  username: string | null | undefined
  profileImgUrl?: string | null | undefined
  imgUrl: string | null | undefined
  title: string | null | undefined
  description: string | null | undefined
  comments: IComment[] | [] | null | undefined
  timePosted: Date | null | undefined
  alive: boolean | null | undefined
  time: Date | null | undefined
}
