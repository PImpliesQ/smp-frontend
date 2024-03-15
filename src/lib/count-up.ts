import {useEffect, useState} from "react";

function ease(x: number): number {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

const frameDuration = 1000 / 60;

export default function useCountUp(endValue: number, duration = 1000) {
    const countTo = endValue;
    const [count, setCount] = useState(0);
    const [start, setStart] = useState(false);

    useEffect(() => {
        if (!start) {
            return;
        }
        let frame = 0;
        const totalFrames = Math.round(duration / frameDuration);
        const counter = setInterval(() => {
            frame++;
            const progress = ease(frame / totalFrames);
            setCount(countTo * progress);

            if (frame === totalFrames) {
                clearInterval(counter);
            }
        }, frameDuration);
    }, [start, countTo, duration]);

    return {count, setStart};
}
