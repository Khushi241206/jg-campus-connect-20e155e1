export const attendanceData = [
  { subject: "Software Engineering", total: 24, present: 22, absent: 2, percentage: 91.7 },
  { subject: "Computer Networks", total: 25, present: 19, absent: 6, percentage: 76.0 },
  { subject: "Machine Learning", total: 26, present: 20, absent: 6, percentage: 76.9 },
  { subject: "UI/UX Design", total: 27, present: 23, absent: 4, percentage: 85.2 },
  { subject: "Vector Calculus", total: 25, present: 21, absent: 4, percentage: 84.0 },
];

export const timetableData = {
  Monday: [
    { time: "1:30 - 2:10 PM", subject: "Software Engineering (SE)", faculty: "Theory", room: "403", type: "Theory" },
    { time: "2:10 - 2:50 PM", subject: "Computer Networks (CN)", faculty: "Theory", room: "403", type: "Theory" },
    { time: "2:50 - 3:30 PM", subject: "Break", faculty: "", room: "", type: "" },
    { time: "3:30 - 4:10 PM", subject: "UI/UX Design", faculty: "Theory", room: "403", type: "Theory" },
    { time: "4:10 - 4:50 PM", subject: "Machine Learning (ML)", faculty: "Lab", room: "403", type: "Lab" },
  ],
  Tuesday: [
    { time: "1:30 - 2:10 PM", subject: "Machine Learning (ML)", faculty: "Theory", room: "403", type: "Theory" },
    { time: "2:10 - 2:50 PM", subject: "Vector Calculus", faculty: "Theory", room: "403", type: "Theory" },
    { time: "2:50 - 3:30 PM", subject: "Break", faculty: "", room: "", type: "" },
    { time: "3:30 - 4:10 PM", subject: "Computer Networks (CN)", faculty: "Theory", room: "403", type: "Theory" },
    { time: "4:10 - 4:50 PM", subject: "UI/UX Design", faculty: "Lab", room: "403", type: "Lab" },
  ],
  Wednesday: [
    { time: "1:30 - 2:10 PM", subject: "UI/UX Design", faculty: "Theory", room: "403", type: "Theory" },
    { time: "2:10 - 2:50 PM", subject: "Machine Learning (ML)", faculty: "Theory", room: "403", type: "Theory" },
    { time: "2:50 - 3:30 PM", subject: "Break", faculty: "", room: "", type: "" },
    { time: "3:30 - 4:10 PM", subject: "Vector Calculus", faculty: "Theory", room: "403", type: "Theory" },
    { time: "4:10 - 4:50 PM", subject: "Computer Networks (CN)", faculty: "Theory", room: "403", type: "Theory" },
  ],
  Thursday: [
    { time: "1:30 - 2:10 PM", subject: "Computer Networks (CN)", faculty: "Theory", room: "403", type: "Theory" },
    { time: "2:10 - 2:50 PM", subject: "UI/UX Design", faculty: "Theory", room: "403", type: "Theory" },
    { time: "2:50 - 3:30 PM", subject: "Break", faculty: "", room: "", type: "" },
    { time: "3:30 - 4:10 PM", subject: "Machine Learning (ML)", faculty: "Theory", room: "403", type: "Theory" },
    { time: "4:10 - 4:50 PM", subject: "Software Engineering (SE)", faculty: "Theory", room: "403", type: "Theory" },
  ],
  Friday: [
    { time: "1:30 - 2:10 PM", subject: "Software Engineering (SE)", faculty: "Theory", room: "403", type: "Theory" },
    { time: "2:10 - 2:50 PM", subject: "Entrepreneurship", faculty: "Theory", room: "403", type: "Theory" },
    { time: "2:50 - 3:30 PM", subject: "Break", faculty: "", room: "", type: "" },
    { time: "3:30 - 4:10 PM", subject: "Sustainable Energy", faculty: "Theory", room: "403", type: "Theory" },
    { time: "4:10 - 4:50 PM", subject: "Machine Learning (ML)", faculty: "Theory", room: "403", type: "Theory" },
  ],
};

