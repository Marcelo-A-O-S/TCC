import { User } from "../User";

export interface IUserDomain {
    user: User | null;
    logout:()=>Promise<void>;
    login:(userBody: User)=>Promise<void>;

}
