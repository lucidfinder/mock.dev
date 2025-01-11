'use client';
import React, { useState, useEffect } from "react";
import axios from "axios";
import MonacoEditor from "react-monaco-editor";
import { chatSession } from "@/utils/GeminiAIModel";

function App() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionVisible, setQuestionVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [numQuestions, setNumQuestions] = useState(1);
    const [output, setOutput] = useState("");
    const [evaluationResult, setEvaluationResult] = useState("");
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [testCases, setTestCases] = useState([]);

    const fetchQuestions = async () => {
        setLoading(true);
        setError("");
        setQuestionVisible(false);
        setCode("");
        setOutput("");
        setEvaluationResult("");
        setTestCases([]);

        try {
            const questionList = [];
            for (let i = 0; i < numQuestions; i++) {
                const response = await chatSession.sendMessage(
                    `Data Structures and Algorithms (DSA) coding question similar to LeetCode in the following structured format:
                    Title: <Problem Title>
                    Description: <Problem Description>
                    Difficulty: ${difficulty}
                    Constraints: <Problem Constraints>
                    Example: <Problem Example>
                    Test Cases: <Test Cases with expected output in following format - input: <Input>, output: <Expected Output>>
                    `
                );
                const questionData = (await response.response.text()).trim();

                const title = questionData.match(/Title: (.*)/)?.[1] || "Untitled Question";
                const description = questionData.match(/Description: (.*?)(Difficulty)/s)?.[1]?.trim() || "No description provided.";
                const constraints = await generateSection(questionData, 'Constraints');
                const example = await generateSection(questionData, 'Example');
                const testCasesText = await generateSection(questionData, 'Test Cases');
                const parsedTestCases = parseTestCases(testCasesText);


                questionList.push({ title, description, constraints, example, testCases: parsedTestCases });
            }

            setQuestions(questionList);
            setCurrentQuestionIndex(0);
            setQuestionVisible(true);
        } catch (err) {
            setError("Failed to fetch questions. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const generateSection = async (questionData, sectionName) => {
        try {
            const response = await chatSession.sendMessage(
                `Generate the ${sectionName} for the following question: ${questionData}`
            );
            return (await response.response.text()).trim() || `No ${sectionName.toLowerCase()} provided.`;
        } catch (err) {
            console.error(`Error fetching ${sectionName}:`, err);
            return `No ${sectionName.toLowerCase()} provided.`;
        }
    };

    const parseTestCases = (testCasesText) => {
      const testCases = [];
      const regex = /input: (.*?), output: (.*?)(?=\n|$)/g;
      let match;
      while ((match = regex.exec(testCasesText)) !== null) {
        testCases.push({
          input: match[1].trim(),
          output: match[2].trim(),
        });
      }
      return testCases;
    };

    const currentQuestion = questions[currentQuestionIndex] || {};

   const handleCodeChange = (newCode) => {
        setCode(newCode);
        setOutput("");
        setEvaluationResult("");
    };

    const runCode = async () => {
      if(!currentQuestion.testCases || currentQuestion.testCases.length === 0) {
         setOutput("No Test cases generated");
          setEvaluationResult("Cannot evaluate");
        return;
      }

        try {
            const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
                language,
                version: "*",
                files: [{ name: `main.${language}`, content: code }],
            });

            const result = response.data;
            console.log("Piston API Response:", result); // Log the entire response
            const outputResult = result.run.stdout || result.run.stderr || "No output received.";
            setOutput(outputResult);
          
           if(result.run.stderr){
                 console.error("Piston API Error:", result.run.stderr);
             }

            const geminiEvaluation = await chatSession.sendMessage(
                 `Evaluate the following code's output based on the question's expected output, and respond with just "right" or "wrong".
                   Question: ${currentQuestion.description}
                   Constraints: ${currentQuestion.constraints}
                   Test Cases: ${JSON.stringify(currentQuestion.testCases)}
                   Code: ${code}
                   Code Output: ${outputResult}
                 `
            )

           const geminiEvaluationResult = (await geminiEvaluation.response.text()).trim();

          setEvaluationResult(geminiEvaluationResult.toLowerCase().includes("right") ? "right" : "wrong");

        } catch (err) {
            console.error("Error executing code or evaluating:", err);
            setOutput("An error occurred while executing the code.");
            setEvaluationResult("An error occurred during evaluation.");
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCode("");
            setOutput("");
            setEvaluationResult("");
             setTestCases([]);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setCode("");
            setOutput("");
            setEvaluationResult("");
              setTestCases([]);
        }
    };
    
    return (
        <div className="bg-gray-900 text-gray-200 min-h-screen font-mono">
            <header className="bg-gray-800 p-4 shadow-md">
                <h1 className="text-2xl font-bold text-center text-white">Coding Platform</h1>
            </header>

            <div className="p-4 flex items-center justify-center space-x-4 bg-gray-800">
                <div>
                    <label className="mr-2">Difficulty:</label>
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="bg-gray-700 p-2 rounded"
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div>
                    <label className="mr-2">Number of Questions:</label>
                    <input
                        type="number"
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(Number(e.target.value))}
                        min="1"
                        className="bg-gray-700 p-2 rounded w-16"
                    />
                </div>
                <div>
                    <label className="mr-2">Language:</label>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-gray-700 p-2 rounded"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="c">C</option>
                    </select>
                </div>
                <button
                    onClick={fetchQuestions}
                    className="py-2 px-4 bg-blue-500 hover:bg-blue-400 text-white rounded"
                >
                    Generate Questions
                </button>
            </div>

            <main className="p-4 flex gap-4">
                <section className="bg-gray-800 p-4 rounded shadow-md w-full sm:w-1/2 overflow-auto">
                    {loading && <p className="text-center text-blue-400">Generating questions...</p>}
                    {error && <p className="text-center text-red-400">{error}</p>}
                    {questionVisible && (
                        <>
                            <h2 className="text-xl font-bold text-blue-400">{currentQuestion.title}</h2>
                            <p className="mt-4 whitespace-pre-wrap break-words">{currentQuestion.description}</p>

                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-green-400">Constraints:</h3>
                                <pre className="bg-gray-700 p-3 rounded mt-2 whitespace-pre-wrap break-words">{currentQuestion.constraints}</pre>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-yellow-400">Example:</h3>
                                <pre className="bg-gray-700 p-3 rounded mt-2 whitespace-pre-wrap break-words">{currentQuestion.example}</pre>
                            </div>
                             {currentQuestion.testCases && currentQuestion.testCases.length > 0 && (
                                 <div className="mt-4">
                                     <h3 className="text-lg font-semibold text-purple-400">Test Cases:</h3>
                                     {currentQuestion.testCases.map((testCase, index) => (
                                         <pre key={index} className="bg-gray-700 p-3 rounded mt-2 whitespace-pre-wrap break-words">
                                             Input: {testCase.input}, Output: {testCase.output}
                                          </pre>
                                     ))}
                                 </div>
                             )}
                        </>
                    )}
                </section>

                <section className="flex-1 bg-gray-800 p-4 rounded shadow-md w-full sm:w-1/2">
                    <h2 className="text-lg font-bold text-blue-400">Code Editor</h2>
                    <MonacoEditor
                        width="100%"
                        height="400"
                        language={language}
                        theme="vs-dark"
                        value={code}
                        onChange={handleCodeChange}
                        options={{
                            automaticLayout: true,
                            minimap: { enabled: false },
                            lineNumbers: "on",
                        }}
                        className="mt-4"
                    />
                    <button
                        onClick={runCode}
                        className="mt-4 py-2 px-4 bg-green-500 hover:bg-green-400 text-white rounded"
                    >
                        Run Code
                    </button>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-orange-400">Output:</h3>
                        <pre className="bg-gray-700 p-3 rounded mt-2">{output}</pre>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-red-400">Evaluation Result:</h3>
                        <pre className="bg-gray-700 p-3 rounded mt-2 whitespace-pre-wrap break-words">{evaluationResult}</pre>
                    </div>
                    <div className="mt-4 flex justify-between">
                        <button
                            onClick={handlePreviousQuestion}
                            disabled={currentQuestionIndex === 0}
                            className="py-2 px-4 bg-gray-600 hover:bg-gray-500 text-white rounded"
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNextQuestion}
                            disabled={currentQuestionIndex === questions.length - 1}
                            className="py-2 px-4 bg-gray-600 hover:bg-gray-500 text-white rounded"
                        >
                            Next
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;