export const assignments = [
  { id: 1, title: "ML Model Implementation", subject: "Machine Learning", desc: "Implement a linear regression model using Python", deadline: "2026-02-15", status: "pending" as const },
  { id: 2, title: "Network Protocol Analysis", subject: "Computer Networks", desc: "Analyze TCP/IP protocol stack", deadline: "2026-02-12", status: "submitted" as const },
  { id: 3, title: "UI/UX Case Study", subject: "UI/UX Design", desc: "Complete case study on mobile banking app", deadline: "2026-02-10", status: "graded" as const, grade: "A" },
  { id: 4, title: "Vector Calculus Assignment", subject: "Vector Calculus", desc: "Solve problems on divergence and curl", deadline: "2026-02-20", status: "pending" as const },
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
  total: 80500,
  paid: 40250,
  due: 40250,
  breakdown: [
    { name: "Tuition Fee", amount: 28000 },
    { name: "Lab Fee", amount: 5000 },
    { name: "Library Fee", amount: 2500 },
    { name: "Examination Fee", amount: 2250 },
    { name: "Development Fee", amount: 1500 },
    { name: "Sports & Activity Fee", amount: 1000 },
  ],
  installments: [
    { amount: 40250, date: "2025-07-15", status: "paid" as const },
    { amount: 40250, date: "2026-01-15", status: "due" as const },
  ],
  perSemester: 40250,
  yearlyTotal: 80500,
};

export const attendanceTrend = [
  { month: "Sep", percentage: 88 },
  { month: "Oct", percentage: 82 },
  { month: "Nov", percentage: 78 },
  { month: "Dec", percentage: 85 },
  { month: "Jan", percentage: 80 },
  { month: "Feb", percentage: 75 },
];

export const examSchedule = [
  { id: 1, subject: "Software Engineering", date: "2026-03-10", time: "10:00 AM - 1:00 PM", room: "Hall A", type: "Mid-Sem" as const },
  { id: 2, subject: "Computer Networks", date: "2026-03-14", time: "2:00 PM - 5:00 PM", room: "Hall A", type: "Mid-Sem" as const },
  { id: 3, subject: "Machine Learning", date: "2026-03-16", time: "10:00 AM - 1:00 PM", room: "Hall C", type: "Mid-Sem" as const },
  { id: 4, subject: "UI/UX Design", date: "2026-03-18", time: "2:00 PM - 5:00 PM", room: "Hall B", type: "Mid-Sem" as const },
  { id: 5, subject: "Vector Calculus", date: "2026-03-20", time: "10:00 AM - 1:00 PM", room: "Hall A", type: "Mid-Sem" as const },
];

export interface MCQQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface OnlineTest {
  id: number;
  subject: string;
  title: string;
  totalMarks: number;
  duration: number;
  questions: MCQQuestion[];
  status: "upcoming" | "available" | "completed";
  score?: number;
  date: string;
}

