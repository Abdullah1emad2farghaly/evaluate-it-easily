import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProjectById } from '../../services/HistoricalProjectsServices';
import Loader from '../../loaders/Loader';
import Title from './Title';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { HandleErrors } from '../../utils/HandleErrors';

export default function View() {
    const params = useParams();
    const [project, setProject] = useState(null);
    const [loader, setLoader] = useState(true);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await getProjectById(params.id);
                setProject(data);
            } catch (error) {
                HandleErrors(error.errors)
            } finally {
                setLoader(false);
            }
        };
        fetchProject();
    }, [params.id]);


    if (loader)
        return <Loader />

    return (
        <div>
            <Title title="Project Details" />
            {project && (
                <div className=" min-h-[60vh] py-10 pt-5 sm:px-6 p-2 flex justify-center rounded" >
                    <div className="w-full max-w-[60rem]">
                        <div className="bg-[#66666682] rounded-xl p-6 border mb-6" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[800] }}>


                            <p className="text-2xl font-semibold tracking-widest mb-3" style={{ color: colors.grey[400] }}>
                                ABSTRACT
                            </p>

                            <p className="text-[.94rem] leading-7 mb-6" style={{ color: colors.grey[300] }}>
                                {project.abstract}
                            </p>


                            <div className="border-t  mb-6" style={{ borderColor: colors.grey[600] }}></div>


                            <div className="grid grid-cols-2 gap-y-6">

                                <div>
                                    <p className="text-sm tracking-widest mb-1" style={{ color: colors.grey[300] }}>
                                        GROUP NAME
                                    </p>
                                    <p className="text-[.94rem]" style={{ color: colors.grey[500] }}>
                                        {project.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm tracking-widest mb-1" style={{ color: colors.grey[300] }}>
                                        ACADEMIC YEAR
                                    </p>
                                    <p className="text-sm" style={{ color: colors.grey[500] }}>{project.academicYear}</p>
                                </div>

                                <div>
                                    <p className="text-sm tracking-widest mb-1" style={{ color: colors.grey[300] }}>
                                        ARCHIVED DATE
                                    </p>
                                    <p className="text-[.94rem]" style={{ color: colors.grey[500] }}>{project.archivedAt.split("T")[0]}</p>
                                </div>

                                <div>
                                    <p className="text-sm tracking-widest mb-1" style={{ color: colors.grey[300] }}>
                                        STATUS
                                    </p>
                                    <div className="flex items-center gap-2"  >
                                        <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                        <span className="text-[.94rem] text-gray-800" style={{ color: colors.grey[500] }}>Archived</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* <div className="grid grid-cols-2 gap-5">
                            <div className="bg-[#e9edf3] rounded-xl p-5">
                                <div className="flex justify-between items-center mb-3">
                                    <p className="text-[11px] text-gray-400 tracking-widest">
                                        PROPOSAL ID
                                    </p>

                                    <button className="flex items-center gap-1 text-sm text-blue-600">
                                        Copy
                                    </button>
                                </div>

                                <p className="text-[18px] text-gray-800">PR-8921</p>
                            </div>

                            <div className="bg-[#e9edf3] rounded-xl p-5">
                                <div className="flex justify-between items-center mb-3">
                                    <p className="text-[11px] text-gray-400 tracking-widest">
                                        ENTITY ID
                                    </p>

                                    <button className="flex items-center gap-1 text-sm text-blue-600">
                                        Copy
                                    </button>
                                </div>

                                <p className="text-[18px] text-gray-800">1024</p>
                            </div>

                        </div> */}

                    </div>
                </div>
            )}
        </div>
    )
}
