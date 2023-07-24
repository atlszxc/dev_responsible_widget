import axios from "axios";

export const $api = axios.create({
    baseURL: 'https://57f5-77-95-92-110.ngrok-free.app/api',
})