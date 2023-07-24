export interface IAlghoritms {
    [key: string]: {
        label: string,
        value: string
    }
}

export interface ITemplate {
    _id: string
    title: string,
    algorithm: string,
    extraOptions: ISelectItem[],
    managers: IManagerDistributionSettings[],
    date: string,
    timeAcceptDeal: string | null,
    rounds: number
}

interface IDay {
    title: string,
    active: boolean
}

export interface IManagerDistributionSettings {
    managerId: string,
    title: string,
    percent: number,
    count: number,
    startDay?: string,
    endDay?: string,
    days?: IDay[]
}

export interface IManager {
    active: boolean,
    amo_profile_id: string,
    amojo_id: string,
    avatar: string,
    free_user: string,
    group: string,
    id: string,
    is_admin: string,
    login: string,
    option: string,
    status: string,
    theme: string,
    title: string,
    managers?: any
}

export interface IExtraOptionElement {
    [key: string]: string
}

export type ManagerMultiselectUsage = Pick<IManager, "title" | 'id'> 

export interface IDepartment {
    id: string,
    title: string,
    managers: Array<IManager>
}

export interface ISelectItem {
    value: string,
    label: string,
}

export function isCustomType<T extends Object>(object: Object, key: keyof T): object is T {
    return key in object
}

export function isDepartment(object: IManager | IDepartment | {}): object is IDepartment {
    return 'managers' in object
}

export interface IDepartamentsList<T> {
    title: string,
    elems: T[],
    extraOptions?: IExtraOptionElement | null,
    managersIds: IManagerDistributionSettings[]
    handler: (callback: (arg:IManagerDistributionSettings[]) => IManagerDistributionSettings[]) => void | React.Dispatch<IManagerDistributionSettings[]>
}

export interface IDepatmentListItem<T> {
    data: T,
    handler: (callback: (arg:IManagerDistributionSettings[]) => IManagerDistributionSettings[]) => void | React.Dispatch<IManagerDistributionSettings[]>,
    managersIds: IManagerDistributionSettings[]
}