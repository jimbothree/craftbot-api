import { Request } from './request.model';
import { RequestType } from './request-type.enum';

/**
 * Request to kick a user.
 *
 */
export class KickUserRequest extends Request<{ user_id: string }> {
  public readonly command = RequestType.Kick;

  /**
   * Creates an instance of KickUserRequest.
   * @param {number} id - Unique identifier for this command.
   * @param {string} user_id - ID of the user to kick.
   * @memberof KickUserRequest
   */
  constructor(
    protected readonly id: number,
    protected readonly user_id: string
  ) {
    super(id, { user_id });
  }
}
