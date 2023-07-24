import { createSlice } from "@reduxjs/toolkit"
import { IDepartment } from "../../types/general.types"

const getDeparments = () => {
    const departments = Object.keys(APP.constant('groups')).map(key => {
        const deparmentManagers = Object.keys(APP.constant('managers')).map(key => APP.constant('managers')[key]).filter(manager => manager.group === key && manager.active === true)
        return {
            id: key,
            title: APP.constant('groups')[key],
            managers: deparmentManagers
        }
    })

    return departments
}

interface IAccount {
    departaments: Array<IDepartment>
}

const initialState: IAccount = {
    departaments: getDeparments()
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {}
})

export default accountSlice.reducer