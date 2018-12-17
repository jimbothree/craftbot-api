/**
 * Fired when a user leaves the current channel.
 *
 */
export interface UserLeaveEventPayload {
  /**
   * The associated ID of the user that left the channel.
   *
   * @memberof UserLeaveEventPayload
   */
  user_id: number;
}