const mlQuestions: MCQQuestion[] = [
  { id: 1, question: "Which of the following is a supervised learning algorithm?", options: ["K-Means", "Linear Regression", "DBSCAN", "Apriori"], correctAnswer: 1 },
  { id: 2, question: "What does the bias-variance tradeoff describe?", options: ["Training speed vs accuracy", "Model complexity vs generalization", "Data size vs model size", "CPU vs GPU usage"], correctAnswer: 1 },
  { id: 3, question: "Which activation function outputs values between 0 and 1?", options: ["ReLU", "Tanh", "Sigmoid", "Leaky ReLU"], correctAnswer: 2 },
  { id: 4, question: "What is the purpose of cross-validation?", options: ["Speed up training", "Reduce overfitting assessment", "Estimate model performance", "Increase data size"], correctAnswer: 2 },
  { id: 5, question: "Which metric is best for imbalanced classification?", options: ["Accuracy", "F1-Score", "MSE", "R-squared"], correctAnswer: 1 },
  { id: 6, question: "What does PCA stand for?", options: ["Principal Component Analysis", "Primary Cluster Algorithm", "Partial Correlation Analysis", "Predictive Classification Approach"], correctAnswer: 0 },
  { id: 7, question: "Gradient descent is used to:", options: ["Visualize data", "Minimize loss function", "Generate data", "Split datasets"], correctAnswer: 1 },
  { id: 8, question: "Which is NOT a type of machine learning?", options: ["Supervised", "Unsupervised", "Reinforcement", "Deterministic"], correctAnswer: 3 },
  { id: 9, question: "What is overfitting?", options: ["Model performs well on test data", "Model memorizes training data", "Model is too simple", "Model has low variance"], correctAnswer: 1 },
  { id: 10, question: "Random Forest is an example of:", options: ["Boosting", "Bagging", "Stacking", "Clustering"], correctAnswer: 1 },
  { id: 11, question: "What is the role of a loss function?", options: ["Store data", "Measure prediction error", "Generate features", "Normalize data"], correctAnswer: 1 },
  { id: 12, question: "Which algorithm is used for dimensionality reduction?", options: ["SVM", "PCA", "KNN", "Naive Bayes"], correctAnswer: 1 },
  { id: 13, question: "What is a hyperparameter?", options: ["Learned during training", "Set before training", "Output of the model", "A type of data"], correctAnswer: 1 },
  { id: 14, question: "Regularization helps to:", options: ["Increase complexity", "Prevent overfitting", "Speed up training", "Add more features"], correctAnswer: 1 },
  { id: 15, question: "Which is a clustering algorithm?", options: ["Linear Regression", "K-Means", "Logistic Regression", "SVM"], correctAnswer: 1 },
  { id: 16, question: "What does SVM stand for?", options: ["Support Vector Machine", "Simple Variable Model", "Supervised Vector Method", "Standard Variance Metric"], correctAnswer: 0 },
  { id: 17, question: "What is feature scaling?", options: ["Adding new features", "Normalizing feature values", "Removing features", "Encoding categories"], correctAnswer: 1 },
  { id: 18, question: "Which of these is an ensemble method?", options: ["Linear Regression", "Decision Tree", "Random Forest", "Naive Bayes"], correctAnswer: 2 },
  { id: 19, question: "What is the vanishing gradient problem?", options: ["Gradients become too large", "Gradients become near zero", "Gradients oscillate", "No gradient computed"], correctAnswer: 1 },
  { id: 20, question: "Dropout is used to:", options: ["Add neurons", "Regularize neural networks", "Speed up convergence", "Increase learning rate"], correctAnswer: 1 },
  { id: 21, question: "What type of learning uses reward signals?", options: ["Supervised", "Unsupervised", "Reinforcement", "Semi-supervised"], correctAnswer: 2 },
  { id: 22, question: "Which optimizer adapts the learning rate?", options: ["SGD", "Adam", "Batch GD", "Mini-batch GD"], correctAnswer: 1 },
  { id: 23, question: "What is a confusion matrix used for?", options: ["Data visualization", "Classification evaluation", "Feature selection", "Data cleaning"], correctAnswer: 1 },
  { id: 24, question: "ROC curve plots:", options: ["Loss vs epochs", "TPR vs FPR", "Precision vs Recall", "Accuracy vs time"], correctAnswer: 1 },
  { id: 25, question: "What is transfer learning?", options: ["Training from scratch", "Using pre-trained model on new task", "Transferring data between models", "Copying weights randomly"], correctAnswer: 1 },
  { id: 26, question: "Batch normalization helps with:", options: ["Data augmentation", "Internal covariate shift", "Feature extraction", "Label encoding"], correctAnswer: 1 },
  { id: 27, question: "What is a decision boundary?", options: ["Edge of dataset", "Line separating classes", "Limit of iterations", "Boundary of training set"], correctAnswer: 1 },
  { id: 28, question: "Which kernel is commonly used in SVM?", options: ["Linear", "RBF", "Polynomial", "All of the above"], correctAnswer: 3 },
  { id: 29, question: "What does epoch mean in training?", options: ["One pass through entire dataset", "One batch of data", "One gradient update", "One layer computation"], correctAnswer: 0 },
  { id: 30, question: "What is the purpose of a validation set?", options: ["Train the model", "Test final performance", "Tune hyperparameters", "Augment data"], correctAnswer: 2 },
];

