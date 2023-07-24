import { useEffect, useState } from "react"
import { IDepatmentListItem, IDepartment, IManagerMultiselectUsage, isDepartment, IManagerDistributionSettings } from "../../../../../types/widgetTemplates.type"
import DepartmentList from "../index"
import Styles from '../../../styles.module.scss'
import { addDeparmentManagers, addManager, removeDepartmentManagers, removeManager } from "../../../../../utils/departmentList.utils"
import classNames from "classnames"

const DepartamentListItem = ({ data, handler, managersIds }: IDepatmentListItem<IDepartment | IManagerMultiselectUsage>) => {
    const [isInDepartmentState, setIsInDeparmentState] = useState<boolean>(false)

    const handlerAddDepartmentManagers = (checked: boolean) => {
        if(isDepartment(data)) {
         handler((prev:IManagerDistributionSettings[]) => addDeparmentManagers(prev, data.managers))
         setIsInDeparmentState(!checked)
        } else {
         handler((prev: IManagerDistributionSettings[]) => addManager(prev, data))
         setIsInDeparmentState(!checked)
        }
     }
 
     const handlerRemoveDepartmantManagers = (checked: boolean) => {
         if(isDepartment(data)) {
             handler((prev: IManagerDistributionSettings[]) => removeDepartmentManagers(prev, data.managers))
             setIsInDeparmentState(!checked)
         } else {
             handler((prev: IManagerDistributionSettings[]) => removeManager(prev, data.id))
             setIsInDeparmentState(!checked)
         }
     }

     useEffect(() => {
        if(isDepartment(data)) {
            const deparmentManagersInState = data.managers.reduce((accumulator: number, manager) => {
                if(managersIds.find(managerInState => managerInState.id === manager.id)) {
                    accumulator++
                }
                
                return accumulator
            }, 0)
            deparmentManagersInState === data.managers.length? setIsInDeparmentState(true) : setIsInDeparmentState(false)
        } else {
            managersIds.find(manager =>  manager.id == data.id)? setIsInDeparmentState(true) : setIsInDeparmentState(false)
        } 
    }, [managersIds])

    return (
        // <li className={isDepartment(data) ? Styles['pattern-modal-departments__item'] : Styles['pattern-modal-users__item']}>
        //     <input type="checkbox" checked={isInDepartmentState} onChange={() => !isInDepartmentState? handlerAddDepartmentManagers(isInDepartmentState): handlerRemoveDepartmantManagers(isInDepartmentState)} />
        //     <span className={Styles['pattern-modal-users__inner']}>{ data.title }</span>
        //     { isDepartment(data)? <DepartmentList managersIds={managersIds} handler={handler} title="" elems={data.managers} /> : null }
        // </li>
        <li 
        className={
            isDepartment(data) ? 
            classNames(Styles['pattern-modal-users__list-item'], Styles['pattern-modal-users-group']) : 
            classNames(Styles['pattern-modal-users-group__user'], Styles['pattern-modal-users-user'])}
    >
        <div 
            className={
                isDepartment(data) ? 
                Styles['pattern-modal-users-group__inner'] : 
                Styles['pattern-modal-users-user__inner']
            }
        >
            <input 
                className={
                    isDepartment(data) ? 
                    Styles['pattern-modal-users-group__checkbox'] : 
                    Styles['pattern-modal-users-user__checkbox']
                } 
                type="checkbox" 
                checked={isInDepartmentState} 
                onChange={() => 
                    !isInDepartmentState? 
                    handlerAddDepartmentManagers(isInDepartmentState) : 
                    handlerRemoveDepartmantManagers(isInDepartmentState)} 
            />
            <span 
                className={
                    isDepartment(data) ? 
                    Styles['pattern-modal-users-group__name'] : 
                    Styles['pattern-modal-users-user__name']}
            >{ data.title }</span>
        </div>
        
        { 
            isDepartment(data)? 
                <DepartmentList managersIds={managersIds} handler={handler} title="" elems={data.managers} /> : 
                null 
        }
    </li>
    )
}

export default DepartamentListItem