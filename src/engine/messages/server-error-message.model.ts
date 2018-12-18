import { MessageType } from '../events/message-type.enum';
import { BaseMessage } from './base-message.model';

export class ServerErrorMessage extends BaseMessage {
  public readonly type = MessageType.ServerError;

  constructor(
    protected readonly _message: string
  ) {
    super(_message);
  }
}
