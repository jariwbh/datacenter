export class UsersModel {
    id: number;
    email: string;
    username: string;
    password: string;
    acl: string[];
    cityRights: string[];
    role: boolean;
}
