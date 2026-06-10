import { toast } from "react-toastify";


export const HandleErrors = (errors) => {
    let timer = 3000;
    if (Array.isArray(errors)) {
        errors.forEach((error) => {
            toast.error(error, { autoClose: timer });
            timer += 1000;
        });
    } else {
        for (const key in errors) {
            const element = errors[key];
            if (element && Array.isArray(element)) {
                element.forEach((error) => {
                    toast.error(error, { autoClose: timer });
                    timer += 1000;
                });
            } else {
                toast.error(element);
                timer += 1000;
            }
        }
    }
}