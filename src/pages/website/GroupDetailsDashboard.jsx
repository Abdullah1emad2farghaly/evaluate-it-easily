import { useTheme } from "@emotion/react";
import { memo, useCallback, useMemo, useState } from "react";
import { tokens } from "../../theme";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { removeMemberFromGroup, sendInvitation } from "../../services/groupServices";
import { toast } from "react-toastify";
import { HandleErrors } from "../../utils/HandleErrors";
import SimpleLoader from "../../loaders/SimpleLoader";
import Title from "../../components/admin/Title";

// ─── Types ────────────────────────────────────────────────────────────────────
/**
 * @typedef {{ studentId:string, fullName:string, email:string, isLeader:boolean, joinedAt:string }} Member
 * @typedef {{ id:number, name:string, leaderId:string, leaderName:string, membersCount:number,
 *             createdOn:string, proposalId:number, proposalStatus:string,
 *             supervisorName:string, technicalAssistantName:string, members:Member[] }} Group
 */

// ─── Constants ────────────────────────────────────────────────────────────────
const AVATAR_COLORS = [
  { bg: "#EEF2FF", fg: "#3B5CC4" },
  { bg: "#F0FDF4", fg: "#166534" },
  { bg: "#FFF7ED", fg: "#9A3412" },
  { bg: "#EFF6FF", fg: "#1D4ED8" },
  { bg: "#FDF4FF", fg: "#7E22CE" },
  { bg: "#F0FDFA", fg: "#0F766E" },
];

const STATUS_STYLES = {
  Accepted: { bg: "#F0FDF4", color: "#166534", border: "#BBF7D0", dot: "#16A34A" },
  Pending:  { bg: "#FFFBEB", color: "#92400E", border: "#FDE68A", dot: "#D97706" },
  Rejected: { bg: "#FEF2F2", color: "#991B1B", border: "#FECACA", dot: "#DC2626" },
};

