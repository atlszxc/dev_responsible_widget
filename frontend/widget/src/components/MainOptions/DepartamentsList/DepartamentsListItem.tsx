import React, { useEffect, useState } from "react";
import DepartamentsList from "./DepartamentsList";
import Styles from './DepartamentsList.module.scss'
import { IDepartment, IDepatmentListItem, IManagerDistributionSettings, ManagerMultiselectUsage, isDepartment } from "../../../types/general.types";
import { addDeparmentManagers, addManager, removeDepartmentManagers, removeManager } from "./DepartamentsList.helper";
import classNames from "classnames";

const DepartamentListItem = ({ data, handler, managersIds }: IDepatmentListItem<IDepartment | ManagerMultiselectUsage>) => {
    const [isInDepartmentState, setIsInDeparmentState] = useState<boolean>(false)

    const handlerAddDepartmentManagers = (checked: boolean) => {
       if(isDepartment(data)) {
        handler((prev:IManagerDistributionSettings[]) => addDeparmentManagers(prev, data.managers))
        setIsInDeparmentState(!checked)
       } else {
        console.log(data)
        handler((prev: IManagerDistributionSettings[]) => addManager(prev, data))
        setIsInDeparmentState(!checked)
       }
    }

    const handlerRemoveDepartmantManagers = (checked: boolean) => {
        if(isDepartment(data)) {
            handler((prev: IManagerDistributionSettings[]) => removeDepartmentManagers(prev, data.managers))
            setIsInDeparmentState(!checked)
        } else {
            console.log(data)
            handler((prev: IManagerDistributionSettings[]) => removeManager(prev, data.id))
            setIsInDeparmentState(!checked)
        }
    }

    useEffect(() => {
        if(isDepartment(data)) {
            const deparmentManagersInState = data.managers.reduce((accumulator: number, manager) => {
                if(managersIds.find(managerInState => managerInState.managerId === manager.id)) {
                    accumulator++
                }
                
                return accumulator
            }, 0)
            deparmentManagersInState === data.managers.length? setIsInDeparmentState(true) : setIsInDeparmentState(false)
        } else {
            managersIds.find(manager =>  manager.managerId == data.id)? setIsInDeparmentState(true) : setIsInDeparmentState(false)
        } 
    }, [managersIds])


    return (
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
                    <DepartamentsList managersIds={managersIds} handler={handler} title="" elems={data.managers} /> : 
                    null 
            }
        </li>
    )
}

export default DepartamentListItem