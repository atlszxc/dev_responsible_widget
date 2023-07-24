import { IManagerDistributionSettings, IManager, IManagerMultiselectUsage } from "../types/widgetTemplates.type"

export const removeDepartmentManagers = (deparmentState: IManagerDistributionSettings[], managers: IManager[]) => ([] as IManagerDistributionSettings[]).concat(deparmentState.filter((manager) => {
    const managersIds = managers.map(manager => manager.id)
    if(!managersIds.includes(manager.id)) {
        return manager
    }
}))

export const removeManager = (deparmentState: IManagerDistributionSettings[], id: string) => deparmentState.filter(manager => manager.id !== id)

export const addDeparmentManagers = (deparmentState: IManagerDistributionSettings[], managers: IManager[]) => 
    deparmentState.concat([...managers.map(manager => ({ 
        id: manager.id,
        title: manager.title, 
        percent: 0, 
        count: 0, 
        startDay: '09:00', 
        endDay: '18:00', 
        days: [
            {
                title: 'Пн',
                active: false
            },
            {
                title: 'Вт',
                active: false
            },
            {
                title: 'Ср',
                active: false
            },
            {
                title: 'Чт',
                active: false
            },
            {
                title: 'Пт',
                active: false
            },
            {
                title: 'Сб',
                active: false
            },
            {
                title: 'Вс',
                active: false
            },
        ] 
    }))])

export const addManager = (deparmentState: IManagerDistributionSettings[], manager: IManagerMultiselectUsage) => 
    deparmentState.concat({ 
        id: manager.id, 
        title: manager.title, 
        percent: 0, 
        count: 0,
        startDay: '09:00', 
        endDay: '18:00', 
        days: [
            {
                title: 'Пн',
                active: false
            },
            {
                title: 'Вт',
                active: false
            },
            {
                title: 'Ср',
                active: false
            },
            {
                title: 'Чт',
                active: false
            },
            {
                title: 'Пт',
                active: false
            },
            {
                title: 'Сб',
                active: false
            },
            {
                title: 'Вс',
                active: false
            },
        ]
    })