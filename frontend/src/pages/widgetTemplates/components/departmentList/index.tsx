import { useState, useMemo } from "react"
import { IDepartamentsList, IDepartment, IManagerMultiselectUsage, isDepartment } from "../../../../types/widgetTemplates.type"
import Styles from '../../styles.module.scss'
import Input from "../../../../components/input"
import DepartamentListItem from "./components/DeparmentListItem"

const DepartmentList = ({ elems, handler, managersIds }: IDepartamentsList<IDepartment| IManagerMultiselectUsage>) => {
    const [departamentsName, setDepartamentsName] = useState<string>('')
    const firtsElem = elems.length ? elems[0] : {}

    const memoDeportamentsList = useMemo(() => elems.filter((el: IDepartment | IManagerMultiselectUsage) => el.title.toLowerCase().includes(departamentsName.toLowerCase())), [departamentsName, elems])

    return (
        <div 
            className={
                    isDepartment(firtsElem) ? 
                    Styles['pattern-modal-users'] : 
                    Styles['pattern-modal-users-group__body']
                }>
            <Input 
                onChange={setDepartamentsName} 
                placeholder={
                    isDepartment(firtsElem) ? 
                    'Поиск по группам' : 
                    'Поиск по пользователям'} 
                className={
                    isDepartment(firtsElem) ? 
                    Styles['pattern-modal-users__search-group'] : 
                    Styles['pattern-modal-users-group__search-user']} 
            />
            <ul 
                className={
                    isDepartment(firtsElem) ? 
                    Styles['pattern-modal-users__list'] : 
                    Styles['pattern-modal-users-group__list']}
            >
                {
                    memoDeportamentsList.map((el: IDepartment | IManagerMultiselectUsage) => isDepartment(el) ? 
                        el.managers.length ?
                            <DepartamentListItem managersIds={managersIds} handler={handler} data={el} key={el.id}/> : null 
                        : <DepartamentListItem managersIds={managersIds} handler={handler} data={el} key={el.id}/>
                    )
                }
            </ul>
        </div>
    )
}

export default DepartmentList