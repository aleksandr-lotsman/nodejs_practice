import {User} from "./users";
import {Links} from "./responseLinks";
import {Hobbies} from "./hobbies";

export type ResponseData = {
    user?: User,
    hobbies?: Hobbies,
    success?: boolean
    links: Links
}