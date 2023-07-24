import React, { useMemo, useState, useEffect } from "react";
import Select from 'react-select'
import { ACCOUNTID } from "../mock/lists.mock";
import useTemplates from "../hooks/useTemplates";
import { ISelectItem, ITemplate } from "../types/general.types";
import { v4 as uuidv4 } from 'uuid'

const WidgetDigitalPipelineForm = () => {
    const { templates, templatesIsLoading } = useTemplates(ACCOUNTID)

    //не бей палкой, не хлестай кнутом, не я повиненн в этом безумие, ибо госпожа АмоСРМ изъявляет протест без данного колеки, однако ведтся переговоры в поисках взаимного соглашения
    const [selectedTemplate] = useState<string | undefined>(document.querySelector<HTMLInputElement>(`input[name=templates]`)?.value)

    const templatesMemo: ISelectItem[] = useMemo(() => templates ? templates.map((template: ITemplate) => ({ value: template._id, label: template.title })) : [], [templates])

    //button-input-disabled
    useEffect(() => {
        const element = document.querySelector('.button-input-disabled')
        element?.classList.remove('button-input-disabled')
    }, [])

    const changeTemplate = (val: string) => {
        document.querySelector<HTMLInputElement>(`input[name=templates]`)!.value = val
    }

    const findTemplate = (): string | undefined => {
        return Object.values(templatesMemo).find(template => template.value === selectedTemplate)?.label
    }

    if(!document.querySelector<HTMLInputElement>(`input[name=triggerId]`)!.value) {
        document.querySelector<HTMLInputElement>(`input[name=triggerId]`)!.value = uuidv4()
    }

    if(templatesIsLoading) {
        return <h1>Loading...</h1>
    }

    return (
        <label onClick={(e) => e.stopPropagation()}>
            <Select name="selected" defaultInputValue={findTemplate()} onChange={e => changeTemplate(e ? e.value : '')} isSearchable options={Object.values(templatesMemo)} styles={{ container(base, props) {
                return {...base, zIndex: 20}
            }, }} />
        </label>
    )
}

export default WidgetDigitalPipelineForm