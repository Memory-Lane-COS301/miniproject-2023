import * as admin from 'firebase-admin';
import {IFriendRequest} from '@mp/api/friend/util';
import {IMemory} from '@mp/api/memories/util';
import {IUser} from '@mp/api/users/util';
import {IProfile} from '@mp/api/profiles/util';
import { Timestamp } from 'firebase-admin/firestore';
import { IComment } from '@mp/api/memories/util';
import { user } from 'firebase-functions/v1/auth';

admin.initializeApp();
admin.firestore().settings({ ignoreUndefinedProperties: true });

function seed(){
    const user1 : IUser ={ 
       userId:"1",
       name: "John",
       surname: "Doe", 
       username: "JD",
       email: "example.com", 
       profileImgUrl: "img url goes here", 
       bio: "something something", 
       friendCount: 0 , 
       memoryCount: 0 , 
       accountTime: 23, 
       lastOnline: Timestamp.now(),
       online:false,
       created: Timestamp.now(),
    }

    const comment: IComment ={ 
        userId:"3",
        commentId:"1",
        username:"sddfd", 
        profileImgUrl:"sdfddd", 
        text:"Asdsd",
        created:Timestamp.now()
    }
    const memory: IMemory={ 
       userId:"1",
       username:"JD", 
       title:"Title", 
       description:"something", 
       imgUrl:"an image",
       profileImgUrl:"sdffa",
       created:Timestamp.now(),
       commentsCount:2,
       remainingTime:23.0,
       alive:true,  
       comments:[comment,comment,comment]
    }
    const profile : IProfile={ 
        userId: user1.userId,
        user:user1,
        memories:[memory,memory,memory]
    }
    
    for (let i = 0; i < 6; i++){
       admin.firestore().collection("Profiles").doc().create(profile)
    }
}

seed()

export * from './functions';
