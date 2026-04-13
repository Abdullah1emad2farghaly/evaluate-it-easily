import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from '../../theme';
import { useEffect, useRef, useState } from 'react';
import { addMemberToGroup, availableStudents, createGroup, getMyGroup, removeMemberFromGroup } from '../../services/groupServices';
import Loader from '../../loaders/Loader';
import SimpleLoader from '../../loaders/SimpleLoader';
import { toast } from 'react-toastify';
import { HandleErrors } from '../../utils/HandleErrors';
export default function CreateGroup() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const groupRef = useRef();
    const btnRef = useRef();
    const memberRef = useRef();
    const addRef = useRef();

    const [groupName, setGroupName] = useState("");
    const [groupID, setGroupID] = useState(0);
    const [member, setMember] = useState(null);
    const [members, setMembers] = useState([]);
    const [students, setStudents] = useState([]);

    const [query, setQuery] = useState("");
    const [search, setSearch] = useState('')
    const [show, setShow] = useState(false);

    const [loader, setLoader] = useState(true);
    const [confirmation, setConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);



    const studentFiltered = students.filter((student) => {
        const fullName = student?.fullName?.toLowerCase() || "";
        return fullName.includes(search.toLocaleLowerCase());
    });

    // Fetch my group details on component mount
    useEffect(() => {
        const myGroup = async () => {
            try {
                const mygroup = await getMyGroup();
                groupRef.current && (groupRef.current.disabled = true);
                btnRef.current && (btnRef.current.disabled = true);
                setGroupName(mygroup.name || "");
                setMembers(mygroup.members || [])
                setGroupID(mygroup.id);

                if (mygroup?.memberCount === 7) {
                    memberRef.current && (memberRef.current.disabled = true);
                    addRef.current && (addRef.current.disabled = true);
                }

            } catch (err) {
                if (err)
                    return
            } finally {
                setLoader(false);
            }
        }

        myGroup();
    }, [])

    // Fetch available students for adding to group
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const res = await availableStudents();
                setStudents(res);
            } catch (err) {
                HandleErrors(err.errors);
                console.log(err);
            }
        };

        fetchStudents();
    }, []);


    const handleCreateGroup = async (groupName) => {
        if (!groupName) {
            toast.error("Group name is required.");
            return
        }
        setLoading(true);

        try {
            const response = await createGroup({ name: groupName });
            setMembers(response.members);
            setGroupID(response.id);
            toast.success("Group created successfully!");
        } catch (err) {
            HandleErrors(err.errors)
        } finally {
            setLoading(false);
        }
    }

    const addMember = async (studentEmail, groupID) => {
        if (!studentEmail) {
            toast.error("Please select a valid student");
            return;
        }
        setLoading(true)

        try {
            const response = await addMemberToGroup(groupID, { studentEmail: studentEmail });
            const res = await availableStudents();
            setStudents(res);
            setMembers(response.members || []);
            setSearch("");
            setQuery("");
            toast.success("Member added successfully!");
        } catch (err) {
            HandleErrors(err.errors)
        } finally {
            setLoading(false);
        }
    }

    const removeMember = async (groupID, member) => {
        setLoading(true)
        try {
            await removeMemberFromGroup(groupID, member.studentId);
            setLoading(false);
            toast.success("Member removed successfully!");
            setMembers(prev => prev.filter((m) => m.email !== member.email));
            const res = await availableStudents();
            setStudents(res);

        } catch (err) {
            HandleErrors(err.errors)
        } finally {
            setLoading(false);
        }
    }


    if (loader) {
        return <Loader />
    }

    return (
        <>
            <SimpleLoader loading={loading} />
            <div className={`${confirmation ? 'absolute' : 'hidden'}  inset-0  bg-black-500 flex items-center justify-center z-50`}>
                <div className=" rounded-xl shadow-[0px_0px_5px_0px_#eee] w-[420px] p-6 relative" style={{ backgroundColor: colors.blueAccent[800] }}>

                    {/* Close Button */}
                    <button
                        onClick={() => setConfirmation(false)}
                        className="absolute top-4 right-4 cursor-pointer"
                    >
                        ✕
                    </button>

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-red-100 text-red-600 rounded-md p-2">
                            ❌
                        </div>
                        <h2 className="text-lg font-semibold" style={{ color: colors.grey[200] }}>
                            Remove member from group?
                        </h2>
                    </div>

                    {/* Content */}
                    <p className="text-sm  mb-6 leading-relaxed" style={{ color: colors.grey[300] }}>
                        Are you sure you want to remove this member? They will lose access to all
                        group projects and shared assets. This action can be undone by
                        re-inviting them later.
                    </p>

                    {/* Actions */}
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setConfirmation(false)}
                            className="px-4 py-2 text-sm rounded-md border cursor-pointer border-gray-300  hover:bg-gray-800 duration-500"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={() => {
                                setConfirmation(false);
                                removeMember(groupID, member)
                            }}
                            className="px-4 py-2 text-sm rounded-md bg-red-600 duration-500 cursor-pointer text-white hover:bg-red-700 shadow"
                        >
                            Remove Member
                        </button>
                    </div>
                </div>
            </div>

            <div className="groups mb-5 relative border border-[#4cceac] shadow-[0px_0px_5px_#4cceac] rounded-[20px] overflow-y-hidden  mt-5 lg:w-[90%] w-[98%] mx-auto" style={{ backgroundColor: colors.blueAccent[800] }}>
                {/* Title */}
                <div style={{
                    backgroundImage: `linear-gradient(to right, ${theme.palette.mode === "dark" ? "#a2fae7" : colors.primary[600]} , ${colors.blueAccent[800]})`,
                    color: colors.blueAccent[900]
                }} className={`title p-10 md:px-10 px-5`}>
                    <h1 className="font-[500] mb-1 text-3xl">Create New Study Group</h1>
                    <p >Set up a workspace for your next collaboration project.</p>
                </div>


                {/* Create Group Name */}
                <div className="group p-10 md:px-10 px-5 pb-0">
                    <label htmlFor="groupName" style={{ color: colors.grey[300] }}>Group Name</label>
                    <div className="input-box sm:flex-row flex-col mt-1">
                        <input className="w-full sm:w-[80%] sm:m-0" style={{ color: colors.grey[100], backgroundColor: colors.grey[800] }} ref={groupRef} onChange={(e) => { setGroupName(e.target.value) }} value={groupName} name="groupName" placeholder="Enter group name..." type="text" id="groupName" />
                        <button className='w-full sm:w-[17%] sm:m-0 mt-2' ref={btnRef} onClick={() => { handleCreateGroup(groupName) }} >Create Group</button>
                    </div>
                </div>


                {/* Add Team Member */}
                <div className="team-member p-10  md:px-10 px-5 lg:px-10 px-5 pt-9 pb-0 ">
                    <label htmlFor="teamMember" style={{ color: colors.grey[300] }}>Add Team Member</label>
                    <div className="input-box col-span-10 flex-col sm:flex-row mt-1 relative">
                        <input
                            style={{ color: colors.grey[100], backgroundColor: colors.grey[800] }}
                            type="text"
                            value={search}
                            placeholder="Select student to add..."

                            onFocus={() => setShow(true)}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setQuery('')
                            }}
                            onBlur={() => setTimeout(() => setShow(false), 100)}
                            className={`w-full sm:w-[80%]`}
                        />

                        {show && (
                            <ul className="absolute w-full sm:w-auto top-11 border border-[#00bc8a] mt-1 rounded-lg shadow-lg max-h-50 overflow-y-auto z-50" style={{ background: colors.blueAccent[800] }}>
                                {studentFiltered.length ? (
                                    studentFiltered.map((item, index) => (
                                        <li
                                            key={index}
                                            onMouseDown={() => {
                                                setQuery(item);
                                                setSearch(item.fullName)
                                                setShow(false);
                                            }}
                                            style={{ color: colors.grey[400] }}
                                            className={`p-2 cursor-pointer hover:text-[#00bc8a!important] ${theme.palette.mode === "dark" ? "hover:bg-[#87878752]" : "hover:bg-[#cecece8b]"}`}
                                        >
                                            {item.fullName}
                                        </li>
                                    ))
                                ) : (
                                    <li className="p-2 text-gray-500">No results</li>
                                )}
                            </ul>
                        )}

                        <button className='w-full sm:w-[17%] max-w-[100%] sm:m-0 mt-2' onClick={() => addMember(query.email, groupID)} ref={addRef} >
                            Add Member
                        </button>
                    </div>
                </div>

                {/* Team Members */}
                <div className="members p-10 md:px-10 px-5">
                    <h2 className="text-lg font-[500] mb-2 text-[#DDD] " style={{ color: colors.grey[300] }}>Team Members</h2>
                    <div className='flex gap-2 flex-wrap border border-dashed rounded-[10px] sm:p-5 p-3 border-[#4cceac]'>
                        {
                            members?.length ? members.map((member, index) => (
                                <div key={index} className='flex justify-between items-center p-[3px_8px] w-fit border border-[#b6e5ff] bg-[#cafcf0] rounded text-[13px] text-[#1559ec]'>
                                    <p className='mr-3 pointer-events-none'>{member.email}</p>
                                    <CloseIcon onClick={() => {
                                        setMember(member);
                                        setConfirmation(true)
                                    }} className="cursor-pointer" fontSize={'small'} />
                                </div>
                            )) : <p className='text-red-500 text-sm'>No members added yet.</p>
                        }
                    </div>
                </div>

            </div>
        </>
    )
}
