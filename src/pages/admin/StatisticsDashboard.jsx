import { useTheme } from "@emotion/react";
import { useMemo, useState } from "react";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from "recharts";
import { tokens } from "../../theme";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const STATUS = {
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  UNDER_REVIEW: "UnderReview",
  PENDING: "Pending", // ✅ NEW
};

const COLOR = {
  accepted: "#22c55e",
  rejected: "#ef4444",
  underReview: "#f59e0b",
  pending: "#6366f1", // ✅ NEW
  notSubmitted: "#64748b",
  submitted: "#3b82f6",
  purple: "#8b5cf6",
  cyan: "#06b6d4",
};

const CARD_THEMES = [
  { bg: "from-blue-600   to-blue-700", shadow: "shadow-blue-500/25" },
  { bg: "from-green-600  to-green-700", shadow: "shadow-green-500/25" },
  { bg: "from-slate-600  to-slate-700", shadow: "shadow-slate-500/25" },
  { bg: "from-emerald-500 to-emerald-600", shadow: "shadow-emerald-500/25" },
  { bg: "from-red-600    to-red-700", shadow: "shadow-red-500/25" },
  { bg: "from-amber-500  to-amber-600", shadow: "shadow-amber-500/25" },
];

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const fmt = (date) => {
  if (!date) return "—";
  const d = new Date(date);
  if (isNaN(d)) return "—";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const groupByDate = (proposals) => {
  const map = {};
  proposals.forEach((p) => {
    const day = fmt(p.submittedAt);
    if (day === "—") return;
    map[day] = (map[day] ?? 0) + 1;
  });
  return Object.entries(map)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON LOADER
// ─────────────────────────────────────────────────────────────────────────────
function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-slate-700/50 dark:bg-slate-700/60 rounded-xl ${className}`}
    />
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-28" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>
      <Skeleton className="h-64" />
      <Skeleton className="h-64" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUMMARY CARD
// ─────────────────────────────────────────────────────────────────────────────

function SummaryCard({ icon, label, value, theme, sub }) {
  return (
    <div
      className={`
        bg-gradient-to-br ${theme.bg} ${theme.shadow}
        shadow-lg rounded-2xl p-5 text-white
        hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-default
        relative overflow-hidden
      `}
    >
      {/* decorative circle */}
      <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/10" />
      <div className="absolute -right-2 -bottom-6 w-14 h-14 rounded-full bg-white/5" />

      <div className="relative z-10">
        <div className="text-2xl mb-2">{icon}</div>
        <div className="text-3xl font-extrabold leading-none tracking-tight">
          {value ?? 0}
        </div>
        <div className="text-xs font-semibold mt-1 text-white/70 uppercase tracking-widest">
          {label}
        </div>
        {sub !== undefined && (
          <div className="text-xs text-white/50 mt-0.5">{sub}</div>
        )}
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// CHART CARD WRAPPER, done
// ─────────────────────────────────────────────────────────────────────────────


function ChartCard({ title, subtitle, children }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div className="
      border
      rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300
      p-6
    "
      style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}
    >
      <div className="mb-4">
        <h3 className="text-sm font-bold tracking-wide" style={{ color: colors.grey[100] }}>
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs mt-0.5" style={{ color: colors.grey[300] }}>{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM TOOLTIP .done
// ─────────────────────────────────────────────────────────────────────────────

function ChartTooltip({ active, payload, label }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl border px-4 py-2.5 shadow-2xl text-xs"
      style={{ borderColor: colors.grey[700], backgroundColor: colors.grey[900] }}
    >
      {label && <p className="font-semibold mb-1.5" style={{ color: colors.grey[300] }}>{label}</p>}
      {payload.map((p, i) => (
        <p key={i} className="flex items-center gap-2" style={{ color: colors.grey[300] }}>
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: p.color }}
          />
          {p.name}:{" "}
          <strong className="ml-0.5" style={{ color: colors.grey[200] }}>{p.value}</strong>
        </p>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LEGEND DOT, done
// ─────────────────────────────────────────────────────────────────────────────

function LegendDot({ color, label, value }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div className="flex items-center gap-2 text-xs" style={{ color: colors.grey[300] }}>
      <span
        className="w-2.5 h-2.5 rounded-full shrink-0"
        style={{ background: color }}
      />
      {label}
      {value !== undefined && (
        <strong className="ml-0.5" style={{ color: colors.grey[100] }}>{value}</strong>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION HEADER, done
// ─────────────────────────────────────────────────────────────────────────────

function SectionHeader({ children }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-1 h-5 rounded-full bg-blue-500" />
      <h2 className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: colors.grey[200] }}>
        {children}
      </h2>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────────────────────────────────────

function EmptyState({ label = "No data available" }) {
  return (
    <div className="flex flex-col items-center justify-center h-48 gap-2 text-slate-400">
      <span className="text-3xl">📭</span>
      <p className="text-sm">{label}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PIE CHART – Submitted vs Not Submitted, done
// ─────────────────────────────────────────────────────────────────────────────

function SubmissionPieChart({ submitted, notSubmitted }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = [
    { name: "Submitted", value: submitted },
    { name: "Not Submitted", value: notSubmitted },
  ];
  const COLORS = [COLOR.submitted, COLOR.notSubmitted];
  const total = submitted + notSubmitted;

  if (total === 0) return <EmptyState />;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <ResponsiveContainer width={200} height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%" cy="50%"
            innerRadius={58} outerRadius={88}
            paddingAngle={4}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex flex-col gap-4 flex-1">
        {data.map((d, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs mb-1.5">
              <LegendDot color={COLORS[i]} label={d.name} />
              <span className="font-bold " style={{ color: colors.grey[200] }}>
                {d.value} <span className="font-normal" style={{ color: colors.grey[100] }}>
                  ({total ? ((d.value / total) * 100).toFixed(0) : 0}%)
                </span>
              </span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: colors.grey[800] }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${total ? (d.value / total) * 100 : 0}%`,
                  background: COLORS[i],
                }}
              />
            </div>
          </div>
        ))}
        <p className="text-xs mt-1" style={{ color: colors.grey[100] }}>
          Total groups: <strong style={{ color: colors.grey[200] }}>{total}</strong>
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BAR CHART – Proposal Status Distribution, done
// ─────────────────────────────────────────────────────────────────────────────
function StatusBarChart({ accepted, rejected, underReview, pending }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const data = [
    { name: "Accepted", count: accepted, fill: COLOR.accepted },
    { name: "Rejected", count: rejected, fill: COLOR.rejected },
    { name: "Under Review", count: underReview, fill: COLOR.underReview },
    { name: "Pending", count: pending, fill: COLOR.pending }, // ✅ NEW
  ];

  if (!accepted && !rejected && !underReview && !pending) return <EmptyState />;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }} barCategoryGap="35%">
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grey[200]} strokeOpacity={0.5} vertical={false} />
        <XAxis dataKey="name" tick={{ fill: colors.grey[200], fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis allowDecimals={false} tick={{ fill: colors.grey[200], fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: colors.grey[900], radius: 6 }} />
        <Bar dataKey="count" name="Proposals" radius={[8, 8, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LINE CHART – Proposals Over Time, done
// ─────────────────────────────────────────────────────────────────────────────
function ProposalsLineChart({ data }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  if (!data.length) return <EmptyState label="No submission dates available" />;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grey[200]} strokeOpacity={0.5} vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fill: colors.grey[300], fontSize: 10 }}
          axisLine={false} tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fill: colors.grey[300], fontSize: 11 }}
          axisLine={false} tickLine={false}
        />
        <Tooltip content={<ChartTooltip />} />
        <Line
          type="monotone"
          dataKey="count"
          name="Proposals"
          stroke={COLOR.submitted}
          strokeWidth={2.5}
          dot={{ fill: COLOR.submitted, r: 4, strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BAR CHART – Top Groups by Member Count, done
// ─────────────────────────────────────────────────────────────────────────────
function TopGroupsChart({ groups }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = useMemo(
    () =>
      [...groups]
        .sort((a, b) => (b.membersCount ?? 0) - (a.membersCount ?? 0))
        .slice(0, 8)
        .map((g) => ({ name: g.name?.split(" ")[0] ?? "—", members: g.membersCount ?? 0 })),
    [groups]
  );

  if (!data.length) return <EmptyState />;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 0 }} barCategoryGap="25%">
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grey[200]} strokeOpacity={0.5} horizontal={false} />
        <XAxis
          type="number"
          allowDecimals={false}
          tick={{ fill: colors.grey[300], fontSize: 11 }}
          axisLine={false} tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={60}
          tick={{ fill: colors.grey[300], fontSize: 11 }}
          axisLine={false} tickLine={false}
        />
        <Tooltip content={<ChartTooltip />} cursor={{ fill: "#f1f5f9" }} />
        <Bar dataKey="members" name="Members" fill={COLOR.purple} radius={[0, 8, 8, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RECENT PROPOSALS TABLE, done
// ─────────────────────────────────────────────────────────────────────────────
function StatusChip({ status }) {
  const map = {
    [STATUS.ACCEPTED]: "bg-green-500  text-white ",
    [STATUS.REJECTED]: "bg-red-500    text-white",
    [STATUS.UNDER_REVIEW]: "bg-orange-500  text-white",
    [STATUS.PENDING]: "bg-yellow-500  text-white",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${map[status] ?? "bg-slate-100 text-slate-500"}`}>
      {status ?? "Unknown"}
    </span>
  );
}

function RecentProposalsTable({ proposals }) {  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const recent = useMemo(
    () => [...proposals].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)).slice(0, 6),
    [proposals]
  );

  if (!recent.length) return <EmptyState />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-200">
        <thead>
          <tr className="border-b " style={{ color: colors.grey[100], borderColor: colors.grey[700] }}>
            {["Title", "Group", "Leader", "Submitted", "Status"].map((h) => (
              <th
                key={h}
                className="pb-3 text-left text-xs font-bold uppercase tracking-widest px-2 first:pl-0 last:pr-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {recent.map((p) => (
            <tr
              key={p.id}
              className="not-last:border-b  transition-colors"
              style={{ borderColor: colors.grey[800] }}
            >
              <td className="py-3 px-2 pl-0 font-medium truncate" style={{ color: colors.grey[100] }}>
                {p.title || "—"}
              </td>
              <td className="py-3 px-2" style={{ color: colors.grey[300] }}>{p.groupName || "—"}</td>
              <td className="py-3 px-2" style={{ color: colors.grey[300] }}>{p.leaderName || "—"}</td>
              <td className="py-3 px-2 whitespace-nowrap" style={{ color: colors.grey[300] }}>{fmt(p.submittedAt)}</td>
              <td className="py-3 px-2 pr-0">
                <StatusChip status={p.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * StatisticsDashboard
 *
 * @param {Object}  props
 * @param {Array}   props.proposals  – array from GET /api/Proposals
 * @param {Array}   props.groups     – array from GET /api/Groups
 * @param {boolean} props.loading    – show skeleton while fetching
 */
export default function StatisticsDashboard({
  proposals = [],
  groups = [],
  loading = false,
}) {
  // const [dark, setDark] = useState(false);

  // ── Computed statistics ──────────────────────────────────────────────────
  const stats = useMemo(() => {
    const totalGroups = groups.length;
    const submitted = groups.filter((g) => g.proposalStatus !== null && g.proposalStatus !== undefined).length;
    const notSubmitted = totalGroups - submitted;

    const accepted = proposals.filter((p) => p.status === STATUS.ACCEPTED).length;
    const rejected = proposals.filter((p) => p.status === STATUS.REJECTED).length;
    const underReview = proposals.filter((p) => p.status === STATUS.UNDER_REVIEW).length;
    const pending = proposals.filter((p) => p.status === STATUS.PENDING).length; // ✅ NEW

    const timelineData = groupByDate(proposals);

    return {
      totalGroups,
      submitted,
      notSubmitted,
      accepted,
      rejected,
      underReview,
      pending, // ✅ NEW
      timelineData
    };
  }, [proposals, groups]);

  // ── Summary cards config ─────────────────────────────────────────────────
  const cards = [
    { icon: "👥", label: "Total Groups", value: stats.totalGroups, theme: CARD_THEMES[0] },
    {
      icon: "📨", label: "Submitted", value: stats.submitted, theme: CARD_THEMES[1],
      sub: stats.totalGroups ? `${((stats.submitted / stats.totalGroups) * 100).toFixed(0)}% of groups` : ""
    },
    { icon: "✅", label: "Accepted", value: stats.accepted, theme: CARD_THEMES[3] },
    { icon: "❌", label: "Rejected", value: stats.rejected, theme: CARD_THEMES[4] },
    { icon: "⏳", label: "Under Review", value: stats.underReview, theme: CARD_THEMES[5] },
    { icon: "🕐", label: "Pending", value: stats.pending, theme: CARD_THEMES[0] }, // ✅ NEW
  ];

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div >
      <div className="min-h-screen transition-colors duration-300">
        {/* ── BODY ────────────────────────────────────────────────────────── */}
        <main className="max-w-screen-xl mx-auto px-6 py-8 space-y-10">

          {loading ? (
            <DashboardSkeleton />
          ) : (
            <>
              {/* ── SUMMARY CARDS ─────────────────────────────────────────── */}
              <section>
                <SectionHeader>Summary</SectionHeader>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {cards.map((c, i) => (
                    <SummaryCard key={i} {...c} />
                  ))}
                </div>
              </section>

              {/* ── CHARTS ROW 1 ──────────────────────────────────────────── */}
              <section>
                <SectionHeader>Submission &amp; Status Overview</SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pie: Submitted vs Not Submitted */}
                  <ChartCard
                    title="Group Submission Rate"
                    subtitle="Groups that have submitted a proposal vs those that haven't"
                  >
                    <SubmissionPieChart
                      submitted={stats.submitted}
                      notSubmitted={stats.notSubmitted}
                    />
                  </ChartCard>

                  {/* Bar: Proposal Status */}
                  <ChartCard
                    title="Proposal Status Distribution"
                    subtitle="Accepted · Rejected · Under Review"
                  >
                    <div className="flex gap-4 mb-4">
                      <LegendDot color={COLOR.accepted} label="Accepted" value={stats.accepted} />
                      <LegendDot color={COLOR.rejected} label="Rejected" value={stats.rejected} />
                      <LegendDot color={COLOR.underReview} label="Under Review" value={stats.underReview} />
                    </div>
                    <StatusBarChart
                      accepted={stats.accepted}
                      rejected={stats.rejected}
                      underReview={stats.underReview}
                      pending={stats.pending} // ✅ ADD THIS
                    />
                  </ChartCard>
                </div>
              </section>

              {/* ── CHARTS ROW 2 ──────────────────────────────────────────── */}
              <section>
                <SectionHeader>Trends &amp; Rankings</SectionHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Line: Proposals over time */}
                  <ChartCard
                    title="Proposals Submitted Over Time"
                    subtitle="Daily submission count"
                  >
                    <ProposalsLineChart data={stats.timelineData} />
                  </ChartCard>

                  {/* Bar: Top groups by members */}
                  <ChartCard
                    title="Top Groups by Members"
                    subtitle="Ranked by member count (top 8)"
                  >
                    <TopGroupsChart groups={groups} />
                  </ChartCard>
                </div>
              </section>

              {/* ── RECENT PROPOSALS TABLE ────────────────────────────────── */}
              <section>
                <SectionHeader>Recent Proposals</SectionHeader>
                <ChartCard
                  title="Latest Submitted Proposals"
                  subtitle="Showing the 6 most recent submissions"
                >
                  <RecentProposalsTable proposals={proposals} />
                </ChartCard>
              </section>

              {/* ── NOT-SUBMITTED WARNING ─────────────────────────────────── */}
              {stats.notSubmitted > 0 && (
                <section>
                  <div className="
                    bg-[#ffdb581b]
                    border border-amber-200 dark:border-amber-500/20
                    rounded-2xl p-5 flex gap-4 items-start
                  ">
                    <span className="text-3xl mt-0.5 flex-shrink-0">⚠️</span>
                    <div>
                      <p className="font-bold text-amber-700 dark:text-amber-400 text-sm mb-1">
                        {stats.notSubmitted} group{stats.notSubmitted > 1 ? "s have" : " has"} not submitted a proposal yet
                      </p>
                      <p className="text-xs text-amber-600/70 dark:text-amber-600">
                        {groups
                          .filter((g) => !g.proposalStatus)
                          .map((g) => g.name)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </>
          )}
        </main>

        {/* ── FOOTER ──────────────────────────────────────────────────────── */}
        <footer className="max-w-screen-xl mx-auto px-6 pb-8 text-center">
          <p className="text-xs text-slate-300 dark:text-slate-600">
            EvaluateItEasily · Admin Statistics Dashboard
          </p>
        </footer>

      </div>
    </div>
  );
}
