import { Injectable } from '@nestjs/common';
import { BNCLCoreService, UserUpdateEventPayload } from 'battle-net-classic-lib';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  private _users: User[] = [];

  public get users(): User[] {
    return this._users;
  }

  constructor(
    private readonly bncl: BNCLCoreService
  ) {
    this.bncl.userUpdate$.subscribe(user => this.onUserUpdated(user));
  }

  private onUserUpdated(user: UserUpdateEventPayload): void {
    const idx = this._users.findIndex(i => i.id === user.user_id);

    if (idx === -1) {
      // user doesn't already exist
      const newUser = new User(user.toon_name, user.user_id);
      newUser.updateFromPayload(user);

      this._users.push(newUser);
    } else {
      this._users[idx].updateFromPayload(user);
    }
  }
}
