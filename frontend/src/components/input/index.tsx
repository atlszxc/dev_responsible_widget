import { IExtraOptionElement } from "../../types/common.type"
import Styles from './styles.module.scss'

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
        <div style={style} className={`${Styles['input']} ${className}`}>
            {label ? <label className={Styles['input__label']}>{label}</label> : null}
            {
                value?
                <input value={value} onChange={e => onChange(e.target.value)} className={`${Styles['input__inner']} ${classNameInput} ${extraOptions? Object.keys(extraOptions).map(key => extraOptions[key]).join(' ') : ''}`} type="text" placeholder={placeholder} />
                :
                <input onChange={e => onChange(e.target.value)} className={`${Styles['input__inner']} ${extraOptions? Object.keys(extraOptions).map(key => extraOptions[key]).join(' ') : ''}`} type="text" placeholder={placeholder} />
            }
        </div>
    )
}

export default Input