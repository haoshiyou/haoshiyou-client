import {Injectable} from "@angular/core";
import {Thread} from "../../models/models";
import {Observable} from "rxjs";
import {AngularFire} from "angularfire2/angularfire2";

@Injectable()
export class IThreadService {

  obserbableThreadsByUserId(userId:string):Observable<Thread[]> {
    throw "Not implemented";
  }

  createThread(thread:Thread):Promise<void> {
    throw "Not implemented";
  }
}

@Injectable()
export class FirebaseThreadService implements IThreadService {

  constructor(private af:AngularFire) {

  }

  obserbableThreadsByUserId(userId:string):Observable<Thread[]> {
    return this.af.database.list("/threads").map((threads:Thread[]) => {
      return threads.filter((thread:Thread) => {
        return thread.userIds.indexOf(userId) >= 0;
      });
    }).map((threads:Thread[]) => {
      return threads;
    });
  }

  createThread(thread:Thread):Promise<void> {
    if (thread.id) {
      if (thread["$key"]) delete thread["$key"];
      return this.af.database.object("/threads/" + thread.id).update(thread) as Promise<void>;
    } else {
      // TODO(xinbenlv): handle when message.id is not set
      // currently do nothing

      // The following line is uncommented due to compile error.
      // return this.af.database.list("/threads").push(thread) as Promise<void>;
    }

  }
}
