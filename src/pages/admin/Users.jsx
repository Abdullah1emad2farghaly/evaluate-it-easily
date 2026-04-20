import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";
import EditIcon from '@mui/icons-material/Edit';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SearchIcon from '@mui/icons-material/Search';
import { createUser, getAllUsers, toggleActivate, updateUser } from "../../services/userServices";
import { HandleErrors } from "../../utils/HandleErrors"
import Loader from "../../loaders/Loader"
import { toast } from "react-toastify";
import SimpleLoader from "../../loaders/SimpleLoader";


const Filters = ({ setCreating, colors, users, setUsers }) => {
    const [userRole, setUserRole] = useState("All Roles");
    const [userStatus, setUserStatus] = useState('All Status');
    const [name, setName] = useState("");
    useEffect(() => {
        let filtered = [...users];

        //  Filter by name
        if (name.trim() !== "") {
            filtered = filtered.filter(u =>
                u.fullName.toLowerCase().includes(name.toLowerCase())
            );
        }

        // Filter by role
        if (userRole !== "All Roles") {
            filtered = filtered.filter(u => u.role === userRole);
        }

        //  Filter by status
        if (userStatus !== "All Status") {
            const isActive = userStatus === "Active";
            filtered = filtered.filter(u => u.isActive === isActive);
        }

        setUsers(filtered);

    }, [name, userRole, userStatus, users, setUsers]);

    return (
        <div className="border rounded-xl p-4 flex justify-between flex-col md:flex-row md:gap-3 gap-2 mb-6" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}>
            <div className="flex items-center border rounded-lg px-3" style={{ backgroundColor: colors.grey[900], borderColor: colors.grey[700], color: colors.grey[100] }}>
                <SearchIcon />
                <input
                    type="search"
                    className="w-full placeholder:text-[#818181dd] px-2 py-2 text-md outline-none"
                    placeholder="Search by name..."
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="flex gap-3">
                <Dropdown colors={colors} setUserRole={setUserRole} options={["All Roles", "Admin", "Supervisor", "Commettee", "Student", "TechnicalAssistant"]} />
                <Dropdown colors={colors} setUserStatus={setUserStatus} options={["All Status", "Active", "InActive"]} />
            </div>
            <button onClick={() => setCreating(true)} className="bg-green-400 cursor-pointer text-white px-4 py-1 rounded-lg text-sm font-medium">
                + Add User
            </button>
        </div>
    )
}


const RoleBadge = ({ role }) => {
    const map = {
        Admin: "bg-green-500 text-[#fff]",
        Supervisor: "bg-[#f59e0b] text-[#fff]",
        Student: "bg-[#0288d1] text-[#fff]",
        TechnicalAssistant: "bg-orange-600 text-[#fff]"
    };
    return <span className={`px-2.5 py-1  rounded-full text-sm font-medium ${map[role]}`}>{role}</span>;
};

const StatusBadge = ({ active }) => (
    <span className={`px-2.5 py-1 border rounded-full text-sm font-medium ${active ? "text-[#10B981] border-[#10B981]" : "text-[#EF4444] border-[#EF4444]"}`}>
        {active ? "Active" : "Inactive"}
    </span>
);


const Toggle = ({ isActive, onClick }) => (
    <button onClick={onClick} className={`w-9 cursor-pointer h-5 flex items-center rounded-full p-0.5 ${isActive ? "bg-[#10B981]" : "bg-[#8f8f8f56]"}`}>
        <div className={`w-4 h-4 bg-white rounded-full transition ${isActive ? "translate-x-4" : ""}`} />
    </button>
);

const nameLimitation = (name) => {
    const nameOfParts = name.split(" ")
    if (nameOfParts.length > 2)
        return `${nameOfParts[0]} ${nameOfParts[1]}`;
    return name;
}

const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
        month: "short",  // Apr
        day: "numeric",
        year: "numeric",
    });
};

