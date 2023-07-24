type Action = {
    settings: ActionSettings
}

type Widget = {
    settings: Settings
}

type ActionSettings = {
    widget: Widget
}

type Settings = {
    templates: string,
    triggerId: string
}

type Event = {
    data: Data
}

type Data = {
    id: string
}

export class HookDto {
    event: Event
    action: Action
}