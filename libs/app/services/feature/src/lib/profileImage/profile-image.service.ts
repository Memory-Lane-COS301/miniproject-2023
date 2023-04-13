import { Injectable } from '@angular/core';
import { ProfileImage } from '@mp/app/shared/feature';

 
@Injectable({
  providedIn: 'root',
})
export class ProfileImageService {
  private _profileImage: ProfileImage = new ProfileImage();

  set imageUrl(value: string) {
    this._profileImage.profileImageUrl = value;
  }

  get imageUrl(): string {
    return this._profileImage.profileImageUrl;
  }

  get profileImage(): ProfileImage {
    return this._profileImage;
  }
}