const UserTable = ({ users, colors, onEdit, onToggle }) => {

    return (
        <div className="hidden md:block border rounded-xl overflow-hidden" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}>
            <table className="w-full text-sm">
                <thead className="border-b font-semibold text-" style={{ backgroundColor: colors.grey[900], color: colors.grey[100] }}>
                    <tr className="border-b" style={{ borderColor: colors.grey[600] }}>
                        <th className="text-left p-4">Full Name</th>
                        <th className="p-4 text-left">Email</th>
                        <th className="p-4 text-left">Role</th>
                        <th className="p-4 text-left">Status</th>
                        <th className="p-4 text-left">Created Date</th>
                        <th className="p-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.length ? (users.map((u) => (
                            <tr key={u.id} className="border-b last:border-none" style={{ borderColor: colors.grey[900], color: colors.grey[300] }}>
                                <td className="p-4 flex items-center gap-3" style={{ color: colors.grey[100] }}>
                                    <Avatar color={
                                        u.role === "Supervisor"
                                            ? "bg-[#f59e0b]"
                                            : u.role === "Admin" 
                                            ? "bg-green-500" 
                                            : u.role === "TechnicalAssistant" 
                                            ? "bg-orange-600" 
                                            : "bg-blue-500"
                                    }
                                        initials={IntialLetters(u.fullName).toUpperCase()}
                                    />
                                    <p>{nameLimitation(u.fullName)}</p>
                                </td>
                                <td className="p-4">{u.email}</td>
                                <td className="p-4"><RoleBadge role={u.role} /></td>
                                <td className="p-4 "><StatusBadge active={u.isActive} /></td>
                                <td className="p-4">{formatDate(u.createdOn)}</td>
                                <td className="flex items-center gap-4 p-4">
                                    <button style={{ color: colors.greenAccent[400] }} className="cursor-pointer" onClick={() => onEdit(u)}><EditIcon /></button>
                                    <Toggle isActive={u.isActive} onClick={() => onToggle(u.id)} />
                                </td>
                            </tr>
                        ))) : (
                            <tr>
                                <td colSpan="6" className="text-center py-4 font-medium tracking-[3px]">
                                    No Data Found...
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

const UserCard = ({ user, onEdit, onToggle, colors }) => (
    <div className="rounded-xl border p-4" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}>
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-md font-medium" style={{ color: colors.grey[100] }}>{user.fullName}</h3>
                <p className="text-sm mt-1" style={{ color: colors.grey[300] }}>{user.email}</p>
            </div>
            <Toggle isActive={user.isActive} onClick={() => onToggle(user.id)} />
        </div>

        <div className=" w-full flex gap-2 mt-3">
            <RoleBadge role={user.role} />
            <StatusBadge active={user.isActive} />
        </div>

        <div className="flex justify-between items-center mt-4">
            <p className="text-sm" style={{ color: colors.grey[300] }}>{user.date}</p>
            <button className="text-green-600" onClick={() => onEdit(user)}><EditIcon /></button>
        </div>
    </div>
);

const MobileList = ({ users, colors, onEdit, onToggle }) => (
    <div className="md:hidden space-y-4">
        {
            users.length ? (users.map((u) => (
                <UserCard colors={colors} key={u.id} user={u} onEdit={onEdit} onToggle={onToggle} />
            ))) : (
                <div className="text-center py-4  font-medium tracking-[3px] border rounded-xl" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}>
                    No Data Found...
                </div>
            )
        }
    </div>
);

