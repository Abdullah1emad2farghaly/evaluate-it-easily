import React, { useEffect, useState } from 'react'
import Carts from './Carts'
import AllProjects from './HistoricalProjects'
import { getProposals } from '../../services/proposalServices';
import Loading from '../../loaders/Loader';
import SimilarPastProjects from './SimilarPastProjects';
import { HandleErrors } from '../../utils/HandleErrors';

export default function Dashboard() {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [acceptedCount, setAcceptedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);

    const countProposalStatuses = (proposals) => {
        let accepted = 0;
        let rejected = 0;
        let pending = 0;

        proposals.forEach((proposal) => {
            switch (proposal.status) {
                case "Accepted":
                    accepted++;
                    break;
                case "Rejected":
                    rejected++;
                    break;
                case "UnderReview":
                    pending++;
                    break;
            }
        });

        setAcceptedCount(accepted);
        setRejectedCount(rejected);
        setPendingCount(pending);
    };

    useEffect(() => {
        const fetchProposalData = async () => {
            try {
                const proposals = await getProposals();
                setProposals(proposals);
                countProposalStatuses(proposals);
            } catch (error) {
                HandleErrors(error.errors)
            } finally {
                setLoading(false)
            }
        };
        fetchProposalData();
    }, []);

    if (loading)
        return <Loading />
    return (
        <div className='overflow-hidden min-h-[100vh]'>
            <div>
                <Carts
                    acceptedCount={acceptedCount}
                    rejectedCount={rejectedCount}
                    pendingCount={pendingCount}
                />

                <SimilarPastProjects proposals={proposals} />
            </div>
        </div>
    )
}