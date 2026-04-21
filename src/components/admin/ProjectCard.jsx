import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/Group";
import DescriptionIcon from "@mui/icons-material/Description";
import DownloadIcon from "@mui/icons-material/Download";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { handleDownload } from "./DownloadProposal";
import { useNavigate } from "react-router-dom";

const PROJECT_STATUS = 'UnderReview';

export function ProjectCard({ item, colors }) {

    const navigate = useNavigate();

    const statusStyles = {
        Accepted: "bg-green-500 text-[#fff]",
        Pending: "bg-yellow-600 text-[#fff]",
        Rejected: "bg-red-500 text-[#fff]",
        UnderReview: "bg-orange-500 text-[#fff]",
    };

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
            className="border rounded-[14px] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.08)] transition-all"
        >

            {/* Header */}
            <div className="cursor-pointer" onClick={() => navigate(`${item.id}`)}>
                <div className="flex justify-between pointer-events-none items-start gap-3 mb-2">
                    <h2 className="text-[16px] font-semibold leading-5.5 " style={{ color: colors.grey[100] }}>
                        {item.title}
                    </h2>

                    <span
                        className={`text-[12px] font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap ${statusStyles[item.status]}`}
                    >
                        {item.status}
                    </span>
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
                    <span style={{ color: colors.grey[300] }}>Submitted {formatDate(item.submittedAt)}</span>
                </div>

                <div className="flex items-center gap-1.5" style={{ color: colors.grey[100] }}>
                    <GroupIcon sx={{ fontSize: 16 }} />
                    <span style={{ color: colors.grey[300] }}>
                        {item.membersCount} members
                    </span>
                </div>

                <div className="flex items-center gap-1.5" style={{ color: colors.grey[100] }}>
                    <DescriptionIcon sx={{ fontSize: 16 }} />
                    <span style={{ color: colors.grey[300] }}>{item.fileName}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2.5">
                <button
                    className="flex-1 flex items-center border cursor-pointer justify-center gap-2 text-sm font-medium py-2.5 rounded-[10px]"
                    style={{ backgroundColor: colors.greenAccent[600], borderColor: colors.grey[700] }}
                    onClick={() => navigate(`/admin/analyze/${item.id}`)}
                >
                    <QueryStatsIcon sx={{ fontSize: 18 }} />
                    Analyze
                </button>

                <button onClick={() => handleDownload(item)} className="flex-1 flex items-center justify-center gap-2 cursor-pointer text-sm font-medium py-2.5 rounded-[10px] border text-white" style={{ backgroundColor: "black", borderColor: colors.grey[700] }}>
                    <DownloadIcon sx={{ fontSize: 18 }} />
                    Download
                </button>
            </div>
        </div>
    );
}

export default function SubmissionsPage({ data }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <div className=" min-h-screen">
            <div className="mb-4 relative mt-4 flex items-center gap-3">
                <div className="px-1.5 py-3 block bg-[#22e788dd] rounded" />
                <p className="text-lg" style={{ color: colors.grey[100] }}> Number of Proposals :&nbsp; {data.length}</p>
            </div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                {data.map((item) => (
                    <ProjectCard key={item.id} colors={colors} item={item} />
                ))}
            </div>
        </div>
    );
}