
import { tokens } from '../../theme';
import { useTheme } from '@emotion/react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { createProposal, getMyProposal, presignedUpload } from '../../services/proposalServices';
import Loader from '../../loaders/Loader';
import { toast } from 'react-toastify';
import SimpleLoader from '../../loaders/SimpleLoader';
import { HandleErrors } from '../../utils/HandleErrors';
import Title from '../../components/admin/Title';
import ProposalCard from '../../components/website/ProposalCard';
import ProjectStatusTracker from "../../components/website/ProjectStatusTracker"
import axios from 'axios';
import UploadOverlay from '../../components/website/UploadOverlay';

export default function CreateProposal() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const fileRef = useRef(null);
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const [myProposal, setMyProposal] = useState(null);
    const [loader, setLoader] = useState(true);
    const [fileUpload, setFileUpload] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const [data, setData] = useState({
        title: "",
        abstract: "",
        originalFileName: "",
        storedFileName: "",
        contentType: "application/pdf",
    });


    const handleUploadFile = () => {
        fileRef.current.type = 'file';
        fileRef.current.accept = ".pdf";
        fileRef.current.multiple = false;
        fileRef.current.click();
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "file") {
            const max_size = 10 * 1024 * 1024; // 10MB
            const file = files[0];
            if (file.size > max_size) {
                toast.error("File size exceeds 10MB limit.");
                fileRef.current.value = null;
                fileRef.current.files = null;
                setFileUpload(null);
                setFileName("");
                return;
            }
            setFileUpload(files[0]);
            setData({ ...data, originalFileName: file.name });
            setFileName(files[0].name);
        } else {
            setData({ ...data, [name]: value });
        }
    }

    const handleSubmitProposal = useCallback(async (e) => {
        e.preventDefault();
        if (!data.title || !data.abstract || !fileUpload) {
            toast.error("Please fill all the required fields.");
            return;
        }
        setUploadProgress(0);
        setLoading(true);

        try {
            const { uploadUrl, storedFileName } = await presignedUpload(fileName);

            await axios.put(uploadUrl, fileUpload, {
                headers: {
                    'Content-Type': fileUpload.type,
                },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percent);
                },
            });
            
            const res = await createProposal({ ...data, storedFileName: storedFileName });
            setMyProposal(res);
            toast.success("Proposal submitted successfully!");
        } catch (error) {
            console.log(error)
            HandleErrors(error.errors)
        } finally {
            setLoading(false);
        }
    }, [data, fileUpload, fileName])


    useEffect(() => {
        const myProposal = async () => {
            try {
                const res = await getMyProposal();
                setMyProposal(res);
            } catch (error) {
                HandleErrors(error.errors);
            } finally {
                setLoader(false);
            }
        }
        myProposal();
    }, [])

    if (loader)
        return <Loader />

    return (
        <div className='lg:pr-4 pt-6 '>
            {
                myProposal ? (
                    <div>
                        <ProposalCard myProposal={myProposal} setMyProposal={setMyProposal} />
                    </div>
                ) : (
                    <div>
                        <Title title={"NEW PROPOSAL"} subTitle={"create new project proposal"} />
                        {loading && <UploadOverlay progress={uploadProgress} />}
                        <form
                            onSubmit={handleSubmitProposal}
                            encType="multipart/form-data"
                            name='formData'
                            className='create-proposal relative border  rounded-[20px] overflow-y-hidden  my-5 mx-auto'
                            style={{ backgroundColor: colors.grey[900], borderColor: colors.grey[800] }}
                        >
                            <div style={{
                                backgroundColor: colors.grey[900],
                                color: colors.grey[100],
                                borderColor: colors.grey[800]
                            }} className={`title p-10 md:px-10 px-5 border-b`}>
                                <h1 className="font-medium mb-1 text-3xl">Submit A Proposal</h1>
                                <p className='text-sm' style={{ color: colors.grey[300] }}>Please provide comprehensive details about your project for administrative review and approval.</p>
                            </div>

                            <div className="input-box p-10 md:px-10 px-5 pb-8">
                                <div className='flex justify-between px-1'>
                                    <label style={{ color: colors.grey[300] }} htmlFor="title">Project Title <span className='text-red-500'>*</span></label>
                                    <p className={`text-sm ${data.title.length >= 3 ? "text-green-500" : "text-red-500"}`}>{data.title.length} / min <span>3</span></p>
                                </div>
                                <input
                                    onChange={handleChange}
                                    style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}
                                    name="title"
                                    type="text"
                                    id='title'
                                    placeholder='Enter project title'
                                />
                            </div>

                            <div className="input-box md:px-10 px-5 pb-8">
                                <div className='flex justify-between px-1'>
                                    <label style={{ color: colors.grey[300] }} htmlFor="abstract">Abstract / Description <span className='text-red-500'>*</span></label>
                                    <p className={`text-sm ${data.abstract.length < 20 ? "text-red-500" : "text-green-500"}`}>{data.abstract.length} / min <span>20</span></p>
                                </div>
                                <textarea

                                    onChange={handleChange}
                                    style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}
                                    name="abstract"
                                    id='abstract'
                                    rows={7}
                                    placeholder='Provide a brief summary of your project goals, problem statement, and proposed solution...'
                                />
                            </div>

                            <div className="input-box md:px-10 px-5 pb-8" >
                                <label style={{ color: colors.grey[300] }} htmlFor="file">Full Proposal Document <span className='text-red-500'>*</span></label>
                                <input onChange={handleChange} type="file" id='file' name='file' ref={fileRef} className='hidden' placeholder='Enter project title' />
                                <div onClick={handleUploadFile} style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }} className='cursor-pointer border border-[#a2fae7] border-dashed bg-[#2b2b2b] rounded-[10px] flex flex-col justify-center items-center p-10 overflow-hidden'>
                                    <CloudUploadIcon style={{ fontSize: "4rem" }} />
                                    <p className='text-center mt-4 pointer-events-none'>Click to upload your project file</p>
                                    <p className='text-[12px] pointer-events-none'>PDF, DOCX up to 10MB</p>
                                </div>
                                <p className='text-green-500 text-sm'> {fileName ? `uploaded : ${fileName}` : ""}</p>
                            </div>

                            <div className='p-10 flex justify-center pt-0'>
                                <button type='submit' className='px-10 tracking-[1px]' >Submit Proposal</button>
                            </div>
                        </form>
                    </div>
                )
            }
        </div>
    )
}
