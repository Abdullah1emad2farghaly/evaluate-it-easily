import { Fragment, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { HandleErrors } from "../../utils/HandleErrors";
import { getGroups } from "../../services/groupServices";
import Loader from "../../loaders/Loader";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { getAllUsers } from "../../services/userServices";
import { SupervisorAssignments } from "../../services/supervisorServices";
import SimpleLoader from "../../loaders/SimpleLoader";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import Title from "../../components/admin/Title";

export default function ManageTeams() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [teams, setTeams] = useState([]);
    const [loader, setLoader] = useState(true);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [supervisors, setSupervisors] = useState([]);
    const [assistants, setAssistants] = useState([]);
    const [supervisor, setSupervisor] = useState();
    const [assistant, setAssistant] = useState();
    const [statuses, setStatuses] = useState([]);
    const [status, setStatus] = useState();
    const [open, setOpen] = useState(false)
    const [proposalId, setProposalId] = useState();
    const [message, setMessage] = useState("");
    const [expanded, setExpanded] = useState(null);
    const [search, setSearch] = useState("");


    const IntialLetters = (name) => {
        const initail = name.split(' ')
        if (initail.length > 1) {
            return `${initail[0][0]}${initail[1][0]}`;
        } else {
            return `${initail[0][0]}`;
        }
    }

    useEffect(() => {
        const getTeams = async () => {
            try {
                const res = await getGroups();
                setTeams(res);
                console.log("Groups : ", res)
                const allUsers = await getAllUsers();
                
                setAssistants(allUsers?.filter((user) => user.role === "TechnicalAssistant"))
                setSupervisors(allUsers?.filter((user) => user.role === "Supervisor"))
                setStatuses(["All Status", ...new Set(res.map((g) => g.proposalStatus).filter(status => status != null))])
            } catch (error) {
                HandleErrors(error.errors);
            } finally {
                setLoader(false)
            }
        }
        getTeams()
    }, []);


    const filteredTeams = teams.filter(team => {
        const matchesSearch =
            (team.name || "").toLowerCase().includes(search.toLowerCase()) ||
            (team.leaderName || "").toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            status === "All Status" || team.proposalStatus === status;

        return matchesSearch && matchesStatus;
    });


    const confirm = async (proposalId, supervisorId, technicalAssistantId, workloadNote) => {
        setLoading(true)
        try {
            await SupervisorAssignments({ proposalId, supervisorId, technicalAssistantId, workloadNote });

            toast.success("Supervisor and TechnicalAssistant are assigned successfully")
            setOpen(false);
            const res = await getGroups();  
            console.log(res)
            setTeams(res);
        } catch (error) {
            HandleErrors(error.errors);
        } finally {
            setLoading(false);
        }
    }

    const STATUS_CONFIG = {
        Accepted: { pdfRGB: [187, 247, 208], label: "Accepted", tw: "bg-green-200 border-green-500 text-green-900" },
        UnderReview: { pdfRGB: [254, 215, 170], label: "Under Review", tw: "bg-orange-200 border-orange-500 text-orange-900" },
        Pending: { pdfRGB: [253, 246, 178], label: "Pending", tw: "bg-yellow-200 border-yellow-500 text-yellow-900" },
        Rejected: { pdfRGB: [254, 202, 202], label: "Rejected", tw: "bg-red-200 border-red-500 text-red-900" },

        // ✅ NEW الحالة المطلوبة
        NotSubmitted: {
            pdfRGB: [254, 202, 202], // نفس لون rejected
            label: "Not Submitted Proposal",
            tw: "bg-red-200 border-red-500 text-red-900"
        },
    };

    // ─────────────────────────────────────────────────────────────────────────────
    // PDF GENERATOR
    // ─────────────────────────────────────────────────────────────────────────────

    function generateTeamsPDF(teams) {
        const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

        const PW = doc.internal.pageSize.getWidth();   // 297 mm
        const PH = doc.internal.pageSize.getHeight();  // 210 mm
        const M = 10;    // page margin
        const GAP = 1.8;   // tiny white gap between rows
        const FS = 7.8;   // base font size
        const LH = 4.0;   // line height per text line (mm)
        const PV = 3.2;   // vertical padding inside each row
        const PH2 = 3.0;   // horizontal padding inside each row


        const COLS = {
            no: { x: 0, w: 10 },
            mem: { x: 10, w: 78 },
            sup: { x: 88, w: 62 },
            ta: { x: 150, w: 62 },
            stat: { x: 212, w: 65 },
        };

        let currentY = M + 2;

        // ── Page header helper ──────────────────────────────────────────
        const drawPageHeader = (pageNum) => {
            // Title
            doc.setFont("helvetica", "bold");
            doc.setFontSize(13);
            doc.setTextColor(15, 23, 42);
            doc.text("Teams Proposal Status Report", M, currentY + 4);

            // Date  +  total
            doc.setFont("helvetica", "normal");
            doc.setFontSize(7.5);
            doc.setTextColor(100, 116, 139);
            const dateStr = new Date().toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
            });
            doc.text(
                `Generated: ${dateStr}   ·   Total Teams: ${teams.length}   ·   Page ${pageNum}`,
                M,
                currentY + 10
            );

            // Separator
            doc.setDrawColor(203, 213, 225);
            doc.setLineWidth(0.25);
            doc.line(M, currentY + 13, PW - M, currentY + 13);
            currentY += 17;

            // ── Column header row ──
            const headerH = 7.5;
            doc.setFillColor(30, 41, 59);
            doc.roundedRect(M, currentY, PW - M * 2, headerH, 1.5, 1.5, "F");

            doc.setFont("helvetica", "bold");
            doc.setFontSize(7.2);
            doc.setTextColor(248, 250, 252);

            const headerTextY = currentY + headerH / 2 + 2.2;
            const drawH = (label, col) =>
                doc.text(label, M + col.x + PH2, headerTextY);

            drawH("#", COLS.no);
            drawH("Members", COLS.mem);
            drawH("Supervisor", COLS.sup);
            drawH("Technical Assistant", COLS.ta);
            drawH("Proposal Status", COLS.stat);

            currentY += headerH + GAP;
        };

        // ── Draw first page header ──────────────────────────────────────
        let pageNum = 1;
        drawPageHeader(pageNum);

        // ── Team rows ──────────────────────────────────────────────────
        teams.forEach((team, idx) => {
            const statusKey = team.proposalStatus === null
                ? "NotSubmitted"
                : team.proposalStatus;

            const cfg = STATUS_CONFIG[statusKey] || STATUS_CONFIG["Pending"];

            // Dynamic row height based on member count
            const memberCount = team.members?.length || 1;
            const rowH = Math.max(memberCount * LH + PV * 2, 11);

            // ── Page break? ─────────────────────────────────────────────
            if (currentY + rowH > PH - M - 6) {
                // Footer on current page
                doc.setFont("helvetica", "normal");
                doc.setFontSize(7);
                doc.setTextColor(148, 163, 184);
                doc.setDrawColor(226, 232, 240);
                doc.setLineWidth(0.2);
                doc.line(M, PH - 7, PW - M, PH - 7);
                doc.text(`Page ${pageNum}`, PW - M - 12, PH - 3.5);

                doc.addPage();
                pageNum++;
                currentY = M + 2;
                drawPageHeader(pageNum);
            }

            // ── Colored background ───────────────────────────────────────
            doc.setFillColor(...cfg.pdfRGB);
            doc.roundedRect(M, currentY, PW - M * 2, rowH, 2, 2, "F");

            // Subtle border
            doc.setDrawColor(210, 210, 210);
            doc.setLineWidth(0.12);
            doc.roundedRect(M, currentY, PW - M * 2, rowH, 2, 2, "S");

            // ── Vertical column dividers ─────────────────────────────────
            doc.setDrawColor(180, 180, 180);
            doc.setLineWidth(0.08);
            [COLS.mem, COLS.sup, COLS.ta, COLS.stat].forEach((col) => {
                const divX = M + col.x - 1;
                doc.line(divX, currentY + 2, divX, currentY + rowH - 2);
            });

            // ── Cell text ────────────────────────────────────────────────
            const textBaseY = currentY + PV + LH;
            doc.setTextColor(15, 23, 42);

            // # – team number
            doc.setFont("helvetica", "bold");
            doc.setFontSize(8.5);
            const numStr = String(idx + 1);
            const numW = doc.getTextWidth(numStr);
            doc.text(numStr, M + COLS.no.x + (COLS.no.w - numW) / 2, textBaseY);

            // Members – one name per line
            doc.setFont("helvetica", "normal");
            doc.setFontSize(FS);
            (team.members || []).forEach((member, i) => {
                const wrapped = doc.splitTextToSize(member.fullName, COLS.mem.w - PH2 * 2);
                doc.text(wrapped[0], M + COLS.mem.x + PH2, textBaseY + i * LH);
            });

            // Supervisor
            doc.setFont("helvetica", "normal");
            doc.setFontSize(FS);
            const supLines = doc.splitTextToSize(team.supervisorName || "—", COLS.sup.w - PH2 * 2);
            doc.text(supLines[0], M + COLS.sup.x + PH2, textBaseY);

            // Technical Assistant
            const taLines = doc.splitTextToSize(team.technicalAssistantName || "—", COLS.ta.w - PH2 * 2);
            doc.text(taLines[0], M + COLS.ta.x + PH2, textBaseY);

            // Status label (bold)
            doc.setFont("helvetica", "bold");
            doc.setFontSize(FS);
            doc.text(cfg.label, M + COLS.stat.x + PH2, textBaseY);

            currentY += rowH + GAP; // ← GAP = tiny white space between rows
        });

        // ── Final page footer ──────────────────────────────────────────
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(148, 163, 184);
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.2);
        doc.line(M, PH - 7, PW - M, PH - 7);
        doc.text(`Total: ${teams.length} teams`, M, PH - 3.5);
        doc.text(`Page ${pageNum}`, PW - M - 12, PH - 3.5);

        doc.save("teams_proposal_report.pdf");
    }



    if (loader)
        return <Loader />

    return (
        <div className="lg:pr-4 px-3 lg:px-0 min-h-screen mb-10">
            <Title title={"Manage Teams"} />
            <SimpleLoader loading={loading} />
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center p-5 border rounded-lg mb-6 gap-3" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}>
                <div>
                    <h1 className="text-2xl font-semibold" style={{ color: colors.grey[100] }}>Student Groups</h1>
                    <p className="text-sm" style={{ color: colors.grey[300] }}>Manage and organize student groups</p>
                </div>

                <button onClick={() => generateTeamsPDF(teams)} disabled={!teams.length} className="bg-black cursor-pointer text-white w-full md:w-auto px-4 py-3 md:py-2 rounded-lg text-sm font-medium border" style={{ borderColor: colors.grey[700] }}>
                    Export As PDF
                </button>
            </div>
            <ConfirmModal setMessage={setMessage} colors={colors} open={open} onClose={() => setOpen(false)} onConfirm={() => confirm(proposalId, supervisor?.id, assistant?.id, message)} />
            {/* SEARCH */}
            <div className="flex flex-col sm:flex-row  gap-2 mb-5">
                <div className="flex items-center w-full border rounded-lg px-3" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700], color: colors.grey[300] }}>
                    <SearchIcon className="text-gray-400" />
                    <input
                        placeholder="Search by groups name..."
                        className="w-full px-2 py-2 text-sm outline-none"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <FilterList colors={colors} setStatus={setStatus} options={statuses} title={"Select to filter..."} />

                <button className="border flex gap-3 px-3 py-2 rounded-lg flex items-center" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700], color: colors.grey[100] }}>
                    <FilterListIcon fontSize="small" />
                    Filtering
                </button>
            </div>

            {/* TABLE */}
            <div className="">
                <table className="w-full border" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }} >

                    {/* DESKTOP HEAD */}
                    <thead className="hidden md:table-header-group text-sm border-b" style={{ backgroundColor: colors.grey[900], borderColor: colors.grey[700], color: colors.grey[100] }}>
                        <tr>
                            <th className="text-left p-5">GROUP NAME</th>
                            <th className="text-left p-5">LEADER</th>
                            <th className="text-left p-5">MEMBERS</th>
                            <th className="text-left p-5">CREATED</th>
                            <th className="text-left p-5">VIEW</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            filteredTeams.length ? (
                                filteredTeams.map((team) => {
                                    const isOpen = expanded === team.id;

                                    return (
                                        <Fragment key={team.id}>
                                            {/* ROW */}
                                            <tr
                                                className="border-b md:table-row block p-4 md:p-0"
                                                style={{ borderColor: colors.grey[800] }}
                                            >

                                                {/* MOBILE CARD */}
                                                <td className="md:hidden block">

                                                    <div className="flex justify-between">
                                                        <div className="flex items-center gap-2" onClick={() => {
                                                            setExpanded(isOpen ? null : team.id)
                                                            setAssistant(null);
                                                            setSupervisor(null);
                                                            setProposalId(null);
                                                            setMessage("");
                                                        }} style={{ color: colors.grey[100] }} >
                                                            <button>
                                                                {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                                                            </button>
                                                            <p className="font-medium">{team.name}</p>
                                                        </div>

                                                        <div className="">
                                                            <button
                                                                onClick={() => navigate(`${team.id}`)}
                                                                className="px-4 py-1 cursor-pointer rounded bg-black border pointer-events-auto"
                                                                style={{ borderColor: colors.grey[700], backgroundColor: colors.grey[900] }}
                                                            >
                                                                View
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-3 mt-2" onClick={() => {
                                                        setExpanded(isOpen ? null : team.id)
                                                        setAssistant(null);
                                                        setSupervisor(null);
                                                        setProposalId(null);
                                                        setMessage("");
                                                    }}>
                                                        <span className=" px-2 py-1 rounded text-xs border" style={{ backgroundColor: colors.grey[900], color: colors.grey[200], borderColor: colors.grey[700] }}>
                                                            {team.membersCount} members
                                                        </span>
                                                        <span className="text-xs" style={{ color: colors.grey[200] }}>
                                                            {new Date(team.createdOn).toLocaleDateString()}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-3 mt-3"
                                                        onClick={() => {
                                                            setExpanded(isOpen ? null : team.id)
                                                            setAssistant(null);
                                                            setSupervisor(null);
                                                            setProposalId(null);
                                                            setMessage("");
                                                        }}>
                                                        <div className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center text-xs">
                                                            {IntialLetters(team.leaderName).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm" style={{ color: colors.grey[100] }}>{team.leaderName}</p>
                                                            <p className="text-xs" style={{ color: colors.grey[300] }}>USR-[{(team.leaderId).substring(0, 4)}]</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* DESKTOP CELLS */}
                                                <td className="hidden md:table-cell px-6 py-4" onClick={() => {
                                                    setExpanded(isOpen ? null : team.id)
                                                    setAssistant(null);
                                                    setSupervisor(null);
                                                    setProposalId(null);
                                                    setMessage("");
                                                }}>
                                                    <div className="flex items-center gap-3" style={{ color: colors.grey[100] }}>
                                                        <button >
                                                            {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
                                                        </button>
                                                        {team.name}
                                                    </div>
                                                </td>

                                                <td className="hidden md:table-cell px-6 py-4" onClick={() => {
                                                    setExpanded(isOpen ? null : team.id)
                                                    setAssistant(null);
                                                    setSupervisor(null);
                                                    setProposalId(null);
                                                    setMessage("");
                                                }}>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center text-xs">
                                                            {IntialLetters(team.leaderName).toUpperCase()}
                                                        </div>
                                                        <div className="">
                                                            <p style={{ color: colors.grey[100] }}>{team.leaderName}</p>
                                                            <p className="text-xs" style={{ color: colors.grey[300] }}>USR-[{(team.leaderId)?.substring(0, 4)}]</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="hidden md:table-cell px-6 py-4 "
                                                    onClick={() => {
                                                        setExpanded(isOpen ? null : team.id)
                                                        setAssistant(null);
                                                        setSupervisor(null);
                                                        setProposalId(null);
                                                        setMessage("");
                                                    }}
                                                >
                                                    <span className=" rounded-lg border text-sm px-3 py-2" style={{ color: colors.grey[100], backgroundColor: colors.grey[900], borderColor: colors.grey[700] }}>
                                                        {team.membersCount} members
                                                    </span>
                                                </td>

                                                <td className="hidden md:table-cell px-6 py-4"
                                                    onClick={() => {
                                                        setExpanded(isOpen ? null : team.id)
                                                        setAssistant(null);
                                                        setSupervisor(null);
                                                        setProposalId(null);
                                                        setMessage("");
                                                    }}
                                                    style={{ color: colors.grey[300] }}
                                                >
                                                    {new Date(team.createdOn).toLocaleDateString()}
                                                </td>

                                                <td className="hidden md:table-cell  py-4 text-center">
                                                    <button onClick={() => navigate(`${team.id}`)} className="px-4 py-1 cursor-pointer rounded bg-black border pointer-events-auto" style={{ borderColor: colors.grey[700], backgroundColor: colors.grey[900] }}>View</button>
                                                </td>

                                            </tr>

                                            {/* EXPANDED */}
                                            {isOpen && (
                                                <tr className="" style={{ backgroundColor: colors.grey[900], borderColor: colors.grey[700] }}>
                                                    <td colSpan="5" className="px-6 py-4">

                                                        <div className="flex sm:flex-row flex-col sm:gap-10 gap-4 mb-4">
                                                            <div className=" w-full flex sm:flex-row flex-col gap-3">
                                                                <Dropdown key={team.id} isExsist={team.supervisorName} colors={colors} setSupervisor={setSupervisor} options={supervisors} title={"Select a supervisor"} />
                                                                <Dropdown colors={colors} isExsist={team.technicalAssistantName} title={"Select an assistant"} setSupervisor={setAssistant} options={assistants} />
                                                            </div>
                                                            <button onClick={() => {
                                                                setOpen(true);
                                                                setProposalId(team.proposalId)
                                                            }} className="px-6 sm:w-auto w-full py-2 rounded cursor-pointer border" disabled={team.supervisorName || team.technicalAssistantName ? true : false} style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}>Assign</button>
                                                        </div>
                                                        <p className="mb-2.5 border-b text-sm" style={{ color: colors.grey[200], borderColor: colors.grey[600] }}>Members</p>
                                                        <div className="flex flex-wrap gap-2" >
                                                            {team.members.map((m, i) => (
                                                                <div key={i} className="flex items-center gap-2 border px-3 py-1 rounded" style={{ backgroundColor: colors.grey[900], borderColor: colors.grey[700] }}>
                                                                    <div className="w-7 h-7 bg-[#0000006b] border text-white rounded-full flex items-center justify-center text-xs" style={{ borderColor: colors.grey[700] }}>
                                                                        {IntialLetters(m.fullName).toUpperCase()}
                                                                    </div>
                                                                    <span className="text-xs line-clamp-1" style={{ color: colors.grey[200] }}>{m.fullName}</span>
                                                                </div>
                                                            ))}
                                                        </div>

                                                    </td>
                                                </tr>
                                            )}
                                        </Fragment>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 font-medium tracking-[3px]">
                                        No Data Found...
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
}




const Dropdown = ({ colors, isExsist, setSupervisor, options = ["Admin", "Supervisor", "Committee"], title }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme()
    const [search, setSearch] = useState("");

    const optionFilter = options.filter((option) => {
        const fullName = option?.fullName?.toLowerCase() || "";
        return fullName.includes(search.toLocaleLowerCase());
    });
    return (
        <div className="w-full px-4 items-center cursor-pointer border rounded-lg flex relative" style={{ color: colors.grey[300], backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}>
            <input
                type="text"
                placeholder={title}
                value={isExsist ? isExsist : search}
                disabled={isExsist ? true : false}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 100)}
                className={`w-full  py-2 rounded-lg focus:outline-none`}
            />
            <p><ArrowDropDownIcon /></p>

            {open && (
                <ul className="absolute w-full left-0 top-11 border border-[#00bc8a] mt-1 rounded-lg shadow-lg max-h-50 overflow-y-auto z-50" style={{ backgroundColor: colors.blueAccent[800] }} >
                    {
                        optionFilter.length ? (
                            optionFilter.map((opt, index) => {
                                return (
                                    <li
                                        key={index}
                                        onMouseDown={() => {
                                            setOpen(false);
                                            setSearch(opt.fullName)
                                            setSupervisor(opt);
                                        }}
                                        style={{ color: colors.grey[200] }}
                                        className={`p-2 py-1.5 cursor-pointer hover:text-[#00bc8a!important] ${theme.palette.mode === "dark" ? "hover:bg-[#87878752]" : "hover:bg-[#cecece8b]"}`}
                                    >
                                        {opt.fullName}
                                    </li>
                                )
                            })
                        ) : (
                            <li className="p-2 text-gray-500">No results</li>
                        )

                    }
                </ul>
            )}
        </div>
    );
};

const FilterList = ({ colors, setStatus, options = ["All Status", "Accepted", "Rejected", "UnderReview"], title }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme()
    const [selected, setSelected] = useState("Accepted");
    useEffect(() => {
        setStatus(selected);
    }, [selected, setStatus]);
    return (
        <div className="w-full px-4 items-center cursor-pointer border rounded-lg flex relative" style={{ color: colors.grey[300], backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}>
            <input
                type="text"
                placeholder={title}
                value={selected}
                readOnly
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 100)}
                className={`w-full  py-2 rounded-lg focus:outline-none`}
            />
            <p><ArrowDropDownIcon /></p>

            {open && (
                <ul className="absolute w-full left-0 top-11 border border-[#00bc8a] mt-1 rounded-lg shadow-lg max-h-50 overflow-y-auto z-50" style={{ backgroundColor: colors.blueAccent[800] }} >
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

const ConfirmModal = ({ open, setMessage, colors, onClose, onConfirm }) => {

    if (!open) return null;

    return (
        <div className="fixed inset-0 px-3 bg-black/40 flex items-center justify-center z-50">
            <div className=" w-full max-w-md rounded-xl shadow-lg p-6 border" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}>

                {/* Title */}
                <p className="mb-4" style={{ color: colors.grey[200] }}>
                    Are you sure you want to proceed with this action?
                </p>

                {/* Textarea */}
                <textarea
                    placeholder="Write your message here..."
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ color: colors.grey[200], borderColor: colors.grey[700] }}
                    className="w-full h-28 border rounded-lg p-3 outline-none resize-none text-sm"
                />

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-5">
                    <button
                        onClick={() => {
                            onClose();
                            setMessage("");
                        }}
                        className="px-4 py-1.5 rounded-lg border text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => {
                            onConfirm()
                            setMessage("")
                            onClose();
                        }}

                        className="px-4 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Confirm
                    </button>
                </div>

            </div>
        </div>
    );
}