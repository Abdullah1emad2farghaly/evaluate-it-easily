import api from '../../services/api';
import { tokens } from '../../theme';
import { useTheme } from '@emotion/react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useRef, useState } from 'react';
import { createProposal, getMyProposal } from '../../services/proposalServices';
import Loader from '../../loaders/Loader';
import { toast } from 'react-toastify';
import SimpleLoader from '../../loaders/SimpleLoader';
import { HandleErrors } from '../../utils/HandleErrors';

export default function CreateProposal() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const fileRef = useRef(null);
    const [fileName, setFileName] = useState("");
    const [downloadUrl, setDownloadUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const [loader, setLoader] = useState(true);




    const [formData, setFormData] = useState({
        Title: "",
        Abstract: "",
        ProposalFile: null
    });


    const handleUploadFile = () => {
        fileRef.current.type = 'file';
        fileRef.current.accept = ".pdf,.docx";
        fileRef.current.click();
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "file") {
            setFormData({ ...formData, ProposalFile: files[0] });
            setFileName(files[0].name);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }

    const handleSubmitProposal = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("Title", formData.Title);
        data.append("Abstract", formData.Abstract);
        data.append("ProposalFile", formData.ProposalFile);

        try {
            await createProposal(data);            
            toast.success("Proposal submitted successfully!");
        } catch (error) {
            HandleErrors(error.errors)
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        const myProposal = async () => {
            try {
                const res = await getMyProposal();

                setFormData({
                    Title: res.title,
                    Abstract: res.abstract,
                    ProposalFile: null
                });
                setDownloadUrl(res.downloadUrl);
                setFileName(res.fileName);
            } catch (error) {
                if (error)
                    return
            } finally {
                setLoader(false);
            }
        }
        myProposal();
    }, [])


    const handleDownload = async () => {
        try {
            const response = await api.get(downloadUrl, {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement("a");
            link.href = url;
            link.download = fileName || "proposal.pdf";
            document.body.appendChild(link);
            link.click();
            link.remove();

        } catch (error) {
            console.log("Download error:", error.response?.data || error);
        }
    };

    if (loader)
        return <Loader />

    return (
        <form
            onSubmit={handleSubmitProposal}
            encType="multipart/form-data"
            className='create-proposal relative border border-[#4cceac] shadow-[0px_0px_7px_#4cceac] rounded-[20px] overflow-y-hidden  my-5  lg:w-[90%] w-[98%] mx-auto'
            style={{ backgroundColor: colors.blueAccent[800] }}
        >
            <SimpleLoader loading={loading} />
            <div style={{
                backgroundImage: `linear-gradient(to right, ${theme.palette.mode === "dark" ? "#a2fae7" : colors.primary[600]} , ${colors.blueAccent[800]})`,
                color: colors.blueAccent[900]
            }} className={`title p-10 md:px-10 px-5`}>
                <h1 className="font-medium mb-1 text-3xl">New Project Proposal</h1>
                <p>Please provide comprehensive details about your project for administrative review and approval.</p>
            </div>

            <div className="input-box p-10 md:px-10 px-5 pb-8">
                <label style={{ color: colors.grey[300] }} htmlFor="">Project Title <span className='text-red-500'>*</span></label>
                <input
                    onChange={handleChange}
                    style={{ color: colors.grey[100], backgroundColor: colors.grey[800] }}
                    value={formData.Title}
                    name="Title"
                    type="text"
                    placeholder='Enter project title'
                />
            </div>

            <div className="input-box md:px-10 px-5 pb-8">
                <label style={{ color: colors.grey[300] }} htmlFor="abstract">Abstract / Description <span className='text-red-500'>*</span></label>
                <textarea
                    onChange={handleChange}
                    style={{ color: colors.grey[100], backgroundColor: colors.grey[800] }}
                    name="Abstract"
                    value={formData.Abstract}
                    rows={7} id="abstract"
                    placeholder='Provide a brief summary of your project goals, problem statement, and proposed solution...'
                />
            </div>

            <div className="input-box md:px-10 px-5 pb-8" >
                <label style={{ color: colors.grey[300] }} htmlFor="file">Full Proposal Document <span className='text-red-500'>*</span></label>
                <input onChange={handleChange} type="file" name='file' ref={fileRef} className='hidden' placeholder='Enter project title' />
                <div onClick={handleUploadFile} style={{ color: colors.grey[100], backgroundColor: colors.grey[800] }} className='cursor-pointer border border-[#a2fae7] border-dashed bg-[#2b2b2b] rounded-[10px] flex flex-col justify-center items-center p-10 overflow-hidden'>
                    <CloudUploadIcon style={{ fontSize: "4rem" }} />
                    <p className='text-center mt-4 pointer-events-none'>Click to upload your project file</p>
                    <p className='text-[12px] pointer-events-none'>PDF, DOCX up to 10MB</p>
                </div>
                <div className='flex flex-row justify-between text-[13px]'>
                    {
                        downloadUrl && (
                            <p onClick={handleDownload} className='mr-2 text-[12px] cursor-pointer underline text-blue-600'>
                                Download Current Proposal
                            </p>
                        )
                    }
                </div>
            </div>

            <div className='p-10 flex justify-center pt-0'>
                <button type='submit' className='px-10 tracking-[1px]'>Submit Proposal</button>
            </div>
        </form>
    )
}
