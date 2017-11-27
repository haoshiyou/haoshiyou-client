export interface User {
  id:string;
  name:string;
  avatarSrc:string;
  regIds:string[];
}

export interface Thread {
  id:string;
  userIds:string[];
  lastMessageSentAt:Date; //If not exist, use now
  lastMessageText:string;
  lastCheckTime:{
    [userId:string]:number // in UTC Milliseconds
  };
}

export interface Message {
  id:string;
  text:string;
  sentAt:number;
  authorId:string;
  threadId:string;
}
