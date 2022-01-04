import{REG_EMAIL} from "../reducers/types/actiontypes"

export const registeremail=(inputemail)=>{
    return {
        type:REG_EMAIL,
       inputemail
       
    }
}