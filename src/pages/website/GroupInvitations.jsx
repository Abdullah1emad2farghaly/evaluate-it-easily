import React, { useEffect, useState } from 'react'
import Title from '../../components/admin/Title';
import LottieFiles from '../../lottieFiles/LottieFiles';
import { getGroupInvitations, getMyGroup } from '../../services/groupServices';
import  StyleGroupInvitations  from "../../components/website/StyleGroupInvitations"
import { HandleErrors } from '../../utils/HandleErrors';
import { toast } from 'react-toastify';
import Loader from '../../loaders/Loader';

export default function GroupInvitations() {
    const [groupInvitations, setGroupInvitations] = useState();
    const [loader, setLoader] = useState(true);

    useEffect(()=>{
        const fetchGroupInvitations = async ()=>{
            try{
                const response = await getMyGroup();
                const res = await getGroupInvitations(response.id);
                setGroupInvitations(res);
            }catch(error){
                if(error?.errors?.length)
                    HandleErrors(error.errors)
                toast.error(error.message);
            }finally {
                setLoader(false);
            }
        }

        fetchGroupInvitations();
    }, [])

    if(loader)
        return <Loader/>

    return (
        <div className='my-5'>
            <Title title={"Group invitations"} subTitle={"View all invitations"} />
            {
                groupInvitations?.length ? (
                    <StyleGroupInvitations data={groupInvitations} />
                ) : (
                    <div>
                        <LottieFiles />
                    </div>
                )
            }
        </div>
    )
}
