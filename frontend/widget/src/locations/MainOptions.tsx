import React, { useEffect, useState } from "react"
import Styles from './MainOptions.module.scss'
import '../style/general.scss'
import TemplatesList from "../components/MainOptions/TemplatesList/TemplatesList"
import Modal from "../components/MainOptions/Modal/Modal"
import { getTemplates } from "../store/slices/template.slice"
import { useAppDispatch } from "../hooks/redux.hook"
import { ITemplate } from "../types/general.types"
import { createPortal } from "react-dom"
import classNames from "classnames"

const WidgetTemplates= () => {
    const dispatch = useAppDispatch()

    const [toggleModal, setToggleModal] = useState<boolean>(false)
    const [template, setTemplate] = useState<ITemplate | null>(null)
    
    const handleToggleModal = (event?: Event) => {
        event && event.stopPropagation();
        setToggleModal(!toggleModal)
    }

    const handleSetTemplate = (template: ITemplate | null) => {
        setTemplate(template)
    }

    const openModal = (event?: Event) => {
        event && event.stopPropagation();
        handleToggleModal(); 
        handleSetTemplate(null);
    }

    useEffect(() => {
        dispatch(getTemplates())
    }, [])

    return (
        <section className={classNames(Styles['patterns'], 'reon-distribution-widget')}>
            <div className={Styles['patterns__header']}>
                <h1 className={Styles['patterns__header__title']}>Шаблоны распределения</h1>
                <p className={Styles['patterns__header__subtitle']}>Создайте шаблоны для разных способов распределения и используйте их в настройках цифровой воронки</p>
            </div>
            <TemplatesList toggleModal={handleToggleModal} setTemplate={handleSetTemplate} openModal={openModal}/>
            { toggleModal? createPortal(<Modal toggle={handleToggleModal} template={template} />, document.body) : null }
        </section>
    )
}

export default WidgetTemplates