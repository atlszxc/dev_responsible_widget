import React, { useState, useMemo, useEffect } from "react";
import Styles from './Modal.module.scss'
import { ACCOUNTID, ALGHORITMS } from "../../../mock/lists.mock";
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";
import Select, { MultiValue } from 'react-select'
import DepartamentsList from "../DepartamentsList/DepartamentsList";
import { useAppSelector } from "../../../hooks/redux.hook";
import { IManagerDistributionSettings, ISelectItem, ITemplate } from "../../../types/general.types";
import DistributionByPercent from "../DistributionByPercent/DistributionByPercentList";
import DistributionByQuantity from "../DistributionByQuantity/DistributionByQuantity";
import DistributionByDay from "../DistributionByDay/DistributionByDayList";
import DistributionByRound from "../DistributionByRound/DistributionByRound";
import AdditionOptions from "../AdditionOptions/AdditionOptions";
import classNames from 'classnames';
import useTemplates from "../../../hooks/useTemplates";
import { templateService } from "../../../api/templates.service";

interface IModal {
    template: ITemplate | null,
    toggle(): void
}

const Modal = ({ toggle, template }: IModal) => {
    const {templatesMutate} = useTemplates(ACCOUNTID)

    const { departaments } = useAppSelector(state => state.account)

    const findTemplateValue = (template: ITemplate) => {
        return Object.values(ALGHORITMS).find(algorithm => algorithm.label === template.algorithm)!.value
    }

    const [templateName, setTemplateName] = useState<string>(template? template.title : '')
    const [algorithm, setAlgoritm] = useState<ISelectItem | null>(template? { label: template.algorithm, value: findTemplateValue(template) } : { label: '', value: '' })
    const [extraOptions, setExtraOptions] = useState<MultiValue<ISelectItem>>(template? template.extraOptions : [])
    const [managers, setManagers] = useState<Array<IManagerDistributionSettings>>(template? template.managers : [])
    const [timeAcceptDeal, setTimeAcceptDeals] = useState<string | null>(template? template.timeAcceptDeal : null)
    const [rounds, setRounds] = useState<number>(template? template.rounds : 0)

    const handleAddTemplate = async (): Promise<void> => {
        await templateService.createTemplate(ACCOUNTID, { title: templateName, algorithm: algorithm?.label, timeAcceptDeal: timeAcceptDeal? timeAcceptDeal : 0, rounds: rounds? rounds: 0, managers })
        templatesMutate()      
        toggle()
    }

    const handleUpdateTemplate = async (): Promise<void> => {
        await templateService.updateTemplate(template!._id, { title: templateName, algorithm: algorithm?.label, timeAcceptDeal: timeAcceptDeal? timeAcceptDeal : 0, rounds: rounds? rounds: 0, managers })
        templatesMutate()
        toggle()
    }

    useEffect(() => console.log(managers), [managers])

    const alghoritmComponent = useMemo(() => {
        if(algorithm?.value === ALGHORITMS['count'].value) {
             return <DistributionByQuantity managers={managers} handler={setManagers} />
        }
        if(algorithm?.value === ALGHORITMS['percent'].value) {
            return <DistributionByPercent managers={managers} handler={setManagers} />
        }
        if(algorithm?.value === ALGHORITMS['workDays'].value) {
            return <DistributionByDay managers={managers} handler={setManagers} />
        }
        if(algorithm?.value === ALGHORITMS['rounds'].value) {
            return <DistributionByRound timeAccptDealHandler={setTimeAcceptDeals} roundsHandler={setRounds} timeAcceptDeals={timeAcceptDeal} rounds={rounds} />
        }
        return null
    }, [algorithm, managers])

    return (
        <div className={Styles["pattern-modal"]} onMouseDown={() => toggle()}>
            <div className={Styles["pattern-modal__container"]} onMouseDown={(e) => e.stopPropagation()}>
                <div className={Styles["pattern-modal__btns"]}>
                    <Button title={template? 'Обновить' : 'Создать'} type="accent" handleClick={template? handleUpdateTemplate : handleAddTemplate} />
                    <Button title="Отменить" handleClick={toggle} />
                </div>
                <div className={Styles["pattern-modal__body"]}>
                    <div className={classNames(Styles["pattern-modal__general"], Styles["pattern-modal__options"])}>
                        <h2 className={Styles["pattern-modal__options-title"]}>Основные</h2>
                        <div className={Styles["pattern-modal__general--top"]}>
                            <Input style={{ flex: '0 1 48%'}} value={templateName} placeholder="Введите название шаблона" extraOptions={{ width: 'w-full' }} onChange={setTemplateName} />
                            <Select styles={{control: (baseStyles) => ({...baseStyles, flex: '0 1 48%'})}} onChange={(e) => setAlgoritm(e)} defaultValue={template? algorithm : null} placeholder='Выберите алгоритм распределения' isSearchable className="select" options={Object.values(ALGHORITMS)} />
                        </div>
                        <div className={Styles["pattern-modal__general--bottom"]}>
                            {alghoritmComponent}
                        </div>
                    </div>
                    <div className={classNames(Styles["pattern-modal__users"], Styles["pattern-modal__options"])}>
                        <h2 className={Styles["pattern-modal__options-title"]}>Участники распределения</h2>
                        <DepartamentsList managersIds={managers} title="Отделы и сотрудники" handler={setManagers} elems={departaments} />
                    </div>
                    <div className={classNames(Styles["pattern-modal__additional"], Styles["pattern-modal__options"])}>
                        <h2 className={Styles["pattern-modal__options-title"]}>Дополнительные</h2>
                        <AdditionOptions />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal