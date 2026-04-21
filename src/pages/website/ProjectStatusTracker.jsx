import { useState } from "react";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";

const STATUS_ORDER = ["Pending", "UnderReview", "Accepted"];
const REJECTED_BRANCH_AFTER = "UnderReview";

const STATUSES = {
  Pending: {
    label: "Pending",
    sublabel: "Awaiting review",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  UnderReview: {
    label: "UnderReview",
    sublabel: "Being evaluated",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  Accepted: {
    label: "Accepted",
    sublabel: "Congratulations!",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  Rejected: {
    label: "Rejected",
    sublabel: "Not approved",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
  },
  FinalDecision: {
    label: "FinalDecision",
    sublabel: "Congratulations!",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  }
};

const THEME = {
  Pending: {
    node: "#E2C97E",
    glow: "rgba(226,201,126,0.35)",
    text: "#E2C97E",
    line: "#E2C97E",
  },
  UnderReview: {
    node: "#7EB8E2",
    glow: "rgba(126,184,226,0.35)",
    text: "#7EB8E2",
    line: "#7EB8E2",
  },
  Accepted: {
    node: "#6EE7B7",
    glow: "rgba(110,231,183,0.35)",
    text: "#6EE7B7",
    line: "#6EE7B7",
  },
  Rejected: {
    node: "#F87171",
    glow: "rgba(248,113,113,0.35)",
    text: "#F87171",
    line: "#F87171",
  },
  FinalDecision : {
    node: "#6EE7B7",
    glow: "rgba(110,231,183,0.35)",
    text: "#6EE7B7",
    line: "#6EE7B7",
  }
};

function getStepState(stepKey, currentStatus) {
  if (currentStatus === "Rejected") {
    if (stepKey === "Pending") return "completed";
    if (stepKey === "UnderReview") return "completed";
    if (stepKey === "Accepted") return "locked";
    if (stepKey === "Rejected") return "active";
  }
  if (stepKey === "FinalDecision") return "upcoming";

  const idx = STATUS_ORDER.indexOf(stepKey);
  const curIdx = STATUS_ORDER.indexOf(currentStatus);
  if (idx < curIdx) return "completed";
  if (idx === curIdx) return "active";
  return "upcoming";
}

function getLineProgress(fromKey, toKey, currentStatus) {
  if (currentStatus === "Rejected") {
    if (fromKey === "Pending" && toKey === "UnderReview") return 1;
    if (fromKey === "UnderReview" && toKey === "Accepted") return 1;
  }
  const fromIdx = STATUS_ORDER.indexOf(fromKey);
  const toIdx = STATUS_ORDER.indexOf(toKey);
  const curIdx = STATUS_ORDER.indexOf(currentStatus);
  if (curIdx > fromIdx) return 1;
  if (curIdx === toIdx) return 1;
  if (curIdx === fromIdx) return 0;
  return 0;
}


export default function ProjectStatusTracker({status}) {
  const [currentStatus] = useState(status);

  return (
    <div
      className="flex justify-center z-10"
    >
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "680px" }}>

        {/* TRACKER */}
        <div style={{ position: "relative" }}>
          {/* Main horizontal track */}
          <MainTrack
            currentStatus={currentStatus}
            getLineProgress={getLineProgress}
            getStepState={getStepState}
          />

        </div>        
      </div>

      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes line-fill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes branch-fill {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @keyframes node-appear {
          from { transform: scale(0.4); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function MainTrack({ currentStatus, getLineProgress, getStepState }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let mainSteps = ["Pending", "UnderReview"];
  if(currentStatus === "Accepted" || currentStatus === "Rejected")
    mainSteps = [...mainSteps, currentStatus]
  else 
    mainSteps = [...mainSteps, "FinalDecision"]

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        position: "relative",
        paddingBottom: "0px",
      }}
    >
      {mainSteps.map((key, i) => {
        const state = getStepState(key, currentStatus);
        const theme = THEME[key];
        const isLast = i === mainSteps.length - 1;
        const nextKey = !isLast ? mainSteps[i + 1] : null;
        const lineProgress = nextKey
          ? getLineProgress(key, nextKey, currentStatus)
          : null;

        const isLocked = state === "locked";

        return (
          <div
            key={key}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              flex: isLast ? "0 0 auto" : 1,
              zIndex: 1,
            }}
          >
            {/* Node + line row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                position: "relative",
              }}
            >
              {/* NODE */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                {/* Pulse ring for active */}
                {state === "active" && !isLocked && (
                  <div
                    style={{
                      position: "absolute",
                      inset: "-10px",
                      border: `1px solid ${theme.node}`,
                      borderRadius: "50%",
                      animation: "pulse-ring 2s ease-out infinite",
                    }}
                  />
                )}
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border: `1.5px solid ${
                      isLocked ? "#1A1F2E" : state === "upcoming" ? colors.grey[800] : theme.node
                    }`,
                    background:
                      state === "completed"
                        ? `${theme.node}22`
                        : state === "active"
                        ? `${theme.node}18`
                        : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.5s ease",
                    boxShadow:
                      state === "active"
                        ? `0 0 16px ${theme.glow}, 0 0 40px ${theme.glow}`
                        : "none",
                    animation: state === "active" ? "node-appear 0.4s ease" : "none",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      width: "14px",
                      height: "14px",
                      color:
                        isLocked
                          ? "#1A1F2E"
                          : state === "upcoming"
                          ? colors.grey[800]
                          : theme.node,
                      transition: "color 0.5s ease",
                    }}
                  >
                    {STATUSES[key].icon}
                  </div>
                </div>
              </div>

              {/* LINE to next node */}
              {!isLast && (
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: colors.grey[800],
                    position: "relative",
                    margin: "0 4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        lineProgress > 0
                          ? `linear-gradient(90deg, ${THEME[key].line}, ${THEME[nextKey]?.line || THEME[key].line})`
                          : "transparent",
                      transformOrigin: "left center",
                      transform: `scaleX(${lineProgress})`,
                      transition: "transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)",
                      boxShadow:
                        lineProgress > 0 ? `0 0 8px ${THEME[key].glow}` : "none",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Label below node */}
            <div style={{ marginTop: "14px", textAlign: "center" }}>
              <div
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color:
                    isLocked
                      ? "#1E2330"
                      : state === "upcoming"
                      ? colors.grey[600]
                      : state === "active"
                      ? theme.node
                      : colors.blueAccent[700],
                  transition: "color 0.5s ease",
                  whiteSpace: "nowrap",
                  fontWeight: state === "active" ? "500" : "400",
                }}
              >
                {STATUSES[key].label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RejectedBranch({ progress, currentStatus }) {
  const theme = THEME.Rejected;
  const isActive = currentStatus === "Rejected";

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 0,
        paddingLeft: "calc(50% - 18px)", // align to "under_review" node
      }}
    >
      {/* Vertical branch line down from under_review */}
      <div
        style={{
          width: "1px",
          height: "48px",
          background: "#131720",
          position: "relative",
          overflow: "hidden",
          marginLeft: "18px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: progress > 0 ? theme.line : "transparent",
            transformOrigin: "top center",
            transform: `scaleY(${progress})`,
            transition: "transform 0.5s cubic-bezier(0.65, 0, 0.35, 1) 0.2s",
            boxShadow: progress > 0 ? `0 0 8px ${theme.glow}` : "none",
          }}
        />
      </div>

      {/* Rejected node */}
      <div
        style={{
          marginLeft: "18px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: progress,
          transition: "opacity 0.4s ease 0.5s",
        }}
      >
        <div style={{ position: "relative" }}>
          {isActive && (
            <div
              style={{
                position: "absolute",
                inset: "-10px",
                border: `1px solid ${theme.node}`,
                borderRadius: "50%",
                animation: "pulse-ring 2s ease-out infinite",
              }}
            />
          )}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: `1.5px solid ${progress > 0 ? theme.node : "#131720"}`,
              background: progress > 0 ? `${theme.node}18` : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.5s ease",
              boxShadow:
                isActive
                  ? `0 0 16px ${theme.glow}, 0 0 40px ${theme.glow}`
                  : "none",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div style={{ width: "14px", height: "14px", color: theme.node }}>
              {STATUSES.Rejected.icon}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "14px",
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: isActive ? theme.node : "#2E3450",
            transition: "color 0.5s ease",
            fontWeight: isActive ? "500" : "400",
          }}
        >
          {STATUSES.Rejected.label}
        </div>
      </div>
    </div>
  );
}




