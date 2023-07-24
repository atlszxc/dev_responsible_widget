import Styles from '../../styles.module.scss'

type DistributionTimeAcceptDealsSettingsProps = {
    timeAccptDealHandler: React.Dispatch<string | null>,
    roundsHandler: React.Dispatch<number| null>,
    timeAcceptDeals: string | null,
    rounds: number | null
}

const DistributionTimeAcceptDealsSettings = ({ timeAccptDealHandler, roundsHandler, timeAcceptDeals, rounds }: DistributionTimeAcceptDealsSettingsProps) => {
    return (
        <div className={Styles['distribution-by-round']}>
            <label className={Styles['distribution-by-round__time']}>
                <span className={Styles['distribution-by-round__text']}>Время для принятия заявки (мин:сек)</span>
                <input className={Styles['distribution-by-round__time-value']} type="time" value={timeAcceptDeals? timeAcceptDeals: ''} onChange={e => timeAccptDealHandler(e.target.value)} />
            </label>
            <label className={Styles['distribution-by-round__rounds']}>
                <span className={Styles['distribution-by-round__text']}>Количество кругов распеределения</span>
                <input className={Styles['distribution-by-round__rounds-value']} type="number" value={rounds? rounds : 0} onChange={e => roundsHandler(Number(e.target.value))} />
            </label>
        </div>
    )
}

export default DistributionTimeAcceptDealsSettings