import Select from 'react-select'
import useTemplates from '../../hooks/useTemplates'
import { useState } from 'react'
import { templateService } from '../../api/template.service'

const WidgetPiplene = () => {
    const {templates, templatesIsLoading} = useTemplates('31067610')
    const [templatesOptions, setTemplatesOptions] = useState(templates? templates.map((item: any) => ({ value: item.id, label: item.title })) : [])

    if(templatesIsLoading) {
        return <h1>Loading</h1>
    }

    return (
        <div>
            {
                templatesOptions && <Select options={templatesOptions} onChange={e => setTemplatesOptions(e)} />
            }
            <button onClick={async () => await templateService.sendSelectedAlgoritm(templatesOptions.value)}>Send</button>
        </div>
    )
}

export default WidgetPiplene