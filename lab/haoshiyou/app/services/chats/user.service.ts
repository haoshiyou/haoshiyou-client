import {Injectable} from "@angular/core";
import {User} from "../../models/models";
import {Observable} from "rxjs";
import {AngularFire} from "angularfire2/angularfire2";
import {Subject} from "rxjs/Subject";
import {LogService} from "../log.service";

@Injectable()
export class IUserService { // use as interface, angular2 does not support injecting interface yet.
  getMe():User {
    throw "Not implemented";
  }

  observableUserById(id:string):Observable<User> {
    throw "Not implemented";
  }

  setMe(user:User):void {
    throw "Not implemented";
  }

  observableMe():Observable<User> {
    throw "Not implemented";
  }

  createUser(user:User):Promise<void> {
    throw "Not implemented";
  }
}

@Injectable()
export class FirebaseUserService implements IUserService { // use "class" IUserService as "interface"
  private me:User;
  private subjectMe:Subject<User> = new Subject<User>();
  private log:log4javascript.Logger;
  constructor(private af:AngularFire) {
    this.log = LogService.getDefaultLogger();
    this.log.debug("Initialized FirebaseUserService.");
  }

  getMe():User {
    return this.me;
  }

  observableUserById(id:string):Observable<User> {
    return this.af.database.object("/users/" + id);
  }

  setMe(me:User):void {
    this.me = me;
    this.subjectMe.next(me);
  }

  observableMe():Observable<User> {
    return this.subjectMe;
  }

  createUser(user:User):Promise<void> {
    // TODO(xinbenlv): handle when user.id does not exist;
    if (user && user.id) {
      return this.af.database.object("/users/" + user.id).update(user);
    } else {
      console.log("WARNING: user or user.id not exist! user=" + user);
    }
  }
}