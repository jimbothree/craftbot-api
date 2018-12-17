/**
 * Possible message types that can be received from the Battle.net Classic server.
 *
 * @enum {string}
 */
export enum MessageType {
  Whisper = 'whisper',
  Channel = 'channel',
  ServerInfo = 'serverInfo',
  ServerError = 'serverError',
  Emote = 'emote'
}
