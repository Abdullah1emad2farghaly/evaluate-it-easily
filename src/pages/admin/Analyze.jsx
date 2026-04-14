import { useTheme } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { tokens } from "../../theme";
import { getProposalById } from "../../services/proposalServices";
import { createEvaluation, getEvaluateProposal } from "../../services/evaluationServices";
import { HandleErrors } from "../../utils/HandleErrors";
import { makeDecision } from "../../services/decisionServices";
import { toast } from "react-toastify";
import Loader from "../../loaders/Loader";
import { handleDownload } from "./DownloadProposal";
import SimpleLoader from "../../loaders/SimpleLoader";

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



function StatusColor(status) {
  switch (status) {
    case "Accepted":
      return "text-green-500 border-green-500"
    case "Rejected":
      return "text-red-500 border-red-500"
    case "UnderReview":
      return "text-orange-500 border-orange-500";
  }

}

// ─── Confirmation Modal ────────────────────────────────────────────────────────
function ConfirmationModal({ type, onClose, onConfirm, colors, originProject }) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const isAccept = type === "Accepted";

  const config = isAccept
    ? {
      icon: <CheckCircleIcon className="w-6 h-6" />,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Accept Project",
      subtitle: "You are about to accept this project submission.",
      placeholder:
        "Write a message to the student explaining why this project was accepted, any commendations, or next steps...",
      confirmLabel: "Confirm Acceptance",
      confirmBg: "bg-green-600 hover:bg-green-700 active:bg-green-800",
      ringColor: "rgba(22,163,74,0.2)",
      borderFocusColor: "#16a34a",
      topBorder: "border-t-4 border-green-500",
      labelColor: "text-green-500",
      charColor: "text-green-500",
    }
    : {
      icon: <XCircleIcon className="w-6 h-6" />,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      title: "Reject Project",
      subtitle: "You are about to reject this project submission.",
      placeholder:
        "Write a message to the student explaining the reasons for rejection, required improvements, or feedback...",
      confirmLabel: "Confirm Rejection",
      confirmBg: "bg-red-600 hover:bg-red-700 active:bg-red-800",
      ringColor: "rgba(220,38,38,0.2)",
      borderFocusColor: "#dc2626",
      topBorder: "border-t-4 border-red-500",
      labelColor: "text-red-500",
      charColor: "text-red-500",
    };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.93) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      <div
        className={`rounded-2xl shadow-2xl w-full max-w-lg ${config.topBorder}`}

        style={{ animation: "modalIn 0.22s cubic-bezier(.22,.68,0,1.2) both", backgroundColor: colors.blueAccent[800] }}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-full ${config.iconBg} ${config.iconColor} flex items-center justify-center shrink-0`}
            >
              {config.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold" style={{ color: colors.grey[100] }}>{config.title}</h3>
              <p className="text-sm mt-0.5" style={{ color: colors.grey[300] }}>{config.subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ color: colors.grey[100] }}
            className="ml-4 shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        <hr className="mx-6" style={{ borderColor: colors.grey[600] }} />

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Project pill */}
          <div className="flex items-center gap-3 border rounded-xl px-3 py-2.5" style={{ borderColor: colors.grey[700], backgroundColor: colors.grey[900] }}>
            <PDFIcon />
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: colors.grey[200] }}>
                {originProject.title}
              </p>
              <p className="text-xs truncate" style={{ color: colors.grey[300] }}>
                {originProject.fileName}
              </p>
            </div>
          </div>

          {/* Textarea */}
          <div>
            <label className={`block text-sm font-semibold mb-1.5 ${config.labelColor}`}>
              Message to Student{" "}
              <span className="text-gray-400 font-normal">(required)</span>
            </label>
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={config.placeholder}
              rows={5}
              style={{ borderColor: colors.grey[700] }}
              className="w-full text-sm placeholder-gray-500 border rounded-xl px-4 py-3 resize-none outline-none transition-all leading-relaxed"

              onFocus={(e) => {
                e.target.style.borderColor = config.borderFocusColor;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.grey[700];
              }}
            />
            <div className="flex items-center justify-between mt-1.5" style={{ color: colors.grey[300] }}>
              <p className="text-xs ">
                This message will be sent to the student as notifications.
              </p>
              <span
                className={`text-xs font-medium transition-colors ${message.length > 0 ? config.charColor : colors.grey[300]
                  }`}
              >
                {message.length} chars
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium border rounded-lg cursor-pointer transition-colors"
            style={{ backgroundColor: colors.grey[800], borderColor: colors.grey[700], color: colors.grey[100] }}
          >
            Cancel
          </button>
          <button
            onClick={() => { if (message.trim()) onConfirm(originProject, type, message) }}
            disabled={!message.trim()}
            className={`inline-flex items-center cursor-pointer gap-2 px-5 py-2 text-sm font-semibold text-white rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed ${config.confirmBg}`}
          >
            {config.icon}
            {config.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Status Badge ──────────────────────────────────────────────────────────────
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
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-500 text-orange-500 text-sm font-medium">
      <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
        Under Review
    </span>
  );
}


export default function ProjectReview() {
  const [similarityOpen, setSimilarityOpen] = useState(true);

  const [similarProjects, setSimilarProjects] = useState([]);
  const [originProject, setOriginProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [simpleLoading, setSimpleLoading] = useState(false)



  const param = useParams();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const evaluateProject = async () => {
      try {
        const originProposal = await getProposalById(param.id);
        setOriginProject(originProposal);
        
        if (originProposal?.status === "Pending") {
          const similarityProjects = await createEvaluation(param.id);
          setSimilarProjects(similarityProjects.similarityResults);
          setOriginProject({ ...originProposal, status: "UnderReview" });

        } else {

          const similarityProjects = await getEvaluateProposal(param.id);
          setSimilarProjects(similarityProjects.similarityResults);

        }
      } catch (error) {
        HandleErrors(error?.response?.data?.errors || error.message)
      } finally {
        setLoading(false);
      }
    }
    evaluateProject();
  }, [param.id]);


  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  async function handleConfirm(originProject, decisionType, feedbackComment) {
    setSimpleLoading(true)
    try {
      await makeDecision(originProject?.id, decisionType, feedbackComment);
      if (decisionType === "Accepted") {
        setOriginProject({ ...originProject, status: decisionType })
        toast.success("Project Accepted Successfully");
      } else if (decisionType === "Rejected") {
        setOriginProject({ ...originProject, status: decisionType })
        toast.error("Project Rejected Successfully");
      }
      setModal(null)
    } catch (error) {
      HandleErrors(error.errors);
    }finally{
      setSimpleLoading(false)
    }
  }

  if (loading)
    return <Loader />

  return (
    <div className="min-h-screen  -6 font-sans">
      <div className=" mx-auto lg:pr-4 px-3 lg:px-0 space-y-4">
        <SimpleLoader loading={simpleLoading}/>
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
          <div className="p-6">
            <h2 className="text-base font-semibold mb-3" style={{ color: colors.grey[200] }}>Abstract</h2>
            <p className="text-sm  leading-relaxed" style={{ color: colors.grey[300] }}>
              {originProject.abstract}
            </p>
          </div>

          <hr style={{ borderColor: colors.grey[800] }} />

          {/* Project File */}
          <div className="p-6">
            <h2 className="text-base font-semibold mb-3" style={{ color: colors.grey[200] }}>Project File</h2>
            <div className="flex items-center justify-between rounded-lg px-4 py-3 border" style={{ backgroundColor: colors.grey[900], borderColor: colors.grey[800] }}>
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
                className="inline-flex items-center cursor-pointer gap-2 bg-black text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm border"
                style={{ borderColor: colors.grey[600] }}>
                <DownloadIcon />
                Download
              </button>
            </div>
          </div>

          {/* ── Review Decision ── */}
          {
            originProject.status === "UnderReview" && (
              <div>
                <hr style={{ borderColor: colors.grey[800] }} />
                <div className="px-6 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: colors.grey[100] }}>Review Decision</p>
                      <p className="text-xs mt-0.5 leading-snug" style={{ color: colors.grey[200] }}>
                        Accept or reject this submission. You'll be asked to provide a message.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Reject button */}
                      <button
                        onClick={() => setModal("Rejected")}
                        className="inline-flex cursor-pointer items-center gap-1.5 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 active:bg-red-200 transition-colors"
                      >
                        <XCircleIcon />
                        Reject
                      </button>
                      {/* Accept button */}
                      <button
                        onClick={() => setModal("Accepted")}
                        className="inline-flex cursor-pointer items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors shadow-sm"
                      >
                        <CheckCircleIcon />
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
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
              {similarProjects.map((item) => (
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

      {modal && (
        <ConfirmationModal
          type={modal}
          onClose={() => setModal(null)}
          onConfirm={handleConfirm}
          originProject={originProject}
          colors={colors}
        />
      )}
    </div>
  );
}
