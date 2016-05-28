// app/services/auth/auth.ts

import {Storage, LocalStorage} from "ionic-angular";
import {AuthHttp, JwtHelper, tokenNotExpired} from "angular2-jwt";
import {Injectable, NgZone} from "@angular/core";
import {IThreadService} from "./chats/thread.service";
import {User} from "../models/models";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

// Avoid name not found warnings
declare var Auth0Lock:any;

@Injectable()
export class AuthService {

  public user:Object;
  private jwtHelper:JwtHelper = new JwtHelper();
  private lock = new Auth0Lock('StjMTE6NRzI9qmUPT2ij4LvEzmlja8OY', 'xinbenlv.auth0.com');
  private local:Storage = new Storage(LocalStorage);
  private refreshSubscription:any;
  private zoneImpl:NgZone;
  private userSubject:Subject<User>;

  constructor(private authHttp:AuthHttp, zone:NgZone,
              private threadService:IThreadService) {
    this.zoneImpl = zone;
    this.userSubject = new Subject<User>();
    // If there is a profile saved in local storage
    this.local.get('profile').then(profile => {
      this.user = JSON.parse(profile);
      this.userSubject.next(AuthService.createHsyUser(this.user));
    }).catch(error => {
      console.log(error);
    });
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    return tokenNotExpired();
  }

  public login() {
    // Show the Auth0 Lock widget
    this.lock.show({
      authParams: {
        scope: 'openid offline_access',
        device: 'Mobile device'
      }
    }, (err, profile, token, accessToken, state, refreshToken) => {
      if (err) {
        alert(err); // TODO(xinbenlv): handle error
      } else {
        // If authentication is successful, save the items
        // in local storage
        this.local.set('profile', JSON.stringify(profile));
        this.local.set('id_token', token);
        this.local.set('refresh_token', refreshToken);
        this.zoneImpl.run(() => this.user = profile);
        this.userSubject.next(AuthService.createHsyUser(this.user));
      }
    });
  }

  public logout() {
    this.local.remove('profile');
    this.local.remove('id_token');
    this.local.remove('refresh_token');
    this.zoneImpl.run(() => this.user = null);
  }

  /**
   * Expose as an observable.
   * @returns {Subject<User>}
   */
  public userObservable():Observable<User> {
    return this.userSubject;
  }

  private static createHsyUser(user:Object):User {
    return new User(
        btoa(user['email'])/* using BASE64 email as unique userId*/, user['name'], user['picture']);
  }
}