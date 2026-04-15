import React, { useEffect, useRef } from "react";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import RocketIcon from '@mui/icons-material/Rocket';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

export default function About() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const wordsRef = useRef([]);
    let currentWordIndex = 0;

    useEffect(() => {
        const words = wordsRef.current;
        if (!words.length) return;

        const maxWordIndex = words.length - 1;

        // Split letters into spans
        words.forEach((word) => {
            const letters = word.textContent.split("");
            word.textContent = "";
            letters.forEach((letter) => {
                const span = document.createElement("span");
                span.textContent = letter;
                span.className = "letter";
                word.appendChild(span);
            });
        });

        words[currentWordIndex].style.opacity = 1;

        const changeText = () => {
            const currentWord = words[currentWordIndex];
            const nextWord =
                currentWordIndex === maxWordIndex
                    ? words[0]
                    : words[currentWordIndex + 1];

            // Animate current word out
            Array.from(currentWord.children).forEach((letter, i) => {
                setTimeout(() => {
                    letter.className = "letter out";
                }, i * 80);
            });

            // Animate next word in
            nextWord.style.opacity = 1;
            Array.from(nextWord.children).forEach((letter, i) => {
                letter.className = "letter behind";
                setTimeout(
                    () => {
                        letter.className = "letter in";
                    },
                    300 + i * 80,
                );
            });

            currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
        };

        const interval = setInterval(changeText, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative overflow-hidden">
            <div className="change-text about  mx-auto mt-12">
                <div className="w-full text-center px-4 md:px-0" data-aos="fade-up">
                    <h3 className=" about-h3 font-semibold">
                        Intelligent Tools for 
                    </h3>

                    <h3 className="text-3xl font-semibold mt-2 relative min-h-[40px] md:min-h-[50px]">

                        <span
                            className="word absolute left-1/2 -translate-x-1/2"
                            ref={(el) => (wordsRef.current[0] = el)}
                            style={{ opacity: 0 }}
                        >
                            Modern&nbsp; Evaluation
                        </span>

                        <span
                            className="word absolute left-1/2 -translate-x-1/2"
                            ref={(el) => (wordsRef.current[1] = el)}
                            style={{ opacity: 0 }}
                        >
                            The&nbsp; Graduation&nbsp; Projects
                        </span>

                    </h3>
                </div>

                <p className="mt-5 text-center text-[#9f9f9f]" data-aos="fade-up" data-aos-duration="1000">
                    Cutting-edge features designed to streamline project evaluation
                    <br />
                    enhance collaboration
                </p>
            </div>

            <div className="container w-8/9 sm:w-4/5 mx-auto leading-[1.5em] mt-12 mb-20  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12  ">
                <div
                    className="about-item item col-span-1"
                    data-aos="fade-left"
                    data-aos-duration="1000"
                    data-aos-delay="100"
                >
                    <div className="side-card side-card-after side-card-before"></div>
                    <div className="layer" style={{backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700]}}>
                        <h1 className="layer-h1">Submits Abstract</h1>
                        <p className="layer-p" style={{color: colors.grey[200]}}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. In ea
                            neque illo numquam recusandae pariatur eius voluptates
                            reprehenderit quos, impedit voluptatem tenetur nemo, adipisci
                            cupiditate itaque minima nisi. Illum, recusandae.
                        </p>
                        <span className="layer-span">
                            <LightbulbIcon />
                        </span>
                    </div>
                    <h4 className="layer-h4">Step 01</h4>
                </div>
                <div
                    className="about-item item bg-[#c26ad9] col-span-1"
                    data-aos="fade-left"
                    data-aos-duration="1000"
                    data-aos-delay="500"
                >
                    <div className="side-card before:bg-[#c26ad9] after:bg-[#c26ad9] bg-[#c26ad9] side-card-after side-card-before "></div>
                    <div className="layer" style={{backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700]}}>
                        <h1 className="layer-h1 text-[#c26ad9]">AI Evaluates</h1>
                        <p className="layer-p" style={{color: colors.grey[200]}}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. In ea
                            neque illo numquam recusandae pariatur eius voluptates
                            reprehenderit quos, impedit voluptatem tenetur nemo, adipisci
                            cupiditate itaque minima nisi. Illum, recusandae.
                        </p>
                        <span className="layer-span bg-[#c26ad9]">
                            <RocketIcon />
                        </span>
                    </div>
                    <h4 className="layer-h4">Step 02</h4>
                </div>
                <div
                    className="about-item item bg-[#4cd964] col-span-1"
                    data-aos="fade-left"
                    data-aos-duration="1000"
                    data-aos-delay="900"
                >
                    <div className="side-card side-card-after side-card-before before:bg-[#4cd964] after:bg-[#4cd964] bg-[#4cd964]"></div>
                    <div className="layer" style={{backgroundColor: colors.blueAccent[800], borderColor: colors.grey[700]}}>
                        <h1 className="text-[#4cd964] layer-h1">Committee Reviews </h1>
                        <p className="layer-p" style={{color: colors.grey[200]}}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. In ea
                            neque illo numquam recusandae pariatur eius voluptates
                            reprehenderit quos, impedit voluptatem tenetur nemo, adipisci
                            cupiditate itaque minima nisi. Illum, recusandae.
                        </p>
                        <span className="layer-span bg-[#4cd964]">
                            <EngineeringIcon />
                        </span>
                    </div>
                    <h4 className="layer-h4">Step 03</h4>
                </div>
            </div>
        </section>
    );
}