function Avatar({ initials, color }) {
    return (
        <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-md ${color}`}
        >
            {initials}
        </div>
    );
}

const IntialLetters = (name) => {
    const initail = name.split(' ')
    if (initail.length > 1) {
        return `${initail[0][0]}${initail[1][0]}`;
    } else {
        return `${initail[0][0]}`;
    }
}

const EditModal = ({ user, setLoading, setUsers, onClose, colors }) => {

    const [name, setName] = useState(user?.fullName);
    const [email, setEmail] = useState(user?.email);

    const updateUserData = async () => {
        setLoading(true)
        try {
            const response = await updateUser(user.id, {
                fullName: name,
                email: email,
            });
            setUsers(prevUsers =>
                prevUsers.map(u =>
                    u.id === response.id
                        ? { ...u, fullName: name, email: email }
                        : u
                )
            );
            toast.success('User updated successfully')
            onClose()
        } catch (error) {
            HandleErrors(error.errors);
        } finally {
            setLoading(false);
        }
    };


    if (!user) return null;
    return (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
            <div className=" w-full max-w-md rounded-xl border p-6" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}>
                <h3 className="text-lg font-semibold mb-4">Edit User</h3>

                <label className="text-xs" style={{ color: colors.grey[300] }}>Full Name</label>
                <input
                    className="w-full border focus:outline-none rounded-lg px-3 py-2 mb-3 mt-1"
                    style={{ borderColor: colors.grey[700], color: colors.grey[100] }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label className="text-xs" style={{ color: colors.grey[300] }}>Email</label>
                <input
                    className="w-full border focus:outline-none rounded-lg px-3 py-2 mb-3 mt-1"
                    style={{ borderColor: colors.grey[700], color: colors.grey[100] }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="flex justify-end gap-5" >
                    <button onClick={onClose} className="text-lg underline transition-colors text-red-400 cursor-pointer hover:text-red-500 duration-500">
                        Cancel
                    </button>
                    <button
                        className="bg-green-500 cursor-pointer transition-colors hover:bg-green-600 duration-500 text-white px-4 py-1 rounded-lg text-lg"
                        onClick={updateUserData}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};


const Dropdown = ({ colors, setUserRole, setUserStatus, options = ["Admin", "Supervisor", "Committee", "Student", "TechnicalAssistant"] }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme()
    const [selected, setSelected] = useState(options[0]);
    useEffect(() => {
        if (setUserRole) {
            setUserRole(selected);
        }
        if (setUserStatus)
            setUserStatus(selected);
    }, [selected, setUserRole, setUserStatus]);

    return (
        <div className="w-full px-4 items-center cursor-pointer border rounded-lg flex relative" style={{ color: colors.grey[300], backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}>
            <input
                type="text"
                placeholder=""
                readOnly
                value={selected}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 100)}
                className={`w-full  py-2 rounded-lg focus:outline-none`}
            />
            <p><ArrowDropDownIcon /></p>

            {open && (
                <ul className="absolute w-full left-0 top-9 border border-[#00bc8a] mt-1 rounded-lg shadow-lg max-h-40 overflow-y-auto z-50" style={{ backgroundColor: colors.blueAccent[800] }} >
                    {
                        options.map((opt, index) => {
                            return (
                                <li
                                    key={index}
                                    onMouseDown={(e) => {
                                        setOpen(false);
                                        setSelected(e.target.innerHTML)
                                    }}
                                    style={{ color: colors.grey[200] }}
                                    className={`p-2 py-1.5 cursor-pointer hover:text-[#00bc8a!important] ${theme.palette.mode === "dark" ? "hover:bg-[#87878752]" : "hover:bg-[#cecece8b]"}`}
                                >
                                    {opt}
                                </li>
                            )
                        })
                    }
                </ul>
            )}
        </div>
    );
};

// ===== Main =====

