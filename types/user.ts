export interface ICredentials {
    username: string;
    password: string;
}

export interface IUser {
    id?: number;
    username: string;
    email: string;
    role: string;
}

export interface INewUser {
    username: string;
    email: string;
    role: string;
    password: string;
}

export interface IUserParams {
    username: string;
    email: string;
    role: string;
    password: string;
    confirmPassword: string;
}