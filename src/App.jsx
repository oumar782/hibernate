import React, { useState } from "react";
import "./App.css";

const questions = [
  {
    question: "Qu'est-ce que Hibernate ?",
    options: [
      "Framework pour les interfaces graphiques",
      "Framework ORM pour Java",
      "Base de données relationnelle",
      "Serveur web"
    ],
    correctAnswer: 1, // L'index de la réponse correcte
  },
  {
    question: "Pourquoi utiliser Hibernate ?",
    options: [
      "Pour la gestion des utilisateurs",
      "Pour la gestion automatique des bases de données",
      "Pour créer des interfaces graphiques",
      "Pour développer des applications mobiles"
    ],
    correctAnswer: 1,
  },
  {
    question: "Quel est le rôle de la Session Factory dans Hibernate ?",
    options: [
      "Créer une connexion avec la base de données",
      "Gérer les transactions",
      "Créer des sessions pour interagir avec la base de données",
      "Gérer la sécurité de l'application"
    ],
    correctAnswer: 2,
  },
];

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  // Gérer les réponses de l'utilisateur
  const handleAnswerClick = (index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = index;
    setAnswers(updatedAnswers);
  };

  // Passer à la question suivante
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculer le score à la fin du quiz
      let userScore = 0;
      answers.forEach((answer, index) => {
        if (answer === questions[index].correctAnswer) {
          userScore++;
        }
      });
      setScore(userScore);
    }
  };

  // Passer à la question précédente
  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="quiz-container">
      <h1>Quiz sur Hibernate</h1>
      {score === null ? (
        <>
          <h2>{questions[currentIndex].question}</h2>
          <div>
            {questions[currentIndex].options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${answers[currentIndex] === index ? "selected" : ""}`}
                onClick={() => handleAnswerClick(index)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="navigation-buttons">
            <button onClick={handlePreviousQuestion} disabled={currentIndex === 0}>
              Précédent
            </button>
            <button onClick={handleNextQuestion}>
              {currentIndex === questions.length - 1 ? "Terminer" : "Suivant"}
            </button>
          </div>
        </>
      ) : (
        <div className="score-container">
          <h3>Votre score : {score} sur {questions.length}</h3>
          <p>Merci d'avoir complété le quiz !</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
