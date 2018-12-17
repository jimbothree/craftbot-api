import { FlagType } from './flag-type.enum';
import { AttributeType } from './attribute-type.enum';

/**
 * Fired when a user is updated for any reason.
 *
 */
export interface UserUpdateEventPayload {
  /**
   * The associated ID of the user being updated.
   *
   * @memberof UserUpdateEventPayload
   */
  user_id: number;

  /**
   * The username of the user being updated.
   *
   * @memberof UserUpdateEventPayload
   */
  toon_name: string;

  /**
   * Contains an array of the flags associated with the user.
   *
   * @memberof UserUpdateEventPayload
   * @todo API Spec says this should be flags, but it's actually flag
   */
  flag: FlagType[];

  /**
   * An object of all the attributes associated with the user.
   *
   * @memberof UserUpdateEventPayload
   * @todo What actually comes across in the API doesn't match the spec at all...
   */
  attribute: [ { key: AttributeType, value: string }];
}
