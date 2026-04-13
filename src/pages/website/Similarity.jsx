import React, { useEffect, useState } from 'react'
import Analyze from '../admin/Analyze';
import { useTheme } from '@emotion/react';
import { tokens } from '../../theme';
import { getMyProposal } from '../../services/proposalServices';
import { getEvaluateProposal } from '../../services/evaluationServices';
import Loading from '../../loaders/Loader'
import LottieFiles from '../../lottieFiles/LottieFiles';


export default function Similarity() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [myProposal, setMyProposal] = useState({});
    const [loading, setLoading] = useState(true)
    const [similarProjects, setSimilarProjects] = useState([]);
    const [notFound, setNotFound] = useState(false);



    useEffect(() => {
        const fetchEvaluation = async () => {
            try {
                const proposal = await getMyProposal();
                setMyProposal(proposal);
                const response = await getEvaluateProposal(proposal.id);
                setSimilarProjects(response.similarityResults);
                setLoading(false);

            } catch (error) {
                if (error)
                    setNotFound(true)
            } finally {
                setLoading(false);
            }
        }
        fetchEvaluation();
    }, [])

    useEffect(() => {
        scrollTo(0, 0);
    }, []);
    if (notFound)
        return <LottieFiles name={"animatedData"} />

    if (loading)
        return <Loading />

    return (
        <div className="pb-5 lg:px-0 lg:pr-5 px-2 ">
            {
                myProposal && (
                    <div
                        className="rounded -z-1 mb-5 p-8 pb-10 relative sticky top-0 border-1 border-[#f9c11a] z-100"
                        style={{ backgroundColor: colors.blueAccent[800] }}
                        data-aos="fade-up"
                    >
                        <div className="text-2xl mb-2 flex justify-between items-center">
                            <h3>{myProposal.title}</h3>
                            <h5>{myProposal?.submittedAt?.split('-')?.[0]}</h5>
                        </div>
                        <p className="pb-6 lg:line-clamp-none line-clamp-4" style={{ color: colors.grey[200] }}>{myProposal.abstract}</p>
                        <p className={`mt-3 ${myProposal?.status === "Accepted" ? "text-[#08bb40]" : myProposal?.status === "Rejected" ? "text-red-500" : "text-yellow-500"}`}> <span>Project Status: </span> {myProposal.status}</p>
                        <div
                            style={{
                                backgroundColor: colors.grey[900],
                            }}
                            className="absolute  right-5 bottom-5 w-[70px] h-[70px] cursor-pointer border border-[var(--primary-color)] shadow-[0_0_10px_0.01rem_#00bc8a] text-base font-medium flex justify-center items-center rounded-full"
                        >
                            Original
                        </div>
                    </div>
                )
            }
            {similarProjects.map((project, index) => (
                <div
                    key={index}
                    className="rounded -z-1 mb-5 p-8 pb-10 relative"
                    style={{ backgroundColor: colors.blueAccent[800] }}
                    data-aos="fade-up"
                >
                    <div className="text-2xl mb-3 flex justify-between items-center">
                        <h3>{project.matchedProjectName}</h3>
                        <h5>{project.matchedProjectYear}</h5>
                    </div>
                    <p className="pb-4 lg:line-clamp-none line-clamp-5" style={{ color: colors.grey[200] }}>
                        {project.matchedProjectAbstract}
                    </p>
                    <div
                        className="absolute z-1 right-[20px] bottom-[20px]  circle-persntage"
                        style={{ backgroundColor: colors.grey[800] }}
                    >
                        <div
                            style={{ backgroundColor: colors.primary[500] }}
                            className="cover flex justify-center items-center "
                        >
                            {Math.round(project.similarityScore * 100)}%
                        </div>
                        <div
                            className="conic"
                            style={{
                                backgroundImage: `conic-gradient(${(project.similarityScore * 100) >= 50 ? colors.redAccent[500] : colors.yellow[500]} ${project.similarityScore * 100}%, transparent 0%)`,
                            }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
