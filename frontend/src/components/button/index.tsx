import { IExtraOptionElement } from '../../types/common.type'
import Styles from './styles.module.scss'
import GlobalStyles from '../../pages/widgetTemplates/styles.module.scss'
import classNames from 'classnames'

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
                className={classNames(GlobalStyles.drivable, extraOptions && Object.keys(extraOptions).map((key: string) => extraOptions[key]).join(' '))}
            >
                { title }
            </button>
        )
    }
    if(type === 'accent') {
        return (
            <button
                onClick={() => onClick()}
                className={classNames(Styles.button, Styles.accent, extraOptions && Object.keys(extraOptions).map((key: string) => extraOptions[key]).join(' '))}
            >
                { title }
            </button>
        )
    }
    return (
        <button
            onClick={() => onClick()}
            className={classNames(Styles.button, extraOptions && Object.keys(extraOptions).map((key: string) => extraOptions[key]).join(' '))}
        >
            { title }
        </button>
    )
}

export default Button