const cnQuestions: MCQQuestion[] = [
  { id: 1, question: "Which layer of the OSI model handles routing?", options: ["Data Link", "Network", "Transport", "Session"], correctAnswer: 1 },
  { id: 2, question: "TCP is a _____ protocol.", options: ["Connectionless", "Connection-oriented", "Stateless", "Broadcast"], correctAnswer: 1 },
  { id: 3, question: "What is the default port for HTTP?", options: ["21", "25", "80", "443"], correctAnswer: 2 },
  { id: 4, question: "Which protocol is used for email retrieval?", options: ["SMTP", "POP3", "FTP", "HTTP"], correctAnswer: 1 },
  { id: 5, question: "What does DNS stand for?", options: ["Data Network Service", "Domain Name System", "Digital Network Standard", "Dynamic Node Setup"], correctAnswer: 1 },
  { id: 6, question: "Which topology has a single point of failure?", options: ["Mesh", "Star", "Ring", "Bus"], correctAnswer: 1 },
  { id: 7, question: "What is the size of an IPv4 address?", options: ["16 bits", "32 bits", "64 bits", "128 bits"], correctAnswer: 1 },
  { id: 8, question: "ARP resolves:", options: ["IP to MAC", "MAC to IP", "Domain to IP", "IP to Domain"], correctAnswer: 0 },
  { id: 9, question: "Which device operates at Layer 2?", options: ["Router", "Switch", "Gateway", "Repeater"], correctAnswer: 1 },
  { id: 10, question: "UDP is preferred for:", options: ["File transfer", "Video streaming", "Email", "Web browsing"], correctAnswer: 1 },
  { id: 11, question: "What is the size of an IPv6 address?", options: ["32 bits", "64 bits", "128 bits", "256 bits"], correctAnswer: 2 },
  { id: 12, question: "Which protocol provides reliable delivery?", options: ["UDP", "TCP", "ICMP", "ARP"], correctAnswer: 1 },
  { id: 13, question: "What does DHCP do?", options: ["Resolves domain names", "Assigns IP addresses", "Routes packets", "Encrypts data"], correctAnswer: 1 },
  { id: 14, question: "Which layer handles encryption?", options: ["Network", "Transport", "Presentation", "Application"], correctAnswer: 2 },
  { id: 15, question: "What is a subnet mask used for?", options: ["Encryption", "Dividing network and host parts", "Routing", "Error detection"], correctAnswer: 1 },
  { id: 16, question: "ICMP is used for:", options: ["File transfer", "Error reporting", "Email", "DNS lookup"], correctAnswer: 1 },
  { id: 17, question: "What is the maximum segment size in TCP?", options: ["Depends on MTU", "Fixed at 1500", "Always 512", "No limit"], correctAnswer: 0 },
  { id: 18, question: "Which protocol is used for secure web browsing?", options: ["HTTP", "FTP", "HTTPS", "SMTP"], correctAnswer: 2 },
  { id: 19, question: "What is a MAC address?", options: ["Network layer address", "Physical hardware address", "Logical address", "Port number"], correctAnswer: 1 },
  { id: 20, question: "How many layers does TCP/IP model have?", options: ["4", "5", "6", "7"], correctAnswer: 0 },
  { id: 21, question: "What does NAT stand for?", options: ["Network Access Terminal", "Network Address Translation", "Node Allocation Table", "Network Adapter Type"], correctAnswer: 1 },
  { id: 22, question: "Which class of IP supports 16 million hosts?", options: ["Class A", "Class B", "Class C", "Class D"], correctAnswer: 0 },
  { id: 23, question: "What is the three-way handshake for?", options: ["Data transfer", "Connection establishment", "Error correction", "Flow control"], correctAnswer: 1 },
  { id: 24, question: "Which protocol uses port 443?", options: ["HTTP", "FTP", "SSH", "HTTPS"], correctAnswer: 3 },
  { id: 25, question: "What is a firewall?", options: ["A router", "A security system", "A switch", "A modem"], correctAnswer: 1 },
  { id: 26, question: "What does SMTP stand for?", options: ["Simple Mail Transfer Protocol", "Secure Mail Transport Protocol", "Standard Message Transfer Protocol", "System Mail Transmission Protocol"], correctAnswer: 0 },
  { id: 27, question: "Which multiplexing technique divides by time?", options: ["FDM", "TDM", "WDM", "CDM"], correctAnswer: 1 },
  { id: 28, question: "What is the purpose of a gateway?", options: ["Connect same networks", "Connect different networks", "Amplify signals", "Store data"], correctAnswer: 1 },
  { id: 29, question: "What is bandwidth?", options: ["Speed of processor", "Data capacity of a channel", "Memory size", "Cable length"], correctAnswer: 1 },
  { id: 30, question: "What is latency?", options: ["Data speed", "Delay in data transfer", "Packet size", "Network type"], correctAnswer: 1 },
];

