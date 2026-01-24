export const servicesData = [
  {
    title: 'Sviluppo Software',
    category: 'Development',
    description: 'Soluzioni software su misura per la crescita del tuo business.',
    image: '/services/software.png',
    align: 'right' as const,
    details: {
      overview: 'Progettiamo e sviluppiamo software custom di alta qualità, perfettamente allineati con i tuoi obiettivi aziendali. Dalle applicazioni web complesse ai sistemi enterprise, il nostro approccio ingegneristico garantisce scalabilità, sicurezza e performance.',
      features: [
        'Sviluppo Full-Stack Custom',
        'Architetture a Microservizi',
        'Integrazione API & Sistemi Legacy',
        'Modernizzazione Applicazioni'
      ],
      benefits: [
        'Automazione dei processi core',
        'Riduzione del debito tecnico',
        'Scalabilità illimitata',
        'UX/UI Design centrato sull\'utente'
      ],
      techStack: ['React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'Kubernetes']
    }
  },
  {
    title: 'Cloud & Infrastruttura',
    category: 'Cloud',
    description: 'Architetture resilienti per la massima continuità operativa.',
    image: '/services/cloud.png',
    align: 'left' as const,
    details: {
      overview: 'Trasformiamo la tua infrastruttura IT con soluzioni cloud-native sicure e performanti. Gestiamo la migrazione e l\'ottimizzazione su ambienti multi-cloud per garantire affidabilità e costi prevedibili.',
      features: [
        'Cloud Migration & Strategy',
        'DevOps & CI/CD Pipelines',
        'Monitoraggio Infrastrutturale 24/7',
        'Serverless Computing'
      ],
      benefits: [
        'Riduzione costi operativi (TCO)',
        'Business Continuity & DR',
        'Deployment rapidi e sicuri',
        'High Availability (99.99%)'
      ],
      techStack: ['AWS', 'Azure', 'Google Cloud', 'Terraform', 'Ansible', 'Prometheus', 'Grafana']
    }
  },
  {
    title: 'Cyber Security',
    category: 'Security',
    description: 'Protezione proattiva per i tuoi asset digitali critici.',
    image: '/services/security.png',
    align: 'right' as const,
    details: {
      overview: 'Difendiamo il tuo perimetro digitale con strategie di sicurezza offensive e difensive. Dal penetration testing alla formazione del personale, costruiamo una cultura della sicurezza che protegge i tuoi dati e la tua reputazione.',
      features: [
        'Vulnerability Assessment & PT',
        'Security Operations Center (SOC)',
        'Compliance GDPR & ISO 27001',
        'Incident Response Plan'
      ],
      benefits: [
        'Protezione dai Ransomware',
        'Conformità normativa garantita',
        'Minimizzazione rischio data breach',
        'Sicurezza proattiva e continua'
      ],
      techStack: ['Kali Linux', 'Burp Suite', 'Splunk', 'CrowdStrike', 'Wireshark', 'Metasploit', 'OWASP']
    }
  },
  {
    title: 'IT Help Desk',
    category: 'Support',
    description: 'Assistenza tecnica rapida per la massima efficienza.',
    image: '/services/helpdesk.png',
    align: 'left' as const,
    details: {
      overview: 'Un unico punto di contatto per tutte le tue esigenze IT. Il nostro team di supporto fornisce assistenza rapida e risolutiva, permettendo al tuo staff di concentrarsi sul business senza interruzioni tecnologiche.',
      features: [
        'Supporto Multicanale H24',
        'Gestione Asset & Inventario',
        'Onboarding & Offboarding Utenti',
        'Manutenzione Preventiva'
      ],
      benefits: [
        'Riduzione tempi di inattività',
        'Aumento produttività dipendenti',
        'Tracciamento ticket in real-time',
        'SLA garantiti e monitorati'
      ],
      techStack: ['Jira Service Desk', 'ServiceNow', 'TeamViewer', 'Slack Integration', 'Microsoft 365', 'Zendesk']
    }
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
