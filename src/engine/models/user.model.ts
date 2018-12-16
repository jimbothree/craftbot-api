import { FlagType, AttributeType, UserUpdateEventPayload } from 'battle-net-classic-lib';

export class User {
  private _flags: FlagType[] = [];
  private _attributes: {[key in AttributeType]?: string} = { };

  public get name(): string {
    return this._name;
  }

  public get id(): number {
    return this._id;
  }

  public get flags(): FlagType[] {
    return this._flags;
  }

  constructor(
    private readonly _name: string,
    private readonly _id: number
  ) { }

  public updateFromPayload(payload: UserUpdateEventPayload): void {
    // first make sure we can run
    if (this.id !== payload.user_id) {
      throw new Error(`Attempting to update users with IDs that don't match!`);
    }

    if (typeof payload.attribute !== 'undefined' && payload.attribute !== null && payload.attribute !== []) {
      this._attributes = { };
      payload.attribute.forEach(obj => this.setAttribute(obj.key, obj.value));
    }

    if (typeof payload.flag !== 'undefined' && payload.flag !== null && payload.flag !== []) {
      this._flags = payload.flag;
    }
  }

  private setAttribute(attribute: AttributeType, value: string): void {
    this._attributes[attribute] = value;
  }
}
