import { RequestType } from './request-type.enum';
import { SocketRequest } from './socket-request.model';

/**
 * Generic request class. All requests extend from this abstract class.
 *
 * @abstract
 */
export abstract class Request<T> {
  /**
   * The type of request being sent.
   *
   * @memberof Request
   */
  public readonly command: RequestType;

  /**
   * The unique identifier for the request.
   *
   * @memberof Request
   */
  private _requestId: number;

  /**
   * The payload data to be sent with the request.
   *
   * @memberof Request
   */
  private _payload: T;

  /**
   * The unique identifier for the request.
   *
   * @memberof Request
   */
  public get requestId(): number {
    return this._requestId;
  }

  /**
   * The payload data to be sent with the request.
   *
   * @memberof Request
   */
  public get payload(): T {
    return this._payload;
  }

  /**
   * Creates an instance of Request.
   * @param id - The unique identifier for the request.
   * @param data - The payload data to be sent with the request.
   * @memberof Request
   */
  constructor(
    protected readonly id: number,
    protected readonly data: T
  ) {
    this._requestId = id;
    this._payload = data;
  }

  /**
   * Boxes the message into a socket request object.
   *
   * @memberof Request
   */
  public toSocketMessage(): SocketRequest {
    return {
      command: this.command,
      request_id: this.requestId,
      payload: this.payload
    };
  }

  /**
   * Converts the socket request object to JSON string.
   *
   * @memberof Request
   */
  public toString(): string {
    return JSON.stringify(this.toSocketMessage());
  }
}
