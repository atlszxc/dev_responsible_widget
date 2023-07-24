import React from "react";
import { IManagerDistributionSettings } from "../../../types/general.types";
import DistributionByDayItem from "./DistributionByDayItem";
import Styles from './DistributionByDay.module.scss'

type DistributionDaysListProp = {
    managers: IManagerDistributionSettings[],
    handler: (callback: (arg:IManagerDistributionSettings[]) => IManagerDistributionSettings[]) => void | React.Dispatch<IManagerDistributionSettings[]>
}

const DistributionDaysList = ({ managers, handler }: DistributionDaysListProp) => {
    return (
        <div className={Styles['distribution-by-day']}>
            {
                managers.length ? managers.map((manager, id) => <DistributionByDayItem key={id} id={id} handler={handler} manager={manager} />)
                :<span className={Styles['distribution-by-day__void']}>Выберите участников распределения</span>
            }
        </div>
    )
}

export default DistributionDaysList