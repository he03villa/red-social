export interface ResListAllPosts {
    post:      Post[];
    totalPage: number;
    page:      number;
}

export interface Post {
    _id:       string;
    Likes:     number;
    deletedAt: boolean;
    createdAt: Date;
    updatedAt: Date;
    Title:     string;
    Content:   string;
    userId:    string;
    user:      User;
    __v:       number;
    update:    boolean
}

export interface User {
    _id:      string;
    FullName: string;
    Email:    string;
}
