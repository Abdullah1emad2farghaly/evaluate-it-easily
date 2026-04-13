import { useEffect, useState } from "react";
import { getProposals } from "../../services/proposalServices";
import { HandleErrors } from "../../utils/HandleErrors";
import LottieFiles from "../../lottieFiles/LottieFiles";
import Title from "./Title";
import Loader from "../../loaders/Loader";
import SubmissionsPage from "./ProjectCard";

export default function PendingProjects() {
    const [pendingProjects, setPendingProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await getProposals();
                setPendingProjects(projects.filter((proposal) => proposal.status === "Pending"));
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
        return <Loader />

    return (
        <>
            <Title title={"Pending Projects"} />
            <div className='w-full'>

                {
                    !pendingProjects.length
                        ? (<LottieFiles name={"animatedData2"} />)
                        : (
                            <div className="mt-5 p-2">
                                <SubmissionsPage data={pendingProjects} />
                            </div>
                        )

                }

            </div>
        </>
    )
}
