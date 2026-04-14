import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { tokens } from "../../theme";
import { getEvaluatedProjects } from "../../services/evaluationServices";
import { HandleErrors } from '../../utils/HandleErrors'
import Loader from "../../loaders/Loader";
import LottieFiles from "../../lottieFiles/LottieFiles";

export default function EvaluationResults() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loader, setLoader] = useState(true)

    const [data, setData] = useState([]);
    const [expandedItems, setExpandedItems] = useState({});

    useEffect(() => {
        const evaluatedProjects = async () => {
            try {
                const response = await getEvaluatedProjects();
                setData(response);
            } catch (error) {
                HandleErrors(error.errors);
            } finally {
                setLoader(false);
            }
        };
        evaluatedProjects();
    }, []);

    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });


    //  Toggle per item
    const toggleReadMore = (key) => {
        setExpandedItems((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    if (loader)
        return <Loader />
    return (
        <div className="min-h-screen rounded">
            <div className="max-w-full mx-auto py-6 lg:pr-4 px-3 lg:px-0 space-y-5">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-semibold mb-2">
                        Evaluation Results
                    </h1>
                    <p className="max-w-xl" style={{ color: colors.grey[200] }}>
                        Review and compare project similarities against the existing global ledger.
                        Automated analysis completed for {data.length} active proposals.
                    </p>
                </div>

                {/* Cards */}
                <div className="space-y-5">
                    {
                        data.length ? (
                            data.map((item) => {
                                const isFlagged = item.aiStatus === "Flagged";

                                return (
                                    <div
                                        key={item.id}
                                        className="rounded-xl shadow-[0_12px_40px_rgba(42,52,57,0.06)] border"
                                        style={{
                                            backgroundColor: colors.blueAccent[800],
                                            borderColor: colors.grey[800],
                                        }}
                                    >
                                        <div className="sm:p-8 p-3">

                                            {/* Top */}
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="text-xs font-mono font-bold px-2 py-1 bg-[#435ba2] text-[#fff] rounded">
                                                            PRO-{String(item.proposalId).padStart(4, "0")}
                                                        </span>

                                                        <span
                                                            className={`text-xs px-3 py-1 rounded-full font-medium ${isFlagged
                                                                    ? "bg-red-500 text-[#fffd]"
                                                                    : "bg-green-500 text-[#fffd]"
                                                                }`}
                                                        >
                                                            AI Status: {item.aiStatus}
                                                        </span>
                                                    </div>

                                                    <h2
                                                        className="text-xl font-bold leading-tight"
                                                        style={{ color: colors.grey[100] }}
                                                    >
                                                        {item.proposalTitle}
                                                    </h2>
                                                </div>

                                                <div className="text-right">
                                                    <p
                                                        className="text-sm"
                                                        style={{ color: colors.grey[300] }}
                                                    >
                                                        Max Similarity
                                                    </p>
                                                    <p
                                                        className={`text-3xl font-semibold ${isFlagged ? "text-red-500" : "text-green-500"
                                                            }`}
                                                    >
                                                        {Math.round(item.maxSimilarityScore * 100)}%
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Info */}
                                            <div
                                                className="grid grid-cols-3 gap-6 py-6 border-t border-b mb-6"
                                                style={{ borderColor: colors.grey[800] }}
                                            >
                                                <div>
                                                    <p
                                                        className="text-xs uppercase"
                                                        style={{ color: colors.grey[300] }}
                                                    >
                                                        Evaluated By
                                                    </p>
                                                    <p
                                                        className="font-medium"
                                                        style={{ color: colors.grey[100] }}
                                                    >
                                                        {item.evaluatedByName}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p
                                                        className="text-xs uppercase"
                                                        style={{ color: colors.grey[300] }}
                                                    >
                                                        Date Submitted
                                                    </p>
                                                    <p
                                                        className="font-medium"
                                                        style={{ color: colors.grey[100] }}
                                                    >
                                                        {formatDate(item.evaluatedAt)}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p
                                                        className="text-xs uppercase"
                                                        style={{ color: colors.grey[300] }}
                                                    >
                                                        Project Type
                                                    </p>
                                                    <p
                                                        className="font-medium"
                                                        style={{ color: colors.grey[100] }}
                                                    >
                                                        General
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Collapsible */}
                                            <details className="group">
                                                <summary
                                                    className={`flex justify-between items-center px-4 py-3 rounded-lg cursor-pointer ${isFlagged ? "bg-[#fe898333]" : "bg-[#7ad88a5e]"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                                                            expand_more
                                                        </span>

                                                        <span className="font-semibold">
                                                            {isFlagged
                                                                ? "Similarity Results (High Risk)"
                                                                : "Similarity Results"}
                                                        </span>
                                                    </div>
                                                </summary>

                                                {/* Content */}
                                                <div
                                                    className="mt-4 space-y-4 sm:pl-4 sm:border-l-2"
                                                    style={{ borderColor: colors.blueAccent[600] }}
                                                >
                                                    {item.similarityResults.map((m) => {
                                                        const key = `${item.id}-${m.rank}`; //  unique key

                                                        return (
                                                            <div
                                                                key={key}
                                                                className="sm:p-5 p-3 border rounded-xl flex gap-5"
                                                                style={{
                                                                    borderColor: colors.grey[800],
                                                                    backgroundColor: colors.grey[900],
                                                                }}
                                                            >
                                                                <div
                                                                    className="h-12 sm:flex hidden items-center justify-center rounded-xl font-bold"
                                                                    style={{ color: colors.grey[100] }}
                                                                >
                                                                    {m.rank}
                                                                </div>

                                                                <div className="flex-1">
                                                                    <div className="flex justify-between mb-2">
                                                                        <div>
                                                                            <h4
                                                                                className="font-semibold text-lg"
                                                                                style={{ color: colors.grey[100] }}
                                                                            >
                                                                                {m.matchedProjectName}
                                                                            </h4>
                                                                            <p
                                                                                className="text-sm"
                                                                                style={{ color: colors.grey[400] }}
                                                                            >
                                                                                Year: {m.matchedProjectYear}
                                                                            </p>
                                                                        </div>

                                                                        <p
                                                                            className={`px-3 py-1 h-fit min-w-21 flex justify-center items-center text-white text-sm font-bold rounded ${Math.round(m.similarityScore * 100) >= 50
                                                                                    ? "bg-red-500"
                                                                                    : "bg-yellow-500"
                                                                                }`}
                                                                        >
                                                                            {Math.round(m.similarityScore * 100)}% Match
                                                                        </p>
                                                                    </div>

                                                                    {/* ✅ Read More logic */}
                                                                    <p
                                                                        className={`text-sm ${expandedItems[key]
                                                                                ? "line-clamp-none"
                                                                                : "line-clamp-3"
                                                                            }`}
                                                                        style={{ color: colors.grey[300] }}
                                                                    >
                                                                        {m.matchedProjectAbstract}
                                                                    </p>

                                                                    <p
                                                                        className="text-xs mt-1 underline cursor-pointer"
                                                                        onClick={() => toggleReadMore(key)}
                                                                        style={{ color: colors.blueAccent[300] }}
                                                                    >
                                                                        {expandedItems[key] ? "Read Less" : "Read More"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </details>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <LottieFiles name={"animatedData2"} />
                        )
                    }
                </div>
            </div>
        </div>
    );
}