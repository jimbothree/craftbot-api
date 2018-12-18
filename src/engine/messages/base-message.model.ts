import { MessageType } from '../events/message-type.enum';

export abstract class BaseMessage {
  public readonly type: MessageType;
  public readonly dateTime = new Date();

  public get message(): string {
    return this._message;
  }

  constructor(
    protected readonly _message: string
  ) { }
}
