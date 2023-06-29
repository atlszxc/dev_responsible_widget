import classNames from "classnames"
import { ITemplate } from "../../../../types/widgetTemplates.type"
import Styles from '../../styles.module.scss'
import Button from "../../../../components/button"
import useTemplates from "../../../../hooks/useTemplates"
import { templateService } from "../../../../api/template.service"

interface ITemplateList {
    toggleModal(): void,
    setTemplate(template: ITemplate | null): void,
    openModal: (event?: Event) => void
}

const TemplateList = ({ openModal }: ITemplateList) => {
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
                <Button title="УДАЛИТЬ" type="drivable" onClick={() => console.log('click')} />
            </div>
            {
                templates.map((template: any) => (
                    <div key={template.id} className={Styles["patterns-list__item"]}>
                        <div className={Styles["patterns-list__item-inner"]}>{template.title}</div>
                        <div className={Styles["patterns-list__item-inner"]}>Максим Зудин</div>
                        <div className={Styles["patterns-list__item-inner"]}>{template.alghoritm}</div>
                        <div className={Styles["patterns-list__item-inner"]}>05.12.2023 10:45</div>
                        <Button title="УДАЛИТЬ" type="drivable" onClick={async () => {
                            await templateService.deleteTemplate(template.id)
                            templatesMutate()
                        }} />
                    </div>
                ))
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

export default TemplateList