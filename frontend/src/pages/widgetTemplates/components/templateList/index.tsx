import classNames from "classnames"
import { ITemplate } from "../../../../types/widgetTemplates.type"
import Styles from '../../styles.module.scss'
import Button from "../../../../components/button"

interface ITemplateList {
    toggleModal(): void,
    setTemplate(template: ITemplate | null): void,
    openModal: (event?: Event) => void
}

const TemplateList = ({ openModal }: ITemplateList) => {
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
                <Button title="УДАЛИТЬ" type="drivable" onClick={() => console.log('click')} />
            </div>
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

export default TemplateList