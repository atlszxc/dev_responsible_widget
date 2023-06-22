import { useMemo } from "react"
import { IManagerDistributionSettings } from "../../../../types/widgetTemplates.type"
import Styles from '../../styles.module.scss'

type DistributionPercentDealsListProp = {
    managers: IManagerDistributionSettings[],
    handler: (callback: (arg:IManagerDistributionSettings[]) => IManagerDistributionSettings[]) => void | React.Dispatch<IManagerDistributionSettings[]>,
}

const DistributionCountDealsList = ({ managers, handler }: DistributionPercentDealsListProp) => {
    const total = useMemo(() => managers.reduce((acc: number, manager) => acc+=manager.count, 0), [managers])

    return (
        <div className={Styles['distribution-by-quantity']}>
            <span className={Styles['distribution-by-quantity__total']}>{total}/15</span>
            <div className={Styles["distribution-by-quantity__participants"]}>
                {
                    managers.length ? managers.map((manager, id)=> (
                        <div className={Styles['distribution-by-quantity__participant']} key={id}>
                            <span className={Styles['distribution-by-quantity__name']}>{manager.title}</span>
                            <input className={Styles['distribution-by-quantity__quantity']} type="number" value={manager.count} onChange={e => handler((prev) => {
                                if(total < 15) {
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