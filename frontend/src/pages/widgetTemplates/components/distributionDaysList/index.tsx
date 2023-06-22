import { IManagerDistributionSettings } from "../../../../types/widgetTemplates.type"
import DistributionDaysItem from "./components/DistributionDaysItem"

type DistributionDaysListProp = {
    managers: IManagerDistributionSettings[],
    handler: (callback: (arg:IManagerDistributionSettings[]) => IManagerDistributionSettings[]) => void | React.Dispatch<IManagerDistributionSettings[]>
}

const DistributionDaysList = ({ managers, handler }: DistributionDaysListProp) => {
    return (
        <div>
            {
                managers.map((manager, id) => <DistributionDaysItem key={id} id={id} handler={handler} manager={manager} />)
            }
        </div>
    )
}

export default DistributionDaysList