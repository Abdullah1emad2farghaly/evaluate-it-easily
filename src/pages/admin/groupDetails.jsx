import React, { useEffect, useState } from "react";
import TagIcon from '@mui/icons-material/Tag';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import EmailIcon from '@mui/icons-material/Email';
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { getGroupById } from "../../services/groupServices";
import { useParams } from "react-router-dom";
import Loader from "../../loaders/Loader";
import { HandleErrors } from "../../utils/HandleErrors";



export default function GroupDetails() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [group, setGroup] = useState({});
    const params = useParams()
    const [loader, setLoader] = useState(true)



    useEffect(() => {
        window.scrollTo(0,0)
        const getGroup = async () => {
            try {
                const response = await getGroupById(params.id)
                setGroup(response);
            } catch (error) {
                HandleErrors(error.errors);
            } finally {
                setLoader(false)
            }
        }
        getGroup()
        
    }, []);
    

    const IntialLetters = (name) => {
        const initail = name.split(' ')
        if (initail.length > 1) {
            return `${initail[0][0]}${initail[1][0]}`;
        } else {
            return `${initail[0][0]}`;
        }
    }

    const nameLimitation = (name) => {
        const nameOfParts = name.split(" ")
        if (nameOfParts.length > 2)
            return `${nameOfParts[0]} ${nameOfParts[1]}`;
        return name;
    }

    const formatDate = (dateString) => {
        if (!dateString) return "";

        const date = new Date(dateString);

        return date.toLocaleDateString("en-US", {
            month: "short",  // Apr
            day: "numeric",  // 9
            year: "numeric", // 2026
        });
    };

    if (loader)
        return <Loader />

    return (
        group && (
            <div className="p-6 min-h-screen">
                {/* Top Cards */}
                <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mb-6">
                    <Card icon={<TagIcon fontSize="small" />} title="Group Name" value={group.name} />
                    <Card icon={<CalendarTodayIcon fontSize="small" />} title="CreatedAt" value={formatDate(group.createdOn)} />
                    <Card
                        icon={<GroupsIcon fontSize="small" />}
                        title="Total Members"
                        value={group.membersCount}
                    />
                    <Card
                        icon={<EmojiEventsIcon fontSize="small" className="text-orange-500" />}
                        title="Group Leader"
                        value={nameLimitation(group.leaderName)}
                    />
                </div>

                {/* Leader Section */}
                <div className="border rounded-xl p-5 mb-6" style={{ background: colors.blueAccent[800], borderColor: colors.grey[800] }}>
                    <div className="flex items-center gap-2 mb-4 text-lg font-semibold">
                        <EmojiEventsIcon className="text-orange-500" />
                        Leader
                    </div>

                    <div className="flex items-center gap-4" >
                        <Avatar initials="SC" color="bg-orange-500" />
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium" style={{ color: colors.grey[200] }}>{nameLimitation(group.leaderName)}</span>
                                <span className="bg-orange-200 text-orange-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                    <EmojiEventsIcon fontSize="small" /> Leader
                                </span>
                            </div>


                            {
                                group.members.map((member) => {
                                    if (!member.isLeader)
                                        return;
                                    return (
                                        <div key={member.studentId} className="flex gap-4 text-sm mt-1" style={{ color: colors.grey[400] }} >
                                            <span className="flex items-center gap-1">
                                                <EmailIcon fontSize="small" />
                                                {member.email}
                                            </span>
                                            <span># USR-{(member.studentId).substring(0, 4)}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                {/* Members Table */}
                <div className="rounded-xl shadow-sm border overflow-hidden overflow-x-auto style-scroll" style={{ background: colors.blueAccent[800], borderColor: colors.grey[800] }}>
                    <div className="p-4 border-b" style={{ borderColor: colors.grey[700] }}>
                        <h2 className="text-lg font-semibold">Members</h2>
                        <p className="text-sm" style={{ color: colors.grey[400] }}>
                            {group.membersCount} total members
                        </p>
                    </div>

                    <table className="w-full text-sm min-w-200">
                        <thead style={{ backgroundColor: colors.grey[900], color: colors.grey[100] }}>
                            <tr className="border-b" style={{ borderColor: colors.grey[700] }}>
                                <th className="text-left p-4">Member</th>
                                <th className="text-left p-4">Email</th>
                                <th className="text-left p-4">Role</th>
                                <th className="text-left p-4">Member ID</th>
                                <th className="text-left p-4">JoinedAt</th>
                            </tr>
                        </thead>

                        <tbody>
                            {group.members.map((member, index) => (
                                <tr
                                    key={index}
                                    className="border-b"
                                    style={{ background: colors.blueAccent[800], borderColor: colors.grey[900] }}
                                >
                                    <td className="p-4 flex items-center gap-3">
                                        <Avatar
                                            initials={IntialLetters(member.fullName).toUpperCase()}
                                            color={
                                                member.isLeader
                                                    ? "bg-orange-500"
                                                    : "bg-blue-500"
                                            }
                                        />
                                        <p style={{ color: colors.grey[100] }}>{nameLimitation(member.fullName)}</p>
                                    </td>

                                    <td className="p-4" style={{ color: colors.grey[300] }}>{member.email}</td>

                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 text-xs rounded-full ${member.isLeader
                                                ? "bg-orange-200 text-orange-600"
                                                : "bg-gray-800 text-gray-200"
                                                }`}
                                        >
                                            {
                                                member.isLeader ? "Leader" : "Member"
                                            }
                                        </span>
                                    </td>

                                    <td className="p-4" style={{ color: colors.grey[300] }}>USR-{(member.studentId).substring(0, 4)}</td>
                                    <td className="p-4" style={{ color: colors.grey[300] }}>{formatDate(member.joinedAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    );
}

/* Reusable Components */

function Card({ icon, title, value }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <div className="p-4 rounded-xl border flex flex-col gap-2" style={{ background: colors.blueAccent[800], borderColor: colors.grey[800] }}>
            <div className="flex items-center gap-2 text-sm line-clamp-1" style={{ color: colors.grey[200] }}>
                {icon}
                {title}
            </div>
            <div className="font-medium" style={{ color: colors.grey[400] }}>{value}</div>
        </div>
    );
}

function Avatar({ initials, color }) {
    return (
        <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm ${color}`}
        >
            {initials}
        </div>
    );
}