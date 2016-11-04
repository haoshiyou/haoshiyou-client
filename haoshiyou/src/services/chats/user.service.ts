import {Injectable, Inject} from "@angular/core";
import {User} from "../../models/models";
import {Observable} from "rxjs";
import {AngularFire} from "angularfire2/angularfire2";
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

  createOrUpdateUser(user:User):Promise<void> {
    throw "Not implemented";
  }

  observableMeId():Observable<string> {
    throw "Not implemented";
  }


  addRegistrationId(regId:string):Promise<void> {
    throw "Not implemented";
  }
}

@Injectable()
export class FirebaseUserService implements IUserService { // use "class" IUserService as "interface"
  private meId:string = null; // explicitly default to null
  private meIdSubject:Subject<string> = new Subject<string>();
  constructor(private af:AngularFire) {
  }

  setMeId(id:string):void {
    this.meId = id;
    this.meIdSubject.next(id);
  }

  promiseMe():Promise<User> {
    if (this.meId) {
      return this.observableUserById(this.meId).take(1).toPromise();
    } else {
      return Promise.resolve(<User>null);
    }
  }

  observableUserById(id:string):Observable<User> {
    return this.af.database.object("/users/" + id);
  }

  createOrUpdateUser(user:User):Promise<void> {
    // TODO(xinbenlv): handle when user.id does not exist;
    if (user && user.id) {
      return this.af.database.object("/users/" + user.id).update(user) as Promise<void>;
    } else {
      return;
    }
  }

  observableMeId():Observable<string> {
    return this.meIdSubject;
  }

  addRegistrationId(regId:string):Promise<void> {
    return this.promiseMe().then((me:User)=> {
      if (me) {
        if (!me.regIds) me.regIds = [];
        me.regIds.push(regId);
        return me;
      } else {
        return null;
      }
    }).then((me:User) => {
      if (me) {
        return this.createOrUpdateUser(me);
      } else
        return null;
    });
  }
}
