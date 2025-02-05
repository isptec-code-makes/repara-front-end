import {BaseFilter} from "./filters/base-filter";

export interface Manager {
    id?: string;
    email?: string;
    userName?: string;
    photo?: string | null;
    roles?: Array<string>
}

export interface ManagerUpdate {
    email?: string;
    userName?: string;
}

export interface ManagerCreate {
    email: string;
    userName: string;
}

export interface ManagerParams extends BaseFilter {

}


