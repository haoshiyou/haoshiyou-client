import {User, Thread, Message} from "../models/models";
import * as moment from "moment";
// the person using the app us Juliet
let THREAD_LADYCAP_JULIET:Thread = new Thread('tmp-thread-USER_JULIET-capulet', ['tmp-juliet', 'tmp-capulet'], new Date(), "");
let THREAD_XINBENLV_ZZN:Thread = new Thread('tmp-thread-xinbenlv-zzn',
    [
      'eGluYmVubHZAZ21haWwuY29t'/*xinbenlv@gmail.com*/,
      'enpuK2xpbmtlZGluQHp6bi5pbQ=='/*zzn+linkedin@zzn.im*/
    ], new Date(), "");
export let FAKE_MESSAGES:Message[] = [
  new Message('tmp-message1', 'Hi How are you?',
      moment().subtract(45, 'minutes').toDate(),
      'tmp-juliet',
      'tmp-thread-USER_JULIET-capulet'
  ),

  new Message('tmp-message2', 'Fine thank you!.',
      moment().subtract(46, 'minutes').toDate(),
      'tmp-capulet',
      'tmp-thread-USER_JULIET-capulet'
  ),
];

export let FAKE_USERS:User[] = [];

export let FAKE_THREADS:Thread[] = [THREAD_LADYCAP_JULIET, THREAD_XINBENLV_ZZN];
