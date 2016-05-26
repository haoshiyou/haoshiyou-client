import {Component, OnInit} from '@angular/core';
import {MessagesService, ThreadsService} from '../../services/services';
import {Message, Thread} from '../../models';
import * as _ from 'underscore';

@Component({
  selector: 'nav-bar',
  template: `
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
      </div>
      <p class="navbar-text navbar-right">
        <button class="btn btn-primary" type="button">
          Messages <span class="badge">{{unreadMessagesCount}}</span>
        </button>
      </p>
    </div>
  </nav>
  `
})
export class ChatNavBar implements OnInit {
  unreadMessagesCount: number;

  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService) {
  }

  ngOnInit(): void {
    this.messagesService.messages
        .combineLatest(
            this.threadsService.currentThread,
            (messages: Message[], currentThread: Thread) =>
                [currentThread, messages] )

        .subscribe(([currentThread, messages]: [Thread, Message[]]) => {
          this.unreadMessagesCount =
              _.reduce(
                  messages,
                  (sum: number, m: Message) => {
                    let messageIsInCurrentThread: boolean = m.thread &&
                        currentThread &&
                        (currentThread.id === m.thread.id);
                    if (m && !m.isRead && !messageIsInCurrentThread) {
                      sum = sum + 1;
                    }
                    return sum;
                  },
                  0);
        });
  }
}