const ROLE_CARD_STYLES = {
  leader: { bg: "#F5F3FF", border: "#DDD6FE", badgeBg: "#EDE9FE", badgeColor: "#5B21B6", badgeBorder: "#DDD6FE" },
  super:  { bg: "#EEF2FF", border: "#C7D2FE", badgeBg: "#EEF2FF", badgeColor: "#3730A3", badgeBorder: "#C7D2FE" },
  ta:     { bg: "#F0F9FF", border: "#BAE6FD", badgeBg: "#F0F9FF", badgeColor: "#0369A1", badgeBorder: "#BAE6FD" },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function initials(name) {
  const parts = name?.trim()?.split(/\s+/);
  return parts?.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : name?.slice(0, 2).toUpperCase();
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

// ─── Pure style helpers (module-level — never re-created) ─────────────────────
function AvatarStyle(role) {
  if (role === "Leader")     return "bg-green-500 border-green-500";
  if (role === "Supervisor") return "bg-orange-500 border-orange-500";
  if (role === "member")     return "bg-blue-500 border-blue-500";
  return "bg-yellow-500 border-yellow-500";
}

function RoleStyle(role) {
  if (role === "Leader")     return "border-green-500 text-green-500";
  if (role === "Supervisor") return "border-orange-500 text-orange-500";
  if (role === "member")     return "border-blue-500 text-blue-500";
  return "border-yellow-500 text-yellow-500";
}

// ─── Shared card className (module-level) ─────────────────────────────────────
const CARD_CLS = "rounded-xl mb-3";

// ─── Icons defined once at module level (no re-creation per render) ───────────
const UsersIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const CalIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// ─── Shared components ────────────────────────────────────────────────────────

// memo → skips re-render when name/role props are unchanged
const Avatar = memo(function Avatar({ name, role }) {
  return (
    <div
      className={`rounded-full text-sm shrink-0 text-white ${AvatarStyle(role)} h-9 w-9 border flex items-center justify-center font-medium`}
    >
      {initials(name)}
    </div>
  );
});

const MetaChip = memo(function MetaChip({ icon, children, colors }) {
  return (
    <span
      className="inline-flex items-center border text-xs gap-2 p-[4px_10px] rounded-full"
      style={{ color: colors.grey[300], borderColor: colors.grey[700] }}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </span>
  );
});

// ─── Role Card ────────────────────────────────────────────────────────────────

const RoleCard = memo(function RoleCard({ name, role, colors }) {
  const [hovered, setHovered] = useState(false);

  // Stable handlers — no deps, never re-created after mount
  const handleEnter = useCallback(() => setHovered(true),  []);
  const handleLeave = useCallback(() => setHovered(false), []);

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="rounded-xl border p-3.5 flex items-center gap-3 transition-all duration-150 cursor-default"
      style={{
        borderColor:     colors.grey[700],
        backgroundColor: colors.blueAccent[800],
        transform:  hovered ? "translateY(-2px)" : "none",
        boxShadow:  hovered ? "0 4px 16px rgba(0,0,0,.06)" : "none",
      }}
    >
      <Avatar name={name} role={role} size={44} />
      <div>
        <div className="text-sm font-medium mb-1" style={{ color: colors.grey[200] }}>{name}</div>
        <span className={`rounded-full font-medium text-[10px] ${RoleStyle(role)} p-[2px_7px] border`}>
          {role}
        </span>
      </div>
    </div>
  );
});

// ─── Dropdown Item ────────────────────────────────────────────────────────────


const DropdownItem = memo(function DropdownItem({ item, setQuery, setSearch, setShow, colors, theme }) {
  const handleMouseDown = useCallback(() => {
    setQuery(item);
    setSearch(item.fullName);
    setShow(false);
  }, [item, setQuery, setSearch, setShow]);

  return (
    <li
      onMouseDown={handleMouseDown}
      style={{ color: colors.grey[400] }}
      className={`p-2 cursor-pointer hover:text-[#00bc8a!important] ${
        theme.palette.mode === "dark" ? "hover:bg-[#87878752]" : "hover:bg-[#cecece8b]"
      }`}
    >
      {item.fullName}
    </li>
  );
});

// ─── Add Member ───────────────────────────────────────────────────────────────

const AddMember = memo(function AddMember({ students, myGroup, setLoading }) {
  const theme  = useTheme();
  const colors = tokens(theme.palette.mode);
  const [query,  setQuery]  = useState("");
  const [search, setSearch] = useState("");
  const [show,   setShow]   = useState(false);

  // Recompute only when students list or search string changes
  const studentFiltered = useMemo(
    () => students.filter(s => s?.fullName?.toLowerCase().includes(search.toLowerCase())),
    [students, search]
  );

  const addMember = useCallback(async (studentEmail, groupID) => {
    if (!studentEmail) {
      toast.error("Please select a valid student");
      return;
    }
    setLoading(true);
    try {
      await sendInvitation(groupID, { studentEmail });
      toast.success(`The invitations was successfully send to ${query.fullName}.`);
      setSearch("");
      setQuery("");
    } catch (err) {
      if(err?.errors?.length)
        HandleErrors(err.errors);
      else
        toast.error(err.message);
      console.log(err)
    } finally {
      setLoading(false);
    }
  }, [setLoading, query.fullName]);

  const handleFocus  = useCallback(() => setShow(true), []);
  const handleBlur   = useCallback(() => setTimeout(() => setShow(false), 100), []);
  const handleChange = useCallback((e) => {
    setSearch(e.target.value);
    setQuery("");
  }, []);

  const handleAdd = useCallback(
    () => {
      addMember(query.email, myGroup.id)
      
    },
    [addMember, query, myGroup.id]
  );

  
  return (
    <div className="groups">
      <div className="team-member my-4 p-5 border text-white rounded-xl" style={{ borderColor: colors.grey[700], backgroundColor: colors.grey[900] }}>
        <label htmlFor="teamMember" style={{ color: colors.grey[300] }}>Add Team Member</label>
        <div className="input-box col-span-10 flex-col sm:flex-row mt-1 relative">
          <input
            style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}
            type="text"
            value={search}
            placeholder="Select student to add..."
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full sm:w-[80%]"
          />

          {show && (
            <ul
              className="absolute w-full sm:w-auto top-11 border border-[#00bc8a] mt-1 rounded-lg shadow-lg max-h-50 overflow-y-auto z-50"
              style={{ background: colors.blueAccent[800] }}
            >
              {studentFiltered.length ? (
                studentFiltered.map((item, index) => (
                  <DropdownItem
                    key={index}
                    item={item}
                    setQuery={setQuery}
                    setSearch={setSearch}
                    setShow={setShow}
                    colors={colors}
                    theme={theme}
                  />
                ))
              ) : (
                <li className="p-2 text-gray-500">No results</li>
              )}
            </ul>
          )}

          <button
            className="w-full sm:w-[17%] max-w-full bg-transparent text-green-500 border-green-500 border hover:bg-green-500 hover:text-white sm:m-0 mt-2"
            onClick={handleAdd}
          >
            Send Invitation
          </button>
        </div>
      </div>
    </div>
  );
});

