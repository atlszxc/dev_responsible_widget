import React, { useMemo } from "react";
import { IManagerDistributionSettings } from "../../../types/general.types";
import Styles from './DistributionByQuantity.module.scss'
import { COUNT_DEALS } from "../../../mock/lists.mock";

type DistributionPercentDealsListProp = {
    managers: IManagerDistributionSettings[],
    handler: (callback: (arg:IManagerDistributionSettings[]) => IManagerDistributionSettings[]) => void | React.Dispatch<IManagerDistributionSettings[]>,
}

const DistributionCountDealsList = ({ managers, handler }: DistributionPercentDealsListProp) => {
    const total = useMemo(() => managers.reduce((acc: number, manager) => acc+=manager.count, 0), [managers])

    return (
        <div className={Styles['distribution-by-quantity']}>
            <span className={Styles['distribution-by-quantity__total']}>{total}/{COUNT_DEALS}</span>
            <div className={Styles["distribution-by-quantity__participants"]}>
                {
                    managers.length ? managers.map((manager, id)=> (
                        <div className={Styles['distribution-by-quantity__participant']} key={id}>
                            <span className={Styles['distribution-by-quantity__name']}>{manager.title}</span>
                            <input className={Styles['distribution-by-quantity__quantity']} type="number" value={manager.count} onChange={e => handler((prev) => {
                                if(total < COUNT_DEALS) {
                                    prev[id].count = Number(e.target.value)
                                }
                                return [...prev]
                            })} />
                        </div>
                    )):
                    <span className={Styles['distribution-by-quantity__participants-void']}>Выберите участников распределения</span>
                }
            </div>
        </div>
    )
}

export default DistributionCountDealsList