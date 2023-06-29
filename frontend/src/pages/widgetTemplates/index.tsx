import { useState } from 'react'
import Styles from './styles.module.scss'
import { ITemplate } from '../../types/widgetTemplates.type'
import TemplateList from './components/templateList'
import { createPortal } from 'react-dom'
import Modal from './components/modal'

const WidgetTemplates = () => {
    const [toggleModal, setToggleModal] = useState<boolean>(false)
    const [template, setTemplate] = useState<ITemplate | null>(null)

    const handleToggleModal = () => {
        setToggleModal(!toggleModal)
    }

    const handleSetTemplate = (template: ITemplate | null) => {
        setTemplate(template)
    }

    const openModal = () => {
        handleToggleModal(); 
        handleSetTemplate(null);
    }

    return (
        <section className={Styles['patterns']}>
            <div className={Styles['patterns__header']}>
                <h1 className={Styles['patterns__header__title']}>Шаблоны распределения</h1>
                <p className={Styles['patterns__header__subtitle']}>Создайте шаблоны для разных способов распределения и используйте их в настройках цифровой воронки</p>
            </div>
            <TemplateList openModal={openModal} setTemplate={setTemplate} toggleModal={handleToggleModal} />
            {toggleModal? createPortal(<Modal toggle={handleToggleModal} template={template} />, document.body) : null}
        </section>
    )
}

export default WidgetTemplates