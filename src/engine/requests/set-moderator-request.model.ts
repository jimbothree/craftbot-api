import { Request } from './request.model';
import { RequestType } from './request-type.enum';

/**
 * Requests to give a user moderator permissions.
 *
 */
export class SetModeratorRequest extends Request<{ user_id: string }> {
  public readonly command = RequestType.SetMod;

  /**
   * Creates an instance of SetModeratorRequest.
   * @param {number} id - The unique identifier associated with the request.
   * @param {string} user_id - The ID of the user to give moderator permissions.
   * @memberof SetModeratorRequest
   */
  constructor(
    protected readonly id: number,
    protected readonly user_id: string
  ) {
    super(id, { user_id });
  }
}
