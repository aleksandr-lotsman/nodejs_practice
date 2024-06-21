export interface UserEntity {
  id: string; // uuid
}

export interface Users {
  [id: string]: UserEntity
}
export const user: UserEntity = {
  id: '1fe36d16-49bc-4aab-a227-f84df899a6cb'
}