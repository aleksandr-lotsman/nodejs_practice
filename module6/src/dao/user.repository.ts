import {user, UserEntity, Users} from "../schemas/user.entity";


const users: Users = {[user.id]: user};

export const findById = async (userId: string): Promise<UserEntity> => {
    return Object.values(users).find(user => user.id === userId);
}