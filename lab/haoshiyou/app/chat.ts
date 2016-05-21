import {UserId} from "./user";
export type ChatThreadId = string;
export class ChatThread {
  id: ChatThreadId;
  title: string;
  lastestMsg: string;
  participants: UserId[];
}

export type ChatItemId = string;

export class ChatItem {
  id: ChatItemId;
  threadId: ChatThreadId;
  senderId: UserId;
  textMsg: string;
  // TODO(xinbenlv): add support for rich message format.
}