// ─── Member Table Row ─────────────────────────────────────────────────────────

// onRemoveClick is a stable useCallback from the parent — MemberRow only re-renders
// when its own member data or colors change
const MemberRow = memo(function MemberRow({ member, colors, onRemoveClick }) {
  // Binds this row's member data to the parent's stable handler
  const handleClick = useCallback(
    () => onRemoveClick(member.studentId, member),
    [onRemoveClick, member]
  );

  return (
    <tr style={{ borderColor: colors.grey[800] }} className="not-last:border-b">
      {/* Member */}
      <td className="px-3 py-2">
        <div className="flex items-center gap-2">
          <Avatar role={member.isLeader ? "Leader" : "member"} name={member.fullName} size={34} />
          <span className="text-sm font-medium" style={{ color: colors.grey[200] }}>{member.fullName}</span>
        </div>
      </td>
      {/* Role */}
      <td className="px-3 py-2">
        <span
          className={`inline-flex text-xs p-[3px_8px] ${
            member.isLeader ? RoleStyle("Leader") : RoleStyle("member")
          } border items-center gap-1 font-medium rounded-full`}
        >
          {member.isLeader && (
            <svg width="9" height="9" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L10 6.5H15L11 9.5L12.5 14L8 11L3.5 14L5 9.5L1 6.5H6Z" fill="#00c951" />
            </svg>
          )}
          {member.isLeader ? "Leader" : "Member"}
        </span>
      </td>
      {/* Email */}
      <td className="px-3 py-2 text-xs" style={{ color: colors.grey[300] }}>{member.email}</td>
      {/* Date */}
      <td className="px-3 py-2 text-xs whitespace-nowrap" style={{ color: colors.grey[300] }}>{fmtDate(member.joinedAt)}</td>
      {/* Action */}
      <td className="px-4">
        <button onClick={handleClick} className="cursor-pointer" style={{ color: colors.redAccent[500] }}>
          <DeleteForeverIcon />
        </button>
      </td>
    </tr>
  );
});

// ─── Section Header ───────────────────────────────────────────────────────────

const SectionHeader = memo(function SectionHeader({ title, colors }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-sm font-medium whitespace-nowrap" style={{ color: colors.grey[200] }}>{title}</span>
      <div className="flex-1" style={{ height: "0.5px", backgroundColor: colors.grey[700] }} />
    </div>
  );
});

// ─── Confirmation Modal ───────────────────────────────────────────────────────

const ConfirmModal = memo(function ConfirmModal({ colors, onCancel, onConfirm }) {
  return (
    <div
      className="fixed inset-0 backdrop-blur-sm w-full h-full top-0 left-0 bg-black-500 flex items-center justify-center z-50"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      <div
        className="rounded-xl border shadow-[0px_0px_5px_0px_#eee] max-w-150 p-6 w-120 relative"
        style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}
      >
        <button onClick={onCancel} className="absolute top-4 right-4 cursor-pointer">✕</button>

        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-100 text-red-600 rounded-md p-2">❌</div>
          <h2 className="text-lg font-semibold" style={{ color: colors.grey[200] }}>
            Remove member from group?
          </h2>
        </div>

        <p className="text-sm mb-6 leading-relaxed" style={{ color: colors.grey[300] }}>
          Are you sure you want to remove this member? They will lose access to all
          group projects and shared assets. This action can be undone by re-inviting them later.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-md border cursor-pointer border-gray-300  duration-500"
            style={{color: colors.grey[200]}}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-md bg-red-600 duration-500 cursor-pointer text-white hover:bg-red-700 shadow"
          >
            Remove Member
          </button>
        </div>
      </div>
    </div>
  );
});

// ─── Main Dashboard ───────────────────────────────────────────────────────────

