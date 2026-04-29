import api from "../../services/api";
import { HandleErrors } from "../../utils/HandleErrors";

export async function handleDownload(project) {
    try {
        const response = await api.get(`/api/Proposals/${project.id}/download`);
        const url = response.data.downloadUrl;
        const link = document.createElement("a");
        link.href = url;
        link.download = project.fileName || "proposal.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url); // cleanup
    } catch (error) {
        HandleErrors(error.errors);
    }
};