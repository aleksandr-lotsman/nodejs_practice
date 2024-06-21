import {Entity, PrimaryKey} from "@mikro-orm/core";
import * as uuid from 'uuid';


@Entity()
export class User {

  @PrimaryKey()
  id = uuid.v4(); // uuid
}

// export class Users {
//   [id: string]: User
// }
//
// export const user: User = {
//   id: '1fe36d16-49bc-4aab-a227-f84df899a6cb'
// }