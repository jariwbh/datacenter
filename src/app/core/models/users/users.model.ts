export class UsersModel {
    id: number;
    email: string;
    username: string;
    password: string;
    acl: boolean;
    cityRights: string[];
    role: string;
}
