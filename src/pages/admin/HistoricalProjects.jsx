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
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const FilterList = ({ colors, setYear, options = [] }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme()
    const [selected, setSelected] = useState(options[0]);
    useEffect(() => {
        setYear(selected);
    }, [selected, setYear]);
    return (
        <div className="w-full px-4 items-center cursor-pointer border rounded-lg flex relative" style={{ color: colors.grey[300], backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}>
            <input
                type="text"
                value={selected}
                readOnly
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 100)}
                className={`w-full focus:cursor-pointer hover:cursor-pointer py-2 rounded-lg focus:outline-none`}
            />
            <p><ArrowDropDownIcon /></p>

            {open && (
                <ul className="absolute w-full sm:max-w-50 left-0 top-10 border border-[#00bc8a] mt-1 rounded-lg shadow-lg max-h-50 overflow-y-auto z-50" style={{ backgroundColor: colors.blueAccent[800] }} >
                    {
                        options.map((opt, index) => {
                            return (
                                <li
                                    key={index}
                                    onMouseDown={() => {
                                        setOpen(false);
                                        setSelected(opt)
                                    }}
                                    style={{ color: colors.grey[200] }}
                                    className={`p-2 py-1.5 cursor-pointer hover:text-[#00bc8a!important] ${theme.palette.mode === "dark" ? "hover:bg-[#87878752]" : "hover:bg-[#cecece6f]"}`}
                                >
                                    {opt}
                                </li>
                            )
                        })
                    }
                </ul>
            )}
        </div>
    );
};

export default function HistoricalProjects() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loader, setLoader] = useState(true);
    const [projects, setProjects] = useState([]);
    const [search, setSearch] = useState("");
    const [acadimicYears, setAcademicYears] = useState(["All Academic Years"]);
    const [year, setYear] = useState();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getHistoricalProjects();
                setAcademicYears(["All Academic Years", ...new Set(data.map(project => project.academicYear))]);
                setProjects(data);
            } catch (error) {
                HandleErrors(error.errors)
            } finally {
                setLoader(false)
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(project => {
        const matchesSearch =
            (project.name || "").toLowerCase().includes(search.toLowerCase().trim(" "))
            || (project.abstract || "").toLowerCase().includes(search.toLowerCase().trim(" "));
        const matchesAcademicYear =
            year === "All Academic Years" || project.academicYear === year;

        return matchesSearch && matchesAcademicYear;
    });

    if (loader)
        return <Loader />

    return (
        <div className="mt-4 pb-5 lg:pr-4 lg:px-0 px-3">
            <Title title={"Historical Projects"} />




            {
                projects.length ? (
                    <div>
                        <div className="flex flex-col sm:flex-row  gap-2 mb-5 relative">
                            <div className="flex items-center w-full border rounded-lg px-3" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700], color: colors.grey[300] }}>
                                <SearchIcon className="text-gray-400" />
                                <input
                                    placeholder="Search by groups name..."
                                    className="w-full px-2 py-2 text-sm outline-none"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <FilterList colors={colors} setYear={setYear} options={acadimicYears} title={"Select to filter..."} />

                            <button className="border flex gap-3 px-3 py-2 rounded-lg items-center" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700], color: colors.grey[100] }}>
                                <FilterListIcon fontSize="small" />
                                Filtering
                            </button>
                        </div>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-3 relative">
                            {filteredProjects?.map((project, index) => (
                                <ProjectCard key={index} colors={colors} item={project} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <LottieFiles name={"animatedData2"} />
                )
            }

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