/**
 * GroupDetailsDashboard
 * @param {{ group?: Group }} props  — pass your real group object; falls back to demo data
 */
export default function GroupDetailsDashboard({ setStudents, myGroup, students }) {
  const theme  = useTheme();
  const colors = tokens(theme.palette.mode);

  const [members,      setMembers]      = useState(myGroup.members);
  const [loading,      setLoading]      = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [studentID,    setStudentID]    = useState(null);
  const [member,       setMember]       = useState(null);

  const removeMember = useCallback(async (groupID, sid) => {
    setLoading(true);
    try {
      await removeMemberFromGroup(groupID, sid);
      toast.success("Member removed successfully!");
      setMembers(prev => prev.filter(m => m.studentId !== sid));
      setStudents(prev => [...prev, member]);
      setConfirmation(false);
    } catch (err) {
      HandleErrors(err.errors);
    } finally {
      setConfirmation(false);
      setLoading(false);
    }
  }, [member, setStudents]);

  
  const handleRemoveClick = useCallback((sid, m) => {
    setStudentID(sid);
    setConfirmation(true);
    setMember(m);
  }, []);

  const handleCancelConfirm = useCallback(() => {
    setConfirmation(false);
    setMember(null);
  }, []);

  const handleConfirmRemove = useCallback(
    () => removeMember(myGroup.id, studentID),
    [removeMember, myGroup.id, studentID]
  );

  return (
    <div className="min-h-screen ">
      <Title title={"My group"}/>
      {/* Conditionally rendered — zero cost when closed */}
      {confirmation && (
        <ConfirmModal
          colors={colors}
          onCancel={handleCancelConfirm}
          onConfirm={handleConfirmRemove}
        />
      )}

      <div>
        <SimpleLoader loading={loading} />

        {/* ── 1. HERO HEADER ── */}
        <div
          className={`${CARD_CLS} p-6 border`}
          style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}
        >
          <div className="text-xs mb-2 tracking-wide" style={{ color: colors.grey[300] }}>
            Dashboard → Groups → Details
          </div>

          <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-medium" style={{ color: colors.grey[100] }}>{myGroup.name}</h1>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap mb-3">
            <MetaChip colors={colors} icon={UsersIcon}>{myGroup.membersCount} members</MetaChip>
            <MetaChip colors={colors} icon={CalIcon}>Created {fmtDate(myGroup.createdOn)}</MetaChip>
          </div>
        </div>

        {/* ── 2. TEAM STRUCTURE ── */}
        {myGroup.supervisorName && myGroup.technicalAssistantName && (
          <div
            className={`${CARD_CLS} p-6 border`}
            style={{ backgroundColor: colors.grey[900], borderColor: colors.grey[700] }}
          >
            <SectionHeader colors={colors} title="Team structure" />
            <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}>
              <RoleCard colors={colors} name={myGroup.leaderName}             role="Leader"             variant="leader" />
              <RoleCard colors={colors} name={myGroup.supervisorName}         role="Supervisor"         variant="super"  />
              <RoleCard colors={colors} name={myGroup.technicalAssistantName} role="Technical assistant" variant="ta"    />
            </div>
          </div>
        )}

        {/* ── Add Member ── */}
        <AddMember
          setLoading={setLoading}
          myGroup={myGroup}
          students={students}
        />

        {/* ── 3. MEMBERS TABLE ── */}
        <div
          className={`${CARD_CLS} p-6 border`}
          style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}
        >
          <div className="mb-3">
            <span className="text-sm font-medium" style={{ color: colors.grey[200] }}>
              Group members{" "}
              <span className="text-xs font-normal text-green-400">{members.length} total</span>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-190" >
              <thead>
                <tr>
                  {["Member", "Role", "Email", "Joined", "Action"].map(h => (
                    <th
                      key={h}
                      className="text-left font-medium text-xs border-b uppercase tracking-wider px-3 py-2 whitespace-nowrap"
                      style={{ color: colors.grey[200], borderColor: colors.grey[700] }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {members.map(m => (
                  <MemberRow
                    key={m.studentId}
                    member={m}
                    colors={colors}
                    onRemoveClick={handleRemoveClick}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`@keyframes skpulse { 0%,100%{opacity:1} 50%{opacity:.35} }`}</style>
    </div>
  );
}
