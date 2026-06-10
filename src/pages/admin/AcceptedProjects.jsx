import { useEffect, useState } from 'react'
import { getProposals } from '../../services/proposalServices';
import Loading from '../../loaders/Loader';
import LottieFiles from '../../lottieFiles/LottieFiles';
import { HandleErrors } from '../../utils/HandleErrors';
import SubmissionsPage from '../../components/admin/ProjectCard';
import Title from '../../components/admin/Title';
import { archiveProject } from '../../services/HistoricalProjectsServices';
import SimpleLoader from '../../loaders/SimpleLoader';
import { toast } from 'react-toastify';

const getAcademicYear = (dateString) => {
    const date = dateString ? new Date(dateString) : new Date();
    const year = date.getFullYear();
    const startYear = date.getMonth() >= 8 ? year : year - 1;

    return `${startYear}-${startYear + 1}`;
}

export default function AcceptedProjects() {
    const [acceptedProjects, setAcceptedProjects] = useState([]);
    const [loader, setLoader] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projects = await getProposals();
                setAcceptedProjects(projects.filter((proposal) => proposal.status === "Accepted"));
            } catch (error) {
                HandleErrors(error.errors)
            } finally {
                setLoader(false);
            }
        }
        fetchProjects();
    }, []);

    const handleArchiveProject = async () => {
        setLoading(true);
        try {
            await archiveProject(getAcademicYear(acceptedProjects[0]?.submittedAt));
            toast.success("Projects archived successfully");
            setAcceptedProjects([]);
        } catch (error) {
            HandleErrors(error?.errors);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        scrollTo(0, 0);
    }, [])

    if (loader)
        return <Loading />

    return (
        <>
            <div className="flex sm:flex-row flex-col sm:pr-4 px-4 sm:px-0 sm:items-center sm:justify-between gap-3">
                <SimpleLoader loading={loading} />
                <Title title={"Accepted Projects"} />
                    {
                        acceptedProjects.length ? (
                            <button
                                onClick={handleArchiveProject}
                                className="px-4 py-2 rounded-lg cursor-pointer border  text-green-500 border-green-500 hover:bg-green-500 hover:text-white transition-colors duration-300"
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
