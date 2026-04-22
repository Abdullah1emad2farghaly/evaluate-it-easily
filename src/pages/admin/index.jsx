import { useEffect, useState } from 'react'
import { getProposals } from '../../services/proposalServices';
import Loading from '../../loaders/Loader';
import SimilarPastProjects from '../../components/admin/SimilarPastProjects';
import { HandleErrors } from '../../utils/HandleErrors';
import Carts from '../../components/admin/Carts';

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
        <div className='overflow-hidden min-h-screen lg:pr-4 px- lg:px-0'>
            <div>
                <SimilarPastProjects proposals={proposals} />
            </div>
        </div>
    )
}