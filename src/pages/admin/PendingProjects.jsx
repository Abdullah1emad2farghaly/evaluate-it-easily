import { useEffect, useState } from "react";
import { getProposals } from "../../services/proposalServices";
import { HandleErrors } from "../../utils/HandleErrors";
import LottieFiles from "../../lottieFiles/LottieFiles";
import Loader from "../../loaders/Loader";
import SubmissionsPage from "../../components/admin/ProjectCard";
import Title from "../../components/admin/Title";
import Carts from "../../components/admin/Carts";

export default function PendingProjects() {
    const [pendingProjects, setPendingProjects] = useState([]);
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
        const fetchProjects = async () => {
            try {
                const projects = await getProposals();
                countProposalStatuses(projects);
                
                setPendingProjects(projects.filter((proposal) => proposal.status === "Pending"));
            } catch (error) {
                HandleErrors(error.errors)
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);
    console.log(pendingProjects);
    useEffect(() => {
        scrollTo(0, 0);
    }, [])

    if (loading)
        return <Loader />

    return (
        <div className="relative">

            <Title title={"Pending Projects"} />
            <Carts
                acceptedCount={acceptedCount}
                rejectedCount={rejectedCount}
                pendingCount={pendingCount}
            />
            <div className='w-full lg:pr-4 px-3 lg:px-0'>
                {
                    !pendingProjects.length
                        ? (<LottieFiles name={"animatedData2"} />)
                        : (
                            <div className="mt-5">
                                <SubmissionsPage data={pendingProjects} />
                            </div>
                        )
                }

            </div>
        </div>
    )
}
