import { useTheme } from "@emotion/react";
import { useState, useMemo, useEffect } from "react";
import { tokens } from "../../theme";
import { AllPeriods, CreactPeriod, ToggleActive, UpdatePeriod } from "../../services/timeSubmissionServices";
import Loader from '../../loaders/Loader'
import SimpleLoader from "../../loaders/SimpleLoader"
import { HandleErrors } from "../../utils/HandleErrors"
import { toast } from "react-toastify";
import Title from "../../components/admin/Title";

const initialPeriods = [
  {
    id: 1,
    title: "Annual Review 2026",
    startDate: "2026-05-01",
    endDate: "2026-08-15",
    status: "Inactive",
    openClosed: "Open",
    createdBy: "Sarah Johnson",
  },
  {
    id: 2,
    title: "Q2 2026 Submissions",
    startDate: "2026-04-01",
    endDate: "2026-06-30",
    status: "Active",
    openClosed: "Open",
    createdBy: "Sarah Johnson",
  },
  {
    id: 3,
    title: "Q1 2026 Submissions",
    startDate: "2026-01-01",
    endDate: "2026-03-31",
    status: "Inactive",
    openClosed: "Closed",
    createdBy: "Sarah Johnson",
  },
];

const activePeriod = initialPeriods.find((p) => p.status === "Active");

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

function toInputDate(dateStr) {
  return dateStr.split("T")[0] || "";
}

function CalendarIcon() {
  return (
    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function PowerIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
      <line x1="12" y1="2" x2="12" y2="12" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function StatusBadge({ status }) {
  const isActive = status === true;
  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium border ${isActive
        ? "text-green-500 border-green-500"
        : "text-red-500 border-red-500"
        }`}
    >
      {status ? "Active" : "Inactive"}
    </span>
  );
}

function OpenClosedBadge({ value }) {
  const isOpen = value === true;
  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium border ${isOpen
        ? "text-green-500 border-green-500"
        : "text-red-500 border-red-500"
        }`}
    >
      {isOpen ? "Open" : "Closed"}
    </span>
  );
}

