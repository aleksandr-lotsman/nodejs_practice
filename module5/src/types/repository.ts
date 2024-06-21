export type Repository<T> = {
    save: (item: T) => void;
    update: (item: T) => void;
    findById: (id: string) => T;
    delete: (id: string) => void;
}