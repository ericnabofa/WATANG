import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const targetDate = new Date("2024-03-01T00:00:00").getTime(); // Update to actual start date

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-4 text-xl font-bold text-black">
      {timeLeft.days} DAYS : {timeLeft.hours} HOURS : {timeLeft.minutes} MIN : {timeLeft.seconds} SECS
    </div>
  );
}
