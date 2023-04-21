export interface Comment {
  username: string;
  profileImgUrl: string;
  comment: string;
}

export interface Memory {
  username?: string;
  profileUrl?: string;
  imgUrl: string;
  title: string;
  description: string;
  comments: Comment[];  
  timePosted: string;
  alive: boolean;
}
