import { MessageType } from '../events/message-type.enum';
import { BaseMessage } from './base-message.model';

export class ServerInfoMessage extends BaseMessage {
  public readonly type = MessageType.ServerInfo;

  constructor(
    protected readonly _message: string
  ) {
    super(_message);
  }
}
