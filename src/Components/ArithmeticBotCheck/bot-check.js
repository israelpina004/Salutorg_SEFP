import { useEffect, useState } from "react";
import "../../Pages/Register/register.css"

const ArithmeticBotChecker = ({ onValidAnswer }) => {
  const [arithmeticProblem, setArithmeticProblem] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);

  // Function to generate a random arithmetic problem
  const generateArithmeticProblem = () => {
    const num1 = Math.floor(Math.random() * 10); // random number between 0 and 9
    const num2 = Math.floor(Math.random() * 10); // random number between 0 and 9
    const operators = ["+", "-", "*"];
    const operator = operators[Math.floor(Math.random() * operators.length)]; // random operator

    const problem = `${num1} ${operator} ${num2}`;
    setArithmeticProblem(problem);

    // Calculate the correct answer
    let answer;
    switch (operator) {
      case "+":
        answer = num1 + num2;
        break;
      case "-":
        answer = num1 - num2;
        break;
      case "*":
        answer = num1 * num2;
        break;
      default:
        answer = 0;
    }
    setCorrectAnswer(answer);
  };

  useEffect(() => {
    generateArithmeticProblem();
  }, []);

  useEffect(() => {
    if (parseInt(userAnswer) === correctAnswer) {
      onValidAnswer(true); // Trigger the callback if the answer is correct
    } else {
      onValidAnswer(false); // Trigger the callback if the answer is incorrect
    }
  }, [userAnswer, correctAnswer]);

  return (
    <>
    <div className="auth-redirect">
      <label>Solve this to prove you're not a bot: {arithmeticProblem}</label>
    </div>
    <div>
      <input
        type="text"
        placeholder="Answer"
        maxLength={3}
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="auth-input"
      />
    </div>
    </>
  );
};

export default ArithmeticBotChecker;
