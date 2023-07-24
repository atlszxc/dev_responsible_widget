export type AmoManager = {
    id: number,
    name: string,
    lang: string,
    rights: {
        mail_access: boolean,
        catalog_access: boolean,
        files_access: boolean,
        oper_day_reports_view_access: boolean,
        oper_day_user_tracking: boolean,
        is_admin: boolean,
        is_free: boolean,
        is_active: boolean,
    }
}

export type DealsResult = {
    id: number,
    responsible_user_id: number
}

export type Leads = {
    _embedded: LeadsEmbedded
}
type LeadsEmbedded = {
    leads: Lead[]
}

export type Lead = {
    id: number,
    responsible_user_id: number,
    pipeline_id: number,
    group_id: number,
    name: number,
    price: number,
    account_id: number
}

export type ResponseTokenData = {
    access_token: string,
    refresh_token: string,
}
