import * as userRepo from "../dao/user.repository"
import {UserEntity} from "../schemas/user.entity";
export const findByID = async (userId: string): Promise<UserEntity> => {
    return await userRepo.findById(userId);
}