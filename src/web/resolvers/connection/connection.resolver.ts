import { Resolver, Mutation } from '@nestjs/graphql';
import { ConnectionService } from '../../../engine/services/connection.service';
import { Observable } from 'rxjs';

@Resolver('Connection')
export class ConnectionResolver {

  constructor(
    private readonly connection: ConnectionService
  ) { }

  @Mutation()
  connect(): Observable<boolean> {
    return this.connection.connect();
  }
}
