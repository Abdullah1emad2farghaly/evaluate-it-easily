import { toast } from "sonner";

export const HandleErrors = (errors) => {
    const showError = (msg, duration) => {
        toast.custom((t) => (
            <div className="flex items-start gap-3 bg-[#0f172a] border border-red-500/30 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] w-[356px]">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/10 flex-shrink-0 mt-0.5">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-white">Error</span>
                    <span className="text-sm text-slate-400">{msg}</span>
                </div>
            </div>
        ), { duration, id: "global-error-toast" });
    };

    let timer = 3000;
    if(Array.isArray(errors) && errors.length > 0){
        showError(errors[0], timer);
    } else if (errors && typeof errors === 'object') {
        for (const key in errors) { 
            const element = errors[key];
            if (element && Array.isArray(element) && element.length > 0) {
                showError(element[0], timer);
                return; // Stop immediately after showing the first error
            } else if (typeof element === 'string') {
                showError(element, timer);
                return;
            }
        }
    }
}