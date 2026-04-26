import React, { useEffect, useState } from 'react'
import Invitations from '../../components/website/Invitations'
import Title from '../../components/admin/Title'
import { getMyInvitations } from '../../services/groupServices'
import LottieFiles from '../../lottieFiles/LottieFiles';
import Loader from '../../loaders/Loader';
import { HandleErrors } from '../../utils/HandleErrors';
import { toast } from 'react-toastify';

export default function MyInvitations() {
    const [myInvitations, setMyInvitations] = useState();
    const [loader, setLoader] = useState(true);
    useEffect(()=>{
        const fetchMyInvitations = async()=>{
            try{
                const res = await getMyInvitations();
                setMyInvitations(res);
            }catch(error){
                if(error?.errors?.length)
                    HandleErrors(error.errors)
                else
                    toast.error(error.message)
            }finally{
                setLoader(false);
            }
        }
        fetchMyInvitations();
    }, [])

    if(loader)
        return <Loader/>

    return (
        <div className='my-5'>
            <Title title={"My invitations"} subTitle={"View all invitations"}/>
            {
                myInvitations?.length ?(
                    <Invitations data={myInvitations} setData={setMyInvitations}/>
                ): (
                    <div>
                        <LottieFiles/>
                    </div>
                )
            }
        </div>
    )
}
