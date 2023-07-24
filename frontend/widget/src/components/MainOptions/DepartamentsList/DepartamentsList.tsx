import React, { useMemo, useState } from "react";
import DepartamentListItem from "./DepartamentsListItem";
import Styles from './DepartamentsList.module.scss'
import Input from "../../UI/input/Input";
import { IDepartamentsList, IDepartment, ManagerMultiselectUsage, isDepartment } from "../../../types/general.types";

const DepartamentsList = ({ elems, handler, managersIds }: IDepartamentsList<IDepartment| ManagerMultiselectUsage>) => {
    const [departamentsName, setDepartamentsName] = useState<string>('')
    const firtsElem = elems.length ? elems[0] : {}
    const memoDeportamentsList = useMemo(() => elems.filter((el: IDepartment | ManagerMultiselectUsage) => el.title.toLowerCase().includes(departamentsName.toLowerCase())), [departamentsName, elems])

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
                    memoDeportamentsList.map((el: IDepartment | ManagerMultiselectUsage) => isDepartment(el) ? 
                        el.managers.length ?
                            <DepartamentListItem managersIds={managersIds} handler={handler} data={el} key={el.id}/> : null 
                        : <DepartamentListItem managersIds={managersIds} handler={handler} data={el} key={el.id}/>
                    )
                }
            </ul>
        </div>
    )
}

export default DepartamentsList