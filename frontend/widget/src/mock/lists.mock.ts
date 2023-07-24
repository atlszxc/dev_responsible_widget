import { IAlghoritms } from "../types/general.types"

export const USER_LIST = [
    {
        title: 'test'
    },
    {
        title: 'test'
    },
    {
        title: 'test'
    },
    {
        title: 'test'
    },
    {
        title: 'test'
    },
]

export const EXTRA_OPTIONS = [
    {
        value: 'test1',
        label: 'test1'
    },
    {
        value: 'test2',
        label: 'test2'
    },
    {
        value: 'test3',
        label: 'test3'
    },
    {
        value: 'test4',
        label: 'test4'
    },
    {
        value: 'test5',
        label: 'test5'
    },
    {
        value: 'test6',
        label: 'test6'
    },
]

export const ADDITION_OPTIONS = [
    {
        title: 'Менять ответственного у главного контакта',
        value: 'contact'
    },
    {
        title: 'Менять ответственного у компании',
        value: 'company'
    },
    {
        title: 'Менять ответственного в задачах у главной сделки',
        value: 'deal_task'
    },
    {
        title: 'Менять ответственного в задачах главного контакта',
        value: 'contact_task'
    },
    {
        title: 'Применить триггер к текущим сделкам в статусе',
        value: 'status'
    },
]

export const DEPARTMANTS = [
    {
        title: 'test',
        subitems: USER_LIST
    },
    {
        title: 'test',
        subitems: USER_LIST
    },
    {
        title: 'test',
        subitems: USER_LIST
    },
    {
        title: 'test',
        subitems: USER_LIST
    },
    {
        title: 'test',
        subitems: USER_LIST
    },
]

export const ALGHORITMS: IAlghoritms = {
    queue: {
        value: '0',
        label: 'По очереди'
    },
    count: {
        value: '1',
        label: 'По количеству'
    },
    percent: {
        value: '2',
        label: 'По процентам'
    },
    workDays: {
        value: '3',
        label: 'По рабочим дням'
    },
    rounds: {
        value: '4',
        label: 'Перераспределение по времени'
    },
    conversion: {
        value: '5',
        label: 'По конверсии'
    },
}

export const COUNT_DEALS = 15

const ACCOUNT = APP.constant('account')
export const ACCOUNTID = ACCOUNT.id