import {UserEntity} from "../schemas/user.entity";
import * as userRepository from "../dao/user.repository";

export const findByID = async (userId: string): Promise<UserEntity> => {
    return await userRepository.findById(userId);
}