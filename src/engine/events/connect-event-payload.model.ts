/**
 * Fired when the client successfully connects to the Battle.net Classic server.
 *
 */
export interface ConnectEventPayload {
  /**
   * The channel that the client initially joins.
   *
   * @memberof ConnectEventPayload
   */
  channel: string;
}
