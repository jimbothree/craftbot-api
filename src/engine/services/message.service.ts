import { Injectable } from '@nestjs/common';
import { EngineService } from './engine.service';
import { MessageEventPayload } from '../events/message-event-payload.model';
import { MessageType } from '../events/message-type.enum';
import { UserService } from './user.service';
import { Subject, ReplaySubject } from 'rxjs';
import { WhisperMessage } from '../messages/whisper-message.model';
import { ServerErrorMessage } from '../messages/server-error-message.model';
import { ServerInfoMessage } from '../messages/server-info-message.model';
import { EmoteMessage } from '../messages/emote-message.model';
import { ChannelMessage } from '../messages/channel-message.model';
import { Message } from '../messages/message.type';
import { User } from '../models/user.model';
import { withLatestFrom, map } from 'rxjs/operators';

@Injectable()
export class MessageService {
  private whisperSubject = new Subject<WhisperMessage>();
  public whisper$ = this.whisperSubject.asObservable();

  private serverErrorSubject = new Subject<ServerErrorMessage>();
  public serverError$ = this.serverErrorSubject.asObservable();

  private serverInfoSubject = new Subject<ServerInfoMessage>();
  public serverInfo$ = this.serverInfoSubject.asObservable();

  private emoteSubject = new Subject<EmoteMessage>();
  public emote$ = this.emoteSubject.asObservable();

  private channelSubject = new Subject<ChannelMessage>();
  public channel$ = this.channelSubject.asObservable();

  // TODO: make number configurable
  private messageHistorySubject = new ReplaySubject<Message>(100);
  public messageHistory$ = this.messageHistorySubject.asObservable();

  constructor(
    private readonly engine: EngineService,
    private readonly userSvc: UserService
  ) {
    this.engine.messageReceived$.pipe(
      withLatestFrom(this.userSvc.users$),
      map(([payload, users]) => ([payload, users.find(i => i.id === payload.user_id)] as [MessageEventPayload, User]))
    ).subscribe(([payload, user]) => this.onMessageReceived(payload, user));
  }

  private onMessageReceived(payload: MessageEventPayload, user: User) {
    let message: Message;
    switch (payload.type.toUpperCase() as MessageType) {
      case MessageType.Channel:
      {
        message = new ChannelMessage(payload.message, user);
        this.channelSubject.next(message);
      }
      break;

      case MessageType.Emote:
      {
        message = new EmoteMessage(payload.message, user);
        this.emoteSubject.next(message);
      }
      break;

      case MessageType.ServerError:
      {
        message = new ServerErrorMessage(payload.message);
        this.serverErrorSubject.next(message);
      }
      break;

      case MessageType.ServerInfo:
      {
        message = new ServerInfoMessage(payload.message);
        this.serverInfoSubject.next(message);
      }
      break;

      case MessageType.Whisper:
      {
        message = new WhisperMessage(payload.message, user);
        this.whisperSubject.next(message);
      }
      break;
    }

    if (typeof message !== 'undefined' && message !== null) {
      this.messageHistorySubject.next(message);
    }
  }

}
