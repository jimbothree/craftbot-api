import { Request } from './request.model';
import { RequestType } from './request-type.enum';

/**
 * Requests a regular message to be sent.
 *
 */
export class SendMessageRequest extends Request<{ message: string }> {
  public readonly command = RequestType.Message;

  /**
   * Creates an instance of SendMessageRequest.
   * @param id - The unique identifier of the message.
   * @param message - The message.
   * @memberof SendMessageRequest
   */
  constructor(
    protected readonly id: number,
    protected readonly message: string
  ) {
    super(id, { message });
  }
}
