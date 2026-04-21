import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHistoricalProjects } from "../../services/HistoricalProjectsServices";
import Loader from "../../loaders/Loader";
import { HandleErrors } from "../../utils/HandleErrors";
import LottieFiles from "../../lottieFiles/LottieFiles";
import Title from "../../components/admin/Title";
import TuneIcon from "@mui/icons-material/Tune";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/Group";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

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
        <div className="mt-4 pb-5 lg:pr-4 lg:px-0 px-3">
            <Title title={"Historical Projects"} />

            <div className="grid md:grid-cols-2 grid-cols-1 gap-3 relative">
                {
                    projects.length ? (
                        projects?.map((project, index) => (
                            
                            <ProjectCard key={index} colors={colors} item={project} />
                            
                        ))
                    ): (
                        <LottieFiles name={"animatedData2"} />
                    )
                }
            </div>
        </div>
    );
}


export function ProjectCard({ item, colors }) {

    const navigate = useNavigate();


    const formatDate = (dateString) => {
        if (!dateString) return "";

        const date = new Date(dateString);

        return date.toLocaleDateString("en-US", {
            month: "short",  // Apr
            day: "numeric",  // 9
            year: "numeric", // 2026
        });
    };

    return (
        <div
            style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[800] }}
            className="border rounded-[14px] p-5 "
        >

            {/* Header */}
            <div className="cursor-pointer" onClick={() => navigate(`${item.id}`)}>
                <div className="flex justify-between pointer-events-none items-start gap-3 mb-2">
                    <h2 className="text-[16px] font-semibold truncate leading-5.5 " style={{ color: colors.grey[100] }}>
                        {item.name}
                    </h2>
                </div>

                {/* Abstract */}
                <p className="text-xs pointer-events-none leading-5 mb-4 line-clamp-4" style={{ color: colors.grey[300] }}>
                    {item.abstract}
                </p>
            </div>

            {/* Meta */}
            <div className="space-y-1.5 text-[13px] mb-3.5">
                <div className="flex items-center gap-1.5" style={{ color: colors.grey[100] }}>
                    <CalendarTodayIcon sx={{ fontSize: 16 }} />
                    <span style={{ color: colors.grey[300] }}>AcademicYear : {item.academicYear}</span>
                </div>
                <div className="flex items-center gap-1.5" style={{ color: colors.grey[100] }}>
                    <CalendarTodayIcon sx={{ fontSize: 16 }} />
                    <span style={{ color: colors.grey[300] }}>AchivedAt : {formatDate(item.archivedAt)}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2.5">
                <button
                    className="flex-1 flex items-center border cursor-pointer justify-center gap-2 text-sm font-medium py-2.5 rounded-[10px]"
                    style={{ backgroundColor: colors.greenAccent[600], borderColor: colors.grey[700] }}
                    onClick={() => navigate(`${item.id}`)}
                >
                    <QueryStatsIcon sx={{ fontSize: 18 }} />
                    View
                </button>
            </div>
        </div>
    );
}