const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: [
                "'self'", 
                "'unsafe-inline'",
                "https://fonts.googleapis.com",
                "https://cdnjs.cloudflare.com"
            ],
            fontSrc: [
                "'self'",
                "https://fonts.gstatic.com",
                "https://cdnjs.cloudflare.com"
            ],
            scriptSrc: [
                "'self'",
                "'unsafe-inline'",
                "https://unpkg.com"
            ],
            imgSrc: [
                "'self'",
                "data:",
                "https:"
            ],
            connectSrc: ["'self'"]
        }
    }
}));

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 
        ['https://portafolio-mel.vercel.app', 'https://melanie-nieves.vercel.app'] : 
        ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));

// Logging middleware
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ===== STATIC FILES =====
// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: process.env.NODE_ENV === 'production' ? '1y' : '0',
    etag: true,
    lastModified: true
}));

// ===== ROUTES =====
// Main route - serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Contact form endpoint (for future implementation)
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son requeridos'
            });
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Email inválido'
            });
        }
        
        // Log the contact form submission (in production, you'd send email or save to database)
        console.log('Nueva consulta de contacto:', {
            name,
            email,
            subject,
            message,
            timestamp: new Date().toISOString(),
            ip: req.ip || req.connection.remoteAddress
        });
        
        // Simulate processing delay
        setTimeout(() => {
            res.status(200).json({
                success: true,
                message: '¡Mensaje enviado correctamente! Te contactaré pronto.'
            });
        }, 1000);
        
    } catch (error) {
        console.error('Error en formulario de contacto:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
});

// API endpoint to get portfolio data (for future use)
app.get('/api/portfolio', (req, res) => {
    const portfolioData = {
        personal: {
            name: 'Melanie Nieves Chavez',
            title: 'UI/UX Designer & Frontend Developer',
            description: 'Estudiante de Diseño y Desarrollo de Software en TECSUP, con interés en el diseño de interfaces y la experiencia de usuario (UI/UX).',
            location: 'Lima, Perú',
            email: 'melanie.nieves@example.com',
            linkedin: 'https://www.linkedin.com/in/melanie-nieves-ch/',
            github: 'https://github.com/meliniev'
        },
        skills: {
            'UI/UX Design': ['Figma', 'Prototipado', 'User Research'],
            'Frontend Development': ['HTML5', 'CSS3', 'JavaScript'],
            'Tools': ['Git & GitHub', 'VS Code', 'Adobe Creative Suite']
        },
        projects: [
            {
                id: 1,
                title: 'App de Gestión de Tareas',
                category: 'ui-ux',
                description: 'Diseño completo de una aplicación móvil para gestión de tareas con enfoque en la experiencia del usuario.',
                technologies: ['Figma', 'Prototyping', 'User Research'],
                image: '/images/project1.jpg',
                liveUrl: '#',
                githubUrl: '#'
            },
            {
                id: 2,
                title: 'Landing Page Corporativa',
                category: 'frontend',
                description: 'Desarrollo de una landing page moderna y responsiva con animaciones y efectos interactivos.',
                technologies: ['HTML5', 'CSS3', 'JavaScript'],
                image: '/images/project2.jpg',
                liveUrl: '#',
                githubUrl: '#'
            },
            {
                id: 3,
                title: 'E-commerce Platform',
                category: 'ui-ux',
                description: 'Diseño de interfaz y experiencia de usuario para una plataforma de comercio electrónico.',
                technologies: ['Figma', 'Wireframing', 'User Testing'],
                image: '/images/project3.jpg',
                liveUrl: '#',
                githubUrl: '#'
            },
            {
                id: 4,
                title: 'Health Tracker App',
                category: 'mobile',
                description: 'Aplicación móvil para el seguimiento de hábitos saludables con interfaz intuitiva y motivacional.',
                technologies: ['React Native', 'UI Design', 'Mobile UX'],
                image: '/images/project4.jpg',
                liveUrl: '#',
                githubUrl: '#'
            }
        ]
    };
    
    res.json(portfolioData);
});

// Sitemap endpoint
app.get('/sitemap.xml', (req, res) => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${req.protocol}://${req.get('Host')}/</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>1.0</priority>
        </url>
    </urlset>`;
    
    res.set('Content-Type', 'application/xml');
    res.send(sitemap);
});

// Robots.txt endpoint
app.get('/robots.txt', (req, res) => {
    const robots = `User-agent: *
Allow: /

Sitemap: ${req.protocol}://${req.get('Host')}/sitemap.xml`;
    
    res.set('Content-Type', 'text/plain');
    res.send(robots);
});

// ===== ERROR HANDLING =====
// Catch all handler - serve index.html for any unmatched routes
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error stack:', err.stack);
    
    if (process.env.NODE_ENV === 'production') {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    } else {
        res.status(500).json({
            success: false,
            message: err.message,
            stack: err.stack
        });
    }
});

// ===== SERVER STARTUP =====
const server = app.listen(PORT, () => {
    console.log(`
    🚀 Servidor iniciado exitosamente!
    
    📍 Entorno: ${process.env.NODE_ENV || 'development'}
    🌐 Puerto: ${PORT}
    🔗 URL Local: http://localhost:${PORT}
    📧 API Contacto: http://localhost:${PORT}/api/contact
    💻 API Portfolio: http://localhost:${PORT}/api/portfolio
    ❤️  Creado para: Melanie Nieves Chavez
    
    ✨ El portafolio está listo para ser visitado!
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 SIGTERM recibido. Cerrando servidor HTTP...');
    server.close(() => {
        console.log('✅ Servidor HTTP cerrado.');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('🛑 SIGINT recibido. Cerrando servidor HTTP...');
    server.close(() => {
        console.log('✅ Servidor HTTP cerrado.');
        process.exit(0);
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Close server & exit process
    server.close(() => {
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

module.exports = app;