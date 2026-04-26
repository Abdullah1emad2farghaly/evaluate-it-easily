import { useTheme } from "@emotion/react";
import React, { useState } from "react";
import { tokens } from "../../theme";
import styled from "@emotion/styled";
import SimpleLoader from "../../loaders/SimpleLoader";
import { HandleErrors } from "../../utils/HandleErrors";
import { toast } from "react-toastify";
import { acceptInvitation, rejectInvitations } from "../../services/groupServices";




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

export default function Invitations({ data, setData }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading] = useState(false);


    const formatDate = (dateString) => {
        if (!dateString) return "";

        const date = new Date(dateString);

        return date.toLocaleDateString("en-US", {
            month: "short",  // Apr
            day: "numeric",  // 9
            year: "numeric", // 2026
        });
    };

    const handleFinalDecision = async (id, type) => {
        setLoading(true);
        try {

            if (type === "Accepted")
                await acceptInvitation(id)
            else
                await rejectInvitations(id);

            setData((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? { ...item, status: type }
                        : item
                )
            );

        } catch (error) {
            if (error.errors.length)
                HandleErrors(error.errors)
            else
                toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen lg:pr-4 px-4 lg:px-0">
            <SimpleLoader loading={loading} />
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
                            <th>Status</th>
                            <th>CreatedOn</th>
                            <th className="text-center">RespondedAt</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} className="border-t" style={{ borderColor: colors.grey[800] }}>
                                <td className="p-4 font-medium truncate" style={{ color: colors.grey[200] }}>{item.groupName}</td>
                                <td className="text-sm" style={{ color: colors.grey[200] }}>{item.leaderName}</td>
                                <td>
                                    <StatusBadge status={item.status} />
                                </td>
                                <td className="text-sm" style={{ color: colors.grey[300] }}>{formatDate(item.createdOn)}</td>
                                <td className="text-sm text-center" style={{ color: colors.grey[300] }}>
                                    {
                                        item.respondedAt ? (
                                            formatDate(item.respondedAt)
                                        ): (
                                        "————"
                                        )
                                    }
                                </td>

                                <td
                                    className={`text-center`}
                                >
                                    {item.status === "Pending" ? (
                                        <div className="flex gap-2 justify-center">
                                            <button
                                                onClick={() => {
                                                    handleFinalDecision(item.id, "Accepted")
                                                }}
                                                className="bg-transparent border hover:bg-green-500 hover:text-white cursor-pointer border-green-500 text-green-500 transition-colors duration-500 px-3 py-1 rounded-lg">
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => {
                                                    handleFinalDecision(item.id, "Rejected");
                                                }}
                                                className="bg-transparent border hover:bg-red-500 hover:text-white cursor-pointer border-red-500 text-red-500 transition-colors duration-500 px-3 py-1 rounded-lg">
                                                Reject
                                            </button>
                                        </div>
                                    ) : (
                                        "————"
                                    )}
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