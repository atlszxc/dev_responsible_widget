import { IManagerDistributionSettings } from "../../../../types/widgetTemplates.type"
import DistributionDaysItem from "./components/DistributionDaysItem"
import Styles from '../../styles.module.scss'

type DistributionDaysListProp = {
    managers: IManagerDistributionSettings[],
    handler: (callback: (arg:IManagerDistributionSettings[]) => IManagerDistributionSettings[]) => void | React.Dispatch<IManagerDistributionSettings[]>
}

const DistributionDaysList = ({ managers, handler }: DistributionDaysListProp) => {
    return (
        <div className={Styles['distribution-by-day']}>
            {
                managers.length ? managers.map((manager, id) => <DistributionDaysItem key={id} id={id} handler={handler} manager={manager} />)
                :<span className={Styles['modal-distribution-by-day__void']}>Выберите участников распределения</span>
            }
        </div>
    )
}

export default DistributionDaysList