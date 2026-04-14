import React, { useEffect, useState } from 'react'
import Title from './Title';
import LottieFiles from '../../lottieFiles/LottieFiles';
import Loading from '../../loaders/Loader';
import { getProposals } from '../../services/proposalServices';
import { HandleErrors } from '../../utils/HandleErrors';
import SubmissionsPage from './ProjectCard';

export default function RejectedProjects() {
    const [rejectedProjects, setRejectedProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await getProposals();
                setRejectedProjects(projects.filter((proposal) => proposal.status === "Rejected"));
            } catch (error) {
                HandleErrors(error.errors)
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);


    useEffect(() => {
        scrollTo(0, 0);
    }, [])

    if (loading)
        return <Loading />

    return (
        <>
            <div className="pl-2 lg:p-0">
                <Title title={"Rejected Projects"} />
            </div>
            <div className='w-full mb-10 lg:pr-4 px-3 lg:px-0'>
                {
                    !rejectedProjects.length 
                    ? (<LottieFiles name={"animatedData2"} />) 
                    :(
                        <div className="mb-4 mt-5">
                            <SubmissionsPage data={rejectedProjects} />
                        </div>
                    )
                }
            </div>
        </>
    )
}
