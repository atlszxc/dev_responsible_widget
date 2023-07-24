import LabelCheckbox from "../../../../components/label-checkbox/LabelCheckbox";
import { ADDITION_OPTIONS } from "../../../../consts/templatesData";
import Styles from './additionOptions.module.scss'

const additionOptions = () => {
	return (
		<div className={Styles["addition-options"]}>
			{
				ADDITION_OPTIONS.map(option => (
					<LabelCheckbox text={option.title} key={option.value}/>
				))
			}
        </div>
	)
}

export default additionOptions