export default function UserManagement() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [loader, setLoader] = useState(true);
    const [editing, setEditing] = useState(null);
    const [creating, setCreating] = useState(false);
    const [userRole, setUserRole] = useState("Admin");
    const [addUser, setAddUser] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "",
    })

    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        setAddUser(prev => ({ ...prev, role: userRole }));
    }, [userRole]);

    const handleChange = (e) => {
        setAddUser({
            ...addUser,
            [e.target.name]: e.target.value,
        });
    }

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await getAllUsers();
                setUsers(response)
                setFilteredUsers(response)
            } catch (error) {
                console.log(error)
            } finally {
                setLoader(false);
            }
        }

        getUsers()
    }, []);

    const handleAddUser = async () => {
        setLoading(true)
        try {
            const res = await createUser(addUser);
            toast.success('User Added Successfully')
            setUsers([...users, res])
            setCreating(false);
            setAddUser({
                fullName: "",
                email: "",
                password: "",
                role: "Supervisor",
            });
        } catch (error) {
            HandleErrors(error.errors);
        } finally {
            setLoading(false);
        }
    }

    const toggleStatus = async (id) => {
        setLoading(true)
        try {
            await toggleActivate(id);
            setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u)));
        } catch (error) {
            HandleErrors(error.errors)
            toast.error("Faild to toggle the status")
        } finally {
            setLoading(false);
        }
    };


    if (loader)
        return <Loader />

    return (
        <div className="min-h-screen lg:pr-4 lg:p-0 p-3">
            <main className="w-full mb-5">
                <Filters colors={colors} users={users} setUsers={setFilteredUsers} setCreating={setCreating} />
                <SimpleLoader loading={loading} />
                <UserTable users={filteredUsers} colors={colors} onEdit={setEditing} onToggle={toggleStatus} />
                <MobileList colors={colors} users={filteredUsers} onEdit={setEditing} onToggle={toggleStatus} />
            </main>

            <EditModal key={editing?.id} setLoading={setLoading} user={editing} setUsers={setUsers} colors={colors} onClose={() => setEditing(null)} />

            {/* Create User Modal */}
            {creating && (
                <div className="fixed px-3 inset-0 bg-black/30 flex items-center justify-center">
                    <div className=" w-full max-w-lg rounded-xl p-6 shadow-xl border" style={{ backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }}>
                        <h3 className="text-[18px] font-semibold mb-5">Create New User</h3>

                        <label className="text-xs" style={{ color: colors.grey[300] }}>Full Name</label>
                        <input
                            className="w-full border focus:outline-none rounded-lg placeholder:text-[#8c8c8cdd] px-3 py-3 mb-4 mt-1"
                            style={{ borderColor: colors.grey[700], color: colors.grey[100] }}
                            placeholder="Full Name"
                            name="fullName"
                            onChange={handleChange}
                        />

                        <label className="text-xs" style={{ color: colors.grey[300] }}>Email</label>
                        <input
                            className="w-full border focus:outline-none rounded-lg placeholder:text-[#8c8c8cdd] px-3 py-3 mb-4 mt-1"
                            style={{ borderColor: colors.grey[700], color: colors.grey[100] }}
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                        />

                        <label className="text-xs" style={{ color: colors.grey[300] }}>Password</label>
                        <input
                            type="password"
                            className="w-full focus:outline-none border placeholder:text-[#8c8c8cdd] rounded-lg px-3 py-3 mb-4 mt-1"
                            style={{ borderColor: colors.grey[700], color: colors.grey[100] }}
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                        />

                        <label className="text-xs" style={{ color: colors.grey[300] }}>Role</label>
                        <Dropdown colors={colors} setUserRole={setUserRole} />

                        <div className="flex justify-end items-center mt-4 gap-4">
                            <button
                                onClick=
                                {() => {
                                    setCreating(false)
                                    setAddUser({
                                        fullName: "",
                                        email: "",
                                        password: "",
                                        role: "Supervisor",
                                    })
                                }}
                                className="text-red-400 duration-500 text-md underline transition-colors hover:text-red-500 cursor-pointer font-medium"
                            >Cancel</button>
                            <button
                                className="bg-green-400 transition-colors hover:bg-green-500 duration-500 cursor-pointer text-white px-5 py-1 rounded-lg text-md shadow"
                                onClick={() => handleAddUser()}
                            >
                                Create User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
