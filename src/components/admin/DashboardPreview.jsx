import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  LayoutGrid, TrendingUp, Award, BarChart2, Download, Search, X,
  Cpu, Shield, Database, Globe, Zap, Box, Cloud, Activity,
  MessageSquare, Eye, ChevronUp, ChevronDown, Layers, AlertCircle,
  RefreshCw, FlaskConical,
} from "lucide-react";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

const DOMAINS = [
  "Robotics & Autonomous Systems","Embedded Systems","Cybersecurity",
  "Fraud Detection","Green Computing & Sustainability","Blockchain",
  "Edge Computing & Cloud Computing","Big Data & Data Analytics",
  "Natural Language Processing (NLP)","Augmented Reality / Virtual Reality (AR/VR)",
];

const DOMAIN_COLORS = [
  "#6366f1","#0ea5e9","#10b981","#f59e0b","#ef4444",
  "#8b5cf6","#06b6d4","#84cc16","#f97316","#ec4899",
];

const DOMAIN_ICONS = {
  "Robotics & Autonomous Systems": Cpu,
  "Embedded Systems": Zap,
  "Cybersecurity": Shield,
  "Fraud Detection": AlertCircle,
  "Green Computing & Sustainability": Globe,
  "Blockchain": Box,
  "Edge Computing & Cloud Computing": Cloud,
  "Big Data & Data Analytics": Database,
  "Natural Language Processing (NLP)": MessageSquare,
  "Augmented Reality / Virtual Reality (AR/VR)": Eye,
};

const computeAnalytics = (projects) => {
  const map = Object.fromEntries(DOMAINS.map((d) => [d, 0]));
  projects.forEach(({ domain }) => { if (domain in map) map[domain]++; });
  const total = projects.length;
  return Object.entries(map)
    .map(([domain, count]) => ({
      domain,
      short: domain.length > 20 ? domain.slice(0, 20) + "…" : domain,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
    }))
    .sort((a, b) => b.count - a.count);
};

const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />
);

const BarTip = ({ active, payload, colors }) => {
  if (!active || !payload?.length) return null;
  const { domain, count, percentage } = payload[0].payload;
  return (
    <div className="border" style={{ background:colors.blueAccent[800], borderColor: colors.grey[600], borderRadius:12, padding:"10px 14px", minWidth:180 }}>
      <p style={{ fontSize:10, fontWeight:700, color:colors.blueAccent[400], textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:4 }}>Domain</p>
      <p style={{ fontSize:12, fontWeight:700, color:colors.blueAccent[300], marginBottom:8, lineHeight:1.3 }}>{domain}</p>
      <div style={{ display:"flex", gap:16 }}>
        <div><p style={{ fontSize:10, color:"#94a3b8" }}>Projects</p><p style={{ fontSize:18, fontWeight:900, color:"#6366f1" }}>{count}</p></div>
        <div><p style={{ fontSize:10, color:"#94a3b8" }}>Share</p><p style={{ fontSize:18, fontWeight:900, color:"#10b981" }}>{percentage.toFixed(1)}%</p></div>
      </div>
    </div>
  );
};

const PieTip = ({ active, payload, colors }) => {
  if (!active || !payload?.length) return null;
  const { domain, count, percentage } = payload[0].payload;
  return (
    <div className="border" style={{ background:colors.blueAccent[800], borderColor: colors.grey[700], borderRadius:12, padding:"10px 14px" }}>
      <p style={{ fontSize:12, fontWeight:700, color:colors.blueAccent[300], maxWidth:180, lineHeight:1.3 }}>{domain}</p>
      <p style={{ fontSize:11, color:"#94a3b8", marginTop:2 }}>{count} projects · {percentage.toFixed(1)}%</p>
    </div>
  );
};

const RADIAN = Math.PI / 180;
const PieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }) => {
  if (percentage < 6) return null;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight="800">{`${percentage.toFixed(0)}%`}</text>;
};

export default function Dashboard({proposals}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  


  const analytics = useMemo(() => proposals ? computeAnalytics(proposals) : [], [proposals]);

  const loading = proposals === null;
  const reversed = [...analytics].reverse();

  return (
    <div>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* Main */}
      <main className="overflow-hidden" style={{  display: "flex", flexDirection: "column", gap: 24 }}>

        {!loading && (
          <>
            <div className="flex md:flex-row flex-col items-center gap-6">
              {/* Bar chart */}
              <div className="md:w-1/2 w-full border" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700], borderRadius: 20, padding: 24, }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <TrendingUp size={16} color="#6366f1" />
                  <span style={{ fontSize: 14, fontWeight: 800, color: colors.grey[100] }}>Projects by Domain</span>
                </div>
                <ResponsiveContainer width="100%" height={360}>
                  <BarChart data={reversed} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grey[500]} horizontal={false} strokeOpacity={0.6} />
                    <XAxis type="number" allowDecimals={false} tick={{ fontSize: 10, fill: colors.grey[300]}} axisLine={false} tickLine={false} tickCount={6} />
                    <YAxis type="category" dataKey="short" width={130} tick={{ fontSize: 10, fill: colors.grey[300] }} axisLine={false} tickLine={false} />
                    <Tooltip content={<BarTip colors={colors}/>} cursor={{ fill: colors.grey[900], radius: 6 }} />
                    <Bar dataKey="count" radius={[0, 7, 7, 0]} maxBarSize={13} animationDuration={900}>
                      {reversed.map((_, i) => (
                        <Cell key={i} fill={DOMAIN_COLORS[analytics.length - 1 - i] ?? "#6366f1"} fillOpacity={0.92} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie chart */}
              <div className="md:w-1/2 w-full border" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700], borderRadius: 20, padding: 24, }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <Activity size={16} color="#6366f1" />
                  <span style={{ fontSize: 14, fontWeight: 800, color: colors.grey[100] }}>Distribution</span>
                </div>
                <ResponsiveContainer width="100%" height={360}>
                  <PieChart>
                    <Pie data={analytics.filter((d) => d.count > 0)} dataKey="count" nameKey="domain" cx="50%" cy="40%" outerRadius={105} innerRadius={45} labelLine={false} label={PieLabel} animationBegin={0} animationDuration={900}>
                      {analytics.filter((d) => d.count > 0).map((_, i) => (
                        <Cell key={i} fill={DOMAIN_COLORS[i % DOMAIN_COLORS.length]} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTip colors={colors}/>} />
                    <Legend formatter={(v) => <span style={{ fontSize: 10, color: colors.grey[300] }}>{v.length > 24 ? v.slice(0, 24) + "…" : v}</span>} iconSize={7} iconType="circle" wrapperStyle={{ fontSize: 10, paddingTop: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
