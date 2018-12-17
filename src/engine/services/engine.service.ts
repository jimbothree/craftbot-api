import { Injectable } from '@nestjs/common';
import { webSocket, WebSocketSubjectConfig, WebSocketSubject } from 'rxjs/webSocket';
import { Response } from '../responses/response.model';
import { Event as SocketEvent } from '../events/event.model';
import { Request } from '../requests/request.model';
import { SocketRequest } from '../requests/socket-request.model';
import { ConfigProvider } from '../../config/config.service';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { AuthenticateRequest } from '../requests/authenticate-request.model';
import { RequestType } from '../requests/request-type.enum';
import { ResponseType } from '../responses/response-type.enum';
import { EventType } from '../events/event-type.enum';
import { MessageEventPayload } from '../events/message-event-payload.model';
import { UserUpdateEventPayload } from '../events/user-update-event-payload.model';
import { UserLeaveEventPayload } from '../events/user-leave-event-payload.model';
import { ConnectRequest } from '../requests/connect-request.model';
import { ConnectEventPayload } from '../events/connect-event-payload.model';
import { DisconnectEventPayload } from '../events/disconnect-event-payload.model';
import { SendWhisperRequest } from '../requests/send-whisper-request.model';
import { map } from 'rxjs/operators';
import { SendMessageRequest } from '../requests/send-message-request.model';
import { DisconnectRequest } from '../requests/disconnect-request.model';

@Injectable()
export class EngineService {
  private apiKey: string;

  private readonly socketConfig: WebSocketSubjectConfig<Response | SocketEvent | SocketRequest> = {
    url: 'wss://connect-bot.classic.blizzard.com/v1/rpc/chat',
    closeObserver: { next: (event) => this.onSocketClosed(event) },
    openObserver: { next: (event) => this.onSocketOpened(event) }
  };

  private socket: WebSocketSubject<Response | SocketEvent | SocketRequest>;

  private _requestId = 0;
  private get nextRequestId(): number {
    return this._requestId++;
  }

  private pending: Subject<void>[] = [];

  private currentChannelSubject = new BehaviorSubject('');
  public currentChannel$ = this.currentChannelSubject.asObservable();

  private messageReceivedSubject = new Subject<MessageEventPayload>();
  public messageReceived$ = this.messageReceivedSubject.asObservable();

  private userUpdateSubject = new Subject<UserUpdateEventPayload>();
  public userUpdate$ = this.userUpdateSubject.asObservable();

  private userLeaveSubject = new Subject<UserLeaveEventPayload>();
  public userLeave$ = this.userLeaveSubject.asObservable();

  private connectedSubject = new BehaviorSubject(false);
  public connected$ = this.connectedSubject.asObservable();

  public connect(apiKey: string) {
    this.apiKey = apiKey;

    this.socket = webSocket(this.socketConfig);
    this.socket.subscribe(
      (message) => this.onMessageReceived(message),
      (err) => this.onSocketError(err),
      () => this.onSocketCompleted()
    );
  }

  public disconnect() {
    const resp = new Subject<void>();
    resp.subscribe(() => this.socket.complete());

    this.send(new DisconnectRequest(this.nextRequestId), resp);
  }

  public sendMessage(message: string): Observable<boolean> {
    const resp = new Subject<void>();

    this.send(new SendMessageRequest(this.nextRequestId, message), resp);

    return resp.asObservable().pipe(map(() => true));
  }

  public sendWhisper(userId: string, message: string): Observable<boolean> {
    const resp = new Subject<void>();

    this.send(new SendWhisperRequest(this.nextRequestId, userId, message), resp);

    return resp.asObservable().pipe(map(() => true));
  }

  private send<T>(message: Request<T>, response: Subject<void>): void {
    // Add the request to the list of pending requests
    this.pending[message.requestId] = response;
    this.socket.next(message.toSocketMessage());
  }

  private onAuthenticated(): void {
    this.send(new ConnectRequest(this.nextRequestId), new Subject());
  }

  private onSocketOpened(event: Event): void {
    // whenever the socket connects, we need to authenticate
    const resp = new Subject<void>();
    resp.subscribe(() => this.onAuthenticated());

    this.send(new AuthenticateRequest(this.nextRequestId, this.apiKey), resp);
  }

  private onSocketClosed(event: CloseEvent): void {
    console.log('Socket closed');
  }

  private onSocketError(err: any): void {
    console.log('Socket error -> %o', err);
  }

  private onSocketCompleted(): void {
    console.log('Socket completed');
  }

  private onMessageReceived(message: Response | SocketEvent | SocketRequest): void {
    // Update our internal request id counter if an unsolicited request id is received
    if (typeof message.request_id === 'number' && message.request_id > this._requestId) {
      this._requestId = message.request_id;
    }

    if (this.isSocketRequest(message)) {
      console.log('Ignoring request message -> %o', message);

      return;
    } else if (this.isSocketResponse(message)) {
      console.log('Received response message -> %o', message);

      this.pending[message.request_id].next();
      this.pending[message.request_id].complete();

      return;
    } else if (this.isSocketEvent(message)) {
      console.log('Received event message -> %o', message);
      this.onEventMessageReceived(message);

      return;
    }

    console.log('Unknown message -> %o', message);
  }

  private onEventMessageReceived(message: SocketEvent): void {
    switch (message.command.toLowerCase()) {
      case EventType.Connect.toLowerCase():
      {
        const payload = message.payload as ConnectEventPayload;
        this.currentChannelSubject.next(payload.channel);
      }
      break;

      case EventType.Disconnect.toLowerCase():
      {
        const payload = message.payload as DisconnectEventPayload;

      }
      break;

      case EventType.Message.toLowerCase():
      {
        const payload = message.payload as MessageEventPayload;
        this.messageReceivedSubject.next(payload);

      }
      break;

      case EventType.UserLeave.toLowerCase():
      {
        const payload = message.payload as UserLeaveEventPayload;
        this.userLeaveSubject.next(payload);

      }
      break;

      case EventType.UserUpdate.toLowerCase():
      {
        const payload = message.payload as UserUpdateEventPayload;
        this.userUpdateSubject.next(payload);

      }
      break;

      default: console.error(`Well, this is awkward. I'm not sure how you hit this -- %o`, message);
    }
  }

  private isSocketRequest(message: Response | SocketEvent | SocketRequest): message is SocketRequest {
    return Object.keys(RequestType).map<string>(key => RequestType[key].toLowerCase()).includes(message.command.toLowerCase());
  }

  private isSocketResponse(message: Response | SocketEvent | SocketRequest): message is Response {
    return Object.keys(ResponseType).map<string>(key => ResponseType[key].toLowerCase()).includes(message.command.toLowerCase());
  }

  private isSocketEvent(message: Response | SocketEvent | SocketRequest): message is SocketEvent {
    return Object.keys(EventType).map<string>(key => EventType[key].toLowerCase()).includes(message.command.toLowerCase());
  }
}
