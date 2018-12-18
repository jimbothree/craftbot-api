import { WhisperMessage } from './whisper-message.model';
import { ChannelMessage } from './channel-message.model';
import { EmoteMessage } from './emote-message.model';
import { ServerErrorMessage } from './server-error-message.model';
import { ServerInfoMessage } from './server-info-message.model';

export type Message =
  WhisperMessage |
  ChannelMessage |
  EmoteMessage |
  ServerErrorMessage |
  ServerInfoMessage;
