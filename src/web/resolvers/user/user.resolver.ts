import { Resolver } from '@nestjs/graphql';
import { UserService } from 'src/engine/services/user.service';
import { Query } from '@nestjs/common';

@Resolver('User')
export class UserResolver {

  constructor(
    private readonly userSvc: UserService
  ) { }

}
