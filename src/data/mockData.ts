export const attendanceData = [
  { subject: "Probability & Statistics III", total: 27, present: 21, absent: 6, percentage: 85.7 },
  { subject: "Design Thinking III", total: 27, present: 21, absent: 6, percentage: 85.7 },
  { subject: "Web Technology III", total: 27, present: 21, absent: 6, percentage: 87.0 },
  { subject: "Computer Networks / CN", total: 25, present: 19, absent: 6, percentage: 76.0 },
  { subject: "Software Engineering", total: 24, present: 22, absent: 2, percentage: 91.7 },
  { subject: "Machine Learning", total: 26, present: 20, absent: 6, percentage: 76.9 },
];

export const timetableData = {
  Monday: [
    { time: "1:30 - 2:10 PM", subject: "SE", faculty: "Theory", room: "403", type: "Theory" },
    { time: "2:10 - 2:50 PM", subject: "CN", faculty: "Theory", room: "403", type: "Theory" },
    { time: "2:50 - 3:30 PM", subject: "Break", faculty: "", room: "", type: "" },
    { time: "3:30 - 4:10 PM", subject: "UI/UX", faculty: "Theory", room: "403", type: "Theory" },
    { time: "4:10 - 4:50 PM", subject: "ML", faculty: "Lab", room: "403", type: "Lab" },
  ],
  Tuesday: [
    { time: "1:30 - 2:10 PM", subject: "ML", faculty: "Theory", room: "403", type: "Theory" },
    { time: "2:10 - 2:50 PM", subject: "Vector Calculus", faculty: "Theory", room: "403", type: "Theory" },
    { time: "2:50 - 3:30 PM", subject: "Break", faculty: "", room: "", type: "" },
    { time: "3:30 - 4:10 PM", subject: "CN", faculty: "Theory", room: "403", type: "Theory" },
    { time: "4:10 - 4:50 PM", subject: "UI/UX", faculty: "Lab", room: "403", type: "Lab" },
  ],
  Wednesday: [
    { time: "1:30 - 2:10 PM", subject: "UI/UX", faculty: "Theory", room: "403", type: "Theory" },
    { time: "2:10 - 2:50 PM", subject: "ML", faculty: "Theory", room: "403", type: "Theory" },
    { time: "2:50 - 3:30 PM", subject: "Break", faculty: "", room: "", type: "" },
    { time: "3:30 - 4:10 PM", subject: "Vector Calculus", faculty: "Theory", room: "403", type: "Theory" },
    { time: "4:10 - 4:50 PM", subject: "CN", faculty: "Theory", room: "403", type: "Theory" },
  ],
  Thursday: [
    { time: "1:30 - 2:10 PM", subject: "CN", faculty: "Theory", room: "403", type: "Theory" },
    { time: "2:10 - 2:50 PM", subject: "UI/UX", faculty: "Theory", room: "403", type: "Theory" },
    { time: "2:50 - 3:30 PM", subject: "Break", faculty: "", room: "", type: "" },
    { time: "3:30 - 4:10 PM", subject: "ML", faculty: "Theory", room: "403", type: "Theory" },
    { time: "4:10 - 4:50 PM", subject: "SE", faculty: "Theory", room: "403", type: "Theory" },
  ],
  Friday: [
    { time: "1:30 - 2:10 PM", subject: "SE", faculty: "Theory", room: "403", type: "Theory" },
    { time: "2:10 - 2:50 PM", subject: "Entrepreneurship", faculty: "Theory", room: "403", type: "Theory" },
    { time: "2:50 - 3:30 PM", subject: "Break", faculty: "", room: "", type: "" },
    { time: "3:30 - 4:10 PM", subject: "Sustainable Energy", faculty: "Theory", room: "403", type: "Theory" },
    { time: "4:10 - 4:50 PM", subject: "ML", faculty: "Theory", room: "403", type: "Theory" },
  ],
};

