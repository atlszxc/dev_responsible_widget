import React from "react";
import Styles from './button.module.scss'
import DrivableStyles from '../../MainOptions/TemplatesList/TemplateList.module.scss'
import { IExtraOptionElement } from "../../../types/general.types";
import { FaTrash } from 'react-icons/fa6'
import { ACCENT, DRIVABLE } from "../../../consts/consts";
import classNames from "classnames";

type IButton<T> = {
    title?: string,
    handleClick(event?: Event): void,
    extraOptions?: T,
    type?: string | null
}


const Button = ({ title, extraOptions, handleClick, type = null }: IButton<IExtraOptionElement>) => {
    if(type === DRIVABLE) {
        return (
            <button
                onClick={() => handleClick()}
                className={classNames(DrivableStyles['drivable'], extraOptions && Object.keys(extraOptions).map((key: string) => extraOptions[key]).join(' '))}
            >
                <FaTrash></FaTrash>
            </button>
        )
    }
    if(type === ACCENT) {
        return (
            <button
                onClick={() => handleClick()}
                className={classNames(Styles['button'], Styles['accent'], extraOptions && Object.keys(extraOptions).map((key: string) => extraOptions[key]).join(' '))}
            >
                { title }
            </button>
        )
    }
    return (
        <button
            onClick={() => handleClick()}
            className={classNames(Styles['button'], Styles['primary'], extraOptions && Object.keys(extraOptions).map((key: string) => extraOptions[key]).join(' '))}
        >
            { title }
        </button>
    )
}

export default Button