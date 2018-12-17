export enum ResponseType {
  Authenticate = 'Botapiauth.AuthenticateResponse',
  Connect = 'Botapichat.ConnectResponse',
  Disconnect = 'Botapichat.DisconnectResponse',
  Message = 'Botapichat.SendMessageResponse',
  Whisper = 'Botapichat.SendWhisperResponse',
  Ban = 'Botapichat.BanUserResponse',
  Unban = 'Botapichat.UnbanUserResponse',
  Emote = 'Botapichat.SendEmoteResponse',
  Kick = 'Botapichat.KickUserResponse',
  SetMod = 'Botapichat.SendSetModeratorResponse'
}
