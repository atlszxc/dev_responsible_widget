import { Manager } from "src/manager/manager.model";

export interface ITemplate {
    id: string,
    title: string,
    alghoritm: string,
    timeAcceptDeal: string,
    rounds: number,
    managers: Manager[]
}