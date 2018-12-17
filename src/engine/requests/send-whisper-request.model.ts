import { Request } from './request.model';
import { RequestType } from './request-type.enum';

/**
 * Requests to send a whisper to a user.
 *
 */
export class SendWhisperRequest extends Request<{ user_id: string, message: string }> {
  public readonly command = RequestType.Whisper;

  /**
   * Creates an instance of SendWhisperRequest.
   * @param id - The unique identifier for the message.
   * @param user_id - The identifier of the user to send the whisper to.
   * @param message - The whisper contents.
   * @memberof SendWhisperRequest
   */
  constructor(
    protected readonly id: number,
    protected readonly user_id: string,
    protected readonly message: string
  ) {
    super(id, { user_id, message });
  }
}
