import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from '../../theme';
import { useCallback, useEffect, useState } from 'react';
import { availableStudents, createGroup, getMyGroup } from '../../services/groupServices';
import Loader from '../../loaders/Loader';
import SimpleLoader from '../../loaders/SimpleLoader';
import { toast } from 'react-toastify';
import { HandleErrors } from '../../utils/HandleErrors';
import Title from '../../components/admin/Title';
import GroupDetailsDashboard from '../../components/website/GroupDetailsDashboard';

export default function CreateGroup() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [groupName, setGroupName] = useState("");
    const [students, setStudents] = useState([]);
    const [myGroup, setMyGroup] = useState(null);

    const [loader, setLoader] = useState(true);
    const [loading, setLoading] = useState(false);





    // Fetch my group details on component mount
    useEffect(() => {
        const myGroup = async () => {
            try {
                const mygroup = await getMyGroup();
                setMyGroup(mygroup)
            } catch (err) {
                HandleErrors(err.errors)
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


    const handleCreateGroup = useCallback(async (groupName) => {
        if (!groupName) {
            toast.error("Group name is required.");
            return
        }
        setLoading(true);

        try {
            const response = await createGroup({ name: groupName });
            setMyGroup(response);
            toast.success("Group created successfully!");
        } catch (err) {
            HandleErrors(err.errors)
        } finally {
            setLoading(false);
        }
    }, [])

    if (loader) {
        return <Loader />
    }

    return (
        <div className="lg:pr-4 px-3 lg:px-0 py-6" >
            <SimpleLoader loading={loading} />
            {
                !myGroup ? (
                    <div className="groups mb-5 sm:p-8 py-10 relative border rounded-[20px] overflow-y-hidden  mt-5" style={{ backgroundColor: colors.grey[900], borderColor: colors.grey[700] }}>
                        <Title title={"New Group"} />
                        {/* Title */}
                        <div style={{
                            color: colors.grey[200]
                        }} className={`title px-5`}>
                            <h1 className="font-medium mb-1 text-3xl">Create New Study Group</h1>
                            <p >Set up a workspace for your next collaboration project.</p>
                        </div>


                        {/* Create Group Name */}
                        <div className="group px-5 mt-7 pb-0">
                            <label htmlFor="groupName" style={{ color: colors.grey[300] }}>Group Name</label>
                            <div className="input-box flex sm:flex-row gap-4 flex-col mt-1">
                                <input className="w-full sm:m-0" style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700] }} onChange={(e) => { setGroupName(e.target.value) }} value={groupName} name="groupName" placeholder="Enter group name..." type="text" id="groupName" />
                                <button className='sm:max-w-40 bg-transparent border-green-500 border text-green-500 hover:text-white hover:bg-green-500 w-full sm:m-0 mt-2' onClick={() => { handleCreateGroup(groupName) }} >Create Group</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <GroupDetailsDashboard myGroup={myGroup} students={students} setStudents={setStudents} />
                    </div>
                )
            }
        </div>
    )
}
