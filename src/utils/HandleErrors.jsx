import { toast } from "react-toastify";

export const HandleErrors = (errors)=>{
    let timer = 3000;
    console.log(errors)
    if(Array.isArray(errors)){
        errors.forEach(element => {
            toast.error(element, {autoClose: timer});
            timer += 2000;
        });
    }else {
        for (const key in errors) { 
            const element = errors[key];
            element.forEach((error)=>{
                toast.error(error, {autoClose: timer})
                timer += 2000;
            })
        }
    }
}