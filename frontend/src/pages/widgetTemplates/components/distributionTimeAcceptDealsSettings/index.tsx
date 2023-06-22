type DistributionTimeAcceptDealsSettingsProps = {
    timeAccptDealHandler: React.Dispatch<string | null>,
    roundsHandler: React.Dispatch<number| null>,
    timeAcceptDeals: string | null,
    rounds: number | null
}

const DistributionTimeAcceptDealsSettings = ({ timeAccptDealHandler, roundsHandler, timeAcceptDeals, rounds }: DistributionTimeAcceptDealsSettingsProps) => {
    return (
        <section>
            <label>
                <span>Время для принятия заявки (мин:сек)</span>
                <input type="time" value={timeAcceptDeals? timeAcceptDeals: ''} onChange={e => timeAccptDealHandler(e.target.value)} />
            </label>
            <label>
                <span>Количество кругов распеределения</span>
                <input type="number" value={rounds? rounds : 0} onChange={e => roundsHandler(Number(e.target.value))} />
            </label>
        </section>
    )
}

export default DistributionTimeAcceptDealsSettings