import {Repository} from "../types/repository";
import {User} from "../types/users";
import * as uuid from 'uuid';

type UserRepository = Repository<User> & {
    getHobbies: (id: string) => string[];
    getUsers: () => User[];
    updateHobbies: (user: User, hobbies: string[]) => void;
}

export class UserRepositoryImpl implements UserRepository {
    private users: User[] = [];
    save(user: User): User {
        const newUser = {...user, id: uuid.v4()};
        this.users.push(newUser);
        return newUser;
    }
    update(user: User): void {
        const currentUser = this.findById(user.id);
        const userIndex = this.users.indexOf(currentUser);
        this.users[userIndex] = user;
    }
    findById(id: string): User {
        return this.users.find(user => user.id === id);
    }
    delete(id: string): void {
        this.users = this.users.filter(user => user.id === id);
    }
    getHobbies(id: string): string[] {
        const user = this.findById(id);
        return user.hobbies;
    };
    getUsers(): User[] {
        return this.users;
    };
    updateHobbies(user: User, hobbies: string[]): void {
        const currentUser = this.findById(user.id);
        currentUser.hobbies = [...new Set(...currentUser.hobbies, ...hobbies)];
        this.update(currentUser);
    };
}
