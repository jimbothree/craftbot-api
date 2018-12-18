/**
 * Possible message types that can be received from the Battle.net Classic server.
 *
 * @enum {string}
 */
export enum MessageType {
  Whisper = 'WHISPER',
  Channel = 'CHANNEL',
  ServerInfo = 'SERVERINFO',
  ServerError = 'SERVERERROR',
  Emote = 'EMOTE'
}
