export interface ProjectFeature {
  title: string;
  description: string;
  category: string;
  iconName: string;
}

export interface TechStackItem {
  name: string;
  role: string;
  category: "Frontend" | "Backend" | "Database & Cloud" | "AI & APIs";
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  type: "itinerary" | "map" | "terminal" | "analytics" | "editor" | "complexity" | "tests" | "dashboard";
  aspect: "wide" | "tall" | "square";
}

export interface ProjectData {
  id: string;
  name: string;
  internalCodeName: string;
  slug: string;
  tagline: string;
  shortDescription: string;
  category: string;
  year: string;
  role: string;
  liveUrl: string;
  githubUrl: string;
  color: string;
  gradient: string;
  accentGlow: string;
  borderColor: string;
  technologies: string[];
  techStackDetailed: TechStackItem[];
  overview: {
    what: string;
    why: string;
    problem: string;
    audience: string;
    differentiator: string;
  };
  metrics: {
    label: string;
    value: string;
    detail: string;
  }[];
  features: ProjectFeature[];
  gallery: GalleryItem[];
  nextProject: {
    slug: string;
    name: string;
    category: string;
  };
  prevProject: {
    slug: string;
    name: string;
    category: string;
  };
}

export const projectsData: ProjectData[] = [
  {
    id: "01",
    name: "AI Planner Specification",
    internalCodeName: "Roamly",
    slug: "ai-planner-specification",
    tagline: "Autonomous multi-day travel synthesis with geocoded route optimization & verified local points of interest.",
    shortDescription: "An intelligent AI-powered travel planning platform that helps users discover destinations, explore famous attractions, and generate personalized travel itineraries.",
    category: "AI Travel Intelligence & Geocoding",
    year: "2026",
    role: "Full Stack Engineer & Cloudflare Architect",
    liveUrl: "https://roamly-travel.vercel.app", // Placeholder centralized URL
    githubUrl: "https://github.com/RahilPatel2/Roamly",
    color: "#f59e0b",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    accentGlow: "rgba(245, 158, 11, 0.25)",
    borderColor: "rgba(245, 158, 11, 0.3)",
    technologies: [
      "React",
      "Next.js 16",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "Google Maps API",
      "Google Places",
      "Cloudflare Workers",
      "NextAuth.js",
      "Razorpay"
    ],
    techStackDetailed: [
      { name: "Next.js 16 (App Router)", role: "React 19 Server Components & Turbopack SSR", category: "Frontend" },
      { name: "Tailwind CSS v4 & Framer Motion", role: "Fluid responsive styling & interactive map animations", category: "Frontend" },
      { name: "Node.js & Serverless Route Handlers", role: "High-throughput itinerary generation engine", category: "Backend" },
      { name: "NextAuth.js v4", role: "JWT sessions with AES-256-GCM 2FA token encryption", category: "Backend" },
      { name: "MongoDB Atlas", role: "Scalable document store for user profiles & trip state", category: "Database & Cloud" },
      { name: "Cloudflare Workers Edge", role: "Zero-latency worldwide edge deployment via OpenNext", category: "Database & Cloud" },
      { name: "Google Places & Geocoding APIs", role: "Verified venue metadata, coordinates, and photo assets", category: "AI & APIs" },
      { name: "OpenStreetMap Nominatim", role: "Fallback geographical resolution for multi-city routes", category: "AI & APIs" },
      { name: "Razorpay Node.js SDK", role: "Cryptographic HMAC checkout for credit & subscription plans", category: "Backend" }
    ],
    overview: {
      what: "AI Planner Specification (Roamly) is a full-stack, edge-deployed travel intelligence system engineered to eliminate travel planning friction. It transforms ambiguous travel prompts into day-by-day, verified itineraries packed with realistic transit times, day-part scheduling, and accurate local budget estimates.",
      why: "Traditional travel planning requires juggling 10+ tabs across mapping apps, blogs, booking engines, and spreadsheets. Travel enthusiasts often build unrealistic schedules with physically impossible transit times or arrive at attractions during closing hours. Roamly was conceived to compute geographically coherent routes automatically.",
      problem: "Most AI trip generators produce generic hallucinated lists of places with zero geographical sanity checks, leading to zig-zagging across cities and wasting hours in traffic. Roamly solves this by validating every point of interest with Google Places and OpenStreetMap APIs to guarantee real locations and feasible routes.",
      audience: "Solo travelers, families, digital nomads, and vacation planners who want bespoke, culturally curated itineraries without spending days researching schedules, maps, and transportation logistics.",
      differentiator: "Unlike static travel blogs or hallucinated LLM text outputs, Roamly utilizes a multi-tier geographical engine that computes actual transit times between morning, afternoon, and evening slots, visualizes paths directly on live Google Maps, and offers credit-based and subscription tiers with multi-device session revocation."
    },
    metrics: [
      { label: "Transit Accuracy", value: "98.4%", detail: "Geographically verified POI routes" },
      { label: "Edge Response", value: "<120ms", detail: "Global Cloudflare Worker execution" },
      { label: "Test Coverage", value: "83+", detail: "Automated Vitest unit & integration tests" },
      { label: "Security", value: "AES-256", detail: "Hardware-grade encrypted 2FA secrets" }
    ],
    features: [
      {
        title: "Automated AI Itinerary Generation",
        description: "Intelligently parses user travel interests, budget tiers, and party sizes to generate day-by-day itineraries with chronological morning, afternoon, and evening segments.",
        category: "AI Engine",
        iconName: "Compass"
      },
      {
        title: "Smart Destination Discovery",
        description: "Multi-tier resolution engine that seamlessly maps single-city weekend getaways or distributes full-country tours across regional hubs (e.g. Tokyo, Kyoto, Osaka).",
        category: "Geocoding",
        iconName: "Globe"
      },
      {
        title: "Google Maps & Places Integration",
        description: "Live synchronized Google Maps interface displaying interactive markers, venue operating hours, ratings, and route polyline visualization.",
        category: "Mapping",
        iconName: "MapPin"
      },
      {
        title: "Route Optimization & Transit Calculation",
        description: "Calculates realistic travel-time estimates between consecutive stops to prevent exhaustion and eliminate backtracking.",
        category: "Routing",
        iconName: "Navigation"
      },
      {
        title: "Budget & Luxury Customization",
        description: "Adapts dining and lodging recommendations based on user budget parameters, spanning street food cultural gems to five-star Michelin experiences.",
        category: "Personalization",
        iconName: "DollarSign"
      },
      {
        title: "Attractions, Dining & Culture",
        description: "Surfaces verified historical landmarks, temples, entertainment hotspots, and local hidden treasures tailored to traveler mood.",
        category: "Discovery",
        iconName: "Sparkles"
      },
      {
        title: "Multi-Device Session & 2FA Security",
        description: "Enterprise-grade security suite with TOTP two-factor authentication, remote device session tracking, and instant session revocation.",
        category: "Security",
        iconName: "ShieldCheck"
      },
      {
        title: "Tiered Credits & Razorpay Checkout",
        description: "Monetized credit balance and subscription tiering with cryptographic HMAC payment verification for frictionless plan upgrades.",
        category: "Billing",
        iconName: "CreditCard"
      }
    ],
    gallery: [
      {
        id: "roamly-itinerary-view",
        title: "Chronological Itinerary Canvas",
        caption: "Day-part scheduling showing morning cultural visits, afternoon dining, and evening viewpoints with live transit intervals.",
        type: "itinerary",
        aspect: "wide"
      },
      {
        id: "roamly-map-sync",
        title: "Synchronized Map Navigation",
        caption: "Interactive Google Maps overlay tracking waypoint coordinates, pin clustering, and optimized travel path polylines.",
        type: "map",
        aspect: "wide"
      },
      {
        id: "roamly-budget-analytics",
        title: "Curated Recommendations & Budget",
        caption: "Smart destination discovery breakdowns showcasing restaurants, shopping venues, and expense distributions.",
        type: "dashboard",
        aspect: "tall"
      }
    ],
    nextProject: {
      slug: "deployx",
      name: "DeployX",
      category: "Developer Cloud Infrastructure"
    },
    prevProject: {
      slug: "code-linux-ai",
      name: "Code Linux AI Platform Builder",
      category: "AI Development Environment"
    }
  },
  {
    id: "02",
    name: "DeployX",
    internalCodeName: "DeployX",
    slug: "deployx",
    tagline: "Next-generation developer PaaS with GitHub OAuth, streaming build pipelines, and automated cloud deployments.",
    shortDescription: "A modern website deployment platform designed to simplify application hosting and deployment workflows. Inspired by modern platforms like Vercel, it aims to provide developers with a streamlined deployment experience.",
    category: "Cloud Hosting & Deployment Infrastructure",
    year: "2026",
    role: "Lead Full Stack & Systems Architect",
    liveUrl: "https://deployx-platform.vercel.app", // Placeholder centralized URL
    githubUrl: "https://github.com/RahilPatel2/DeployX",
    color: "#06b6d4",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    accentGlow: "rgba(6, 182, 212, 0.25)",
    borderColor: "rgba(6, 182, 212, 0.3)",
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "TypeScript",
      "GitHub OAuth",
      "Cloudflare",
      "PostgreSQL",
      "Supabase",
      "Tailwind CSS",
      "Recharts"
    ],
    techStackDetailed: [
      { name: "Next.js 15 (App Router)", role: "High-performance full-stack dashboard & server actions", category: "Frontend" },
      { name: "Tailwind CSS & shadcn/ui", role: "Sleek dark-mode developer UI inspired by modern cloud consoles", category: "Frontend" },
      { name: "Recharts Data Visualization", role: "Interactive analytics line charts for bandwidth & visitor telemetry", category: "Frontend" },
      { name: "Node.js Pipeline Engine", role: "Asynchronous state machine managing build lifecycles", category: "Backend" },
      { name: "GitHub OAuth & Octokit API", role: "Secure developer auth, repo cloning permissions, & branch tracking", category: "Backend" },
      { name: "PostgreSQL via Supabase", role: "Relational persistence for projects, deployment records, & webhooks", category: "Database & Cloud" },
      { name: "Cloudflare Edge Network", role: "Global DNS routing, CDN caching, and edge distribution", category: "Database & Cloud" },
      { name: "WebSocket & Streaming Logs", role: "Real-time terminal log broadcasting during active builds", category: "AI & APIs" }
    ],
    overview: {
      what: "DeployX is a developer-first cloud deployment platform built to simplify the end-to-end journey from git push to a live worldwide production URL. Modeled after premier cloud hosts like Vercel and Railway, DeployX automates framework detection, dependency installation, containerized builds, environment variable propagation, and instant rollbacks.",
      why: "Configuring cloud infrastructure, setting up build agents, managing reverse proxies, and maintaining webhook endpoints is often tedious and error-prone for individual developers and teams. DeployX was created to provide a plug-and-play PaaS where importing a GitHub repo delivers a live preview link in seconds.",
      problem: "Traditional cloud providers present steep learning curves with confusing IAM consoles, security groups, and manual build triggers. DeployX solves this with an intuitive UI that automatically recognizes frameworks (Next.js, React, Vite), configures build settings, and streams live terminal logs.",
      audience: "Full-stack software engineers, indie hackers, frontend developers, and agencies who require rapid, reliable git-triggered deployments without managing server clusters manually.",
      differentiator: "DeployX features a decoupled DeploymentProvider architecture that seamlessly supports mocked local pipelines or containerized cloud runners, complete with zero-downtime instant rollbacks, preview deployments per branch, and automatic commit webhook ingestion."
    },
    metrics: [
      { label: "Deployment Cycle", value: "~30s", detail: "Average git-to-edge build pipeline" },
      { label: "Rollback Speed", value: "Instant", detail: "1-click atomic traffic redirection" },
      { label: "Framework Detection", value: "Auto", detail: "Zero-config Next.js, React & Vite support" },
      { label: "Branch Previews", value: "100%", detail: "Isolated URLs for every git branch" }
    ],
    features: [
      {
        title: "GitHub Repository Integration",
        description: "Seamlessly browse personal and organizational repositories directly from your GitHub account and import projects with one click.",
        category: "Git Ops",
        iconName: "GitBranch"
      },
      {
        title: "GitHub OAuth Authentication",
        description: "Secure, frictionless developer authentication with scoped access to repositories, webhook setup, and branch tracking.",
        category: "Auth",
        iconName: "Lock"
      },
      {
        title: "Automated CI/CD Pipeline",
        description: "State-machine-driven build lifecycle transitioning automatically across QUEUED, CLONING, BUILDING, and READY stages.",
        category: "CI/CD",
        iconName: "Workflow"
      },
      {
        title: "Live Streaming Terminal Logs",
        description: "Watch compiler stdout/stderr outputs stream line-by-line into an interactive dark terminal UI during active deployments.",
        category: "Monitoring",
        iconName: "Terminal"
      },
      {
        title: "Instant One-Click Rollbacks",
        description: "Revert production traffic to any prior healthy deployment instantly if an unforeseen regression reaches the main branch.",
        category: "Reliability",
        iconName: "RotateCcw"
      },
      {
        title: "Project Management Dashboard",
        description: "Centralized developer cockpit to monitor deployment history, inspect build durations, and manage deployment URLs.",
        category: "Console",
        iconName: "LayoutDashboard"
      },
      {
        title: "Environment Variables Manager",
        description: "Encrypted key-value store per project with support for development, preview, and production environment targets.",
        category: "Config",
        iconName: "Key"
      },
      {
        title: "Build Error Reporting & AI Diagnostic",
        description: "Clear stack trace formatting and contextual error diagnostics to help developers resolve build failures immediately.",
        category: "Diagnostics",
        iconName: "AlertTriangle"
      }
    ],
    gallery: [
      {
        id: "deployx-terminal-stream",
        title: "Real-Time Build Terminal",
        caption: "Live build log terminal streaming container compilation, dependency installation, and production asset optimization.",
        type: "terminal",
        aspect: "wide"
      },
      {
        id: "deployx-dashboard-view",
        title: "Projects & Deployments Overview",
        caption: "Clean developer console displaying active branches, commit messages, deployment durations, and production URLs.",
        type: "dashboard",
        aspect: "wide"
      },
      {
        id: "deployx-analytics-view",
        title: "Traffic & Latency Telemetry",
        caption: "Interactive analytics visualizer tracking 30-day request volumes, status codes, and edge cache hit ratios.",
        type: "analytics",
        aspect: "tall"
      }
    ],
    nextProject: {
      slug: "code-linux-ai",
      name: "Code Linux AI Platform Builder",
      category: "AI Development Environment"
    },
    prevProject: {
      slug: "ai-planner-specification",
      name: "AI Planner Specification",
      category: "AI Travel Intelligence"
    }
  },
  {
    id: "03",
    name: "Code Linux AI Platform Builder",
    internalCodeName: "CODELYNX AI",
    slug: "code-linux-ai",
    tagline: "Enterprise cloud coding workspace with isolated multi-language sandboxes, Big-O complexity analysis & AI debugging.",
    shortDescription: "An AI-powered development environment that brings coding, compilation, debugging, and intelligent programming assistance together in one platform.",
    category: "AI Cloud IDE & Algorithmic Analysis",
    year: "2026",
    role: "Lead Full Stack & AI Systems Architect",
    liveUrl: "https://codelynx-ai.vercel.app", // Placeholder centralized URL
    githubUrl: "https://github.com/RahilPatel2/codelynx-ai",
    color: "#a855f7",
    gradient: "from-purple-500/20 via-fuchsia-500/10 to-transparent",
    accentGlow: "rgba(168, 85, 247, 0.25)",
    borderColor: "rgba(168, 85, 247, 0.3)",
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Google Cloud AI",
      "Gemini API",
      "Monaco Editor",
      "Judge0 Sandbox",
      "MongoDB Atlas",
      "Tailwind CSS"
    ],
    techStackDetailed: [
      { name: "Next.js 14 & React 18", role: "Strict TypeScript App Router architecture with streaming AI responses", category: "Frontend" },
      { name: "Monaco Editor (VS Code Engine)", role: "Syntax highlighting, bracket pairs, minimap, and multi-cursor support", category: "Frontend" },
      { name: "Tailwind CSS & Diff Engine", role: "Custom cyberpunk developer UI with side-by-side git diff inspection", category: "Frontend" },
      { name: "Node.js Server Route Handlers", role: "Zod-validated AST parsing and execution orchestration", category: "Backend" },
      { name: "MongoDB Atlas & Mongoose", role: "Multi-file project persistence and execution telemetry store", category: "Database & Cloud" },
      { name: "Judge0 CE Sandboxed Execution", role: "Isolated container compilation with memory/time execution caps", category: "Database & Cloud" },
      { name: "Google Gemini 2.5 AI Engine", role: "Multi-step algorithmic reasoning, bug detection, & test generation", category: "AI & APIs" },
      { name: "Deterministic AST Fallback Engine", role: "Mathematical Big-O classification when offline or rate-limited", category: "AI & APIs" }
    ],
    overview: {
      what: "Code Linux AI Platform Builder (CODELYNX AI) is an enterprise-grade cloud development environment and algorithmic intelligence platform. It merges the full editing fidelity of VS Code (Monaco Editor) with isolated multi-language code execution, AI-powered mistake detection with zero-overwrite diff patching, automated Big-O asymptotic analysis, and adversarial test-suite generation.",
      why: "Writing code in competitive programming, DSA practice, or day-to-day software engineering often leaves developers guessing about runtime bottlenecks or struggling with tricky edge cases. Code Linux AI was designed to act as an elite senior engineer sitting beside the developer—explaining why code failed, demonstrating how to optimize it, and proving correctness with boundary tests.",
      problem: "Standard online compilers only spit out raw error logs or unhelpful timeout messages without explaining root causes. Standalone AI chatbots hallucinate syntax or overwrite code haphazardly. Code Linux AI bridges this gap with sandboxed execution combined with deterministic AST parsing and AI diff verification.",
      audience: "Software engineers, Computer Science students, DSA interview candidates, and technical mentors who want a distraction-free, intelligent coding workspace that analyzes both correctness and asymptotic complexity.",
      differentiator: "Features 10 first-class compiled and interpreted languages, deterministic Big-O asymptotic analysis (time & space), automated adversarial test matrix generation, and a zero-overwrite philosophy where the AI proposes side-by-side diffs that developers manually review and accept."
    },
    metrics: [
      { label: "Languages Supported", value: "10", detail: "Python, C++, JS, TS, Java, Go, Rust, C#, C, SQL" },
      { label: "Complexity Engine", value: "O(1) to O(N!)", detail: "Automated Big-O time & space classification" },
      { label: "AI Model", value: "Gemini 2.5", detail: "Google Cloud AI reasoning engine" },
      { label: "Security Sandbox", value: "Isolated", detail: "Safe sandboxed container execution" }
    ],
    features: [
      {
        title: "Full Monaco Code Editor",
        description: "Integrated VS Code engine supporting syntax highlighting, bracket-pair colorization, line numbers, customizable font sizes, and minimap toggle.",
        category: "Editor",
        iconName: "Code2"
      },
      {
        title: "10 First-Class Languages",
        description: "Run and analyze code in Python 3, C++ (GCC), JavaScript, TypeScript, Java, C, C# (.NET), Go, Rust, and SQL.",
        category: "Runtime",
        iconName: "Cpu"
      },
      {
        title: "AI Coding Assistant & Debugger",
        description: "Contextual debugging engine that detects syntax errors, logical bugs, and edge-case pitfalls with clear root-cause explanations.",
        category: "AI",
        iconName: "Bot"
      },
      {
        title: "Time & Space Complexity Analysis",
        description: "Calculates formal Big-O asymptotic complexity for runtime and auxiliary space, identifying algorithmic bottlenecks and recursion overhead.",
        category: "Algorithms",
        iconName: "TrendingUp"
      },
      {
        title: "Side-by-Side Diff Optimizer",
        description: "Generates optimal refactorings with side-by-side git diff highlighting, allowing developers to review and approve changes with zero risk.",
        category: "Refactoring",
        iconName: "FileCode"
      },
      {
        title: "Automated Test Matrix Generator",
        description: "Synthesizes comprehensive test vectors: normal cases, boundary values, empty inputs, duplicate elements, and adversarial edge cases.",
        category: "Testing",
        iconName: "CheckCircle2"
      },
      {
        title: "Isolated Sandboxed Execution",
        description: "Executes code securely inside isolated containers with strict CPU time and memory caps, preventing server exploits.",
        category: "Sandbox",
        iconName: "Box"
      },
      {
        title: "Developer Telemetry & History",
        description: "Searchable execution history with exit codes, language usage distribution, and project persistence.",
        category: "Dashboard",
        iconName: "History"
      }
    ],
    gallery: [
      {
        id: "codelynx-ide-view",
        title: "Monaco Coding Workspace",
        caption: "Full-featured cloud IDE with multi-language syntax highlighting, line numbering, and instant execution panel.",
        type: "editor",
        aspect: "wide"
      },
      {
        id: "codelynx-complexity-view",
        title: "Big-O Asymptotic Complexity Lab",
        caption: "Automated Big-O time and space complexity analysis with bottleneck detection and algorithmic optimization breakdown.",
        type: "complexity",
        aspect: "wide"
      },
      {
        id: "codelynx-tests-view",
        title: "AI Test Suite & Edge-Case Matrix",
        caption: "Automated test generator running boundary values, negative numbers, and adversarial inputs against live code.",
        type: "tests",
        aspect: "tall"
      }
    ],
    nextProject: {
      slug: "ai-planner-specification",
      name: "AI Planner Specification",
      category: "AI Travel Intelligence"
    },
    prevProject: {
      slug: "deployx",
      name: "DeployX",
      category: "Developer Cloud Infrastructure"
    }
  }
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projectsData.find((p) => p.slug === slug);
}
