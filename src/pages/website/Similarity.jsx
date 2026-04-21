
import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import { HandleErrors } from "../../utils/HandleErrors";
import Loader from "../../loaders/Loader";
import { handleDownload } from "../../components/admin/DownloadProposal";
import SimpleLoader from "../../loaders/SimpleLoader";
import { getMyProposal } from "../../services/proposalServices";
import { getEvaluateProposal } from "../../services/evaluationServices";
import Title from "../../components/admin/Title";
import LottieFiles from "../../lottieFiles/LottieFiles";

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
    </svg>
);

const XCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const PDFIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const ChevronDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

const ChevronUp = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
);

const CheckCircleIcon = ({ className = "w-4 h-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

function SimilarityBar({ score }) {
    const color = score >= 50 ? "#e11414" : 'orange';
    return (
        <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${score}%`, backgroundColor: color }}
                />
            </div>
            <span className="text-sm font-semibold min-w-10 text-right" style={{ color }}>
                {score}%
            </span>
        </div>
    );
}
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);






function StatusBadge({ status }) {
    if (status === "Accepted")
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-500 text-green-500 text-sm font-medium">
                <CheckCircleIcon /> Accepted
            </span>
        );
    if (status === "Rejected")
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-500 text-red-500 text-sm font-medium">
                <XCircleIcon /> Rejected
            </span>
        );
    if (status === "Pending")
        return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-yellow-500 text-yellow-500 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" />
                Pending
            </span>
        )
    return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-500 text-orange-500 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
            Under Review
        </span>
    );
}


export default function ProjectReview() {
    const [similarityOpen, setSimilarityOpen] = useState(true);

    const [similarProjects, setSimilarProjects] = useState(null);
    const [originProject, setOriginProject] = useState(null);
    const [loading, setLoading] = useState(true);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const evaluateProject = async () => {
            try {
                const originProposal = await getMyProposal();
                setOriginProject(originProposal);
                const res = await getEvaluateProposal(originProposal.id)
                setSimilarProjects(res.similarityResults)
            } catch (error) {
                HandleErrors(error.errors || error.message)
            } finally {
                setLoading(false);
            }
        }
        evaluateProject();
    }, []);

    

    useEffect(() => {
        scrollTo(0, 0);
    }, []);


    if (loading)
        return <Loader />

    return (
        <div className="min-h-screen mb-8 font-sans mt-5">
            <Title title={"Similarity Projects"} subTitle={"view the similar projects"} />
            {
                (similarProjects && originProject) ? (
                    <div className=" mx-auto lg:pr-4 px-1 lg:px-0 space-y-4">
                        {/* Main Project Card */}
                        <div className="rounded-xl border shadow-sm overflow-hidden" style={{ borderColor: colors.grey[800], backgroundColor: colors.blueAccent[800] }}>
                            <div className="p-6">
                                {/* Title */}
                                <h1 className="text-2xl font-bold mb-3" style={{ color: colors.grey[100] }}>
                                    {originProject.title}
                                </h1>
                                <StatusBadge status={originProject.status} />
                            </div>

                            <hr style={{ borderColor: colors.grey[800] }} />

                            {/* Abstract */}
                            <div className="sm:p-6 p-4">
                                <h2 className="text-base font-semibold mb-3" style={{ color: colors.grey[200] }}>Abstract</h2>
                                <p className="text-sm  leading-relaxed" style={{ color: colors.grey[300] }}>
                                    {originProject.abstract}
                                </p>
                            </div>

                            <hr style={{ borderColor: colors.grey[800] }} />

                            {/* Project File */}
                            <div className="sm:p-6 p-4">
                                <h2 className="text-base font-semibold mb-3" style={{ color: colors.grey[200] }}>Project File</h2>
                                <div className="flex flex-row items-center justify-between rounded-lg px-4 py-3 border" style={{ backgroundColor: colors.grey[900], borderColor: colors.grey[800] }}>
                                    <div className="flex items-center gap-3">
                                        <div style={{ color: colors.grey[100] }} >
                                            <PDFIcon />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium" style={{ color: colors.grey[200] }}>
                                                {originProject.fileName}
                                            </p>
                                            <span className="text-xs px-2 py-0.5 rounded mt-1 inline-block tracking-wide border" style={{ color: colors.grey[100], backgroundColor: colors.grey[900], borderColor: colors.grey[600] }}>
                                                APPLICATION/PDF
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDownload(originProject)}
                                        className="inline-flex  items-center cursor-pointer gap-2 bg-black text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm border"
                                        style={{ borderColor: colors.grey[600] }}>
                                        <DownloadIcon />
                                        <span className="hidden sm:block">Download</span>
                                    </button>
                                </div>
                            </div>
                        </div>



                        {/* Similarity Results Card */}
                        <div className="rounded-xl border shadow-sm overflow-hidden" style={{ backgroundColor: colors.grey[900], borderColor: colors.grey[800] }}>
                            {/* Header */}
                            <button
                                onClick={() => setSimilarityOpen(!similarityOpen)}
                                className="w-full flex items-center justify-between px-6 py-5 transition-colors"
                            >
                                <h2 className="text-base font-semibold text-gray-900" style={{ color: colors.grey[100] }}>Similarity Results</h2>
                                {similarityOpen ? (
                                    <ChevronUp />
                                ) : (
                                    <ChevronDown />
                                )}
                            </button>

                            {similarityOpen && (
                                <div className="sm:px-6 px-2 pb-6 space-y-4">
                                    {similarProjects?.map((item) => (
                                        <div
                                            key={item.rank}
                                            className="border border-gray-200 rounded-xl p-5 space-y-3"
                                            style={{ borderColor: colors.grey[700], backgroundColor: colors.blueAccent[800] }}
                                        >
                                            {/* Rank + Title + Year */}
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-900 text-white border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ borderColor: colors.grey[600] }}>
                                                    #{item.rank}
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-semibold leading-snug" style={{ color: colors.grey[100] }}>
                                                        {item.matchedProjectName}
                                                    </h3>
                                                    <span className="inline-block mt-1.5 text-xs border rounded-full px-2.5 py-0.5" style={{ color: colors.grey[300], borderColor: colors.grey[600] }}>
                                                        {item.matchedProjectYear}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Similarity Score */}
                                            <div className="space-y-1.5">
                                                <p className="text-sm font-medium" style={{ color: colors.grey[100] }} >Similarity Score</p>
                                                <SimilarityBar score={Math.round(item.similarityScore * 100)} color={item.color} />
                                            </div>

                                            {/* Abstract Preview */}
                                            <div>
                                                <p className="text-xs font-medium mb-1" style={{ color: colors.grey[100] }}>Abstract Preview</p>
                                                <p className="text-sm leading-relaxed" style={{ color: colors.grey[300] }}>{item.matchedProjectAbstract}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div>
                        <LottieFiles />
                    </div>
                )
            }
        </div>
    );
}

