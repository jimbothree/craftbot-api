import { Request } from './request.model';
import { RequestType } from './request-type.enum';

/**
 * Request to disconnect from the Battle.net Classic server.
 *
 */
export class DisconnectRequest extends Request<{ }> {
  public readonly command = RequestType.Disconnect;

  /**
   * Creates an instance of DisconnectRequest.
   * @param id - Unique identifier for this command.
   * @memberof DisconnectRequest
   */
  constructor(
    protected readonly id: number
  ) {
    super(id, { });
  }
}
