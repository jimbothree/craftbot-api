import { ResponseType } from './response-type.enum';
import { ResponseStatus } from './response-status.model';

export interface Response {
  command: ResponseType;
  request_id: number;
  status: ResponseStatus;
  // for now, response always has an empty object
  payload: { };
}
