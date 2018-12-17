import { Request } from './request.model';
import { RequestType } from './request-type.enum';

/**
 * Request to authenticate with the Battle.net Classic server.
 *
 */
export class AuthenticateRequest extends Request<{ api_key: string }> {
  public readonly command = RequestType.Authenticate;

  /**
   * Creates an instance of AuthenticateRequest.
   * @param id - Unique identifier for this command.
   * @param api_key - API Key to authenticate with.
   * @memberof AuthenticateRequest
   */
  constructor(
    protected readonly id: number,
    protected readonly api_key: string
  ) {
    super(id, { api_key });
  }
}
