import React from "react";
import Styles from './input.module.scss'
import { IExtraOptionElement } from "../../../types/general.types";
import classNames from "classnames";

type IInput<T> = {
    label?: string,
    placeholder: string
    extraOptions?: T
    value?: string | null,
    onChange(e: string): void,
    style?: Record<string, string>,
    className?: string,
    classNameInput?: string
}

const Input = ({ label, placeholder, extraOptions, onChange, value=null, style, className, classNameInput }: IInput<IExtraOptionElement>) => {
    return (
        <div style={style} className={classNames(Styles['input'], className)}>
            {label ? <label className={Styles['input__label']}>{label}</label> : null}
            {
                value?
                <input 
                    value={value} 
                    onChange={e => onChange(e.target.value)} 
                    className={classNames(Styles['input__inner'], classNameInput, extraOptions && Object.keys(extraOptions).map(key => extraOptions[key]).join(' '))}
                    type="text" placeholder={placeholder} 
                />
                :
                <input 
                    onChange={e => onChange(e.target.value)} 
                    className={classNames(Styles['input__inner'], classNameInput, extraOptions && Object.keys(extraOptions).map(key => extraOptions[key]).join(' '))}
                    type="text" 
                    placeholder={placeholder} 
                />
            }
        </div>
    )
}

export default Input