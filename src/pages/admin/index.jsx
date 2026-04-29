import { useEffect, useState } from 'react'
import { getProposals } from '../../services/proposalServices';
import Loading from '../../loaders/Loader';
import SimilarPastProjects from '../../components/admin/SimilarPastProjects';
import { HandleErrors } from '../../utils/HandleErrors';
import Carts from '../../components/admin/Carts';

export default function Dashboard() {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProposalData = async () => {
            try {
                const proposals = await getProposals();
                setProposals(proposals);
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