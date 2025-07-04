// lib/db.js

export const jobs = [
    {
      id: 1,
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
        overtime: false,
        commission: false,
        transport: true,
        food: false,
        uniform: false,
        fund: false,
        accommodation: false,
      },
    },
    {
      id: 2,
      title: 'Marketing Executive',
      jobCategory: 'การตลาด',
      province: 'เชียงใหม่',
      organizationType: 'หน่วยงานราชการ',
      workplace: 'ทำงานจากบ้าน',
      workDays: '5 วัน',
      salary: '15,000 - 25,000',
      onlineInterview: false,
      acceptNewGrad: true,
      benefits: {
        socialSecurity: true,
        bonus: false,
        overtime: false,
        commission: false,
        transport: false,
        food: true,
        uniform: false,
        fund: false,
        accommodation: false,
      },
    },
    // Add more demo jobs if needed
  ];
  