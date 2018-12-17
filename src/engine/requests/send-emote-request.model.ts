import { Request } from './request.model';
import { RequestType } from './request-type.enum';

/**
 * Request to send a message as an emote.
 *
 */
export class SendEmoteRequest extends Request<{ message: string }> {
  public readonly command = RequestType.Emote;

  /**
   * Creates an instance of SendEmoteRequest.
   * @param {number} id - The unique identifier of the message.
   * @param {string} message - The message.
   * @memberof SendEmoteRequest
   */
  constructor(
    protected readonly id: number,
    protected readonly message: string
  ) {
    super(id, { message });
  }
}
