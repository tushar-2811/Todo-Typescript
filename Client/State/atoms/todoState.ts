import {atom} from 'recoil'


export const todoState= atom({
    key : "todoState",
    default : {
        title : "",
        description : "",
        isCompleted : false
    }
})