import { RequestType } from './request-type.enum';

/**
 * Defines the structure for requests being sent to the Battle.net Classic server.
 *
 */
export interface SocketRequest {
  /**
   * The type of request being sent.
   *
   * @memberof SocketRequest
   */
  command: RequestType;

  /**
   * The unique identifier of the request.
   *
   * @memberof SocketRequest
   */
  request_id: number;

  /**
   * The payload of the request.
   *
   * @memberof SocketRequest
   */
  payload: any;
}
