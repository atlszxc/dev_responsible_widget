import { IExtraOptionElement } from '../../types/common.type'
import Styles from './styles.module.scss'
import GlobalStyles from '../../pages/widgetTemplates/styles.module.scss'

type IButton<T> = {
    title: string,
    onClick(event?: Event): void,
    extraOptions?: T,
    type?: string | null
}

const Button = ({ title, onClick, extraOptions, type = null }: IButton<IExtraOptionElement>) => {
    if(type === 'drivable') {
        return (
            <button
                onClick={() => onClick()}
                className={`${GlobalStyles.drivable} ${extraOptions? Object.keys(extraOptions).map((key: string) => extraOptions[key]).join(' ') : ''}`}
            >
                { title }
            </button>
        )
    }
    if(type === 'drivable') {
        return (
            <button
                onClick={() => onClick()}
                className={`${Styles.drivable} ${extraOptions? Object.keys(extraOptions).map((key: string) => extraOptions[key]).join(' ') : ''}`}
            >
                { title }
            </button>
        )
    }
    if(type === 'accent') {
        return (
            <button
                onClick={() => onClick()}
                className={`${Styles.button} ${Styles.accent} ${extraOptions? Object.keys(extraOptions).map((key: string) => extraOptions[key]).join(' ') : ''}`}
            >
                { title }
            </button>
        )
    }
    return (
        <button
            onClick={() => onClick()}
            className={`${Styles.button} ${extraOptions? Object.keys(extraOptions).map((key: string) => extraOptions[key]).join(' ') : ''}`}
        >
            { title }
        </button>
    )
}

export default Button