import { EventType } from './event-type.enum';
import { ConnectEventPayload } from './connect-event-payload.model';
import { MessageEventPayload } from './message-event-payload.model';
import { UserLeaveEventPayload } from './user-leave-event-payload.model';
import { UserUpdateEventPayload } from './user-update-event-payload.model';
import { DisconnectEventPayload } from './disconnect-event-payload.model';

/**
 * Generic structure for all events that can be received from the Battle.net Classic server
 *
 */
export interface Event {
  /**
   * The event type received from the server.
   *
   * @memberof Event
   */
  command: EventType;

  /**
   * The request id associated if event was generated from a request.
   *
   * @memberof Event
   */
  request_id?: number;

  /**
   * Contains the associated payload for the event.
   *
   * @memberof Event
   */
  payload: ConnectEventPayload | DisconnectEventPayload | MessageEventPayload | UserLeaveEventPayload | UserUpdateEventPayload;
}
