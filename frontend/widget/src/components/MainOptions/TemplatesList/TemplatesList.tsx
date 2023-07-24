import React, { useMemo } from "react";
import Button from "../../UI/button/Button";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hook";
import Styles from './TemplateList.module.scss'
import { deleteTemplate } from "../../../store/slices/template.slice";
import { ITemplate } from "../../../types/general.types";
import classNames from "classnames";
import useTemplates from "../../../hooks/useTemplates";
import { templateService } from "../../../api/templates.service";

interface ITemplateList {
    toggleModal(): void,
    setTemplate(template: ITemplate | null): void,
    openModal: (event?: Event) => void
}

const TemplatesList= ({ toggleModal, setTemplate, openModal }: ITemplateList) => {
    const {templates, templatesIsLoading, templatesMutate} = useTemplates('31067610')

    if(templatesIsLoading) return <h1>Loading...</h1>

    return (
        <section className={classNames(Styles["patterns__list"], Styles["patterns-list"])}>
            <div className={Styles["patterns-list__header"]}>
                <div className={Styles["patterns-list__header-item"]}>Название</div>
                <div className={Styles["patterns-list__header-item"]}>Автор</div>
                <div className={Styles["patterns-list__header-item"]}>Распределение</div>
                <div className={Styles["patterns-list__header-item"]}>Дата создания</div>
            </div>
            <div 
                className={Styles["patterns-list__item"]}
            >
                <div className={Styles["patterns-list__item-inner"]}>Название шаблона</div>
                <div className={Styles["patterns-list__item-inner"]}>Максим Зудин</div>
                <div className={Styles["patterns-list__item-inner"]}>Распределение по времени</div>
                <div className={Styles["patterns-list__item-inner"]}>05.12.2023 10:45</div>
                <Button type="drivable" handleClick={() => console.log('click')}/>
            </div>
            {
                templates? templates.map((tmp: ITemplate, id: number) => (
                    <div 
                        className={Styles["patterns-list__item"]} key={tmp._id}
                        onClick={() => { setTemplate(tmp); toggleModal() }}
                    >
                        <div className={Styles["patterns-list__item-inner"]}>{ tmp.title }</div>
                        <div className={Styles["patterns-list__item-inner"]}>Максим Зудин</div>
                        <div className={Styles["patterns-list__item-inner"]}>{ tmp.algorithm }</div>
                        <div className={Styles["patterns-list__item-inner"]}>{ tmp.date }</div>
                        <Button title="УДАЛИТЬ" type="drivable" handleClick={async () => {
                            await templateService.deleteTemplate(tmp._id)
                            templatesMutate()
                        }} />
                    </div>
                )): null
            }
            <div className={classNames(Styles['patterns-list__button-add'], Styles['patterns-list-button-add'])} onClick={() => openModal()}>
                <span className={Styles["patterns-list-button-add__plus"]}>
                    +
                </span>
                <div className={Styles["patterns-list-button-add__text"]}>
                    Добавить новый шаблон распределения
                </div>
            </div>
        </section>
    )
}

export default TemplatesList