import { IComment } from './comment.interface';

export interface IMemory {
  userId: string;
  username: string;
  profileImgUrl?: string | null | undefined;
  imgUrl: string;
  title: string;
  description: string;
  comments: IComment[] | [];
  timePosted: Date;
  alive: boolean;
  time: Date;
}
