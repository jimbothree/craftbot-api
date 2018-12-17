import { Request } from './request.model';
import { RequestType } from './request-type.enum';

/**
 * Requests a user to be unbanned.
 *
 */
export class UnbanUserRequest extends Request<{ toon_name: string }> {
  public readonly command = RequestType.Unban;

  /**
   * Creates an instance of UnbanUserRequest.
   * @param {number} id - The unique identifier of the request.
   * @param {string} toon_name - The username of the user to unban.
   * @memberof UnbanUserRequest
   */
  constructor(
    protected readonly id: number,
    protected readonly toon_name: string
  ) {
    super(id, { toon_name });
  }
}
