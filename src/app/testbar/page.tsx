'use client';

import MainLayout from '../components/MainLayout';
import JobCard from '../components/JobCard';
import Link from 'next/link';

const TestbarPage = () => {
  return (
    <MainLayout>
      {({ filteredJobs }) => (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">ผลการค้นหางาน</h1>
          <p className="text-gray-600 mb-8">
            เลือกตัวกรองจากด้านซ้ายเพื่อค้นหางานที่เหมาะสมกับคุณ
          </p>

          <div className="space-y-4">
            {filteredJobs.length === 0 ? (
              <p className="text-gray-500">ยังไม่มีงานที่ตรงกับตัวกรอง</p>
            ) : (
              filteredJobs.map((job) => {
                const jobData = job as { _id?: string; id?: string; [key: string]: unknown };
                const jobId = jobData._id || jobData.id;
                return (
                  <Link href={`/jobs/${jobId}`} key={jobId} className="block">
                    <JobCard job={jobData} />
                  </Link>
                );
              })
            )}
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default TestbarPage;
