// src/animations.js
export const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
});