import React from 'react';

import AddNewInterview from '../_components/AddNewInterview';
import InterviewList from '../_components/InterviewList';

function Dashboard() {
  return (
    <>
   
      <div className="p-10 space-y-14">
        <div className="border rounded-lg p-5">
          <h2 className="font-bold text-2xl">Welcome to mock.dev</h2>
          <h2 className="text-gray-500">
            Practice your interview skills with our AI-powered mock interviews.
            Get instant feedback and improve your chances of landing your dream job.
          </h2>
        </div>
        <div className="border rounded-lg p-5 flex items-center justify-between">
          <h3 className="font-bold text-xl">Start New Interview</h3>
          <AddNewInterview />
        </div>

        {/* Previous Interview List */}
        <div className="border rounded-lg p-5">
          <InterviewList />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
