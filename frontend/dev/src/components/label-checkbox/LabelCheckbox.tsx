import Styles from './LabelCheckbox.module.scss'

interface ILabelCheckboxProp {
	text: string
}

const LabelCheckbox = ({text}:ILabelCheckboxProp) => {

	const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.checked)
	}
	return (
		<div className={Styles['label-checkbox']}>
			<input type='checkbox' className={Styles["label-checkbox__checkbox"]} onChange={(event) => onChangeHandler(event)}/>
			<label className={Styles["label-checkbox__label"]}>
				{ text }
			</label>
		</div>
	)
}

export default LabelCheckbox;