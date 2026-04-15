import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupsIcon from '@mui/icons-material/Groups';
import DownloadIcon from '@mui/icons-material/Download';
import { getProposalById } from "../../services/proposalServices";
import { useParams } from "react-router-dom";
import Loader from "../../loaders/Loader";
import { HandleErrors } from "../../utils/HandleErrors";
import { handleDownload } from "../../components/admin/DownloadProposal";


export default function ProposalView() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [project, setProject] = useState(null);
    const [loader, setLoader] = useState(true);
    const [submitedTime, setSubmitedTime] = useState("");
    const params = useParams();
    useEffect(() => {
        const fetchedProject = async () => {
            try {
                const projectData = await getProposalById(params.id);
                setProject(projectData);
                const firstPart = projectData.submittedAt.split("T")[1];
                const secondPart = firstPart.split(":");
                setSubmitedTime(`${secondPart[0]}:${secondPart[1]}`)

            } catch (error) {
                HandleErrors(error.errors)
            } finally {
                setLoader(false);
            }
        }

        fetchedProject();
        window.scrollTo(0, 0);
    }, []);


    const getStatusColor = (status) => {
        switch (status) {
            case "Accepted": return "bg-green-500";
            case "Rejected": return "bg-red-500 ";
            case "UnderReview": return "bg-yellow-500";
            default: return "bg-gray-500";
        }
    }

    if (loader)
        return <Loader />

    return (
        <div className=" min-h-screen lg:pr-4 px-3 lg:px-0 flex flex-col justify-between">

            {/* CONTENT */}
            {
                project && (
                    <div className="p- mx-auto w-full">

                        {/* Top Card */}
                        <div className="rounded-2xl p-5 border mb-5" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[800] }}>
                            <div className="flex justify-between items-start">
                                <h2 className="text-xl font-semibold leading-snug" style={{ color: colors.grey[300] }}>
                                    {project.title}
                                </h2>

                                <span className={`${getStatusColor(project.status)} text-white text-sm px-4 py-1 rounded-full`}>
                                    {project.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 mt-4 text-gray-500 text-sm">
                                <CalendarTodayIcon fontSize="small" />
                                <span>{`${project.submittedAt.split("T")[0]} ${submitedTime}`}</span>
                            </div>
                        </div>

                        {/* Abstract */}
                        <div className="rounded-2xl p-5 border mb-5" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[800] }}>
                            <p className="text-lg font-semibold tracking-widest mb-3" style={{ color: colors.grey[400] }}>
                                ABSTRACT
                            </p>

                            <p className="text-[.95rem] leading-7" style={{ color: colors.grey[300] }}>
                                {project.abstract}
                            </p>
                        </div>

                        <div className="sm:flex block gap-5">
                            <div className="sm:w-1/2 rounded-2xl p-5 border mb-5" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[800] }}>
                                <p className="text-md text-gray-400 tracking-widest mb-4" style={{ color: colors.grey[400] }}>
                                    GROUP INFO
                                </p>

                                <div className="flex items-center gap-4 mb-5">
                                    <div className="bg-blue-300 p-3 rounded-xl">
                                        <GroupsIcon fontSize="medium" className="text-gray-800" />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold" style={{ color: colors.grey[200] }}>
                                            {project.groupName}
                                        </h3>
                                        <p className="text-sm" style={{ color: colors.grey[400] }}>
                                            Group Name
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="border rounded-xl p-3" style={{ backgroundColor: colors.grey[900], borderColor: colors.grey[800] }}>
                                        <p className="text-xs  mb-1" style={{ color: colors.grey[400] }}>Leader</p>
                                        <p className="font-medium" style={{ color: colors.grey[300] }}>
                                            {project.leaderName}
                                        </p>
                                    </div>

                                    <div className="border rounded-xl p-3" style={{ backgroundColor: colors.grey[900], borderColor: colors.grey[800] }}>
                                        <p className="text-xs  mb-1" style={{ color: colors.grey[400] }}>Members</p>
                                        <p className="font-medium" style={{ color: colors.grey[300] }}>
                                            {project.membersCount} Professional
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="sm:w-1/2 flex flex-col justify-between relative rounded-2xl p-5 border mb-5" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[800] }}>
                                <p className="text-md tracking-widest mb-4" style={{ color: colors.grey[400] }}>
                                    FILE DETAILS
                                </p>

                                <div>
                                    <div className="flex justify-between text-sm mb-3">
                                        <span className="" style={{ color: colors.grey[500] }}>File Name</span>
                                        <span className="text-gray-800 font-medium" style={{ color: colors.grey[300] }}>
                                            {project.fileName}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm mb-5">
                                        <span className="" style={{ color: colors.grey[500] }}>Content Type</span>
                                        <span className="text-gray-800 font-medium" style={{ color: colors.grey[300] }}>
                                            {project.contentType}
                                        </span>
                                    </div>
                                </div>

                                <button onClick={()=>handleDownload(project)} className="w-full text-white bg-[#131313] py-3 cursor-pointer rounded-xl flex items-center justify-center gap-2 text-sm">
                                    <DownloadIcon fontSize="small" />
                                    Download File
                                </button>
                            </div>
                        </div>

                    </div>
                )
            }
        </div>
    );
}