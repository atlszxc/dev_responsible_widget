import useSWR from 'swr'
import { templateService } from '../api/template.service'

const useTemplates = (id: string) => {
    const { data, isLoading, error, mutate } = useSWR('getTemplates', () => templateService.getTemplates(id))

    return {
        templates: data,
        templatesIsLoading: isLoading,
        templatesIsError: error,
        templatesMutate: mutate,
    }
}

export default useTemplates