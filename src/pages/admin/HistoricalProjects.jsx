import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHistoricalProjects } from "../../services/HistoricalProjectsServices";
import Loader from "../../loaders/Loader";
import { HandleErrors } from "../../utils/HandleErrors";
import LottieFiles from "../../lottieFiles/LottieFiles";
import Title from "./Title";
export default function HistoricalProjects() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loader, setLoader] = useState(true);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getHistoricalProjects();
                setProjects(data);
                console.log(data)
            } catch (error) {
                HandleErrors(error.errors)
            } finally {
                setLoader(false)
            }
        };
        fetchProjects();
    }, []);

    if (loader)
        return <Loader />

    return (
        <div className="w-full mt-4 pb-5 lg:pr-4 lg:px-0 px-3">
            <Title title={"Historical Projects"} />

            <div className="w-full border-collapse">
                {
                    projects.length ? (
                        projects?.map((project, index) => (
                            <div
                                key={index}
                                className="mb-3 flex md:flex-row flex-col items-center justify-between project p-4 pl-6 text-start rounded"
                                style={{ backgroundColor: colors.blueAccent[800] }}
                                data-aos="fade-up"
                            >
                                <p
                                    style={{ color: colors.grey[200] }}
                                    className="line-clamp-3 overflow-hidden text-[15px] md:pr-4"
                                >
                                    {project.abstract}
                                </p>

                                <NavLink
                                    to={`${project.id}`}
                                    className="border-0 md:mt-0 mt-4 text-white hover:bg-[#009c73] duration-500 rounded analyze-link font-semibold"
                                >
                                    View
                                </NavLink>
                            </div>
                        ))
                    ): (
                        <LottieFiles name={"animatedData2"} />
                    )
                }
            </div>
        </div>
    );
}
