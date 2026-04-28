// ProposalCard.jsx
// Design matches the provided screenshot.
// All fields from the API response are displayed.
// TailwindCSS only — no external libraries.

import { useTheme } from "@emotion/react";
import Title from "../admin/Title";
import { tokens } from "../../theme";
import { handleDownload } from "../admin/DownloadProposal";
import { useRef, useState } from "react";
import SimpleLoader from "../../loaders/SimpleLoader";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { presignedUpload, updateProposal } from "../../services/proposalServices";
import { toast } from "react-toastify";
import { HandleErrors } from "../../utils/HandleErrors";
import ProjectStatusTracker from "./ProjectStatusTracker";
import axios from "axios";
import UploadOverlay from "./UploadOverlay";

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
  </svg>
);
const DEMO = {
  id: 7,
  title: "ECommerce",
  abstract:
    "E-commerce involves buying and selling goods, services, or information over the internet, utilizing digital platforms for transactions, marketing, and, according to Lemon.io, key components like online storefronts and payment systems. It includes various models B2C, B2B, C2C, and D2C designed to enhance customer interaction, expand market reach, and increase revenue by optimizing online shopping experiences.",
  downloadUrl: "https://example.com/files/PROPOSAL.pdf",
  status: "Accepted",
  submittedAt: "2026-04-19T11:02:55.120Z",
  groupId: 3,
  groupName: "Digital Commerce Lab",
  leaderName: "Sara Hassan",
  membersCount: 4,
  fileName: "PROPOSAL.pdf",
  contentType: "application/pdf",
};

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function fmtTime(iso) {
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInitials(name = "") {
  return (
    name
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "?"
  );
}

// ── Status badge ──────────────────────────────────────────────────────────────
const STATUS_STYLES = {
  Accepted: "border border-green-500 text-green-600",
  UnderReview: "border border-orange-500 text-orange-500",
  Pending: "border border-sky-500 text-sky-600",
  Rejected: "border border-red-500 text-red-600",
};

function StatusBadge({ status }) {
  const key = (status || "");
  const style = STATUS_STYLES[key] || "border border-gray-400 text-gray-600";
  const isGood = key === "Accepted";
  const isBad = key === "Rejected";

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${style}`}>

      {!isGood && !isBad && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {status}
    </span>
  );
}

// ── Divider section wrapper ───────────────────────────────────────────────────
function Section({ title, children, colors }) {
  return (
    <div className="border-t py-5" style={{ borderColor: colors.grey[800] }}>
      <p className="text-sm font-semibold mb-3" style={{ color: colors.grey[200] }}>{title}</p>
      {children}
    </div>
  );
}

// ── Label + value row ─────────────────────────────────────────────────────────
function InfoRow({ label, value, colors }) {
  return (
    <div className="flex items-start py-2">
      <span className="text-sm w-32 shrink-0" style={{ color: colors.grey[200] }}>{label}</span>
      <span className="text-sm font-medium truncate" style={{ color: colors.grey[400] }}>{value || "—"}</span>
    </div>
  );
}

// ── Member avatars ────────────────────────────────────────────────────────────
function MemberAvatars({ count, colors }) {
  const visible = Math.min(count, 5);
  const overflow = count > 5 ? count - 5 : 0;
  return (
    <div className="flex items-center">
      {Array.from({ length: visible }).map((_, i) => (
        <div
          key={i}
          className="w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-semibold "
          style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[600], marginLeft: i > 0 ? "-6px" : 0 }}
        >
          {String.fromCharCode(65 + i)}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-[10px] font-semibold text-gray-600"
          style={{ marginLeft: "-6px" }}
        >
          +{overflow}
        </div>
      )}
      <span className="ml-2 text-sm text-gray-500" style={{ color: colors.grey[300] }}>
        {count} member{count !== 1 ? "s" : ""}
      </span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ProposalCard({ myProposal, setMyProposal }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [updateForm, setUpdateForm] = useState(false)
  const onClose = () => {
    setUpdateForm(false);
  }

  return (
    <div className="min-h-screen py-6 lg:px-0 px-2 justify-center">
      <UpdateProposal colors={colors} onClose={onClose} myProposal={myProposal} setMyProposal={setMyProposal} updateForm={updateForm} />
      <div className="flex sm:flex-row flex-col sm:items-center sm:justify-between">
        <Title title={"My Proposal"} subTitle={""} />
        <button onClick={() => setUpdateForm(!updateForm)} className="px-3 py-1.5 mb-3 sm:mb-0 border rounded-lg cursor-pointer bg-black text-white" style={{ borderColor: colors.grey[700] }}>Update Proposal</button>
      </div>
      <div className="w-full rounded-2xl sm:px-6 px-3 border overflow-hidden shadow-sm" style={{ borderColor: colors.grey[700], backgroundColor: colors.blueAccent[800] }}>

        {/* ── 1. Header: Title + ID + Status badge ── */}
        <div className=" py-5">
          <div className="flex items-start justify-between gap-4 mb-2" style={{ color: colors.grey[100] }}>
            <h1 className="text-xl font-medium ">{myProposal.title}</h1>
            <span className="font-mono text-xs mt-1 shrink-0">
              #{String(myProposal.id).padStart(4, "0")}
            </span>
          </div>
          <ProjectStatusTracker status={myProposal.status} />
        </div>

        {/* ── 2. Abstract (matches screenshot) ── */}
        <Section title="Abstract" colors={colors}>
          <p className="text-sm leading-relaxed" style={{ color: colors.grey[400] }}>{myProposal.abstract}</p>
        </Section>

        {/* ── 3. Submission Details (fields not in screenshot) ── */}
        <Section title="Submission Details" colors={colors}>
          <div className="rounded-xl border overflow-hidden pl-3 sm:p-5 " style={{ borderColor: colors.grey[700], backgroundColor: colors.grey[900] }}>
            <InfoRow
              colors={colors}
              label="Submitted on"
              value={`${fmtDate(myProposal.submittedAt)}  ·  ${fmtTime(myProposal.submittedAt)}`}
            />
            <InfoRow colors={colors} label="Group ID" value={`GRP-${myProposal.groupId}`} />
            <InfoRow colors={colors} label="Group name" value={myProposal.groupName} />
          </div>
        </Section>

        {/* ── 4. Research Group: leader + members (not in screenshot) ── */}
        <Section title="Research Group" colors={colors}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            {/* Leader */}
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-black text-white border border-gray-200 flex items-center justify-center text-sm font-semibold shrink-0">
                {getInitials(myProposal.leaderName)}
              </div>
              <div>
                <p className="text-xs mb-0.5" style={{ color: colors.grey[100] }}>Leader</p>
                <p className="text-sm font-semibold text-gray-800" style={{ color: colors.grey[300] }}>{myProposal.leaderName}</p>
              </div>
            </div>
            {/* Members */}
            <div className="flex-1">
              <p className="text-xs mb-2" style={{ color: colors.grey[200] }}>Members</p>
              <MemberAvatars colors={colors} count={myProposal.membersCount} />
            </div>
          </div>
        </Section>

        {/* ── 5. Project File (matches screenshot exactly) ── */}
        <Section title="Project File" colors={colors}>
          <div className="flex items-center justify-between gap-4 border rounded-xl px-4 py-3" style={{ backgroundColor: colors.grey[900], borderColor: colors.grey[700] }}>
            {/* File icon + name + mime badge */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 shrink-0 border rounded-lg  flex items-center justify-center" style={{ backgroundColor: colors.grey[900], borderColor: colors.grey[700] }}>
                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5L9 1Z" />
                  <polyline points="9 1 9 5 13 5" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold leading-snug" style={{ color: colors.grey[100] }}>
                  {myProposal.fileName}
                </p>
                <span className="inline-block mt-1 text-[11px] font-medium border px-2 py-0.5 rounded" style={{ borderColor: colors.grey[700], color: colors.grey[200] }}>
                  {myProposal?.contentType?.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Download button — black pill, matches screenshot */}
            <button
              onClick={() => handleDownload(myProposal)}
              className="inline-flex  items-center cursor-pointer gap-2 bg-black text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm border"
              style={{ borderColor: colors.grey[600] }}>
              <DownloadIcon />
              <span className="hidden sm:block">Download</span>
            </button>
          </div>
        </Section>

      </div>

    </div>
  );
}


function UpdateProposal({ colors, myProposal, setMyProposal, updateForm, onClose }) {
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [data, setData] = useState({
    title: myProposal.title,
    abstract: myProposal.abstract,
    originalFileName: "",
    storedFileName: "",
    contentType: "application/pdf",
  });

  
  const handleUpdateProposal = async (e) => {
    e.preventDefault();
    if (!data.title || !data.abstract || !fileUpload) {
      toast.error("Please fill all the required fields.");
      return;
    }
    setLoading(true);

    try {
      const { uploadUrl, storedFileName } = await presignedUpload(fileName);

      await axios.put(uploadUrl, fileUpload, {
        headers: {
          'Content-Type': fileUpload.type,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });


      const res = await updateProposal(myProposal.id, {...data, storedFileName: storedFileName});
      setMyProposal(res);
      toast.success("Proposal updated successfully!");
      onClose();
    } catch (error) {
      HandleErrors(error.errors)
    } finally {
      setLoading(false);
    }
  } 

  const handleUploadFile = () => {
    fileRef.current.type = 'file';
    fileRef.current.accept = ".pdf";
    fileRef.current.multiple = false;
    fileRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const max_size = 10 * 1024 * 1024; // 10MB
      const file = files[0];
      if (file.size > max_size) {
        toast.error("File size exceeds 10MB limit.");
        fileRef.current.value = null;
        fileRef.current.files = null;
        setFileUpload(null);
        setFileName("");
        return;
      }
      setFileUpload(files[0]);
      setData({ ...data, originalFileName: file.name });
      setFileName(files[0].name);
    } else {
      setData({ ...data, [name]: value });
    }
  }
  
  return (
    <div>
      {
        updateForm && (
          <div
            className="fixed inset-0 z-50 flex backdrop-blur-xs items-center justify-center p-2 sm:p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                onClose();
                setFileUpload(null);
                setFileName("")
              }
            }}
          >

            <form
              onSubmit={handleUpdateProposal}
              encType="multipart/form-data"
              className='create-proposal relative max-w-xl w-full border rounded-xl py-5 '
              style={{ backgroundColor: colors.grey[900], borderColor: colors.grey[800] }}
            >
              {loading && <UploadOverlay progress={uploadProgress} />}

              <div className="input-box px-5 mb-5">
                <div className='flex justify-between px-1'>
                  <label style={{ color: colors.grey[300] }} htmlFor="">Project Title <span className='text-red-500'>*</span></label>
                  <p className={`text-sm ${data.title.length > 3 ? "text-green-500" : "text-red-500"}`}>{data.title.length} / <span>min 3</span></p>
                </div>
                <input
                  onChange={handleChange}
                  value={data.title}
                  style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}
                  name="title"
                  type="text"
                  placeholder='Enter project title'
                />
              </div>

              <div className="input-box px-5 mb-5">
                <div className='flex justify-between px-1'>
                  <label style={{ color: colors.grey[300] }} htmlFor="abstract">Abstract / Description <span className='text-red-500'>*</span></label>
                  <p className={`text-sm ${data.abstract.length < 20 ? "text-red-500" : "text-green-500"}`}>{data.abstract.length} / <span>min 20</span></p>
                </div>
                <textarea
                  value={data.abstract}
                  onChange={handleChange}
                  style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}
                  name="abstract"
                  rows={5} id="abstract"
                  placeholder='Provide a brief summary of your project goals, problem statement, and proposed solution...'
                />
              </div>

              <div className="input-box px-5 mb-5" >
                <label style={{ color: colors.grey[300] }} htmlFor="file">Full Proposal Document <span className='text-red-500'>*</span></label>
                <input onChange={handleChange} type="file" name='file' ref={fileRef} className='hidden' placeholder='Enter project title' />
                <div onClick={handleUploadFile} style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }} className='cursor-pointer border border-dashed rounded-[10px] flex flex-col justify-center items-center p-5 overflow-hidden'>
                  <CloudUploadIcon style={{ fontSize: "3rem" }} />
                  <p className='text-center text-xs  pointer-events-none'>Click to upload your project file</p>
                  <p className='text-xs pointer-events-none'>PDF, DOCX up to 10MB</p>
                </div>
                <p className='text-green-500 text-sm'> {fileName ? `uploaded : ${fileName}` : ""}</p>
              </div>

              <div className='px-5 flex sm:flex-row flex-col justify-end gap-3'>
                <button
                  onClick={() => {
                    onClose()
                    setFileUpload(null);
                    setFileName("")
                  }}
                  className="bg-transparent text-red-500 border-red-500 border hover:bg-red-500 hover:text-white"
                >Cancel</button>
                <button type='submit' className='sm:px-10  tracking-[1px] bg-transparent border-green-500 border text-green-500 hover:text-white hover:bg-green-600' >Save Changes</button>
              </div>
            </form>
          </div>
        )
      }
    </div>
  )
}