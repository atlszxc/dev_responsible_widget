import React from "react";
import LabelCheckbox from "../../UI/labelCheckbox/LabelCheckbox";
import { ADDITION_OPTIONS } from "../../../mock/lists.mock";
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