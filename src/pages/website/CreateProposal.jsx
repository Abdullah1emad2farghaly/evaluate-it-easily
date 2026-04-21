
import { tokens } from '../../theme';
import { useTheme } from '@emotion/react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Fragment, useEffect, useRef, useState } from 'react';
import { createProposal, getMyProposal } from '../../services/proposalServices';
import Loader from '../../loaders/Loader';
import { toast } from 'react-toastify';
import SimpleLoader from '../../loaders/SimpleLoader';
import { HandleErrors } from '../../utils/HandleErrors';
import Title from '../../components/admin/Title';
import ProposalCard from './ProposalCard';
import ProjectStatusTracker from "./ProjectStatusTracker"

export default function CreateProposal() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const fileRef = useRef(null);
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const [myProposal, setMyProposal] = useState(null);

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
                        <ProposalCard myProposal={myProposal} />
                    </div>
                ) : (
                    <Fragment>
                        <Title title={"NEW PROPOSAL"} subTitle={"create new project proposal"} />
                        <form
                            onSubmit={handleSubmitProposal}
                            encType="multipart/form-data"
                            className='create-proposal relative border  rounded-[20px] overflow-y-hidden  my-5 mx-auto'
                            style={{ backgroundColor: colors.grey[900], borderColor: colors.grey[800] }}
                        >
                            <SimpleLoader loading={loading} />
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
                                    <label style={{ color: colors.grey[300] }} htmlFor="">Project Title <span className='text-red-500'>*</span></label>
                                    <p className={`text-sm ${formData.Title.length ? "text-green-500" : "text-red-500"}`}>{formData.Title.length} / <span>20</span></p>
                                </div>
                                <input
                                    onChange={handleChange}
                                    style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}
                                    name="Title"
                                    type="text"
                                    placeholder='Enter project title'
                                />
                            </div>

                            <div className="input-box md:px-10 px-5 pb-8">
                                <div className='flex justify-between px-1'>
                                    <label style={{ color: colors.grey[300] }} htmlFor="abstract">Abstract / Description <span className='text-red-500'>*</span></label>
                                    <p className={`text-sm ${formData.Abstract.length < 20 ? "text-red-500" : "text-green-500"}`}>{formData.Abstract.length} / <span>200</span></p>
                                </div>
                                <textarea

                                    onChange={handleChange}
                                    style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}
                                    name="Abstract"
                                    rows={7} id="abstract"
                                    placeholder='Provide a brief summary of your project goals, problem statement, and proposed solution...'
                                />
                            </div>

                            <div className="input-box md:px-10 px-5 pb-8" >
                                <label style={{ color: colors.grey[300] }} htmlFor="file">Full Proposal Document <span className='text-red-500'>*</span></label>
                                <input onChange={handleChange} type="file" name='file' ref={fileRef} className='hidden' placeholder='Enter project title' />
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
                    </Fragment>
                )
            }
        </div>
    )
}
