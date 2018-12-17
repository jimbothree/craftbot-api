import { Request } from './request.model';
import { RequestType } from './request-type.enum';

/**
 * Request to connect to the channel associated with the API Key.
 *
 */
export class ConnectRequest extends Request<{ }> {
  public readonly command = RequestType.Connect;

  /**
   * Creates an instance of ConnectRequest.
   * @param id - Unique identifier for this command.
   * @memberof ConnectRequest
   */
  constructor(
    protected readonly id: number
  ) {
    super(id, { });
  }
}