export const assignments = [
  { id: 1, title: "ML Model Implementation", subject: "Machine Learning", desc: "Implement a linear regression model using Python", deadline: "2026-02-15", status: "pending" as const },
  { id: 2, title: "Network Protocol Analysis", subject: "Computer Networks", desc: "Analyze TCP/IP protocol stack", deadline: "2026-02-12", status: "submitted" as const },
  { id: 3, title: "UI/UX Case Study", subject: "Design Thinking", desc: "Complete case study on mobile banking app", deadline: "2026-02-10", status: "graded" as const, grade: "A" },
  { id: 4, title: "Web App Development", subject: "Web Technology", desc: "Create a responsive portfolio website", deadline: "2026-02-20", status: "pending" as const },
  { id: 5, title: "Statistical Analysis Report", subject: "Probability & Statistics", desc: "Perform hypothesis testing on given dataset", deadline: "2026-02-08", status: "graded" as const, grade: "B+" },
  { id: 6, title: "Software Requirements Doc", subject: "Software Engineering", desc: "Write SRS document for e-commerce platform", deadline: "2026-02-18", status: "pending" as const },
];

export const results = {
  cgpa: 8.4,
  semesters: [
    { sem: 1, sgpa: 8.2, subjects: [
      { name: "Mathematics I", grade: "A", credits: 4 },
      { name: "Physics", grade: "A+", credits: 4 },
      { name: "Programming in C", grade: "A", credits: 3 },
      { name: "English", grade: "B+", credits: 2 },
    ]},
    { sem: 2, sgpa: 8.5, subjects: [
      { name: "Mathematics II", grade: "A+", credits: 4 },
      { name: "Data Structures", grade: "A", credits: 4 },
      { name: "Digital Electronics", grade: "B+", credits: 3 },
    ]},
    { sem: 3, sgpa: 8.6, subjects: [
      { name: "DBMS", grade: "A+", credits: 4 },
      { name: "Operating Systems", grade: "A", credits: 4 },
      { name: "OOP with Java", grade: "A", credits: 3 },
    ]},
  ],
};

export const notices = [
  { id: 1, title: "Mid-Semester Examination Schedule Released", category: "Exam", date: "2026-02-10", urgent: true, content: "The mid-semester examination schedule has been released. Please check the examination portal for your timetable." },
  { id: 2, title: "Annual Sports Day Registration Open", category: "Event", date: "2026-02-08", urgent: false, content: "Register for the annual sports day events before Feb 20." },
  { id: 3, title: "Library Timings Extended for Exam Season", category: "General", date: "2026-02-07", urgent: false, content: "Library will remain open until 11 PM during exam season." },
  { id: 4, title: "Fee Payment Deadline - Last Date Feb 15", category: "Fees", date: "2026-02-05", urgent: true, content: "Please complete your fee payment before Feb 15 to avoid late charges." },
  { id: 5, title: "Workshop on AI & Machine Learning", category: "Event", date: "2026-02-04", urgent: false, content: "A two-day workshop on AI & ML will be held on Feb 25-26." },
  { id: 6, title: "Semester Registration Deadline", category: "Attendance", date: "2026-02-03", urgent: true, content: "Complete your semester registration by Feb 12." },
];

export const fees = {
  total: 185000,
  paid: 125000,
  due: 60000,
  breakdown: [
    { name: "Tuition Fee", amount: 120000 },
    { name: "Lab Fee", amount: 25000 },
    { name: "Library Fee", amount: 15000 },
    { name: "Examination Fee", amount: 25000 },
  ],
  installments: [
    { amount: 60000, date: "2025-07-15", status: "paid" as const },
    { amount: 65000, date: "2025-12-15", status: "paid" as const },
    { amount: 60000, date: "2026-02-15", status: "due" as const },
  ],
};

export const attendanceTrend = [
  { month: "Sep", percentage: 88 },
  { month: "Oct", percentage: 82 },
  { month: "Nov", percentage: 78 },
  { month: "Dec", percentage: 85 },
  { month: "Jan", percentage: 80 },
  { month: "Feb", percentage: 75 },
];
