import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";


@Component({
  selector: 'app-view-comments',
  templateUrl: './view-comments.page.html',
  styleUrls: ['./view-comments.page.scss'],
})
export class ViewCommentsPageComponent {
  //this memory object will be replaced by the state's memory object
  memory: any = {
    username: '@username',
    profileUrl:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
    imgUrl:
      'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
    title: 'Last day of Highschool',
    description: 'Example of a description for the memory',
    comments: [
      {
        username: '@commentedUsername',
        profileImgUrl:
          'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
        comment:
          'This is an example comment and the comment can only be up to 80 characters long.',
      },
      {
        username: '@commentedUsername',
        profileImgUrl:
          'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
        comment:
          'This is an example comment and the comment can only be up to 80 characters long.',
      },
      {
        username: '@commentedUsername',
        profileImgUrl:
          'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
        comment:
          'This is an example comment and the comment can only be up to 80 characters long.',
      },
      {
        username: '@commentedUsername',
        profileImgUrl:
          'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
        comment:
          'This is an example comment and the comment can only be up to 80 characters long.',
      },
      {
        username: '@commentedUsername',
        profileImgUrl:
          'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
        comment:
          'This is an example comment and the comment can only be up to 80 characters long.',
      },
      {
        username: '@commentedUsername',
        profileImgUrl:
          'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
        comment:
          'This is an example comment and the comment can only be up to 80 characters long.',
      },
      {
        username: '@commentedUsername',
        profileImgUrl:
          'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
        comment:
          'This is an example comment and the comment can only be up to 80 characters long.',
      },
      {
        username: '@commentedUsername',
        profileImgUrl:
          'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
        comment:
          'This is an example comment and the comment can only be up to 80 characters long.',
      },
      {
        username: '@commentedUsername',
        profileImgUrl:
          'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
        comment:
          'This is an example comment and the comment can only be up to 80 characters long.',
      },
      {
        username: '@commentedUsername',
        profileImgUrl:
          'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
        comment:
          'This is an example comment and the comment can only be up to 80 characters long.',
      },
      {
        username: '@commentedUsername',
        profileImgUrl:
          'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
        comment:
          'This is an example comment and the comment can only be up to 80 characters long.',
      },
      {
        username: '@commentedUsername',
        profileImgUrl:
          'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
        comment:
          'This is an example comment and the comment can only be up to 80 characters long.',
      },
      {
        username: '@commentedUsername',
        profileImgUrl:
          'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
        comment:
          'This is an example comment and the comment can only be up to 80 characters long.',
      }
    ],
    timePosted: '2020-11-14T10:30:00.000-07:00',
    alive: true
  };
  
  new_comment = '';

  constructor(private navCtrl: NavController) {}

  get Comments(){
    return this.memory.comments;
  }

  openUserProfile() {
    this.navCtrl.navigateForward('/view-all-comments');
  }
}