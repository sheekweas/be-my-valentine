import { useState, useEffect } from "react";
const img1 = require('../assets/1.png');
const img2 = require('../assets/2.png');
const img3 = require('../assets/3.png');
const img4 = require('../assets/4.png');
const img5 = require('../assets/5.png');
const img6 = require('../assets/6.png');
const video = require('../assets/video.mp4');

const quizSteps = [
  {
    text: "It's been a long time since we got to know each other...",
    image:  img1,
    content: (startDate) => (
      <p>
        {startDate.days} days {startDate.hours} hours {startDate.minutes} minutes{" "}
        {startDate.seconds} seconds
      </p>
    ),
    button: "Next",
  },
  {
    text: "Thank you for coming into my life!",
    image: img2,
    button: "Next",
  },
  {
    text: "I have one question to ask you...",
    image: img3,
    button: "Next",
  },
  {
    text: "Can I be your Valentine?",
    video: video,
    button: "Of Course!",
  },
  {
    text: "Yeeeeees!",
    image: img4,
    button: "Yes",
  },
  {
    text: "I love you!",
    image: img5,
    button: "I Love you too!",
  },
  {
    text: "So...",
    links: [
      { name: "2GIS", url: "https://2gis.kz/astana/geo/70000001083828286" },
      { name: "WhatsApp", url: "https://wa.me/+77773121593" },
    ],
    message: "I'll be waiting for you on 14.02 at 7 PM",
    button: "Next",
  },
  {
    text: "I'm grateful to have you in my life",
    image: img6,
    button: { text: "Watch Video", url: "https://youtu.be/aLCukAWuBQg?si=eggaMfgPeOzM-3SC" },
  },
];

function Quiz() {
  const [step, setStep] = useState(0);
  const [startDate, setStartDate] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (step === 0) {
      const interval = setInterval(() => {
        const startTime = new Date("2024-07-01T00:05:00");
        const now = new Date();
        const diff = now - startTime;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setStartDate({ days, hours, minutes, seconds });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [step]);

  const currentStep = quizSteps[step];

  return (
    <div className="quiz">
      <p>{currentStep.text}</p>
      {currentStep.image && <img src={`${currentStep.image}`} />}
      {currentStep.video && (
      <video width="750" height="500" controls >
      <source src={`${currentStep.video}`} type="video/mp4"/>
     </video>
        )}
      {currentStep.content && currentStep.content(startDate)}
      {currentStep.links && (
        <div className="links">
          {currentStep.links.map((link, index) => (
            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
              {link.name}
            </a>
          ))}
        </div>
      )}
          <p>{currentStep.message}</p>

      {currentStep.button && 
      (<button onClick={() => setStep((prev) => Math.min(prev + 1, quizSteps.length - 1))}>
      {typeof currentStep.button === "object" ? (
        <a href={currentStep.button.url} target="_blank" rel="noopener noreferrer">
          {currentStep.button.text}
        </a>
      ) : (
        currentStep.button
      )}
    </button>
)}
    </div>
  );
}

export default Quiz;
