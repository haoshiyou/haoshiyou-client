import {Injectable, bind} from "@angular/core";
import {Subject, BehaviorSubject} from "rxjs";
import {User} from "../../models/models";


/**
 * UserService manages our current user
 */
@Injectable()
export class UserService {
  // `currentUser` contains the current user
  currentUser:Subject<User> = new BehaviorSubject<User>(null);

  setCurrentUser(newUser:User):void {
    this.currentUser.next(newUser);
  }
}