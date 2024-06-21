import {User} from "../schemas/user.entity";
import {DI} from "../server";
export const findByID = async (userId: string): Promise<User> => {
    return await DI.users.findOne({id: userId});
}