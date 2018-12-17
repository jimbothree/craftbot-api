import { MessageType } from './message-type.enum';

/**
 * Fired when a message is received from the Battle.net Classic server.
 *
 */
export interface MessageEventPayload {
  /**
   * The associated ID of the user that sent the message.
   *
   * @memberof MessageEventPayload
   */
  user_id: number;

  /**
   * The message sent.
   *
   * @memberof MessageEventPayload
   */
  message: string;

  /**
   * The type of message received.
   *
   * @memberof MessageEventPayload
   */
  type: MessageType;
}
