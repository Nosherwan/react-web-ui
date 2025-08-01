import React, { useState } from "react";
// import html2pdf from "html2pdf.js";

const questions = [
  "About how often did you feel tired out for no good reason?",
  "About how often did you feel nervous?",
  "About how often did you feel so nervous that nothing could calm you down?",
  "About how often did you feel hopeless?",
  "About how often did you feel restless or fidgety?",
  "About how often did you feel so restless you could not sit still?",
  "About how often did you feel depressed?",
  "About how often did you feel that everything was an effort?",
  "About how often did you feel so sad that nothing could cheer you up?",
  "About how often did you feel worthless?",
];

const options = [
  "None of the time",
  "A little of the time",
  "Some of the time",
  "Most of the time",
  "All of the time",
];

const arrayLength = questions.length;

const getRecommendation = (total: number) => {
  if (total >= 10 && total <= 15) return "Low level of psychological distress";
  if (total >= 16 && total <= 21)
    return "Moderate level of psychological distress";
  if (total >= 22 && total <= 29) return "High level of psychological distress";
  if (total >= 30 && total <= 50)
    return "Very high level of psychological distress";
  return "Please complete all questions to get a recommendation";
};

const Main = () => {
  const [responses, setResponses] = useState(Array(arrayLength).fill(""));
  const [responseIndexes, setResponseIndexes] = useState(
    Array(arrayLength).fill(0),
  );

  const areAllQuestionsAnswered = () =>
    responseIndexes.every((response) => response !== 0);

  const calculateTotalScore = () => {
    return responseIndexes.reduce((acc, curr) => acc + curr, 0);
  };

  const handleChange = (index: number, value: string) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
    const newResponseIndexes = [...responseIndexes];
    newResponseIndexes[index] = options.indexOf(value) + 1;
    setResponseIndexes(newResponseIndexes);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Responses:", responses);

    const element = document.getElementById("k10-form");
    const button = element?.querySelector("button");

    if (button) {
      button.style.display = "none";
    }
    // const opt = {
    //   margin: 1,
    //   filename: "K10_Form.pdf",
    //   image: { type: "jpeg", quality: 0.98 },
    //   html2canvas: {
    //     scale: 2,
    //     logging: true,
    //     useCORS: true,
    //     // width: 1200,
    //   },
    //   jsPDF: {
    //     unit: "in",
    //     format: "a3",
    //     orientation: "portrait",
    //   },
    // };

    // html2pdf()
    //   .set(opt)
    //   .from(element)
    //   .save()
    //   .then(() => {
    //     if (button) {
    //       button.style.display = "";
    //     }
    //   })
    //   .catch((err: Error) => {
    //     console.error("PDF generation error:", err);
    //   });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative w-full">
        <h1 className="absolute z-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-black text-center">
          Kessler 10 (K10) Assessment Form Online
        </h1>
        <img
          src="brainstorm.png"
          alt="Header Image"
          className="w-full h-[300px] object-contain"
        />
      </div>
      <div className="relative p-3">
        <p>
          The Kessler K10 is a 10-question scale measuring psychological
          distress.
        </p>{" "}
        <p>
          It&apos;s a quick way to assess distress levels, with five possible
          responses for each question.
        </p>
        <p>
          {" "}
          Patients can complete it themselves, or a practitioner can read the
          questions aloud.
        </p>
        <p>
          <a
            href="https://www.worksafe.qld.gov.au/__data/assets/pdf_file/0010/22240/kessler-psychological-distress-scale-k101.pdf"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Kessler psychological distress scale reference
          </a>
        </p>
      </div>
      <form id="k10-form" onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-[#1e293b] text-lg font-bold mb-2">
          K10 Psychological Distress Scale
        </h2>
        <div className="space-y-6">
          {questions.map((question, index) => (
            <div key={index} className="p-4 bg-[#ffffff] rounded-sm shadow-sm">
              <p className="text-[#334155] font-medium mb-2">{question}</p>
              <div className="flex flex-wrap gap-4">
                {options.map((option, optIndex) => (
                  <label key={optIndex} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={responses[index] === option}
                      onChange={() => handleChange(index, option)}
                      className="hidden peer"
                    />
                    <span className="inline-block w-6 h-6 border-2 border-[#d1d5db] rounded-full peer-checked:bg-[#22c55e] peer-checked:border-[#22c55e]"></span>
                    <span className="text-[#4b5563]">{option}</span>
                  </label>
                ))}
              </div>
              <div className="pt-2">
                {responseIndexes[index] ? responseIndexes[index] : "N/A"}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <label className={"text-[#374151] font-medium"}>
            Today&apos;s Date:{" "}
          </label>
          <span className="text-[#4b5563]">
            {new Date().toLocaleDateString()}
          </span>
        </div>
        <button
          type="submit"
          className={`mt-4 px-4 py-2 bg-[#3b82f6] text-[#ffffff] rounded-lg hover:bg-[#2563eb] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#3b82f6]`}
          disabled={!areAllQuestionsAnswered()}
        >
          Convert to PDF
        </button>
        <div className="mt-4 p-4 bg-[#f3f4f6] rounded-lg w-full">
          <div className="font-medium text-[#374151]">
            Total Score:{" "}
            {areAllQuestionsAnswered() ? calculateTotalScore() : "Incomplete"}
          </div>
          <div className="mt-2 text-[#4b5563]">
            Recommendation:{" "}
            {areAllQuestionsAnswered()
              ? getRecommendation(calculateTotalScore())
              : "Please complete all questions"}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Main;
