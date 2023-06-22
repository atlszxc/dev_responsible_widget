import classNames from "classnames"
import { IManagerDistributionSettings, ISelectItem, ITemplate } from "../../../../types/widgetTemplates.type"
import Styles from '../../styles.module.scss'
import Button from "../../../../components/button"
import Input from "../../../../components/input"
import { useEffect, useState } from "react"
import Select, { MultiValue } from 'react-select'
import { ALGHPRITMS, DEPATMENTS } from "../../../../consts/templatesData"
import DepartmentList from "../ departmentList"
import DistributionCountDealsList from "../distributionCountDealsList"
import DistributionDaysList from "../distributionDaysList"
import DistributionTimeAcceptDealsSettings from "../distributionTimeAcceptDealsSettings"
import DistributionPercentDealsList from "../dstributionPercentDealsList"

interface IModal {
    template: ITemplate | null,
    toggle(): void
}

const Modal = ({ toggle, template }: IModal) => {
    const [templateName, setTemplateName] = useState<string>(template? template.title : '')
    const [alghoritm, setAlgoritm] = useState<ISelectItem | null>(template? template.alghoritm : { label: '', value: '' })
    const [managers, setManagers] = useState<Array<IManagerDistributionSettings>>(template? template.managers : [])
    const [timeAcceptDeal, setTimeAcceptDeals] = useState<string | null>(template? template.timeAcceptDeal : null)
    const [rounds, setRounds] = useState<number | null>(template? template.rounds : null)

    const handleAddTemplate = () => {          
        toggle()
    }

    const handleUpdateTemplate = () => {
        toggle()
    }

    return (
        <div className={Styles["pattern-modal"]} onMouseDown={() => toggle()}>
            <div className={Styles["pattern-modal__container"]} onMouseDown={(e) => e.stopPropagation()}>
                <div className={Styles["pattern-modal__btns"]}>
                    <Button title={template? 'Обновить' : 'Создать'} type="accent" onClick={template? handleUpdateTemplate : handleAddTemplate} />
                    <Button title="Отменить" onClick={toggle} />
                </div>
                <div className={Styles["pattern-modal__body"]}>
                    <div className={classNames(Styles["pattern-modal__general"], Styles["pattern-modal__options"])}>
                        <h2 className={Styles["pattern-modal__options-title"]}>Основные</h2>
                        <div className={Styles["pattern-modal__general--top"]}>
                            <Input style={{ flex: '0 1 48%'}} value={templateName} placeholder="Введите название шаблона" extraOptions={{ width: 'w-full' }} onChange={setTemplateName} />
                            <Select styles={{control: (baseStyles) => ({...baseStyles, flex: '0 1 48%'})}} onChange={(e) => setAlgoritm(e)} defaultValue={template? template.alghoritm : null} placeholder='Выберите алгоритм распределения' isSearchable className="select" options={ALGHPRITMS} />
                        </div>
                        <div className={Styles["pattern-modal__general--bottom"]}>
                            {
                                alghoritm?.label === ALGHPRITMS[0].label ? <DistributionCountDealsList managers={managers} handler={setManagers} /> 
                                : alghoritm?.label === ALGHPRITMS[1].label ? <DistributionPercentDealsList managers={managers} handler={setManagers} /> 
                                : alghoritm?.label === ALGHPRITMS[2].label ? <DistributionDaysList managers={managers} handler={setManagers} /> 
                                : alghoritm?.label === ALGHPRITMS[3].label ? <DistributionTimeAcceptDealsSettings timeAccptDealHandler={setTimeAcceptDeals} roundsHandler={setRounds} timeAcceptDeals={timeAcceptDeal} rounds={rounds} /> 
                                : null
                            }
                        </div>
                        {/* <Select onChange={(e) => setExtraOptions(e)} defaultValue={template? template.extraOptions : null} placeholder='Выберите дополнительные параметры' className="select" options={EXTRA_OPTIONS} isMulti isSearchable closeMenuOnSelect={false} /> */}
                    </div>
                    <div className={classNames(Styles["pattern-modal__users"], Styles["pattern-modal__options"])}>
                        <h2 className={Styles["pattern-modal__options-title"]}>Участники распределения</h2>
                        <DepartmentList managersIds={managers} title="Отделы и сотрудники" handler={setManagers} elems={DEPATMENTS} />
                    </div>
                    <div className={classNames(Styles["pattern-modal__additional"], Styles["pattern-modal__options"])}>
                        <h2 className={Styles["pattern-modal__options-title"]}>Дополнительные</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal