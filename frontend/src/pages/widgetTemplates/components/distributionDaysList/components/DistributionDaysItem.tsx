import { IManagerDistributionSettings } from "../../../../../types/widgetTemplates.type"

type DistributionDaysItemProp = {
    manager: IManagerDistributionSettings,
    handler: (callback: (arg:IManagerDistributionSettings[]) => IManagerDistributionSettings[]) => void | React.Dispatch<IManagerDistributionSettings[]>,
    id: number
}

const DistributionDaysItem = ({ manager, handler, id }: DistributionDaysItemProp) => {
    return (
        <div>
            <span>{manager.title}</span>
            <div>
                {
                    manager.days.map((day, dayId) => (
                        <div key={dayId} onClick={() => handler(prev => {
                            prev[id].days[dayId].active = !prev[id].days[dayId].active
                            return [...prev]
                        })}>
                            <span>{day.title}</span>
                        </div>
                    ))
                }
            </div>
            <input type="time" value={manager.startDay} onChange={e => handler(prev => {
                prev[id].startDay = e.target.value
                return [...prev]
            })} />
            <input type="time" value={manager.endDay} onChange={e => handler(prev => {
                prev[id].endDay = e.target.value
                return [...prev]
            })} />
        </div>
    )
}

export default DistributionDaysItem