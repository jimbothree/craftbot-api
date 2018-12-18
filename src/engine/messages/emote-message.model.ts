import { User } from '../models/user.model';
import { MessageType } from '../events/message-type.enum';
import { BaseMessage } from './base-message.model';

export class EmoteMessage extends BaseMessage {
  public readonly type = MessageType.Emote;

  public get user(): User {
    return this._user;
  }

  constructor(
    protected readonly _message: string,
    private readonly _user: User
  ) {
    super(_message);
  }
}
