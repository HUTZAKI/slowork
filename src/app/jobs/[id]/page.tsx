'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import HeaderMain from '../../components/HeaderMain';

interface Job {
  title: string;
  jobCategory: string;
  jobDescription: string;
  applicantQualifications: string;
  salary: string;
  welfareBenefit: string;
  workplace: string;
  numberOfWorkingDay: string;
  contact: string;
}

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      try {
        const res = await fetch(`/api/jobs/${id}`);
        if (res.ok) {
          const data = await res.json();
          console.log('Job data:', data);
          setJob(data);
        } else {
          const data = await res.json();
          setError(data.message || 'Something went wrong.');
        }
      } catch {
        setError('Something went wrong.');
      }
    };

    fetchJob();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HeaderMain />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
          <p className="text-gray-600 mb-4">{job.jobCategory}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-2">Job Description</h2>
              <p>{job.jobDescription}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Applicant Qualifications</h2>
              <p>{job.applicantQualifications}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Salary</h2>
              <p>{job.salary}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Welfare & Benefits</h2>
              <p>{job.welfareBenefit}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Workplace</h2>
              <p>{job.workplace}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Number of Working Days</h2>
              <p>{job.numberOfWorkingDay}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Contact</h2>
              <p>{job.contact}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
