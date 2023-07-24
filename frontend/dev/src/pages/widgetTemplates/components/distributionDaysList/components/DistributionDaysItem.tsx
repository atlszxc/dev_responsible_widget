import { IManagerDistributionSettings } from "../../../../../types/widgetTemplates.type"
import Styles from '../../../styles.module.scss'
import classNames from "classnames"

type DistributionDaysItemProp = {
    manager: IManagerDistributionSettings,
    handler: (callback: (arg:IManagerDistributionSettings[]) => IManagerDistributionSettings[]) => void | React.Dispatch<IManagerDistributionSettings[]>,
    id: number
}

const DistributionDaysItem = ({ manager, handler, id }: DistributionDaysItemProp) => {
    return (
        <div className={Styles['distribution-by-day__item']}>
            <span className={Styles['distribution-by-day__name']}>{manager.title}</span>
            <div className={Styles['distribution-by-day__days']}>
                {
                    manager.days.map((day, dayId) => (
                        <div className={classNames(Styles['distribution-by-day__days-day'], { [Styles['distribution-by-day__days-day--active']]: day.active})} key={dayId} onClick={() => handler(prev => {
                            prev[id].days[dayId].active = !prev[id].days[dayId].active
                            return [...prev]
                        })}>
                            <span className={Styles['distribution-by-day__days-inner']}>{day.title}</span>
                        </div>
                    ))
                }
            </div>
            <div className={Styles['distribution-by-day__time']}>
                <input className={Styles['distribution-by-day__from']} type="time" value={manager.startDay} onChange={e => handler(prev => {
                    prev[id].startDay = e.target.value
                    return [...prev]
                })} />
                <input className={Styles['distribution-by-day__to']} type="time" value={manager.endDay} onChange={e => handler(prev => {
                    prev[id].endDay = e.target.value
                    return [...prev]
                })} />
            </div>
        </div>
    )
}

export default DistributionDaysItem