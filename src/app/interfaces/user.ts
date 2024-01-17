export interface User {
    user: UserClass;
}

export interface UserClass {
    _id:       string;
    deletedAt: boolean;
    createdAt: Date;
    updatedAt: Date;
    FullName:  string;
    Age:       number;
    Email:     string;
    __v:       number;
    token:     string;
}