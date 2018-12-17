/**
 * Possible events that can be received from the Battle.net Classic Server
 *
 * @enum {string}
 */
export enum EventType {
  Connect = 'Botapichat.ConnectEventRequest',
  Disconnect = 'Botapichat.DisconnectEventRequest',
  Message = 'Botapichat.MessageEventRequest',
  UserUpdate = 'Botapichat.UserUpdateEventRequest',
  UserLeave = 'Botapichat.UserLeaveEventRequest'
}
