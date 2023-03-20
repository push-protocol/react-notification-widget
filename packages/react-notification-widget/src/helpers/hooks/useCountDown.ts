import { useEffect, useState } from "react";

type CountDownProps = {
  seconds?: number;
};

const useCountDown = ({ seconds }: CountDownProps) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const resetTimer = () => {
    setTimeLeft(seconds);
  };

  return { time: timeLeft, resetTimer };
};

export default useCountDown;
