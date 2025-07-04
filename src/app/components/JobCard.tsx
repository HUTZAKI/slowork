// components/JobCard.jsx

interface Job {
  title?: string;
  organizationType?: string;
  jobCategory?: string;
  province?: string;
  salary?: string;
  [key: string]: unknown;
}

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
    return (
      <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            เปิดรับสมัคร
          </span>
        </div>
  
        <p className="text-gray-600 mb-3">บริษัท {job.organizationType}</p>
  
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
            {job.jobCategory}
          </span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
            {job.province}
          </span>
          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">
            {job.salary} บาท
          </span>
        </div>
  
        <p className="text-gray-500 text-sm">เผยแพร่เมื่อ 2 ชั่วโมงที่แล้ว</p>
      </div>
    );
  };
  
  export default JobCard;
  