export const onlineTests: OnlineTest[] = [
  {
    id: 1, subject: "Machine Learning", title: "ML Unit Test 1", totalMarks: 30, duration: 30, date: "2026-02-25",
    status: "available",
    questions: mlQuestions,
  },
  {
    id: 2, subject: "Computer Networks", title: "CN Unit Test 1", totalMarks: 30, duration: 30, date: "2026-02-28",
    status: "available",
    questions: cnQuestions,
  },
  {
    id: 3, subject: "Software Engineering", title: "SE Quiz 1", totalMarks: 30, duration: 25, date: "2026-02-20",
    status: "completed", score: 24,
    questions: [],
  },
  {
    id: 4, subject: "UI/UX Design", title: "UI/UX Quiz 1", totalMarks: 30, duration: 25, date: "2026-03-05",
    status: "upcoming",
    questions: [],
  },
];

export const events = [
  { id: 1, title: "Inter-College Cricket Tournament", category: "Sports" as const, date: "2026-03-05", endDate: "2026-03-08", venue: "JGU Sports Ground", description: "Annual inter-college T20 cricket tournament. Register your team of 11 players.", registrationOpen: true, image: "🏏" },
  { id: 2, title: "Volleyball Championship", category: "Sports" as const, date: "2026-03-12", endDate: "2026-03-13", venue: "Indoor Sports Complex", description: "University volleyball championship. Open for all departments.", registrationOpen: true, image: "🏐" },
  { id: 3, title: "Badminton Singles & Doubles", category: "Sports" as const, date: "2026-03-15", endDate: "2026-03-16", venue: "Badminton Court", description: "Singles and doubles badminton tournament with prizes.", registrationOpen: true, image: "🏸" },
  { id: 4, title: "HackJGU 2026 - 24hr Hackathon", category: "Hackathon" as const, date: "2026-03-20", endDate: "2026-03-21", venue: "CS Lab Block", description: "24-hour hackathon with exciting themes. Teams of 2-4 members. Prizes worth ₹50,000.", registrationOpen: true, image: "💻" },
  { id: 5, title: "AI/ML Workshop by Google DSC", category: "Workshop" as const, date: "2026-02-25", endDate: "2026-02-26", venue: "Seminar Hall 2", description: "Two-day hands-on workshop on building AI applications using TensorFlow and Google Cloud.", registrationOpen: false, image: "🤖" },
  { id: 6, title: "Cloud Computing Workshop", category: "Workshop" as const, date: "2026-03-01", endDate: "2026-03-01", venue: "Lab 201", description: "Introduction to AWS and Azure cloud services. Hands-on lab included.", registrationOpen: true, image: "☁️" },
  { id: 7, title: "TechFest 2026", category: "Hackathon" as const, date: "2026-04-10", endDate: "2026-04-12", venue: "Main Auditorium", description: "Annual tech festival featuring coding competitions, robotics, and project exhibitions.", registrationOpen: false, image: "🚀" },
  { id: 8, title: "Table Tennis Championship", category: "Sports" as const, date: "2026-03-25", endDate: "2026-03-25", venue: "Recreation Center", description: "Open table tennis championship. Singles format.", registrationOpen: true, image: "🏓" },
];
