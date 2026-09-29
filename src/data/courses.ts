import { Course } from '../types';

export const COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Full Stack Web Development',
    slug: 'full-stack-web-development',
    shortDescription: 'Master HTML, CSS, JavaScript, Node.js, React, and MongoDB to build production-grade web applications.',
    description: 'Become a complete web developer capable of building modern full-stack web applications from scratch. This course covers everything from frontend fundamentals with React to backend APIs with Express and databases.',
    category: 'Web Development',
    level: 'Beginner',
    price: 89.99,
    priceLabel: '$89.99',
    rating: 4.8,
    reviewsCount: 1420,
    students: 12540,
    duration: '42 hours',
    image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=800&auto=format&fit=crop',
    instructor: {
      name: 'Sarah Jenkins',
      role: 'Principal Software Architect',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      bio: '12+ years of experience building modern web architectures at enterprise scale.',
      rating: 4.9,
      students: 45000,
      coursesCount: 8
    },
    modules: [
      {
        id: 'mod-1-1',
        title: 'Module 1 — Web Development Foundations',
        lessons: [
          {
            id: 'les-1-1-1',
            title: '1. Introduction to Web Architecture & Protocols',
            duration: '14 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            completed: false,
            description: 'Understand HTTP request-response cycles, client-server models, and DNS resolution.',
            resources: [
              { title: 'HTTP Methods Cheat Sheet', url: '#', type: 'PDF' },
              { title: 'Web Architecture Diagram', url: '#', type: 'Image' }
            ]
          },
          {
            id: 'les-1-1-2',
            title: '2. HTML5 Semantic Elements & Accessibility',
            duration: '18 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            completed: false,
            description: 'Learn structural HTML markup and ARIA roles for modern accessibility standards.',
            resources: [{ title: 'Accessibility Checklist', url: '#', type: 'PDF' }]
          },
          {
            id: 'les-1-1-3',
            title: '3. CSS Grid & Flexbox Layout Mastering',
            duration: '25 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            completed: false,
            description: 'Build complex grid systems and responsive flex layouts across viewport sizes.',
            resources: [{ title: 'Flexbox Layout Sandbox', url: '#', type: 'Code' }]
          }
        ]
      },
      {
        id: 'mod-1-2',
        title: 'Module 2 — Advanced JavaScript & React',
        lessons: [
          {
            id: 'les-1-2-1',
            title: '4. Modern JavaScript (ES6+) & Async Programming',
            duration: '30 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            completed: false,
            description: 'Promises, Async/Await, closures, destructuring, and ES modules.',
            resources: [{ title: 'JS Async Code Samples', url: '#', type: 'Code' }]
          },
          {
            id: 'les-1-2-2',
            title: '5. Building Dynamic Frontend Interfaces with React',
            duration: '35 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            completed: false,
            description: 'State management, custom hooks, and virtual DOM rendering optimization.',
            resources: [{ title: 'React Hooks Handbook', url: '#', type: 'PDF' }]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-1',
      title: 'Full Stack Web Development Knowledge Check',
      questions: [
        {
          id: 'q1-1',
          question: 'Which HTTP header is used to control client browser caching?',
          options: ['A. Authorization', 'B. Cache-Control', 'C. Content-Type', 'D. User-Agent'],
          correctAnswer: 1
        },
        {
          id: 'q1-2',
          question: 'In CSS, what is the default value of the `position` property?',
          options: ['A. absolute', 'B. relative', 'C. static', 'D. fixed'],
          correctAnswer: 2
        },
        {
          id: 'q1-3',
          question: 'What keyword is used in JavaScript to handle promises synchronously within an async function?',
          options: ['A. await', 'B. yield', 'C. defer', 'D. sync'],
          correctAnswer: 0
        },
        {
          id: 'q1-4',
          question: 'Which Hook in React is designed specifically for side-effect handling?',
          options: ['A. useState', 'B. useReducer', 'C. useEffect', 'D. useMemo'],
          correctAnswer: 2
        },
        {
          id: 'q1-5',
          question: 'What is the primary role of Node.js in web applications?',
          options: ['A. Browser CSS processing', 'B. Server-side JavaScript execution environment', 'C. Database query language', 'D. Video streaming encoder'],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 'course-2',
    title: 'React & Next.js',
    slug: 'react-nextjs-mastery',
    shortDescription: 'Build server-rendered, supercharged web applications using Next.js 14 App Router and React Server Components.',
    description: 'Learn modern React patterns alongside Next.js features like Server Components, Server Actions, Dynamic Routing, and API endpoints.',
    category: 'Web Development',
    level: 'Intermediate',
    price: 79.99,
    priceLabel: '$79.99',
    rating: 4.9,
    reviewsCount: 980,
    students: 8430,
    duration: '36 hours',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
    instructor: {
      name: 'David Miller',
      role: 'Frontend Lead @ TechCorp',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
      bio: 'Open source contributor and specialist in React performance optimization.',
      rating: 4.9,
      students: 28000,
      coursesCount: 5
    },
    modules: [
      {
        id: 'mod-2-1',
        title: 'Module 1 — Next.js App Router Core',
        lessons: [
          {
            id: 'les-2-1-1',
            title: '1. App Router Directory Structure & Server Components',
            duration: '22 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyplays.mp4',
            completed: false,
            description: 'Understand client vs server component boundaries in Next.js.',
            resources: [{ title: 'App Router Architecture Guide', url: '#', type: 'PDF' }]
          },
          {
            id: 'les-2-1-2',
            title: '2. Dynamic Routes & Layout Hierarchy',
            duration: '28 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
            completed: false,
            description: 'Master nested layouts, template files, and param destructuring.',
            resources: [{ title: 'Routing Patterns Cheat Sheet', url: '#', type: 'PDF' }]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-2',
      title: 'React & Next.js Knowledge Check',
      questions: [
        {
          id: 'q2-1',
          question: 'What is the default rendering mode of components inside the Next.js `app` directory?',
          options: ['A. Client Component', 'B. Server Component', 'C. Static HTML', 'D. Hydrated Canvas'],
          correctAnswer: 1
        },
        {
          id: 'q2-2',
          question: 'Which directive marks a file as a React Client Component in Next.js?',
          options: ['A. "use client"', 'B. "use frontend"', 'C. "use browser"', 'D. "use react"'],
          correctAnswer: 0
        },
        {
          id: 'q2-3',
          question: 'How do you define a dynamic route segment in Next.js App Router?',
          options: ['A. :id/page.tsx', 'B. [id]/page.tsx', 'C. (id)/page.tsx', 'D. _id/page.tsx'],
          correctAnswer: 1
        },
        {
          id: 'q2-4',
          question: 'Which Next.js component is recommended for optimized image loading?',
          options: ['A. <Img>', 'B. <Picture>', 'C. <Image>', 'D. <Media>'],
          correctAnswer: 2
        },
        {
          id: 'q2-5',
          question: 'What hook is used to access search parameters in Next.js App Router?',
          options: ['A. useQuery', 'B. useSearchParams', 'C. useLocation', 'D. useParamsQuery'],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 'course-3',
    title: 'Python Programming',
    slug: 'python-programming',
    shortDescription: 'From beginner to advanced Python developer. OOP, data structures, scripting, and automation.',
    description: 'Master Python syntax, functional paradigms, object-oriented design, file handling, and automated scripting.',
    category: 'Programming',
    level: 'Beginner',
    price: 0,
    priceLabel: 'Free',
    rating: 4.7,
    reviewsCount: 3100,
    students: 24100,
    duration: '28 hours',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    instructor: {
      name: 'Alex Rivera',
      role: 'Senior Automation Engineer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      bio: 'Python automation expert with experience in financial systems.',
      rating: 4.8,
      students: 52000,
      coursesCount: 6
    },
    modules: [
      {
        id: 'mod-3-1',
        title: 'Module 1 — Python Basics & Data Structures',
        lessons: [
          {
            id: 'les-3-1-1',
            title: '1. Variables, Control Flow & Functions',
            duration: '20 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
            completed: false,
            description: 'Core syntax, conditionals, loops, and reusable function definitions.',
            resources: [{ title: 'Python Syntax Cheatsheet', url: '#', type: 'PDF' }]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-3',
      title: 'Python Essentials Quiz',
      questions: [
        {
          id: 'q3-1',
          question: 'Which data type in Python is immutable?',
          options: ['A. List', 'B. Dictionary', 'C. Tuple', 'D. Set'],
          correctAnswer: 2
        },
        {
          id: 'q3-2',
          question: 'What is the output of `len([1, [2, 3], 4])` in Python?',
          options: ['A. 4', 'B. 3', 'C. 2', 'D. Error'],
          correctAnswer: 1
        },
        {
          id: 'q3-3',
          question: 'Which keyword is used to handle exceptions in Python?',
          options: ['A. catch', 'B. except', 'C. throw', 'D. handle'],
          correctAnswer: 1
        },
        {
          id: 'q3-4',
          question: 'How do you define a generator function in Python?',
          options: ['A. return', 'B. async', 'C. yield', 'D. generate'],
          correctAnswer: 2
        },
        {
          id: 'q3-5',
          question: 'What operator is used for floor division in Python?',
          options: ['A. /', 'B. //', 'C. %', 'D. **'],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 'course-4',
    title: 'Data Structures & Algorithms',
    slug: 'dsa-mastery',
    shortDescription: 'Ace coding interviews. Learn Big O, trees, graphs, dynamic programming, and sorting algorithms.',
    description: 'In-depth breakdown of essential data structures and algorithm paradigms required for top-tier software engineering roles.',
    category: 'Programming',
    level: 'Advanced',
    price: 99.99,
    priceLabel: '$99.99',
    rating: 4.9,
    reviewsCount: 1850,
    students: 11200,
    duration: '50 hours',
    image: 'https://images.unsplash.com/photo-1516116211223-4c7141467477?q=80&w=800&auto=format&fit=crop',
    instructor: {
      name: 'Dr. Michael Chen',
      role: 'CS Professor & Ex-Google Staff Engineer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
      bio: 'Ph.D. in Computer Science with focus on graph theory and algorithmic optimization.',
      rating: 4.95,
      students: 60000,
      coursesCount: 4
    },
    modules: [
      {
        id: 'mod-4-1',
        title: 'Module 1 — Algorithmic Complexity & Trees',
        lessons: [
          {
            id: 'les-4-1-1',
            title: '1. Big O Analysis & Space-Time Tradeoffs',
            duration: '25 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2012.mp4',
            completed: false,
            description: 'Analyzing growth rates, asymptotic bounds, and space complexity.',
            resources: [{ title: 'Big O Complexity Chart', url: '#', type: 'PDF' }]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-4',
      title: 'DSA Comprehensive Quiz',
      questions: [
        {
          id: 'q4-1',
          question: 'What is the average time complexity of QuickSort?',
          options: ['A. O(n)', 'B. O(n log n)', 'C. O(n²)', 'D. O(log n)'],
          correctAnswer: 1
        },
        {
          id: 'q4-2',
          question: 'Which data structure follows First-In, First-Out (FIFO)?',
          options: ['A. Stack', 'B. Queue', 'C. Binary Tree', 'D. Heap'],
          correctAnswer: 1
        },
        {
          id: 'q4-3',
          question: 'What algorithm is commonly used to find the shortest path in a weighted graph?',
          options: ['A. Prim Algorithm', 'B. Dijkstra Algorithm', 'C. Kruskal Algorithm', 'D. KMP Algorithm'],
          correctAnswer: 1
        },
        {
          id: 'q4-4',
          question: 'In a balanced Binary Search Tree, what is the height of the tree with n nodes?',
          options: ['A. O(n)', 'B. O(log n)', 'C. O(1)', 'D. O(n log n)'],
          correctAnswer: 1
        },
        {
          id: 'q4-5',
          question: 'What data structure is utilized internally in Breadth-First Search (BFS)?',
          options: ['A. Stack', 'B. Priority Queue', 'C. Queue', 'D. Hash Map'],
          correctAnswer: 2
        }
      ]
    }
  },
  {
    id: 'course-5',
    title: 'UI/UX Design',
    slug: 'ui-ux-design-mastery',
    shortDescription: 'Master user research, wireframing, prototyping in Figma, and micro-interactions for modern applications.',
    description: 'Learn the complete product design cycle from user research and wireframing to high-fidelity interactive Figma prototypes.',
    category: 'Design',
    level: 'Beginner',
    price: 69.99,
    priceLabel: '$69.99',
    rating: 4.8,
    reviewsCount: 890,
    students: 7200,
    duration: '26 hours',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop',
    instructor: {
      name: 'Emma Watson',
      role: 'Product Design Director',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      bio: 'Design leader specializing in accessible interface design systems.',
      rating: 4.85,
      students: 31000,
      coursesCount: 3
    },
    modules: [
      {
        id: 'mod-5-1',
        title: 'Module 1 — User Experience Foundations',
        lessons: [
          {
            id: 'les-5-1-1',
            title: '1. Fundamentals of Visual Hierarchy & Typography',
            duration: '22 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            completed: false,
            description: 'Grid systems, typography scaling, color contrast, and component spacing.',
            resources: [{ title: 'Design Tokens Guidelines', url: '#', type: 'PDF' }]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-5',
      title: 'UI/UX Design Principles Quiz',
      questions: [
        {
          id: 'q5-1',
          question: 'What does UX stand for?',
          options: ['A. User Xerography', 'B. User Experience', 'C. Universal X-platform', 'D. Unified Execution'],
          correctAnswer: 1
        },
        {
          id: 'q5-2',
          question: 'Which design law states that the time to acquire a target is a function of distance and size?',
          options: ['A. Hick Law', 'B. Fitts Law', 'C. Miller Law', 'D. Jakob Law'],
          correctAnswer: 1
        },
        {
          id: 'q5-3',
          question: 'What is the recommended minimum contrast ratio for standard body text according to WCAG AA?',
          options: ['A. 2.5:1', 'B. 3:1', 'C. 4.5:1', 'D. 7:1'],
          correctAnswer: 2
        },
        {
          id: 'q5-4',
          question: 'What is a wireframe in the UI/UX design workflow?',
          options: ['A. Final pixel-perfect app screenshot', 'B. Low-fidelity structural layout blueprint', 'C. CSS code stylesheet', 'D. Database diagram'],
          correctAnswer: 1
        },
        {
          id: 'q5-5',
          question: 'In Figma, what feature allows components to resize dynamically based on content?',
          options: ['A. Auto Layout', 'B. Smart Animate', 'C. Constraints', 'D. Variant Grid'],
          correctAnswer: 0
        }
      ]
    }
  },
  {
    id: 'course-6',
    title: 'Machine Learning Fundamentals',
    slug: 'machine-learning-fundamentals',
    shortDescription: 'Supervised and unsupervised learning, regression, classification, Scikit-Learn, and Neural Networks.',
    description: 'A comprehensive entry into Artificial Intelligence and Machine Learning using Python data science stack.',
    category: 'Data & AI',
    level: 'Intermediate',
    price: 94.99,
    priceLabel: '$94.99',
    rating: 4.9,
    reviewsCount: 1650,
    students: 14300,
    duration: '45 hours',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=800&auto=format&fit=crop',
    instructor: {
      name: 'Dr. Robert Vance',
      role: 'AI Scientist @ OpenAI Research Partner',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
      bio: 'Machine learning practitioner focused on computer vision and predictive modelling.',
      rating: 4.9,
      students: 39000,
      coursesCount: 5
    },
    modules: [
      {
        id: 'mod-6-1',
        title: 'Module 1 — Data Science & Linear Models',
        lessons: [
          {
            id: 'les-6-1-1',
            title: '1. Feature Engineering & Data Preprocessing',
            duration: '26 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
            completed: false,
            description: 'Handling missing values, standard scaling, and categorical encoding.',
            resources: [{ title: 'ML Preprocessing Workflow', url: '#', type: 'PDF' }]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-6',
      title: 'Machine Learning Concepts Quiz',
      questions: [
        {
          id: 'q6-1',
          question: 'Which of the following is a supervised machine learning algorithm?',
          options: ['A. K-Means Clustering', 'B. Linear Regression', 'C. Principal Component Analysis', 'D. DBSCAN'],
          correctAnswer: 1
        },
        {
          id: 'q6-2',
          question: 'What metric is commonly used to evaluate classification performance on imbalanced datasets?',
          options: ['A. Mean Squared Error', 'B. F1-Score', 'C. R-Squared', 'D. Cosine Similarity'],
          correctAnswer: 1
        },
        {
          id: 'q6-3',
          question: 'What occurs when a model performs extremely well on training data but poorly on test data?',
          options: ['A. Underfitting', 'B. Overfitting', 'C. Convergence', 'D. Regularization'],
          correctAnswer: 1
        },
        {
          id: 'q6-4',
          question: 'Which mathematical function scales output values to probabilities between 0 and 1?',
          options: ['A. ReLU', 'B. Sigmoid', 'C. Linear', 'D. Step'],
          correctAnswer: 1
        },
        {
          id: 'q6-5',
          question: 'What is the purpose of cross-validation in ML model evaluation?',
          options: ['A. Speeding up CPU processing', 'B. Estimating model generalization performance', 'C. Removing outliers', 'D. Encrypting datasets'],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 'course-7',
    title: 'AI & Prompt Engineering',
    slug: 'ai-prompt-engineering',
    shortDescription: 'Master Large Language Models, RAG pipelines, fine-tuning, and LLM application development.',
    description: 'Learn system prompting, chain-of-thought strategies, LangChain integration, and building autonomous AI agents.',
    category: 'Data & AI',
    level: 'Beginner',
    price: 0,
    priceLabel: 'Free',
    rating: 4.9,
    reviewsCount: 2400,
    students: 19800,
    duration: '20 hours',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    instructor: {
      name: 'Sophia Patel',
      role: 'Generative AI Strategist',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
      bio: 'Leading researcher in natural language processing and agentic workflows.',
      rating: 4.9,
      students: 48000,
      coursesCount: 4
    },
    modules: [
      {
        id: 'mod-7-1',
        title: 'Module 1 — LLM Fundamentals & Prompting',
        lessons: [
          {
            id: 'les-7-1-1',
            title: '1. Few-Shot Prompting & System Persona Architecture',
            duration: '19 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
            completed: false,
            description: 'Designing context-rich prompts for predictable multi-step outputs.',
            resources: [{ title: 'Prompt Engineering Guide', url: '#', type: 'PDF' }]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-7',
      title: 'AI Prompt Engineering Test',
      questions: [
        {
          id: 'q7-1',
          question: 'What does RAG stand for in modern AI application architecture?',
          options: ['A. Rapid Algorithmic Generation', 'B. Retrieval-Augmented Generation', 'C. Recurrent Autonomous Grid', 'D. Random Attribute Generator'],
          correctAnswer: 1
        },
        {
          id: 'q7-2',
          question: 'Which prompting technique encourages LLMs to show intermediate reasoning steps?',
          options: ['A. Zero-shot', 'B. Chain-of-Thought', 'C. One-line prompt', 'D. Negative prompting'],
          correctAnswer: 1
        },
        {
          id: 'q7-3',
          question: 'What parameter controls randomness in LLM output responses?',
          options: ['A. Top_K', 'B. Temperature', 'C. Frequency Penalty', 'D. Context Window'],
          correctAnswer: 1
        },
        {
          id: 'q7-4',
          question: 'What vector database is commonly used to store text embeddings for similarity search?',
          options: ['A. Redis', 'B. Pinecone', 'C. SQLite', 'D. MongoDB'],
          correctAnswer: 1
        },
        {
          id: 'q7-5',
          question: 'What is tokenization in the context of Large Language Models?',
          options: ['A. Generating API secret keys', 'B. Breaking text input into smaller numerical tokens', 'C. Encrypting model weights', 'D. Monetizing AI services'],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 'course-8',
    title: 'Cybersecurity Fundamentals',
    slug: 'cybersecurity-fundamentals',
    shortDescription: 'Network defense, ethical hacking, vulnerability assessment, cryptography, and security compliance.',
    description: 'Protect modern IT infrastructure against cyber threats, ransomware, vector attacks, and data breaches.',
    category: 'Cybersecurity',
    level: 'Beginner',
    price: 74.99,
    priceLabel: '$74.99',
    rating: 4.8,
    reviewsCount: 1120,
    students: 9800,
    duration: '32 hours',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
    instructor: {
      name: 'Marcus Vance',
      role: 'Ethical Hacker & CISSP',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop',
      bio: 'Securing global banking infrastructures and penetration testing practitioner.',
      rating: 4.85,
      students: 22000,
      coursesCount: 3
    },
    modules: [
      {
        id: 'mod-8-1',
        title: 'Module 1 — Network Security & Cryptography',
        lessons: [
          {
            id: 'les-8-1-1',
            title: '1. Firewall Configurations & Packet Inspection',
            duration: '24 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            completed: false,
            description: 'Analyzing Wireshark traces, port scanning, and perimeter protection.',
            resources: [{ title: 'Network Ports Guide', url: '#', type: 'PDF' }]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-8',
      title: 'Cybersecurity Basics Quiz',
      questions: [
        {
          id: 'q8-1',
          question: 'What does the CIA triad stand for in information security?',
          options: ['A. Control, Inspection, Access', 'B. Confidentiality, Integrity, Availability', 'C. Cipher, Identity, Authentication', 'D. Code, Isolation, Audit'],
          correctAnswer: 1
        },
        {
          id: 'q8-2',
          question: 'Which attack involves injecting malicious SQL queries into application inputs?',
          options: ['A. XSS', 'B. CSRF', 'C. SQL Injection', 'D. Man-in-the-Middle'],
          correctAnswer: 2
        },
        {
          id: 'q8-3',
          question: 'What type of encryption uses a public key for encryption and private key for decryption?',
          options: ['A. Symmetric', 'B. Asymmetric', 'C. Hashing', 'D. Obfuscation'],
          correctAnswer: 1
        },
        {
          id: 'q8-4',
          question: 'Which HTTP header helps prevent Cross-Site Scripting (XSS) attacks?',
          options: ['A. Content-Security-Policy', 'B. CORS-Origin', 'C. X-Frame-Options', 'D. Strict-Transport'],
          correctAnswer: 0
        },
        {
          id: 'q8-5',
          question: 'What port is standard for secure HTTPS traffic?',
          options: ['A. 80', 'B. 443', 'C. 22', 'D. 8080'],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 'course-9',
    title: 'Cloud Computing',
    slug: 'cloud-computing-aws-azure',
    shortDescription: 'AWS & Azure cloud architecture, Docker containers, Kubernetes, serverless, and IAM policies.',
    description: 'Design resilient, auto-scaling cloud architectures on Amazon Web Services and Microsoft Azure.',
    category: 'Cloud Computing',
    level: 'Intermediate',
    price: 84.99,
    priceLabel: '$84.99',
    rating: 4.7,
    reviewsCount: 750,
    students: 6500,
    duration: '38 hours',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    instructor: {
      name: 'Jennifer Zhao',
      role: 'AWS Certified Solutions Architect',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      bio: 'Cloud transformation consultant for Fortune 500 companies.',
      rating: 4.8,
      students: 19000,
      coursesCount: 4
    },
    modules: [
      {
        id: 'mod-9-1',
        title: 'Module 1 — Cloud Infrastructure',
        lessons: [
          {
            id: 'les-9-1-1',
            title: '1. AWS VPC & EC2 Deployment Strategies',
            duration: '27 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            completed: false,
            description: 'Subnetting, route tables, internet gateways, and security groups.',
            resources: [{ title: 'AWS VPC Architecture Template', url: '#', type: 'PDF' }]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-9',
      title: 'Cloud Architecture Essentials',
      questions: [
        {
          id: 'q9-1',
          question: 'Which AWS service provides object storage with high durability?',
          options: ['A. EC2', 'B. S3', 'C. RDS', 'D. DynamoDB'],
          correctAnswer: 1
        },
        {
          id: 'q9-2',
          question: 'What is Infrastructure as Code (IaC)?',
          options: ['A. Writing HTML templates', 'B. Managing cloud infrastructure via code files (e.g. Terraform)', 'C. Compiling C++ on AWS', 'D. Physical server assembly'],
          correctAnswer: 1
        },
        {
          id: 'q9-3',
          question: 'Which technology package applications with their dependencies into isolated lightweight units?',
          options: ['A. Docker Containers', 'B. Virtual Machines', 'C. Git Submodules', 'D. NPM packages'],
          correctAnswer: 0
        },
        {
          id: 'q9-4',
          question: 'What is the primary role of Kubernetes in cloud engineering?',
          options: ['A. Database indexing', 'B. Container orchestration and auto-scaling', 'C. Video transcoding', 'D. DNS domain registrar'],
          correctAnswer: 1
        },
        {
          id: 'q9-5',
          question: 'What serverless computing service is provided by AWS?',
          options: ['A. Elastic Beanstalk', 'B. AWS Lambda', 'C. AWS Lightsail', 'D. AWS CloudFront'],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 'course-10',
    title: 'Database Engineering',
    slug: 'database-engineering',
    shortDescription: 'SQL, PostgreSQL, NoSQL indexing, query execution plans, partitioning, and ACID transactions.',
    description: 'Deep dive into relational database engines, indexing algorithms (B-Tree, Hash), transactions, and distributed databases.',
    category: 'Programming',
    level: 'Advanced',
    price: 89.99,
    priceLabel: '$89.99',
    rating: 4.9,
    reviewsCount: 1040,
    students: 8100,
    duration: '40 hours',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop',
    instructor: {
      name: 'Dr. Michael Chen',
      role: 'CS Professor & Ex-Google Staff Engineer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
      bio: 'Database systems designer and transaction processing researcher.',
      rating: 4.95,
      students: 60000,
      coursesCount: 4
    },
    modules: [
      {
        id: 'mod-10-1',
        title: 'Module 1 — Relational Engines & Indexing',
        lessons: [
          {
            id: 'les-10-1-1',
            title: '1. B-Tree Indexes & EXPLAIN ANALYZE Parsing',
            duration: '31 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            completed: false,
            description: 'Optimize slow queries using indexes, scan types, and execution plan metrics.',
            resources: [{ title: 'SQL Tuning Guide', url: '#', type: 'PDF' }]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-10',
      title: 'Database Systems Quiz',
      questions: [
        {
          id: 'q10-1',
          question: 'What does the "A" in ACID stand for regarding database transactions?',
          options: ['A. Availability', 'B. Atomicity', 'C. Authentication', 'D. Asynchrony'],
          correctAnswer: 1
        },
        {
          id: 'q10-2',
          question: 'Which index structure is most widely used for range queries in relational databases?',
          options: ['A. Hash Index', 'B. B-Tree Index', 'C. Bitmap Index', 'D. Inverted Index'],
          correctAnswer: 1
        },
        {
          id: 'q10-3',
          question: 'What isolation level prevents dirty reads, non-repeatable reads, and phantom reads?',
          options: ['A. Read Uncommitted', 'B. Read Committed', 'C. Repeatable Read', 'D. Serializable'],
          correctAnswer: 3
        },
        {
          id: 'q10-4',
          question: 'What is database sharding?',
          options: ['A. Creating database backups', 'B. Horizontal partitioning of data across multiple servers', 'C. Deleting old log files', 'D. Encrypting column values'],
          correctAnswer: 1
        },
        {
          id: 'q10-5',
          question: 'Which JOIN type returns all records from the left table and matched records from the right table?',
          options: ['A. INNER JOIN', 'B. LEFT JOIN', 'C. RIGHT JOIN', 'D. FULL OUTER JOIN'],
          correctAnswer: 1
        }
      ]
    }
  },
  {
    id: 'course-11',
    title: 'Git & GitHub',
    slug: 'git-github-mastery',
    shortDescription: 'Master version control, rebase, cherry-pick, branch strategies, and CI/CD automation.',
    description: 'Learn professional Git workflows, resolving merge conflicts, git rebase, GitHub Actions, and code review etiquette.',
    category: 'Programming',
    level: 'Beginner',
    price: 0,
    priceLabel: 'Free',
    rating: 4.8,
    reviewsCount: 2900,
    students: 28500,
    duration: '16 hours',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=800&auto=format&fit=crop',
    instructor: {
      name: 'Alex Rivera',
      role: 'Senior Automation Engineer',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
      bio: 'Git maintainer and DevOps automation specialist.',
      rating: 4.8,
      students: 52000,
      coursesCount: 6
    },
    modules: [
      {
        id: 'mod-11-1',
        title: 'Module 1 — Git Internals & Branching',
        lessons: [
          {
            id: 'les-11-1-1',
            title: '1. Git Objects, Commits, and Branch Pointer Mechanics',
            duration: '16 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            completed: false,
            description: 'Understand blobs, trees, commit objects, and HEAD reference pointer movements.',
            resources: [{ title: 'Git Visual Cheatsheet', url: '#', type: 'PDF' }]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-11',
      title: 'Git & GitHub Mastery Quiz',
      questions: [
        {
          id: 'q11-1',
          question: 'Which Git command applies the changes introduced by some existing commits onto a new base?',
          options: ['A. git merge', 'B. git rebase', 'C. git reset', 'D. git checkout'],
          correctAnswer: 1
        },
        {
          id: 'q11-2',
          question: 'What command copies a specific commit from one branch into your current branch?',
          options: ['A. git cherry-pick', 'B. git clone', 'C. git push', 'D. git fetch'],
          correctAnswer: 0
        },
        {
          id: 'q11-3',
          question: 'Where are local Git configuration settings stored by default in a repository?',
          options: ['A. .git/config', 'B. package.json', 'C. .gitignore', 'D. src/git.json'],
          correctAnswer: 0
        },
        {
          id: 'q11-4',
          question: 'What file specifies intentionally untracked files that Git should ignore?',
          options: ['A. .gitkeep', 'B. .gitignore', 'C. .gitmodules', 'D. .gitattributes'],
          correctAnswer: 1
        },
        {
          id: 'q11-5',
          question: 'What command discards changes in the working directory to reset to the last committed state?',
          options: ['A. git restore .', 'B. git add .', 'C. git commit --amend', 'D. git status'],
          correctAnswer: 0
        }
      ]
    }
  },
  {
    id: 'course-12',
    title: 'JavaScript Mastery',
    slug: 'javascript-mastery',
    shortDescription: 'Deep dive into V8 engine, event loop, memory leaks, prototypes, and asynchronous execution.',
    description: 'Master JavaScript under the hood. Understand call stack, task queue, microtask queue, prototypes, and memory management.',
    category: 'Web Development',
    level: 'Advanced',
    price: 79.99,
    priceLabel: '$79.99',
    rating: 4.9,
    reviewsCount: 1530,
    students: 13900,
    duration: '34 hours',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=800&auto=format&fit=crop',
    instructor: {
      name: 'Sarah Jenkins',
      role: 'Principal Software Architect',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
      bio: 'Core JS engine enthusiast and web performance consultant.',
      rating: 4.9,
      students: 45000,
      coursesCount: 8
    },
    modules: [
      {
        id: 'mod-12-1',
        title: 'Module 1 — JS Engine Under The Hood',
        lessons: [
          {
            id: 'les-12-1-1',
            title: '1. Event Loop, Microtasks & Macrotasks Explained',
            duration: '28 min',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
            completed: false,
            description: 'Detailed execution order of Promise callbacks vs setTimeout vs requestAnimationFrame.',
            resources: [{ title: 'Event Loop Visualizer', url: '#', type: 'Code' }]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-12',
      title: 'JavaScript Engine & Advanced Concepts Quiz',
      questions: [
        {
          id: 'q12-1',
          question: 'Which queue has higher priority in the JavaScript Event Loop execution order?',
          options: ['A. Macrotask Queue (setTimeout)', 'B. Microtask Queue (Promise.then)', 'C. Render Queue', 'D. Network Input Queue'],
          correctAnswer: 1
        },
        {
          id: 'q12-2',
          question: 'What is a closure in JavaScript?',
          options: ['A. A method that closes a database connection', 'B. A function bundled together with references to its surrounding state', 'C. A private class syntax', 'D. A JSON formatting rule'],
          correctAnswer: 1
        },
        {
          id: 'q12-3',
          question: 'Which statement accurately describes prototypal inheritance in JavaScript?',
          options: ['A. Objects inherit directly from other objects via prototype chain', 'B. Classes are compiled to C++ structs', 'C. Objects cannot share methods', 'D. Inheritance is static and copy-based'],
          correctAnswer: 0
        },
        {
          id: 'q12-4',
          question: 'What primitive value is returned when checking `typeof null` in JavaScript?',
          options: ['A. "null"', 'B. "undefined"', 'C. "object"', 'D. "boolean"'],
          correctAnswer: 2
        },
        {
          id: 'q12-5',
          question: 'What does the `WeakMap` object hold references to?',
          options: ['A. Weakly typed numbers', 'B. Weakly referenced objects enabling garbage collection', 'C. String keys only', 'D. Global window properties'],
          correctAnswer: 1
        }
      ]
    }
  }
];
