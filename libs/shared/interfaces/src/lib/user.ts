export type UserId = string;

export interface UserCredentials {
    id: UserId;
    login: string;
    firstName: string;
    middleName: string;
    lastName: string;
    avatarUrl: string;
}
