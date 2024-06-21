import User, {UserEntity} from "../schemas/user.entity";

export const findById = async (userId: string): Promise<UserEntity> => {
    return User.findOne({id: userId});
}