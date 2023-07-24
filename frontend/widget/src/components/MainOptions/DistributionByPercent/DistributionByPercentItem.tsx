import React from "react";
import { IManagerDistributionSettings } from "../../../types/general.types";
import Styles from './DistributionByPercent.module.scss'
import { MAX_PERCENT } from "../../../consts/consts";

interface DistsibutionPercentFealsItemProps {
    title: string
    percent: number,
    id: number,
    step: number,
    total: number
}

interface IDistributionPercentDealsItem {
    handler: (callback: (arg:IManagerDistributionSettings[]) => IManagerDistributionSettings[]) => void | React.Dispatch<IManagerDistributionSettings[]>,
    item: DistsibutionPercentFealsItemProps,
}

const DistributionPercentDealsItem = ({ item, handler }: IDistributionPercentDealsItem) => {
    return (
        <div className={Styles['distribution-by-percent__participant']}>
            <span className={Styles['distribution-by-percent__name']}>{item.title}</span>
            <input className={Styles['distribution-by-percent__slider']} value={item.percent} type="range" onChange={e => handler((prev) => {
                prev[item.id].percent = Number(e.target.value)
                return [...prev]
            })} />
            <div className={Styles['distribution-input-numeric']}>
                <button className={Styles['distribution-input-numeric__minus']} onClick={() => handler(prev => { 
                    if(item.total > 0) {
                        prev[item.id].percent--;
                    }
                    return [...prev] }
                )}>-</button>
                <span className={Styles['distribution-input-numeric__total']}>{item.percent}</span>
                <button className={Styles['distribution-input-numeric__plus']} onClick={() => handler(prev => { 
                    if(item.total < MAX_PERCENT) {
                        prev[item.id].percent++;
                    }
                    return [...prev] })}
                >
                    +
                </button>
            </div>
        </div>
    )
}

export default DistributionPercentDealsItem