import React, { useEffect, useState } from 'react'
import Title from './Title';
import { getProposals } from '../../services/proposalServices';
import Loading from '../../loaders/Loader';
import LottieFiles from '../../lottieFiles/LottieFiles';
import { HandleErrors } from '../../utils/HandleErrors';
import SubmissionsPage from './ProjectCard';

export default function AcceptedProjects() {
    const [acceptedProjects, setAcceptedProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await getProposals();
                setAcceptedProjects(projects.filter((proposal) => proposal.status === "Accepted"));
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
            <Title title={"Accepted Projects"} />
            <div className='w-full'>

                {
                    !acceptedProjects.length
                        ? (<LottieFiles name={"animatedData2"} />)
                        : (
                            <div className="mt-5 p-2">
                                <SubmissionsPage data={acceptedProjects} />
                            </div>
                        )

                }

            </div>
        </>
    )
}
