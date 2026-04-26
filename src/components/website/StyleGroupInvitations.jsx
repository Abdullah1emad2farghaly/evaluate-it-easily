import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";




const StatusBadge = ({ status }) => {
    const styles = {
        Pending: "border text-yellow-500",
        Accepted: "border text-green-500",
        Rejected: "border text-red-500",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}>
            {status}
        </span>
    );
};

export default function StyleGroupInvitations({ data }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


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
        <div className="min-h-screen lg:pr-4 px-4 lg:px-0">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <DetailsCard data={data} colors={colors} label={"Total Invitations"} />
                <DetailsCard data={data} colors={colors} label={"Pending"} />
                <DetailsCard data={data} colors={colors} label={"Accepted"} />
                <DetailsCard data={data} colors={colors} label={"Rejected"} />
            </div>

            {/* Table */}
            <div className=" rounded-2xl border shadow-sm overflow-hidden" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}>
                <table className="w-full text-left">
                    <thead className="text-sm" style={{ color: colors.grey[100] }}>
                        <tr>
                            <th className="p-4">Group Name</th>
                            <th>Leader</th>
                            <th>Student</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>CreatedOn</th>
                            <th className="text-center">RespondedAt</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} className="border-t" style={{ borderColor: colors.grey[800] }}>
                                <td className="p-4 font-medium truncate" style={{ color: colors.grey[200] }}>{item.groupName}</td>
                                <td className="text-sm" style={{ color: colors.grey[200] }}>{item.leaderName}</td>
                                <td className="text-sm" style={{color: colors.grey[200]}}>{item.invitedStudentName}</td>
                                <td className="text-xs" style={{ color: colors.grey[400] }}>{item.invitedStudentEmail}</td>
                                <td>
                                    <StatusBadge status={item.status} />
                                </td>
                                <td className="text-sm" style={{ color: colors.grey[300] }}>{formatDate(item.createdOn)}</td>
                                <td className="text-sm text-center" style={{ color: colors.grey[300] }}>
                                    {
                                        item.respondedAt ? (
                                            formatDate(item.respondedAt)
                                        ) : (
                                            "————"
                                        )
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}



function DetailsCard({ data, label, colors }) {
    let filteredData = data;
    if (label === "Accepted")
        filteredData = data.filter((item) => item.status === "Accepted");
    else if (label === "Rejected")
        filteredData = data.filter((item) => item.status === "Rejected");
    else if (label === "Pending")
        filteredData = data.filter((item) => item.status === "Pending");
    else
        filteredData = data;

    const styleStatus = (status) => {
        if (status === "Accepted")
            return "text-green-500";
        else if (status === "Rejected")
            return "text-red-500"
        else if (status === "Pending")
            return "text-yellow-500";
        else
            return `text-orange-500`
    }
    return (
        <div className="p-4 rounded-2xl border" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}>
            <p className="text-sm" style={{ color: colors.grey[200] }}>{label}</p>
            <h2 className={`text-2xl font-bold ${styleStatus(label)}`}>
                {filteredData.length}
            </h2>
        </div>
    )
}