function Modal({ colors, period, onClose, onSave, isCreate }) {
  const [form, setForm] = useState({
    title: period?.title || "",
    startDate: period?.startDate || "",
    endDate: period?.endDate || "",
  });

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = () => {
    // if (!form.title || !form.startDate || !form.endDate) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      {/* Modal box */}
      <div className="relative rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 border" style={{ backgroundColor: colors.grey[900], borderColor: colors.grey[800] }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold" style={{ color: colors.grey[200] }}>
            {isCreate ? "Create New Period" : "Edit Period"}
          </h2>
          <button onClick={onClose} className="cursor-pointer transition-colors" style={{ color: colors.grey[100] }}>
            <XIcon />
          </button>
        </div>
        <hr className="mb-6" style={{ color: colors.grey[800] }} />

        {/* Fields */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: colors.grey[300] }}>
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Q2 2026 Submissions"
              value={form.title}
              onChange={handleChange("title")}
              style={{ color: colors.grey[200], borderColor: colors.grey[800], backgroundColor: colors.blueAccent[800] }}
              className="w-full border rounded-lg px-4 py-2.5 text-sm placeholder-gray-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: colors.grey[300] }}>
              Start Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <CalendarIcon />
              </span>
              <input
                type="date"
                value={toInputDate(form.startDate)}
                onChange={handleChange("startDate")}
                style={{ color: colors.grey[200], borderColor: colors.grey[800], backgroundColor: colors.blueAccent[800] }}
                className="w-full border rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none "
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: colors.grey[300] }}>
              End Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <CalendarIcon />
              </span>
              <input
                type="date"
                value={toInputDate(form.endDate)}
                onChange={handleChange("endDate")}
                style={{ color: colors.grey[200], borderColor: colors.grey[800], backgroundColor: colors.blueAccent[800] }}
                className="w-full border rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none "
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white duration-500 cursor-pointer font-semibold rounded-lg py-2.5 text-sm transition-colors"
          >
            {isCreate ? "Create Period" : "Save Changes"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 cursor-pointer bg-gray-200 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg py-2.5 text-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const Toggle = ({ isActive, onClick }) => (
  <button onClick={onClick} className={`w-9 cursor-pointer h-5 flex items-center rounded-full p-0.5 ${isActive ? "bg-[#10B981]" : "bg-[#8f8f8f56]"}`}>
    <div className={`w-4 h-4 bg-white rounded-full transition ${isActive ? "translate-x-4" : ""}`} />
  </button>
);
export default function SubmissionPeriods() {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [periods, setPeriods] = useState(initialPeriods);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [sort, setSort] = useState("Newest First");
  const [modal, setModal] = useState(null);
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const getPeriods = async () => {
      try {
        const res = await AllPeriods();
        setPeriods(res);
      } catch (err) {
        HandleErrors(err.errors)
      } finally {
        setLoader(false);
      }
    }
    getPeriods()
    window.scrollTo(0, 0)
  }, [])

  const currentActive = useMemo(() => periods.find((p) => p.isOpen), [periods]);

  const filtered = useMemo(() => {
    let list = [...periods];
    if (search) list = list.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter !== "All Status") list = list.filter((p) => p.isActive === (statusFilter === "Active"));
    list.sort((a, b) => {
      const da = new Date(a.startDate);
      const db = new Date(b.startDate);
      return sort === "Newest First" ? db - da : da - db;
    });
    return list;
  }, [periods, search, statusFilter, sort]);

  const handleCreate = async (form) => {
    setLoading(true);
    const newPeriod = {
      title: form.title,
      startDate: form.startDate,
      endDate: form.endDate,
    };
    try {
      const response = await CreactPeriod(newPeriod)
      console.log(response);
      setPeriods((prev) => [response, ...prev]);
      toast.success("The period added successfully")
    } catch (error) {
      HandleErrors(error.errors);
    } finally {
      setLoading(false);
      setModal(null);
    }

  };

  const handleEdit = async (form) => {
    setLoading(true)
    try {
      const response = await UpdatePeriod(modal.period.id, form)
      setPeriods((prev) =>
        prev.map((p) =>
          p.id === modal.period.id ? { ...p, title: response.title, startDate: response.startDate, endDate: response.endDate } : p
        )
      );
      toast.success("The period updated successfully")
    } catch (error) {
      HandleErrors(error.errors);
    } finally {
      setLoading(false)
      setModal(null);
    }
  };

  const handleToggleStatus = async (id) => {
    setLoading(true)
    try {
      await ToggleActive(id);
      setPeriods((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isActive: p.isActive === true ? false : true } : p))
      );
    } catch (error) {
      HandleErrors(error.errors);
    } finally {
      setLoading(false)
    }

  };


  if (loader)
    return <Loader />

  return (
    <div className="min-h-screen font-sans">
      <div className="max-w-6xl relative mx-auto lg:pr-4 lg:px-0 px-3 py-4">
        <SimpleLoader loading={loading} />

        {/* Page Header */}
        <div className="flex sm:flex-row flex-col gap-2 items-start justify-between mb-6">
          <Title title={"Submission Periods"} subTitle={"Manage and monitor your submission periods"}/>
          
          <button
            onClick={() => setModal({ type: "create" })}
            className="flex items-center justify-center sm:w-fit w-full gap-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm transition-colors"
          >
            <span className="text-lg leading-none">+</span> Create New Period
          </button>
        </div>

        {/* Active Period Card */}
        {currentActive && (
          <div className="border rounded-2xl p-6 mb-6" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[800] }}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-semibold" style={{ color: colors.grey[100] }}>{currentActive.title}</h2>
                  <StatusBadge status={currentActive.isActive} />
                </div>
                <p className="text-sm mb-4" style={{ color: colors.grey[300] }}>Currently active submission period</p>
                <div className="flex sm:flex-row flex-col sm:items-center gap-2 text-sm" style={{ color: colors.grey[300] }}>
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon />
                    <span className="font-semibold">Start:</span> {formatDate(currentActive.startDate)}
                    <span>|</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon />
                    <span className="font-semibold">End:</span> {formatDate(currentActive.endDate)}
                  </span>
                </div>
              </div>
              <OpenClosedBadge value={currentActive.isOpen} />
            </div>
          </div>
        )}

        {/* Search + Filters */}
        <div className="flex sm:flex-row flex-col items-center gap-3 mb-4">
          <div className="flex gap-2.5 w-full">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ color: colors.grey[100], borderColor: colors.grey[800], backgroundColor: colors.blueAccent[800] }}
                className="w-full border focus:outline-none rounded-lg pl-9 pr-4 py-2.5 text-sm placeholder-gray-400 "
              />
            </div>
            <button
              className="p-3 border rounded-lg "
              style={{ color: colors.grey[100], borderColor: colors.grey[800], backgroundColor: colors.blueAccent[800] }}
            >
              <FilterIcon />
            </button>
          </div>
          <div className="flex gap-2.5 sm:w-fit w-full">
            <div
              style={{ color: colors.grey[300], borderColor: colors.grey[800], backgroundColor: colors.blueAccent[800] }}
              className="flex sm:w-fit w-1/2 items-center gap-2 border rounded-lg px-3 py-2.5"
            >
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ backgroundColor: colors.blueAccent[800] }}
                className="text-sm bg-transparent focus:outline-none cursor-pointer"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="flex sm:w-fit w-1/2 items-center gap-2 border border-gray- rounded-lg px-3 py-2.5" style={{ color: colors.grey[300], borderColor: colors.grey[800], backgroundColor: colors.blueAccent[800] }}>
              <SortIcon />
              <select
                value={sort}
                style={{ backgroundColor: colors.blueAccent[800] }}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm focus:outline-none cursor-pointer"
              >
                <option>Newest First</option>
                <option>Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-2xl style-scroll overflow-x-auto" style={{ color: colors.grey[100], borderColor: colors.grey[700], backgroundColor: colors.blueAccent[800] }}>
          <table className="w-full text-sm min-w-220">
            <thead>
              <tr className="border-b" style={{ borderColor: colors.grey[800] }}>
                <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: colors.grey[200] }}>Title</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: colors.grey[200] }}>Start Date</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: colors.grey[200] }}>End Date</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: colors.grey[200] }}>Status</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: colors.grey[200] }}>Open/Closed</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: colors.grey[200] }}>Created By</th>
                <th className="text-right px-6 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: colors.grey[200] }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((period) => (
                <tr key={period.id} className="transition-colors not-last:border-b" style={{ borderColor: colors.grey[800] }}>
                  <td className="px-6 py-4 font-semibold" style={{ color: colors.grey[200] }}>{period.title}</td>
                  <td className="px-4 py-4" style={{ color: colors.grey[400] }}>{formatDate(period.startDate)}</td>
                  <td className="px-4 py-4" style={{ color: colors.grey[400] }}>{formatDate(period.endDate)}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={period.isActive} />
                  </td>
                  <td className="px-4 py-4">
                    <OpenClosedBadge value={period.isOpen} />
                  </td>
                  <td className="px-4 py-4 " style={{ color: colors.grey[300] }}>{period.createdByName}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => setModal({ type: "edit", period })}
                        className="cursor-pointer transition-colors"
                        title="Edit"
                        style={{ color: colors.grey[200] }}
                      >
                        <EditIcon />
                      </button>
                      {/* <button
                        onClick={() => handleToggleStatus(period.id)}
                        className="cursor-pointer transition-colors"
                        title="Toggle Status"
                        style={{ color: colors.grey[200] }}
                      >
                        <PowerIcon />
                      </button> */}
                      <button onClick={()=>handleToggleStatus(period.id)} className={`w-9 cursor-pointer h-5 flex items-center rounded-full p-0.5 ${period.isActive ? "bg-[#10B981]" : "bg-[#8f8f8f56]"}`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition ${period.isActive ? "translate-x-4" : ""}`} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-sm">
                    No submission periods found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {modal?.type === "create" && (
        <Modal colors={colors} isCreate title="Create New Period" onClose={() => setModal(null)} onSave={handleCreate} />
      )}
      {modal?.type === "edit" && (
        <Modal title="Edit Period" colors={colors} period={modal.period} onClose={() => setModal(null)} onSave={handleEdit} />
      )}
    </div>
  );
}
