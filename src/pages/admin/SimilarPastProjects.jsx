import React, { useEffect } from 'react'
import LottieFiles from '../../lottieFiles/LottieFiles';
import SubmissionsPage from './ProjectCard';

export default function SimilarPastProjects({ proposals }) {

    useEffect(() => {
        scrollTo(0, 0);
    }, [])
    const filteredProposals = proposals.filter((proposal) => proposal.status === "UnderReview")


    return (
        <div className='w-full px-2 sm:ml-auto mb-20'>
            {
                !filteredProposals?.length
                    ? (<LottieFiles name={"animatedData2"} />)
                    : (
                        <div className=" mb-4 mt-5p-2">
                            <SubmissionsPage data={filteredProposals} />
                        </div>
                    )
            }

        </div>
    )
}
