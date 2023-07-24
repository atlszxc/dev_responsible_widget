import React, { useMemo } from "react";
import { IManagerDistributionSettings } from "../../../types/general.types";
import DistributionByPercentItem from "./DistributionByPercentItem";
import Styles from './DistributionByPercent.module.scss'

type DistributionPercentDealsListProp = {
    managers: IManagerDistributionSettings[],
    handler: (callback: (arg:IManagerDistributionSettings[]) => IManagerDistributionSettings[]) => void | React.Dispatch<IManagerDistributionSettings[]>,
}

const DistributionPercentDealsList = ({ managers, handler }: DistributionPercentDealsListProp) => {
    const total = useMemo(() => managers.reduce((acc: number, manager) => acc += manager.percent, 0), [managers])

    return (
        <div className={Styles['distribution-by-percent']}>
             <span className={Styles['distribution-by-percent__total']}>{total}%</span>
             <div className={Styles['distribution-by-percent__participants']}>
                 {
                     managers.length ? managers.map((manager, id) => 
                         <DistributionByPercentItem key={id} handler={handler} item={{ id, percent:manager.percent, step: 1, title: manager.title, total }}  /> 
                     ) :
                     <span className={Styles['distribution-by-percent__participants-void']}>Выберите участников распределения</span>
                 }
             </div>
        </div>
     )
}

export default DistributionPercentDealsList