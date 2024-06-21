import mongoose, {Schema} from "mongoose";

export interface UserEntity {
  id: string; // uuid
}

export const UserSchema: Schema = new Schema<UserEntity>({
  id: Schema.Types.UUID
})

export default mongoose.model<UserEntity>('User', UserSchema);