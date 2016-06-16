export interface User {
  id:string;
  name:string;
  avatarSrc:string;
  regIds:string[];
}

export class Thread {
  constructor(public id:string,
              public userIds:string[],
              public lastMessageSentAt:Date, //If not exist, use now
              public lastMessageText:string) {
  }
}

export class Message {
  constructor(public id:string,
              public text:string,
              public sentAt:Date,
              public authorId:string,
              public threadId:string) {
  }
}