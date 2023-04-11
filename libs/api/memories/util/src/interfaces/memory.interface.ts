import { IComment } from './comment.interface';

 export interface IMemory {
 
    userId:string;  
    username?:string | null | undefined;
    profileUrl?:string | null | undefined; 
    imgUrl:string ;
    title:string;
    description:string;
    comments:IComment[] | null | undefined;
    timePosted:string; 
    alive:boolean;
    time:number ;
    
}
