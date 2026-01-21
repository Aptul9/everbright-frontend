export const servicesData = [
  {
    title: 'Sviluppo Software',
    description:
      'Ingegneria del software su misura. Realizziamo piattaforme scalabili, applicazioni enterprise e soluzioni digitali che supportano la crescita del tuo business con codice pulito ed efficiente.',
    image: '/services/software.png',
    align: 'right' as const,
  },
  {
    title: 'Cloud & Infrastruttura',
    description:
      'Architetture cloud-native resilienti e sicure. Migrazione, gestione e ottimizzazione su AWS, Azure e Google Cloud per garantire continuità operativa e performance elevate.',
    image: '/services/cloud.png',
    align: 'left' as const,
  },
  {
    title: 'Cyber Security',
    description:
      'Difesa attiva e proattiva. Proteggiamo i tuoi asset critici con strategie di sicurezza avanzate, penetration testing e monitoraggio continuo contro le minacce informatiche.',
    image: '/services/security.png',
    align: 'right' as const,
  },
  {
    title: 'IT Help Desk & Supporto',
    description:
      'Supporto tecnico proattivo e multicanale. Forniamo assistenza remota e on-site per risolvere ogni criticità IT, garantendo efficienza operativa e minimizzando i tempi di inattività del tuo team.',
    image: '/services/helpdesk.png',
    align: 'left' as const,
  },
]

export const projectsData = [
  {
    title: 'FinTech Hub',
    description: 'Piattaforma di trading ad alta frequenza con analisi predittiva in tempo reale.',
    image: '/projects/project1.png',
    category: 'Finance',
    details: {
      situation: 'Pan-European stock exchange required a high-performance frontend for ML-powered automatic trading application with strict SEO requirements and comprehensive testing to ensure financial compliance and reduce regression time.',
      action: 'Designed and implemented Next.js frontend from scratch with server-side rendering (SSR) for optimal SEO. Built event-driven backend modules and established comprehensive testing strategy using Playwright and Vitest with 85% integration and 90% unit test coverage.',
      result: 'Reduced regression testing time from 5 days to 2 days while maintaining 99.99% uptime for critical trading operations. Achieved perfect SEO scores and enabled real-time trading decisions for institutional clients.',
      techStack: ['Next.js', 'TypeScript', 'Playwright', 'Vitest', 'Event-driven Architecture', 'SSR', 'Financial APIs']
    }
  },
  {
    title: 'HealthConnect',
    description: 'Ecosistema IoT per il monitoraggio remoto dei pazienti e telemedicina avanzata.',
    image: '/projects/project2.png',
    category: 'Healthcare',
    details: {
      situation: 'Major healthcare SaaS provider needed cross-platform mobile applications for real-time patient monitoring and visit scheduling to improve clinical workflow efficiency and reduce missed appointments.',
      action: 'Built native mobile applications for Android and iOS using Apache Cordova for cross-platform deployment. Implemented real-time patient data synchronization, push notifications for appointments, and offline-first architecture for reliable healthcare environments.',
      result: 'Delivered applications serving 10,000+ healthcare professionals with 99.9% uptime. Reduced missed appointments by 35% and improved patient engagement through real-time monitoring capabilities.',
      techStack: ['Apache Cordova', 'JavaScript', 'REST APIs', 'Push Notifications', 'SQLite', 'Healthcare APIs']
    }
  },
  {
    title: 'SafeGrid',
    description: "Sistema di monitoraggio della sicurezza per infrastrutture energetiche critiche.",
    image: '/projects/project3.png',
    category: 'Security',
    details: {
      situation: 'Critical infrastructure provider required a robust surveillance and monitoring system for distributed energy grids to prevent unauthorized access and detect anomalies in real-time.',
      action: 'Developed a distributed sensor network integration with AI-powered video analytics. Implemented end-to-end encrypted communication channels and a centralized command dashboard with 3D visualization.',
      result: 'Zero security breaches reported since implementation. Reduced emergency response time by 50% through automated alerting and improved anomaly detection accuracy by 40%.',
      techStack: ['Python', 'TensorFlow', 'MQTT', 'React', 'Three.js', 'PostgreSQL', 'AES-256 Encryption']
    }
  },
  {
    title: 'SmartLogistics',
    description: 'Ottimizzazione della catena di approvvigionamento tramite intelligenza artificiale.',
    image: '/projects/project4.png',
    category: 'Logistics',
    details: {
      situation: 'Global logistics firm struggled with inefficient route planning and unpredictable inventory levels, leading to high operational costs and delayed deliveries.',
      action: 'Engineered an AI-driven optimization engine using genetic algorithms and machine learning. Integrated real-time GPS tracking and historical weather data to predict traffic and adjust routes dynamically.',
      result: 'Reduced fuel consumption by 22% and increased on-time delivery rate to 98.5%. Saved an estimated $2.4M in annual operational costs through warehouse automation.',
      techStack: ['Node.js', 'Go', 'Redis', 'Docker', 'Kubernetes', 'Kibana', 'Prophet Forecasting']
    }
  },
]
