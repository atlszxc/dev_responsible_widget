import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import templateService from "../../api/templates.service"
import { ITemplate } from "../../types/general.types"

interface ITemplateSlice {
    templates: ITemplate[],
    isLoading: boolean
}

const initialState: ITemplateSlice = {
    templates: [],
    isLoading: false
}

export const getTemplates = createAsyncThunk<ITemplate[]>('template/getTemplates', async () => await templateService.getTemplates())
export const createTemplate = createAsyncThunk<ITemplate, ITemplate>('template/createTemplate', async (data) => await templateService.createTemplate(data))
export const deleteTemplate = createAsyncThunk<ITemplate[], string>('template/delteTemplate', async (id) => await templateService.deleteTemplate(id))

const templateSlice = createSlice({
    name: 'template',
    initialState,
    reducers: {
        updateTemplate(state, action) {
            state.templates = state.templates.map(tmp => {
                if(tmp._id === action.payload.id) {
                    tmp = action.payload
                }
                return tmp
            })
        }
    },
    extraReducers(builder) {
        builder.addCase(getTemplates.pending, (state) => {
            state.isLoading = true
        }),
        builder.addCase(getTemplates.fulfilled, (state, action) => {
           state.templates = action.payload
           state.isLoading = false
        }),
        builder.addCase(createTemplate.pending, (state) => {
            state.isLoading = true
        }),
        builder.addCase(createTemplate.fulfilled, (state, action) => {
            state.templates.push(action.payload)
            state.isLoading = true
        }),

        builder.addCase(deleteTemplate.pending, (state) => {
            state.isLoading = true
        }),
        builder.addCase(deleteTemplate.fulfilled, (state, action) => {
            state.templates = action.payload
            state.isLoading = false
        })
    },
})

export const { updateTemplate } = templateSlice.actions
export default templateSlice.reducer