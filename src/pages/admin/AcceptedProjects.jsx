import { useEffect, useState } from 'react'
import { getProposals } from '../../services/proposalServices';
import Loading from '../../loaders/Loader';
import LottieFiles from '../../lottieFiles/LottieFiles';
import { HandleErrors } from '../../utils/HandleErrors';
import SubmissionsPage from '../../components/admin/ProjectCard';
import Title from '../../components/admin/Title';
import { archiveProject } from '../../services/HistoricalProjectsServices';

const getAcademicYear = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date();
    const year = date.getFullYear();
    const startYear = date.getMonth() >= 8 ? year : year - 1;

    return `${startYear}-${startYear + 1}`;
}

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

    const handleArchiveProject = async () => {
        try {
            await archiveProject(getAcademicYear(acceptedProjects[0]?.submittedAt));
        } catch (error) {
            HandleErrors(error.errors);
        }
    }

    useEffect(() => {
        scrollTo(0, 0);
    }, [])

    if (loading)
        return <Loading />

    return (
        <>
            <div className="flex sm:flex-row flex-col sm:items-center sm:justify-between gap-3">
                <Title title={"Accepted Projects"} />
                {
                    acceptedProjects.length ? (
                        <button
                            onClick={handleArchiveProject}
                            className="px-4 py-2 rounded-lg cursor-pointer border bg-black text-white"
                        >
                            Archive All Projects
                        </button>
                    ) : null
                }
            </div>
            <div className='w-full lg:pr-4 px-3 lg:px-0'>

                {
                    !acceptedProjects.length
                        ? (<LottieFiles name={"animatedData2"} />)
                        : (
                            <div className="mt-5 ">
                                <SubmissionsPage data={acceptedProjects} />
                            </div>
                        )

                }

            </div>
        </>
    )
}
