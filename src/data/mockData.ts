export const attendanceData = [
  { subject: "Software Engineering", total: 24, present: 22, absent: 2, percentage: 91.7 },
  { subject: "Computer Networks", total: 25, present: 19, absent: 6, percentage: 76.0 },
  { subject: "Machine Learning", total: 26, present: 20, absent: 6, percentage: 76.9 },
  { subject: "UI/UX Design", total: 27, present: 23, absent: 4, percentage: 85.2 },
  { subject: "Vector Calculus", total: 25, present: 21, absent: 4, percentage: 84.0 },
  { subject: "Sustainable Energy", total: 20, present: 18, absent: 2, percentage: 90.0 },
  { subject: "Entrepreneurship", total: 18, present: 15, absent: 3, percentage: 83.3 },
];

// Timetable data for the week
export const timetableData = {
  Monday: [
    { time: "1:30 - 2:10 PM", subject: "Software Engineering (SE)", faculty: "Miss. Neelu Verma", room: "403", type: "Theory" },
    { time: "2:10 - 2:50 PM", subject: "Computer Networks (CN)", faculty: "Mr. Sharad Patidar", room: "403", type: "Theory" },
    { time: "2:50 - 3:30 PM", subject: "Break", faculty: "", room: "", type: "" },
    { time: "3:30 - 4:10 PM", subject: "UI/UX Design", faculty: "Ms. Anukreeti Chaudhary", room: "403", type: "Theory" },
    { time: "4:10 - 4:50 PM", subject: "Machine Learning (ML)", faculty: "Mr. Sameer Deo", room: "403", type: "Lab" },
  ],
  Tuesday: [
    { time: "1:30 - 2:10 PM", subject: "Machine Learning (ML)", faculty: "Mr. Sameer Deo", room: "403", type: "Theory" },
    { time: "2:10 - 2:50 PM", subject: "Vector Calculus", faculty: "Miss. Neelu Verma", room: "403", type: "Theory" },
    { time: "2:50 - 3:30 PM", subject: "Break", faculty: "", room: "", type: "" },
    { time: "3:30 - 4:10 PM", subject: "Computer Networks (CN)", faculty: "Mr. Sharad Patidar", room: "403", type: "Theory" },
    { time: "4:10 - 4:50 PM", subject: "UI/UX Design", faculty: "Ms. Anukreeti Chaudhary", room: "403", type: "Lab" },
  ],
  Wednesday: [
    { time: "1:30 - 2:10 PM", subject: "UI/UX Design", faculty: "Ms. Anukreeti Chaudhary", room: "403", type: "Theory" },
    { time: "2:10 - 2:50 PM", subject: "Machine Learning (ML)", faculty: "Mr. Sameer Deo", room: "403", type: "Theory" },
    { time: "2:50 - 3:30 PM", subject: "Break", faculty: "", room: "", type: "" },
    { time: "3:30 - 4:10 PM", subject: "Vector Calculus", faculty: "Miss. Neelu Verma", room: "403", type: "Theory" },
    { time: "4:10 - 4:50 PM", subject: "Computer Networks (CN)", faculty: "Mr. Sharad Patidar", room: "403", type: "Theory" },
  ],
  Thursday: [
    { time: "1:30 - 2:10 PM", subject: "Computer Networks (CN)", faculty: "Mr. Sharad Patidar", room: "403", type: "Theory" },
    { time: "2:10 - 2:50 PM", subject: "UI/UX Design", faculty: "Ms. Anukreeti Chaudhary", room: "403", type: "Theory" },
    { time: "2:50 - 3:30 PM", subject: "Break", faculty: "", room: "", type: "" },
    { time: "3:30 - 4:10 PM", subject: "Machine Learning (ML)", faculty: "Mr. Sameer Deo", room: "403", type: "Theory" },
    { time: "4:10 - 4:50 PM", subject: "Software Engineering (SE)", faculty: "Miss. Neelu Verma", room: "403", type: "Theory" },
  ],
  Friday: [
    { time: "1:30 - 2:10 PM", subject: "Software Engineering (SE)", faculty: "Miss. Neelu Verma", room: "403", type: "Theory" },
    { time: "2:10 - 2:50 PM", subject: "Entrepreneurship", faculty: "Mr. Sharad Patidar", room: "403", type: "Theory" },
    { time: "2:50 - 3:30 PM", subject: "Break", faculty: "", room: "", type: "" },
    { time: "3:30 - 4:10 PM", subject: "Sustainable Energy", faculty: "Ms. Anukreeti Chaudhary", room: "403", type: "Theory" },
    { time: "4:10 - 4:50 PM", subject: "Machine Learning (ML)", faculty: "Mr. Sameer Deo", room: "403", type: "Theory" },
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
  total: 40250,
  paid: 25250,
  applicableScholarship: 0,
  sanctionedScholarship: 0,
  pendingScholarship: 0,
  outstanding: 0,
  year: "2025-2026",
  class: "Second Year-B",
  semester: "SEM-4",
  breakdown: [
    { name: "Tuition Fee", amount: 28000 },
    { name: "Lab Fee", amount: 5000 },
    { name: "Library Fee", amount: 2500 },
    { name: "Examination Fee", amount: 2250 },
    { name: "Development Fee", amount: 1500 },
    { name: "Sports & Activity Fee", amount: 1000 },
  ],
  history: [
    {
      type: "ONLINE" as const,
      date: "05 Aug 2025",
      amount: 40250,
      class: "Second Year-B",
      receiptNo: "JGENG202500240",
      instrumentNo: "113885697562",
      narration: "Online Payment - 313833-2403841012",
      status: "CLEARED" as const,
    },
    {
      type: "CHEQUE" as const,
      date: "22 Dec 2025",
      amount: 25250,
      class: "Second Year-B",
      receiptNo: "JGENG202501061",
      instrumentNo: "000042",
      narration: "JG UNIVERSITY SCHOLARSHIP APPROVAL (JGU/ACAD/25-26/SCH/004) AM...",
      status: "CLEARED" as const,
    },
  ],
  perSemester: 40250,
  bankDetails: {
    bankName: "State Bank of India",
    branch: "JG University Campus Branch",
    accountName: "JG University Fee Collection Account",
    accountNo: "39876542100",
    ifsc: "SBIN0071234",
    micr: "400002567",
  },
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
  { id: 1, subject: "Software Engineering", date: "2026-04-06", time: "10:00 AM - 1:00 PM", room: "Hall A", type: "Internal" as const },
  { id: 2, subject: "Computer Networks", date: "2026-04-08", time: "2:00 PM - 5:00 PM", room: "Hall A", type: "Internal" as const },
  { id: 3, subject: "Machine Learning", date: "2026-04-10", time: "10:00 AM - 1:00 PM", room: "Hall C", type: "Internal" as const },
  { id: 4, subject: "UI/UX Design", date: "2026-04-12", time: "2:00 PM - 5:00 PM", room: "Hall B", type: "Internal" as const },
  { id: 5, subject: "Vector Calculus", date: "2026-04-14", time: "10:00 AM - 1:00 PM", room: "Hall A", type: "Internal" as const },
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

const seQuestions: MCQQuestion[] = [
  { id: 1, question: "What is the first phase of SDLC?", options: ["Design", "Testing", "Requirement Analysis", "Coding"], correctAnswer: 2 },
  { id: 2, question: "Which model is also called the classic life cycle?", options: ["Agile", "Waterfall", "Spiral", "V-Model"], correctAnswer: 1 },
  { id: 3, question: "What does SRS stand for?", options: ["Software Requirement Specification", "System Requirement Standard", "Software Release System", "System Resource Specification"], correctAnswer: 0 },
  { id: 4, question: "Which testing is done without looking at code?", options: ["White box", "Black box", "Grey box", "Unit testing"], correctAnswer: 1 },
  { id: 5, question: "What is coupling in software design?", options: ["Degree of interaction within a module", "Degree of interaction between modules", "Code complexity", "Data redundancy"], correctAnswer: 1 },
  { id: 6, question: "Agile methodology emphasizes:", options: ["Documentation", "Individuals and interactions", "Processes", "Tools"], correctAnswer: 1 },
  { id: 7, question: "What is refactoring?", options: ["Adding features", "Restructuring code without changing behavior", "Bug fixing", "Testing"], correctAnswer: 1 },
  { id: 8, question: "Which diagram shows system behavior?", options: ["Class diagram", "Use case diagram", "ER diagram", "Component diagram"], correctAnswer: 1 },
  { id: 9, question: "What is cohesion?", options: ["Inter-module dependency", "Intra-module functionality relatedness", "Code duplication", "Error rate"], correctAnswer: 1 },
  { id: 10, question: "COCOMO is used for:", options: ["Testing", "Cost estimation", "Coding", "Debugging"], correctAnswer: 1 },
  { id: 11, question: "What is a sprint in Scrum?", options: ["A bug fix session", "A time-boxed iteration", "A testing phase", "A deployment step"], correctAnswer: 1 },
  { id: 12, question: "Which testing comes first?", options: ["Integration", "System", "Unit", "Acceptance"], correctAnswer: 2 },
  { id: 13, question: "What does DFD stand for?", options: ["Data Flow Diagram", "Design Function Document", "Data File Directory", "Development Framework Design"], correctAnswer: 0 },
  { id: 14, question: "Risk management is part of which model?", options: ["Waterfall", "Spiral", "RAD", "Prototype"], correctAnswer: 1 },
  { id: 15, question: "What is a baseline in software engineering?", options: ["First version of code", "A formally reviewed specification", "A testing benchmark", "A deployment target"], correctAnswer: 1 },
  { id: 16, question: "What is the main advantage of prototyping?", options: ["Faster delivery", "Early user feedback", "Less documentation", "Lower cost"], correctAnswer: 1 },
  { id: 17, question: "Which is NOT a software quality attribute?", options: ["Reliability", "Usability", "Profitability", "Maintainability"], correctAnswer: 2 },
  { id: 18, question: "What does CI/CD stand for?", options: ["Code Integration/Code Delivery", "Continuous Integration/Continuous Delivery", "Central Interface/Central Database", "Component Integration/Component Design"], correctAnswer: 1 },
  { id: 19, question: "What is regression testing?", options: ["Testing new features", "Re-testing after changes", "Performance testing", "Security testing"], correctAnswer: 1 },
  { id: 20, question: "UML stands for:", options: ["Unified Modeling Language", "Universal Markup Language", "User Management Logic", "Unified Module Library"], correctAnswer: 0 },
  { id: 21, question: "What is a use case?", options: ["A test case", "A description of system interaction", "A code module", "A database query"], correctAnswer: 1 },
  { id: 22, question: "Which is a non-functional requirement?", options: ["Login feature", "Performance speed", "Search functionality", "Report generation"], correctAnswer: 1 },
  { id: 23, question: "What is version control?", options: ["Managing code versions", "Testing versions", "Deploying versions", "Designing versions"], correctAnswer: 0 },
  { id: 24, question: "What is a design pattern?", options: ["A UI template", "A reusable solution to common problems", "A testing framework", "A coding standard"], correctAnswer: 1 },
  { id: 25, question: "What does MVP stand for in Agile?", options: ["Most Valuable Player", "Minimum Viable Product", "Maximum Value Process", "Managed Version Protocol"], correctAnswer: 1 },
  { id: 26, question: "Which is a structural design pattern?", options: ["Observer", "Adapter", "Strategy", "Command"], correctAnswer: 1 },
  { id: 27, question: "What is technical debt?", options: ["Project budget", "Cost of rework due to shortcuts", "Server costs", "Licensing fees"], correctAnswer: 1 },
  { id: 28, question: "What is pair programming?", options: ["Two teams working together", "Two programmers at one workstation", "Programming in pairs of files", "Dual deployment"], correctAnswer: 1 },
  { id: 29, question: "What is the purpose of code review?", options: ["Speed up development", "Find defects and improve quality", "Generate documentation", "Manage versions"], correctAnswer: 1 },
  { id: 30, question: "What is DevOps?", options: ["Development only", "Operations only", "Development and Operations collaboration", "Database operations"], correctAnswer: 2 },
];

const uiuxQuestions: MCQQuestion[] = [
  { id: 1, question: "What does UX stand for?", options: ["User Experience", "User Extension", "Unified Experience", "Universal Exchange"], correctAnswer: 0 },
  { id: 2, question: "What is a wireframe?", options: ["Final design", "Low-fidelity layout sketch", "Code prototype", "Animation"], correctAnswer: 1 },
  { id: 3, question: "Which principle states 'less is more'?", options: ["Proximity", "Minimalism", "Contrast", "Alignment"], correctAnswer: 1 },
  { id: 4, question: "What is a persona in UX?", options: ["A real user", "A fictional user representation", "A developer role", "A testing method"], correctAnswer: 1 },
  { id: 5, question: "Hick's Law relates to:", options: ["Color theory", "Decision time vs choices", "Typography", "Grid systems"], correctAnswer: 1 },
  { id: 6, question: "What is affordance?", options: ["Cost of design", "Perceived action possibility", "Visual hierarchy", "White space"], correctAnswer: 1 },
  { id: 7, question: "Which tool is used for UI design?", options: ["Excel", "Figma", "Notepad", "Terminal"], correctAnswer: 1 },
  { id: 8, question: "What is A/B testing?", options: ["Alpha-Beta testing", "Comparing two design variants", "Accessibility testing", "Animation testing"], correctAnswer: 1 },
  { id: 9, question: "What is responsive design?", options: ["Fast loading", "Adapting to screen sizes", "High resolution", "Dark mode"], correctAnswer: 1 },
  { id: 10, question: "What is a user journey map?", options: ["GPS navigation", "Visualization of user's experience", "Website map", "Server architecture"], correctAnswer: 1 },
  { id: 11, question: "What is visual hierarchy?", options: ["Folder structure", "Arrangement guiding attention", "Color palette", "Font collection"], correctAnswer: 1 },
  { id: 12, question: "Gestalt principle of proximity means:", options: ["Similar items group together", "Close items are perceived as related", "Items need contrast", "Alignment matters"], correctAnswer: 1 },
  { id: 13, question: "What is a prototype?", options: ["Final product", "Interactive model of the design", "Code documentation", "Test report"], correctAnswer: 1 },
  { id: 14, question: "What does accessibility mean in UI?", options: ["Fast loading", "Usable by people with disabilities", "Mobile-first", "Minimalist design"], correctAnswer: 1 },
  { id: 15, question: "What is the 60-30-10 rule?", options: ["Screen sizes", "Color distribution", "Typography sizes", "Spacing rule"], correctAnswer: 1 },
  { id: 16, question: "What is a mood board?", options: ["A whiteboard", "Visual collection for design inspiration", "A task board", "A bug tracker"], correctAnswer: 1 },
  { id: 17, question: "What is micro-interaction?", options: ["Small code changes", "Subtle feedback animations", "Tiny screens", "Short meetings"], correctAnswer: 1 },
  { id: 18, question: "Fitts's Law relates to:", options: ["Color contrast", "Target size and distance", "Font readability", "Page loading"], correctAnswer: 1 },
  { id: 19, question: "What is a design system?", options: ["An operating system", "Reusable components and standards", "A testing system", "A deployment pipeline"], correctAnswer: 1 },
  { id: 20, question: "What is usability testing?", options: ["Load testing", "Testing with real users", "Code testing", "Security testing"], correctAnswer: 1 },
  { id: 21, question: "What is the F-pattern?", options: ["A coding pattern", "How users scan web content", "A color scheme", "A layout grid"], correctAnswer: 1 },
  { id: 22, question: "What is whitespace?", options: ["White colored area", "Empty space in design", "Background color", "Text area"], correctAnswer: 1 },
  { id: 23, question: "What is a call-to-action (CTA)?", options: ["A phone feature", "A prompt for user action", "A navigation menu", "A footer element"], correctAnswer: 1 },
  { id: 24, question: "What is information architecture?", options: ["Building design", "Organizing content structure", "Server architecture", "Database schema"], correctAnswer: 1 },
  { id: 25, question: "What is a heuristic evaluation?", options: ["User testing", "Expert review using principles", "Code review", "Performance testing"], correctAnswer: 1 },
  { id: 26, question: "What does WCAG stand for?", options: ["Web Content Accessibility Guidelines", "Web Code Analysis Guide", "Website Creation And Governance", "Web Component Architecture Guide"], correctAnswer: 0 },
  { id: 27, question: "What is card sorting?", options: ["Playing cards", "Method to organize information", "Sorting algorithms", "Database indexing"], correctAnswer: 1 },
  { id: 28, question: "What is a hamburger menu?", options: ["Food menu", "Three-line mobile navigation icon", "A design pattern", "Both B and C"], correctAnswer: 3 },
  { id: 29, question: "What is the purpose of a style guide?", options: ["Code formatting", "Consistent visual design rules", "Testing guidelines", "Deployment procedures"], correctAnswer: 1 },
  { id: 30, question: "What is empathy mapping?", options: ["GPS mapping", "Understanding user thoughts and feelings", "Site mapping", "Data mapping"], correctAnswer: 1 },
];

const vcQuestions: MCQQuestion[] = [
  { id: 1, question: "The gradient of a scalar field gives:", options: ["A scalar", "A vector", "A matrix", "A tensor"], correctAnswer: 1 },
  { id: 2, question: "Divergence of a vector field measures:", options: ["Rotation", "Expansion/compression", "Direction", "Magnitude"], correctAnswer: 1 },
  { id: 3, question: "Curl of a gradient is always:", options: ["1", "Infinity", "Zero", "Undefined"], correctAnswer: 2 },
  { id: 4, question: "∇ × F is called:", options: ["Divergence", "Gradient", "Curl", "Laplacian"], correctAnswer: 2 },
  { id: 5, question: "Green's theorem relates:", options: ["Line and surface integrals", "Line and double integrals", "Surface and volume integrals", "Gradient and divergence"], correctAnswer: 1 },
  { id: 6, question: "The Laplacian operator is:", options: ["∇", "∇·", "∇×", "∇²"], correctAnswer: 3 },
  { id: 7, question: "Stokes' theorem converts:", options: ["Line to surface integral", "Surface to volume integral", "Gradient to divergence", "Scalar to vector"], correctAnswer: 0 },
  { id: 8, question: "A conservative vector field has:", options: ["Non-zero curl", "Zero curl", "Zero divergence", "Constant magnitude"], correctAnswer: 1 },
  { id: 9, question: "The divergence theorem is also called:", options: ["Stokes' theorem", "Green's theorem", "Gauss's theorem", "Euler's theorem"], correctAnswer: 2 },
  { id: 10, question: "∇·(∇×F) equals:", options: ["∇²F", "0", "1", "F"], correctAnswer: 1 },
  { id: 11, question: "A solenoidal field has:", options: ["Zero curl", "Zero divergence", "Constant gradient", "No potential"], correctAnswer: 1 },
  { id: 12, question: "The unit normal vector to a surface is:", options: ["Tangent to surface", "Perpendicular to surface", "Parallel to x-axis", "Zero vector"], correctAnswer: 1 },
  { id: 13, question: "Line integral of F·dr measures:", options: ["Area", "Work done", "Flux", "Volume"], correctAnswer: 1 },
  { id: 14, question: "Surface integral of F·dS measures:", options: ["Work", "Flux", "Circulation", "Gradient"], correctAnswer: 1 },
  { id: 15, question: "If F = ∇φ, then F is:", options: ["Solenoidal", "Irrotational", "Rotational", "Undefined"], correctAnswer: 1 },
  { id: 16, question: "The Jacobian is used for:", options: ["Differentiation", "Coordinate transformation", "Integration limits", "Vector addition"], correctAnswer: 1 },
  { id: 17, question: "In cylindrical coordinates, the volume element is:", options: ["dr dθ dz", "r dr dθ dz", "r² dr dθ dz", "dr dθ r dz"], correctAnswer: 1 },
  { id: 18, question: "∇(fg) equals:", options: ["f∇g + g∇f", "f∇g - g∇f", "fg∇", "∇f · ∇g"], correctAnswer: 0 },
  { id: 19, question: "A scalar potential exists when:", options: ["∇×F ≠ 0", "∇×F = 0", "∇·F = 0", "∇·F ≠ 0"], correctAnswer: 1 },
  { id: 20, question: "The directional derivative is:", options: ["∇f", "∇f · û", "|∇f|", "∇²f"], correctAnswer: 1 },
  { id: 21, question: "Helmholtz decomposition theorem states a field can be decomposed into:", options: ["Scalar and vector", "Irrotational and solenoidal parts", "Real and imaginary", "Linear and nonlinear"], correctAnswer: 1 },
  { id: 22, question: "In spherical coordinates, ∇·F involves:", options: ["Only r terms", "r, θ, φ terms", "Only θ terms", "Only φ terms"], correctAnswer: 1 },
  { id: 23, question: "The flux through a closed surface of a solenoidal field is:", options: ["Maximum", "Minimum", "Zero", "Infinity"], correctAnswer: 2 },
  { id: 24, question: "∇ × (∇ × F) equals:", options: ["∇(∇·F) - ∇²F", "∇²F", "0", "∇·F"], correctAnswer: 0 },
  { id: 25, question: "Which is a vector quantity?", options: ["Temperature", "Pressure", "Velocity", "Mass"], correctAnswer: 2 },
  { id: 26, question: "The curl in 2D reduces to:", options: ["A scalar", "A vector", "Zero", "A matrix"], correctAnswer: 0 },
  { id: 27, question: "Path independence implies:", options: ["Non-conservative field", "Conservative field", "Solenoidal field", "Rotational field"], correctAnswer: 1 },
  { id: 28, question: "The gradient points in the direction of:", options: ["Minimum decrease", "Maximum increase", "Zero change", "Random direction"], correctAnswer: 1 },
  { id: 29, question: "Level curves are perpendicular to:", options: ["Tangent vectors", "Gradient vectors", "Normal vectors", "Position vectors"], correctAnswer: 0 },
  { id: 30, question: "∇²φ = 0 is called:", options: ["Poisson's equation", "Laplace's equation", "Helmholtz equation", "Wave equation"], correctAnswer: 1 },
];

const senergyQuestions: MCQQuestion[] = [
  { id: 1, question: "Which is a renewable energy source?", options: ["Coal", "Natural gas", "Solar", "Petroleum"], correctAnswer: 2 },
  { id: 2, question: "What does photovoltaic mean?", options: ["Heat generation", "Light to electricity", "Wind energy", "Water power"], correctAnswer: 1 },
  { id: 3, question: "Which gas is the primary greenhouse gas?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], correctAnswer: 2 },
  { id: 4, question: "What is biomass energy?", options: ["Nuclear energy", "Energy from organic matter", "Geothermal energy", "Tidal energy"], correctAnswer: 1 },
  { id: 5, question: "Wind turbines convert:", options: ["Heat to electricity", "Kinetic energy to electricity", "Chemical to thermal", "Light to heat"], correctAnswer: 1 },
  { id: 6, question: "What is the efficiency of typical solar panels?", options: ["5-10%", "15-22%", "50-60%", "80-90%"], correctAnswer: 1 },
  { id: 7, question: "Hydropower uses:", options: ["Wind", "Sunlight", "Flowing water", "Geothermal heat"], correctAnswer: 2 },
  { id: 8, question: "What is carbon footprint?", options: ["Foot size", "Total CO2 emissions", "Carbon tax", "Fuel efficiency"], correctAnswer: 1 },
  { id: 9, question: "Which country leads in solar energy?", options: ["USA", "China", "Germany", "India"], correctAnswer: 1 },
  { id: 10, question: "What is geothermal energy?", options: ["Solar energy", "Heat from Earth's interior", "Wind energy", "Tidal energy"], correctAnswer: 1 },
  { id: 11, question: "What is the Paris Agreement about?", options: ["Trade", "Climate change mitigation", "Nuclear weapons", "Space exploration"], correctAnswer: 1 },
  { id: 12, question: "What is energy efficiency?", options: ["Using more energy", "Getting more output per unit energy", "Storing energy", "Generating energy"], correctAnswer: 1 },
  { id: 13, question: "Which is a fossil fuel?", options: ["Solar", "Wind", "Coal", "Hydro"], correctAnswer: 2 },
  { id: 14, question: "What is a smart grid?", options: ["A metal grid", "Modernized electrical grid with digital tech", "A solar panel array", "A wind farm"], correctAnswer: 1 },
  { id: 15, question: "What does SDG 7 focus on?", options: ["Clean water", "Affordable and clean energy", "Good health", "Quality education"], correctAnswer: 1 },
  { id: 16, question: "What is tidal energy?", options: ["Wind energy", "Energy from ocean tides", "Solar energy", "Nuclear energy"], correctAnswer: 1 },
  { id: 17, question: "What is a fuel cell?", options: ["Battery", "Device converting chemical to electrical energy", "Solar cell", "Nuclear reactor"], correctAnswer: 1 },
  { id: 18, question: "What is the main byproduct of hydrogen fuel cells?", options: ["CO2", "Methane", "Water", "Smoke"], correctAnswer: 2 },
  { id: 19, question: "What is net-zero emissions?", options: ["Zero energy use", "Balancing emissions with removal", "No electricity", "Zero waste"], correctAnswer: 1 },
  { id: 20, question: "Which sector consumes the most energy globally?", options: ["Agriculture", "Industry", "Transport", "Residential"], correctAnswer: 1 },
  { id: 21, question: "What is energy storage?", options: ["Using energy", "Saving energy for later use", "Wasting energy", "Generating energy"], correctAnswer: 1 },
  { id: 22, question: "Lithium-ion batteries are used in:", options: ["Only phones", "EVs and energy storage", "Only laptops", "Only watches"], correctAnswer: 1 },
  { id: 23, question: "What is the greenhouse effect?", options: ["Growing plants", "Trapping heat in atmosphere", "Cooling Earth", "Wind patterns"], correctAnswer: 1 },
  { id: 24, question: "What is LCOE?", options: ["Low Carbon Output Energy", "Levelized Cost of Energy", "Linear Cost of Electricity", "Local Carbon Offset Estimate"], correctAnswer: 1 },
  { id: 25, question: "What is an energy audit?", options: ["Financial audit", "Assessment of energy use", "Power outage", "Grid inspection"], correctAnswer: 1 },
  { id: 26, question: "What is concentrated solar power (CSP)?", options: ["Small solar panels", "Using mirrors to focus sunlight", "Solar batteries", "Solar water heaters"], correctAnswer: 1 },
  { id: 27, question: "Which is a barrier to renewable energy adoption?", options: ["Abundance", "High initial cost", "Low pollution", "Sustainability"], correctAnswer: 1 },
  { id: 28, question: "What is an electric vehicle (EV)?", options: ["Gas-powered car", "Vehicle powered by electricity", "Hybrid plane", "Solar boat"], correctAnswer: 1 },
  { id: 29, question: "What is the role of an inverter in solar systems?", options: ["Store energy", "Convert DC to AC", "Generate solar power", "Track the sun"], correctAnswer: 1 },
  { id: 30, question: "What percentage of global energy is renewable (approx)?", options: ["5%", "15%", "30%", "50%"], correctAnswer: 2 },
];

const entrepreneurshipQuestions: MCQQuestion[] = [
  { id: 1, question: "What is entrepreneurship?", options: ["A job title", "Process of starting a business", "A degree program", "Government policy"], correctAnswer: 1 },
  { id: 2, question: "What is a business plan?", options: ["A budget", "A document outlining business strategy", "A marketing ad", "A legal contract"], correctAnswer: 1 },
  { id: 3, question: "What does MVP stand for?", options: ["Most Valuable Player", "Minimum Viable Product", "Maximum Value Plan", "Market Value Price"], correctAnswer: 1 },
  { id: 4, question: "What is bootstrapping?", options: ["Using venture capital", "Self-funding a startup", "Government grants", "Bank loans"], correctAnswer: 1 },
  { id: 5, question: "What is a startup?", options: ["Any business", "A new business with growth potential", "A franchise", "A government org"], correctAnswer: 1 },
  { id: 6, question: "What is venture capital?", options: ["Personal savings", "Investment from firms for equity", "Bank loan", "Crowdfunding"], correctAnswer: 1 },
  { id: 7, question: "What is a pivot?", options: ["A dance move", "Changing business strategy", "Closing business", "IPO"], correctAnswer: 1 },
  { id: 8, question: "What is market research?", options: ["Selling products", "Gathering info about consumers", "Manufacturing", "Accounting"], correctAnswer: 1 },
  { id: 9, question: "What is a value proposition?", options: ["Product price", "Unique benefit offered to customers", "Company motto", "Marketing slogan"], correctAnswer: 1 },
  { id: 10, question: "What is an elevator pitch?", options: ["Elevator maintenance", "Brief business description", "Sales call", "Investment proposal"], correctAnswer: 1 },
  { id: 11, question: "What is intellectual property?", options: ["Physical assets", "Creations of the mind", "Office space", "Equipment"], correctAnswer: 1 },
  { id: 12, question: "What is a business model canvas?", options: ["A painting", "Visual business planning tool", "Financial statement", "Marketing plan"], correctAnswer: 1 },
  { id: 13, question: "What is scalability?", options: ["Weight measurement", "Ability to grow without proportional cost increase", "Team size", "Office size"], correctAnswer: 1 },
  { id: 14, question: "What is an angel investor?", options: ["A charity", "Individual investing in startups", "A bank", "A government body"], correctAnswer: 1 },
  { id: 15, question: "What is a break-even point?", options: ["Bankruptcy", "When revenue equals costs", "Maximum profit", "Market entry"], correctAnswer: 1 },
  { id: 16, question: "What is crowdfunding?", options: ["Bank financing", "Raising small amounts from many people", "VC funding", "Self-funding"], correctAnswer: 1 },
  { id: 17, question: "What is a franchise?", options: ["A startup", "Licensed business model", "A patent", "A merger"], correctAnswer: 1 },
  { id: 18, question: "What is a SWOT analysis?", options: ["A test", "Strengths, Weaknesses, Opportunities, Threats", "A financial tool", "A coding method"], correctAnswer: 1 },
  { id: 19, question: "What is customer acquisition cost?", options: ["Product cost", "Cost to gain a new customer", "Operational cost", "Tax amount"], correctAnswer: 1 },
  { id: 20, question: "What is a target market?", options: ["All consumers", "Specific group of potential customers", "Competitors", "Suppliers"], correctAnswer: 1 },
  { id: 21, question: "What is lean startup methodology?", options: ["Low budget", "Build-measure-learn cycle", "Hiring fewer people", "Using less tech"], correctAnswer: 1 },
  { id: 22, question: "What is equity?", options: ["Debt", "Ownership share in a company", "Revenue", "Profit margin"], correctAnswer: 1 },
  { id: 23, question: "What is an IPO?", options: ["Internal Process Operation", "Initial Public Offering", "Investment Plan Option", "International Product Order"], correctAnswer: 1 },
  { id: 24, question: "What is disruption in business?", options: ["Breaking things", "Innovation that displaces existing markets", "Market crash", "Company shutdown"], correctAnswer: 1 },
  { id: 25, question: "What is a pitch deck?", options: ["A card game", "Presentation for investors", "A business card", "A product demo"], correctAnswer: 1 },
  { id: 26, question: "What is burn rate?", options: ["Fire safety", "Rate at which startup spends money", "Production speed", "Sales velocity"], correctAnswer: 1 },
  { id: 27, question: "What is a unicorn startup?", options: ["Any startup", "Startup valued at $1B+", "Failed startup", "Government startup"], correctAnswer: 1 },
  { id: 28, question: "What is product-market fit?", options: ["Product size", "When product satisfies market demand", "Pricing strategy", "Distribution channel"], correctAnswer: 1 },
  { id: 29, question: "What is a co-founder?", options: ["An employee", "A partner who starts a business together", "An investor", "A customer"], correctAnswer: 1 },
  { id: 30, question: "What is social entrepreneurship?", options: ["Social media marketing", "Business solving social problems", "Networking events", "Government programs"], correctAnswer: 1 },
];

export const onlineTests: OnlineTest[] = [
  { id: 1, subject: "Machine Learning", title: "ML Unit Test 1", totalMarks: 30, duration: 30, date: "2026-02-25", status: "available", questions: mlQuestions },
  { id: 2, subject: "Computer Networks", title: "CN Unit Test 1", totalMarks: 30, duration: 30, date: "2026-02-28", status: "available", questions: cnQuestions },
  { id: 3, subject: "Software Engineering", title: "SE Unit Test 1", totalMarks: 30, duration: 30, date: "2026-02-20", status: "available", questions: seQuestions },
  { id: 4, subject: "UI/UX Design", title: "UI/UX Unit Test 1", totalMarks: 30, duration: 30, date: "2026-03-05", status: "available", questions: uiuxQuestions },
  { id: 5, subject: "Vector Calculus", title: "VC Unit Test 1", totalMarks: 30, duration: 30, date: "2026-03-01", status: "available", questions: vcQuestions },
  { id: 6, subject: "Sustainable Energy", title: "SE Unit Test 1", totalMarks: 30, duration: 30, date: "2026-03-03", status: "available", questions: senergyQuestions },
  { id: 7, subject: "Entrepreneurship", title: "Entrepreneurship Unit Test 1", totalMarks: 30, duration: 30, date: "2026-03-07", status: "available", questions: entrepreneurshipQuestions },
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

export const notifications = [
  { id: 1, title: "Mid-Sem Exam Schedule Released", time: "2 hours ago", read: false, type: "exam" as const },
  { id: 2, title: "ML Assignment deadline extended to Feb 20", time: "5 hours ago", read: false, type: "assignment" as const },
  { id: 3, title: "Fee payment reminder - Due Jan 15", time: "1 day ago", read: false, type: "fee" as const },
  { id: 4, title: "HackJGU 2026 registrations open!", time: "2 days ago", read: true, type: "event" as const },
  { id: 5, title: "Attendance below 80% in CN - Warning", time: "3 days ago", read: false, type: "attendance" as const },
  { id: 6, title: "New feedback response received", time: "3 days ago", read: true, type: "feedback" as const },
];
