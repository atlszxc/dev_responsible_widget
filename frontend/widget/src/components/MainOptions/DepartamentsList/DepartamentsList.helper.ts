import { DAYS } from "../../../consts/consts";
import {
    IManager,
    IManagerDistributionSettings,
    ManagerMultiselectUsage,
} from "../../../types/general.types";
import lodash from "lodash";

export const removeDepartmentManagers = (
        deparmentState: IManagerDistributionSettings[],
        managers: IManager[]
    ):IManagerDistributionSettings[] =>
    ([] as IManagerDistributionSettings[]).concat(
        deparmentState.filter((manager) => {
            const managersIds = managers.map((manager) => manager.id);
            if (!managersIds.includes(manager.managerId)) {
                return manager;
            }
        })
    );

export const removeManager = (
        deparmentState: IManagerDistributionSettings[],
        id: string
    ): IManagerDistributionSettings[] =>
    deparmentState.filter((manager) => manager.managerId !== id);

export const addDeparmentManagers = (
        deparmentState: IManagerDistributionSettings[],
        managers: IManager[]
    ): IManagerDistributionSettings[] => {
    const concatedManagers = deparmentState.concat([
        ...managers.map((manager) => {
            return {
                managerId: manager.id,
                title: manager.title,
                percent: 0,
                count: 0,
                startDay: "09:00",
                endDay: "18:00",
                days: JSON.parse(JSON.stringify(DAYS)),
            };
        }),
    ]);
    return lodash.uniqBy(concatedManagers, (manager) => manager.managerId)
}


export const addManager = (
        deparmentState: IManagerDistributionSettings[],
        manager: ManagerMultiselectUsage
    ): IManagerDistributionSettings[] =>
    deparmentState.concat({
        managerId: manager.id,
        title: manager.title,
        percent: 0,
        count: 0,
        startDay: "09:00",
        endDay: "18:00",
        days: JSON.parse(JSON.stringify(DAYS)),
    });
