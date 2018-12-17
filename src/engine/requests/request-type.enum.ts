/**
 * Contains all possible requests that can be sent to the Battle.net Classic server.
 *
 * @enum {string}
 */
export enum RequestType {
  Authenticate = 'Botapiauth.AuthenticateRequest',
  Connect = 'Botapichat.ConnectRequest',
  Disconnect = 'Botapichat.DisconnectRequest',
  Message = 'Botapichat.SendMessageRequest',
  Whisper = 'Botapichat.SendWhisperRequest',
  Ban = 'Botapichat.BanUserRequest',
  Unban = 'Botapichat.UnbanUserRequest',
  Emote = 'Botapichat.SendEmoteRequest',
  Kick = 'Botapichat.KickUserRequest',
  SetMod = 'Botapichat.SendSetModeratorRequest'
}
