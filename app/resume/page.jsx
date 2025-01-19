'use client';

import React, { useState, useEffect } from 'react';
    import { GoogleGenerativeAI } from "@google/generative-ai";
    import * as pdfjsLib from 'pdfjs-dist';

    const Page = () => {
      const [jobDescription, setJobDescription] = useState('');
      const [resumeFile, setResumeFile] = useState(null);
      const [analysisResults, setAnalysisResults] = useState(null);
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(false);

      useEffect(() => {
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
      }, []);

      const handleJobDescriptionChange = (e) => {
        setJobDescription(e.target.value);
      };

      const handleResumeFileChange = (e) => {
        setResumeFile(e.target.files[0]);
      };

      const extractTextFromPdf = async (pdfData) => {
        try {
          const loadingTask = pdfjsLib.getDocument({ data: pdfData });
          const pdf = await loadingTask.promise;
          let fullText = '';

          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + ' ';
          }
          return fullText;
        } catch (error) {
          console.error("Error extracting text from PDF:", error);
          throw new Error(`Failed to extract text from PDF: ${error.message}`);
        }
      };


      const analyzeResume = async () => {
        if (!jobDescription || !resumeFile) {
          setError('Please provide both job description and resume.');
          return;
        }

        setLoading(true);
        setError(null);
        setAnalysisResults(null);

        try {
          const fileReader = new FileReader();
          fileReader.onload = async (event) => {
            const pdfData = new Uint8Array(event.target.result);
            try {
              const resumeText = await extractTextFromPdf(pdfData);

              const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
              if (!geminiApiKey) {
                setError('Gemini API key not found in .env.local');
                setLoading(false);
                return;
              }

              const genAI = new GoogleGenerativeAI(geminiApiKey);
              const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

              const prompt = `
              You are an expert ATS (Applicant Tracking System) and resume analyzer. Analyze the resume text below against the job description provided.

              Job Description: ${jobDescription}

              Resume Text: ${resumeText}

              Provide a response in the following JSON format ONLY. Ensure the response is valid JSON.
              {{
                  "JD Match": "percentage between 0-100",
                  "MissingKeywords": ["keyword1", "keyword2", ...],
                  "Profile Summary": "detailed analysis of the match and specific improvement suggestions"
              }}
              `;

              const result = await model.generateContent(prompt);
              const response = await result.response;
              const text = response.text();
              setAnalysisResults(text);
              setLoading(false);
            } catch (parseError) {
              setError(`Error parsing PDF: ${parseError.message}`);
              setLoading(false);
            }
          };
          fileReader.onerror = (error) => {
            setError(`Error reading file: ${error.message}`);
            setLoading(false);
          };
          fileReader.readAsArrayBuffer(resumeFile);
        } catch (err) {
          setError(`Error analyzing resume: ${err.message}`);
          setLoading(false);
        }
      };

      return (
        <div className="container mx-auto p-4 max-w-3xl bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Smart ATS Resume Analyzer</h1>
          <div className="mb-4">
            <label htmlFor="jobDescription" className="block text-gray-700 font-bold mb-2">Job Description</label>
            <textarea
              id="jobDescription"
              rows="5"
              value={jobDescription}
              onChange={handleJobDescriptionChange}
              placeholder="Paste the job description here..."
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="resumeFile" className="block text-gray-700 font-bold mb-2">Resume (PDF)</label>
            <input
              type="file"
              id="resumeFile"
              accept=".pdf"
              onChange={handleResumeFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button onClick={analyzeResume} disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:cursor-not-allowed">
            Analyze Resume
          </button>
          {loading && <div className="text-center mt-4">Analyzing...</div>}
          {error && <div className="text-red-500 mt-4">{error}</div>}
          {analysisResults && (
            <div className="mt-6 p-4 border border-gray-200 rounded-md bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Analysis Results</h2>
              <pre className="whitespace-pre-wrap text-gray-700">{analysisResults}</pre>
            </div>
          )}
        </div>
      );
    };

    export default Page;