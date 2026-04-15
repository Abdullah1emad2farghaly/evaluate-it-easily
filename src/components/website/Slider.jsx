import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import Header from "./Header";

export default function MagicSlider() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const sliderRef = useRef(null);
    const sliderListRef = useRef(null);
    const thumbnailRef = useRef(null);

    useEffect(() => {
        const slider = sliderRef.current;
        const sliderList = sliderListRef.current;
        const thumbnail = thumbnailRef.current;

        const moveSlider = (direction) => {
            const sliderItems = sliderList.querySelectorAll(".item");
            const thumbnailItems = thumbnail.querySelectorAll(".item");

            if (direction === "next") {
                sliderList.appendChild(sliderItems[0]);
                thumbnail.appendChild(thumbnailItems[0]);
                slider.classList.add("next");
            } else {
                sliderList.prepend(sliderItems[sliderItems.length - 1]);
                thumbnail.prepend(
                    thumbnailItems[thumbnailItems.length - 1]
                );
                slider.classList.add("prev");
            }

            slider.addEventListener(
                "animationend",
                () => {
                    slider.classList.remove("next");
                    slider.classList.remove("prev");
                },
                { once: true }
            );
        };

        const nextBtn = slider.querySelector(".next");
        const prevBtn = slider.querySelector(".prev");

        nextBtn.onclick = () => moveSlider("next");
        prevBtn.onclick = () => moveSlider("prev");

        const interval = setInterval(() => {
            nextBtn.click();
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        window.addEventListener("scroll", () => setScrollY(window.scrollY));

        // cleanup
        return () => {
            window.removeEventListener("scroll", () => setScrollY(window.scrollY));
        };
    }, []);

    return (
        <>
            <Header bg={colors.primary[500]} classes={`fixed-header ${scrollY > 150 ? "top-0" : "top-[-70px]"} transition-[top] duration-1000`} />
            <Header  classes={`h-[60px] w-full z-100`} />
            
            <div className="slider mt-[-60px] relative w-full h-[100vh] overflow-hidden -z-1" ref={sliderRef}>
                <div className="list" ref={sliderListRef}>
                    {/* Items */}
                    <div className="item list-item ">
                        <img src="/assets/grad2.jpg" alt="" className="w-full h-full object-fit-cover" />
                        <div className="content sm:text-start sm:top-[20%] top-1/2 sm:-translate-y-0 -translate-y-1/2 text-center item-content md:max-w-[80%] max-w-[90%] lg:pr-[30%] md:pr-[10%] pr-0">
                            <div className="title md:text-[4em] sm:text-[3.5rem] text-[2.2rem] font-bold">MAGIC SLIDER</div>
                            <div className="type text-[#14ff72cb] md:text-[4em] sm:text-[3.5rem] text-[2.2rem] font-bold">FLOWER</div>
                            <div className="description text-sm mt-8">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Laboriosam perspiciatis aliquam cupiditate voluptates autem,
                                incidunt molestiae recusandae consequuntur odit repellat ullam
                                quasi quae quod dolorum, sed quas ab ducimus consectetur.
                            </div>
                            <div className="button mt-5">
                                <button className="content-btn">SEE MORE</button>
                            </div>
                        </div>
                    </div>
                    <div className="item list-item">
                        <img src="/assets/grad3.jpg" alt="" className="w-full h-full object-fit-cover" />
                        <div className="content  sm:text-start sm:top-[20%] top-1/2 sm:-translate-y-0 -translate-y-1/2 text-center item-content md:max-w-[80%] max-w-[90%] lg:pr-[30%] md:pr-[10%] pr-0">
                            <div className="title md:text-[4em] sm:text-[3.5rem] text-[2.2rem] font-bold">MAGIC SLIDER</div>
                            <div className="type text-[#14ff72cb] md:text-[4em] sm:text-[3.5rem] text-[2.2rem] font-bold">NATURE</div>
                            <div className="description text-sm mt-8">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Laboriosam perspiciatis aliquam cupiditate voluptates autem,
                                incidunt molestiae recusandae consequuntur odit repellat ullam
                                quasi quae quod dolorum, sed quas ab ducimus consectetur.
                            </div>
                            <div className="button mt-5">
                                <button className="content-btn">SEE MORE</button>
                            </div>
                        </div>
                    </div>
                    <div className="item list-item">
                        <img src="/assets/grad6.jpg" alt="" className="w-full h-full object-fit-cover" />
                        <div className="content  sm:text-start sm:top-[20%] top-1/2 sm:-translate-y-0 -translate-y-1/2 text-center item-content md:max-w-[80%] max-w-[90%] lg:pr-[30%] md:pr-[10%] pr-0">
                            <div className="title md:text-[4em] sm:text-[3.5rem] text-[2.2rem] font-bold m-0 p-0">MAGIC SLIDER</div>
                            <div className="type text-[#14ff72cb] md:text-[4em] sm:text-[3.5rem] text-[2.2rem] font-bold m-0 p-0">PLANT</div>
                            <div className="description text-sm mt-8">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Laboriosam perspiciatis aliquam cupiditate voluptates autem,
                                incidunt molestiae recusandae consequuntur odit repellat ullam
                                quasi quae quod dolorum, sed quas ab ducimus consectetur.
                            </div>
                            <div className="button mt-5">
                                <button className="content-btn">SEE MORE</button>
                            </div>
                        </div>
                    </div>
                    <div className="item list-item">
                        <img src="/assets/grad7.jpg" alt="" className="w-full h-full object-fit-cover" />
                        <div className="content  sm:text-start sm:top-[20%] top-1/2 sm:-translate-y-0 -translate-y-1/2 text-center item-content md:max-w-[80%] max-w-[90%] lg:pr-[30%] md:pr-[10%] pr-0">
                            <div className="title md:text-[4em] sm:text-[3.5rem] text-[2.2rem] font-bold">MAGIC SLIDER</div>
                            <div className="type text-[#14ff72cb] md:text-[4em] sm:text-[3.5rem] text-[2.2rem] font-bold">NATURE</div>
                            <div className="description text-sm mt-8">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Laboriosam perspiciatis aliquam cupiditate voluptates autem,
                                incidunt molestiae recusandae consequuntur odit repellat ullam
                                quasi quae quod dolorum, sed quas ab ducimus consectetur.
                            </div>
                            <div className="button mt-5">
                                <button className="content-btn">SEE MORE</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="thumbnail sm:flex hidden gap-5 absolute bottom-[50px] left-1/2 z-100 " ref={thumbnailRef}>
                    <div className="item item-thumbnail">
                        <img src="/assets/grad2.jpg" alt="" className="thumbnail-img" />
                    </div>
                    <div className="item item-thumbnail">
                        <img src="/assets/grad3.jpg" alt="" className="thumbnail-img" />
                    </div>
                    <div className="item item-thumbnail">
                        <img src="/assets/grad6.jpg" alt="" className="thumbnail-img" />
                    </div>
                    <div className="item item-thumbnail">
                        <img src="/assets/grad7.jpg" alt="" className="thumbnail-img" />
                    </div>
                </div>

                <div className="nextPrevArrows sm:flex hidden">
                    <button className="prev">&lt;</button>
                    <button className="next">&gt;</button>
                </div>
            </div>
        </>
    );
}
