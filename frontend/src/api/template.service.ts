import { $api } from "./base.service"

export const templateService = {
    async getTemplates(userId: string) {
        const response = await $api.get(`/template/user/${userId}`)
        return response.data
    },

    async getTemplate(id: string) {
        const response = await $api.get(`/template/${id}`)
        return response.data
    },

    async createTemplate(userId: string, data: any) {
        await $api.post(`/template/${userId}`, data) 
    },

    async deleteTemplate(id: string) {
        await $api.delete(`/template/${id}`)
    },

    async sendSelectedAlgoritm(id: string) {
        await $api.get(`/template/dp/${id}`)
    }
}