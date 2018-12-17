import { Request } from './request.model';
import { RequestType } from './request-type.enum';

/**
 * Request to ban a user.
 *
 */
export class BanUserRequest extends Request<{ user_id: string }> {
  public readonly command = RequestType.Ban;

  /**
   * Creates an instance of BanUserRequest.
   * @param {number} id - Unique identifier for this command.
   * @param {string} user_id - ID of the user to ban.
   * @memberof BanUserRequest
   */
  constructor(
    protected readonly id: number,
    protected readonly user_id: string
  ) {
    super(id, { user_id });
  }
}
