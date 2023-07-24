import { ManagerDto } from "src/manager/dto/manager.dto"

export class CreateTemplateDto {
    title: string
    algorithm: string
    managers: ManagerDto[]
}