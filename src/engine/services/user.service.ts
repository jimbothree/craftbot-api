import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { ReplaySubject } from 'rxjs';
import { EngineService } from './engine.service';
import { UserUpdateEventPayload } from '../events/user-update-event-payload.model';
import { UserLeaveEventPayload } from '../events/user-leave-event-payload.model';

@Injectable()
export class UserService {
  private _users: User[] = [];
  private _usersSubject = new ReplaySubject<User[]>(1);
  public users$ = this._usersSubject.asObservable();

  constructor(
    private readonly engine: EngineService
  ) {
    this.engine.userUpdate$.subscribe(user => this.onUserUpdated(user));
    this.engine.userLeave$.subscribe(user => this.onUserLeft(user));
  }

  private triggerUsersChanged(): void {
    this._usersSubject.next(this._users);
  }

  private onUserUpdated(user: UserUpdateEventPayload): void {
    if (typeof this._users[user.user_id] === 'undefined' || this._users[user.user_id] === null) {
      // user doesn't already exist
      const newUser = new User(user.toon_name, user.user_id);
      newUser.updateFromPayload(user);

      this._users[user.user_id] = newUser;
    } else {
      this._users[user.user_id].updateFromPayload(user);
    }

    this.triggerUsersChanged();
  }

  private onUserLeft(user: UserLeaveEventPayload): void {
    if (typeof this._users[user.user_id] !== 'undefined' && this._users[user.user_id] !== null) {
      this._users[user.user_id] = null;
      this.triggerUsersChanged();
    }
  }
}
