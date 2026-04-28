import Lottie from 'lottie-react';
import animatedData from './animatedData.json';
import animatedData2 from './animatedData2.json';


export default function LottieFiles({ name = "animatedData" }) {
    const animationData = name === "animatedData2" ? animatedData2 : animatedData;

    return (
        <div className={`flex items-center justify-center min-h-screen w-full absolute top-0 left-0`}>
            <Lottie animationData={animationData} loop={true} className='w-1/2 absolute top-1/2 -translate-y-1/3' speed={0.5} />
        </div>
    )
}
