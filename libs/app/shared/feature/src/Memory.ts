export interface Memory {
  username?: string;
  profileUrl?: string;
  imgUrl: string;
  title: string;
  description: string;
  comments: [
    {
      username: string;
      profileImgUrl: string;
      comment: string;
    },
  ] | [];  
  timePosted: string;
  alive: boolean;
}
