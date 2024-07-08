import React from "react";
import { Route, Routes } from "react-router-dom";
import Quizmain from "./quizLayout";
import QuizPage from "./quizStart/[id]/page";
import Add from "./quiz-build/Add";


function QuizApp({ darkMode }) {
  return (
        <Routes>
            <Route path="/" element={<Quizmain darkMode={darkMode}  />} />
            <Route path="quiz-start" element={<QuizPage darkMode={darkMode}  />} />
            <Route path="add-quiz" element={<Add darkMode={darkMode} />} />
        </Routes>
    
  );
}

export default QuizApp;
