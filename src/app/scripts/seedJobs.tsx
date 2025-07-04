// scripts/seedJobs.js (run with node)
import { connectDB } from '../lib/mongoose.js';
import Job from '../models/Jobs.js';

const jobs = [
  {
    title: 'Frontend Developer',
    jobCategory: 'IT/เทคโนโลยี',
    province: 'กรุงเทพฯ',
    organizationType: 'บริษัทเอกชน',
    workplace: 'ที่สำนักงาน',
    workDays: '5 วัน',
    salary: '25,000 - 35,000',
    onlineInterview: true,
    acceptNewGrad: true,
    benefits: {
      socialSecurity: true,
      bonus: true,
      food: true
    }
  },
  {
    title: 'Digital Marketer',
    jobCategory: 'การตลาด',
    province: 'เชียงใหม่',
    organizationType: 'บริษัทเอกชน',
    workplace: 'ทำงานจากบ้าน',
    workDays: 'ยืดหยุ่น',
    salary: '15,000 - 25,000',
    onlineInterview: true,
    acceptNewGrad: false,
    benefits: {
      socialSecurity: true,
      bonus: false
    }
  }
];

const seed = async () => {
  await connectDB();
  await Job.deleteMany();
  await Job.insertMany(jobs);
  console.log('✅ Seed complete');
  process.exit();
};

seed();
