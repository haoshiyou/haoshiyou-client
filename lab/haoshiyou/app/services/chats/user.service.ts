import {Injectable, Inject} from "@angular/core";
import {User} from "../../models/models";
import {Observable} from "rxjs";
import {AngularFire} from "angularfire2/angularfire2";
import {Logger} from "log4javascript";
import {loggerToken} from "../log.service";
import {Subject} from "rxjs/Subject";

@Injectable()
export class IUserService { // use as interface, angular2 does not support injecting interface yet.
  promiseMe():Promise<User> {
    throw "Not implemented";
  }

  setMeId(idstring):void {
    throw "Not implemented";
  }

  observableUserById(id:string):Observable<User> {
    throw "Not implemented";
  }

  createUser(user:User):Promise<void> {
    throw "Not implemented";
  }

  observableMeId():Observable<string> {
    throw "Not implemented";
  }
}

@Injectable()
export class FirebaseUserService implements IUserService { // use "class" IUserService as "interface"
  private meId:string = null; // explicitly default to null
  private meIdSubject:Subject<string> = new Subject<string>();
  constructor(private af:AngularFire, @Inject(loggerToken) private logger:Logger) {
    this.logger.debug("Initialized FirebaseUserService.");
  }

  setMeId(id:string):void {
    this.meId = id;
    this.meIdSubject.next(id);
  }

  promiseMe():Promise<User> {
    if (this.meId) {
      this.logger.info(`Promise me returns a meId = ${this.meId}`);
      return this.observableUserById(this.meId).take(1).toPromise();
    } else {
      return Promise.resolve(<User>null);
    }
  }

  observableUserById(id:string):Observable<User> {
    return this.af.database.object("/users/" + id);
  }

  createUser(user:User):Promise<void> {
    // TODO(xinbenlv): handle when user.id does not exist;
    if (user && user.id) {
      return this.af.database.object("/users/" + user.id).update(user);
    } else {
      this.logger.error("user or user.id does not exit");
    }
  }

  observableMeId():Observable<string> {
    return this.meIdSubject;
  }
}