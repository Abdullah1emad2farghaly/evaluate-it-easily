import { useEffect, useState } from "react";
import { getGroups } from "../../services/groupServices";
import { getProposals } from "../../services/proposalServices";
import { HandleErrors } from "../../utils/HandleErrors";
import Loader from "../../loaders/Loader";
import StatisticsDashboard from "../../components/admin/StatisticsDashboard";

export default function Statistics() {
    const [proposals, setProposals] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const allData = async () => {
            try {
                const allGroups = await getGroups();
                const allProposals = await getProposals();
                setGroups(allGroups)
                setProposals(allProposals);
            } catch (err) {
                HandleErrors(err.errors);
            }finally{
                setLoading(false);
            }
        }
        allData();
    }, [])

    if(loading)
        return <Loader/>
    return <StatisticsDashboard proposals={proposals} groups={groups} loading={loading}  />
}
