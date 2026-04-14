import React, { useEffect, useState } from "react";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import MoveDownIcon from "@mui/icons-material/MoveDown";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import Title from "./Title";
export default function Carts({acceptedCount, rejectedCount, pendingCount}) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const accepted = acceptedCount;
    const rejected = rejectedCount;
    const pending = pendingCount;
    const totalProjects = acceptedCount + rejectedCount + pendingCount;
    let acceptedPercentage = 0;
    let rejectedPercentage = 0;
    let pendingPercentage = 0;
    
    if(totalProjects === 0) {
        acceptedPercentage = 0;
        rejectedPercentage = 0;
        pendingPercentage = 0;
    } else {
        acceptedPercentage = Math.round((acceptedCount / totalProjects) * 100);
        rejectedPercentage = Math.round((rejectedCount / totalProjects) * 100);
        pendingPercentage = Math.round((pendingCount / totalProjects) * 100);
    }


    const [acceptedProjects, setAcceptedProjects] = useState(0);
    const [rejectedProjects, setRejectedProjects] = useState(0);
    const [similarProjects, setSimilarProjects] = useState(0);

    const handleProjects = (setState,val)=>{
        let interval = setInterval(() => {
            setState((prev) => {
                if (prev >= val) {
                    clearInterval(interval);
                    return val;
                }
                return prev + 1;
            });
        }, 50);
        return () => clearInterval(interval);
    }
    
    useEffect(() => {
        handleProjects(setAcceptedProjects, acceptedPercentage);
        handleProjects(setRejectedProjects, rejectedPercentage);
        handleProjects(setSimilarProjects, pendingPercentage);
        
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Title title={"DASHBOARD"} />
            <div className="relative grid grid-cols-12 px-2 carts overflow-hidden gap-3">
                <div className="col-span-12 sm:col-span-6 lg:col-span-4" data-aos="fade-left" data-aos-delay="0">
                    <div
                        className="border-0 flex h-40 justify-center items-center rounded-lg p-3 accepted shadow"
                        style={{ backgroundColor: colors.blueAccent[800] }}
                    >
                        <div className="flex w-[90%] justify-between items-center">
                            <div className="left flex flex-col items-center ml-2">
                                <div className="icon text-[var(--primary-color)] mb-2">
                                    <SwipeRightIcon sx={{ fontSize: "40px" }} />
                                </div>
                                <div className="details">
                                    <h4
                                        className="m-0 text-center text-2xl"
                                        style={{ color: colors.grey[200] }}
                                    >
                                        {accepted}
                                    </h4>
                                    <p className="m-0 text-[var(--primary-color)] mt-2">
                                        Accepted Projects
                                    </p>
                                </div>
                            </div>

                            <div className="right flex flex-col items-center">
                                <div
                                    className="circle-persntage"
                                    style={{ backgroundColor: colors.primary[400] }}
                                >
                                    <div
                                        className="cover"
                                        style={{ backgroundColor: colors.primary[500] }}
                                    ></div>
                                    <div
                                        style={{
                                            background: `conic-gradient(var(--primary-color) ${acceptedProjects}%, transparent 0%)`,
                                        }}
                                        className="conic"
                                    ></div>
                                </div>
                                <p className="mt-4 text-xl text-[var(--primary-color)]">
                                    +{acceptedProjects}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 sm:col-span-6 lg:col-span-4 " data-aos="fade-left" data-aos-delay="300">
                    <div
                        className="border-0 flex h-40 justify-center items-center rounded-lg p-3 similar shadow"
                        style={{ backgroundColor: colors.blueAccent[800] }}
                    >
                        <div className="flex justify-between w-[90%] items-center">
                            <div className="left flex flex-col items-center ml-2">
                                <div className="icon mb-2 text-[#f9c11a]">
                                    <MoveDownIcon sx={{ fontSize: "40px" }} />
                                </div>
                                <div className="details">
                                    <h4
                                        className="m-0 text-center text-2xl"
                                        style={{ color: colors.grey[200] }}
                                    >
                                        {pending}
                                    </h4>
                                    <p className="m-0 text-center text-[#f9c11a] mt-2">
                                        Similar Past <br /> Projects
                                    </p>
                                </div>
                            </div>

                            <div className="right flex flex-col items-center">
                                <div
                                    className="circle-persntage"
                                    style={{ backgroundColor: colors.primary[400] }}
                                >
                                    <div
                                        className="cover"
                                        style={{ backgroundColor: colors.primary[500] }}
                                    ></div>
                                    <div
                                        style={{
                                            background: `conic-gradient(#f9c11a ${similarProjects}%, transparent 0%)`,
                                        }}
                                        className="conic"
                                    ></div>
                                </div>
                                <p className="mt-4 text-xl text-[#f9c11a]">
                                    +{similarProjects}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-12 sm:col-span-6 lg:col-span-4 " data-aos="fade-left" data-aos-delay="600">
                    <div
                        className="border-0 flex h-40 justify-center items-center rounded-lg p-3 rejected shadow"
                        style={{ backgroundColor: colors.blueAccent[800] }}
                    >
                        <div className="flex justify-between w-[90%] items-center">
                            <div className="left flex flex-col items-center ml-2">
                                <div className="icon mb-2 text-[#db4f4aff]">
                                    <HourglassDisabledIcon sx={{ fontSize: "40px" }} />
                                </div>
                                <div className="details">
                                    <h4
                                        className="m-0 text-center text-2xl"
                                        style={{ color: colors.grey[200] }}
                                    >
                                        {rejected}
                                    </h4>
                                    <p className="m-0 mt-2 text-[#db4f4aff]">Rejected Projects</p>
                                </div>
                            </div>

                            <div className="right flex flex-col items-center">
                                <div
                                    className="circle-persntage"
                                    style={{ backgroundColor: colors.primary[400] }}
                                >
                                    <div
                                        className="cover"
                                        style={{ backgroundColor: colors.primary[500] }}
                                    ></div>
                                    <div
                                        style={{
                                            background: `conic-gradient(#db4f4aff ${rejectedProjects}%, transparent 0%)`,
                                        }}
                                        className="conic"
                                    ></div>
                                </div>
                                <p className="mt-4 text-xl text-[#db4f4aff]">
                                    -{rejectedProjects}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
