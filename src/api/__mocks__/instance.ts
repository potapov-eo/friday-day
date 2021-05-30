import { registeredEmailType } from '../../store/auth-reduser/auth-reducer';

export const recoveryPasswordAPI = {
    registeredEmail(data: registeredEmailType) {
     return   new Promise((res,rej)=>{
         data.message==="res"?
             res('res'): rej('reject')
     })
    },

};
// for example
