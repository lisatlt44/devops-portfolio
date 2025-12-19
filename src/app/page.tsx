"use client";

import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Code2, 
  Database, 
  Wrench, 
  ArrowRight, 
  Download,
  ExternalLink
} from "lucide-react";

// Animation variants pour réutilisation
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-20">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.span variants={fadeInUp} className="inline-block px-4 py-2 rounded-full bg-white/50 border border-primary/30 text-text font-medium text-sm backdrop-blur-sm">
              👋 Bonjour, je suis Lisa
            </motion.span>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold leading-tight">
              Développeuse <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Fullstack</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-text/80 max-w-2xl mx-auto font-light">
              3 ans d'expérience en alternance. <br className="hidden md:block" />
              Autonome, rigoureuse et prête pour mon premier CDI.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <a href="#contact" className="px-8 py-4 bg-text text-white rounded-full font-semibold hover:bg-text/90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                Me contacter <Mail size={20} />
              </a>
              <a href="/cv.pdf" className="px-8 py-4 bg-primary text-text rounded-full font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                Télécharger mon CV <Download size={20} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stack Technique</h2>
            <p className="text-text/70">Les outils que je maîtrise au quotidien</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frontend */}
            <SkillCard 
              icon={<Code2 size={32} className="text-primary" />}
              title="Frontend"
              skills={["React.js", "Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion"]}
            />
            {/* Backend */}
            <SkillCard 
              icon={<Database size={32} className="text-primary" />}
              title="Backend"
              skills={["Node.js", "NestJS", "PostgreSQL", "Prisma", "API REST / GraphQL"]}
            />
            {/* Tools */}
            <SkillCard 
              icon={<Wrench size={32} className="text-primary" />}
              title="Outils & DevOps"
              skills={["Git / GitHub", "Docker", "CI/CD", "Figma", "Vercel"]}
            />
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Projets Réalisés</h2>
            <p className="text-text/70">Une sélection de mes travaux académiques et professionnels</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard 
              title="E-Commerce Dashboard"
              description="Dashboard administrateur complet avec gestion des stocks en temps réel et analytiques."
              tags={["Next.js", "Supabase", "Recharts"]}
              color="bg-purple-100"
            />
            <ProjectCard 
              title="SaaS Booking App"
              description="Application de réservation de salles de réunion pour entreprises avec système de calendrier."
              tags={["React", "Node.js", "PostgreSQL"]}
              color="bg-blue-100"
            />
            <ProjectCard 
              title="Portfolio Photographe"
              description="Site vitrine immersif pour un photographe freelance avec galerie optimisée."
              tags={["Astro", "Tailwind", "Vercel"]}
              color="bg-pink-100"
            />
            <ProjectCard 
              title="Task Manager API"
              description="API robuste pour une application de gestion de tâches collaborative."
              tags={["NestJS", "Docker", "Swagger"]}
              color="bg-orange-100"
            />
          </div>
        </div>
      </section>

      {/* --- CAREER / TIMELINE SECTION --- */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Mon Parcours
          </motion.h2>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary before:to-transparent">
            <TimelineItem 
              date="2023 - 2025"
              title="Alternance - Développeuse Fullstack"
              company="TechSolutions Inc."
              description="Développement de nouvelles features sur le produit SaaS principal. Migration du legacy code vers Next.js. Mise en place de tests E2E."
            />
            <TimelineItem 
              date="2025"
              title="Master Expert Informatique"
              company="MyDigitalSchool"
              description="Spécialisation Développement Web & Mobile. Major de promotion."
            />
            <TimelineItem 
              date="2022 - 2023"
              title="Alternance - Développeuse Front-end"
              company="WebAgency"
              description="Intégration de maquettes Figma pixel-perfect. Création de sites vitrines pour des clients PME."
            />
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-text text-white rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden"
          >
            {/* Decorative circle */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prête à rejoindre votre équipe ?</h2>
            <p className="text-lg text-gray-300 mb-10">
              Je suis disponible immédiatement pour un entretien. Discutons de vos besoins et de comment je peux y répondre.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href="mailto:lisa@example.com" className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-text font-bold rounded-full hover:bg-white transition-colors">
                <Mail size={20} /> lisa@example.com
              </a>
              <div className="flex justify-center gap-4">
                <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white">
                  <Github size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-text/50 text-sm">
        <p>© {new Date().getFullYear()} Lisa. Designé et codé avec Next.js & Tailwind.</p>
      </footer>
    </main>
  );
}

// --- SUBCOMPONENTS ---

function SkillCard({ icon, title, skills }: { icon: React.ReactNode, title: string, skills: string[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-2xl shadow-sm border border-primary/10 hover:shadow-md transition-all"
    >
      <div className="mb-4 p-3 bg-secondary rounded-xl w-fit">{icon}</div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <ul className="space-y-2">
        {skills.map((skill, i) => (
          <li key={i} className="flex items-center gap-2 text-text/80">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ProjectCard({ title, description, tags, color }: { title: string, description: string, tags: string[], color: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-primary/10"
    >
      <div className={`h-48 ${color} flex items-center justify-center`}>
        {/* Placeholder for project image */}
        <span className="text-text/20 font-display text-4xl font-bold opacity-50 group-hover:scale-110 transition-transform duration-500">
          {title.split(' ')[0]}
        </span>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-text/70 mb-6">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-secondary text-text text-xs font-medium rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-text hover:text-primary transition-colors">
          Voir le projet <ArrowRight size={16} />
        </a>
      </div>
    </motion.div>
  );
}

function TimelineItem({ date, title, company, description }: { date: string, title: string, company: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -translate-x-1/2 md:translate-x-0">
        <div className="w-2.5 h-2.5 bg-white rounded-full" />
      </div>
      
      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-primary/10 ml-auto md:ml-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
          <span className="font-bold text-primary text-sm">{date}</span>
        </div>
        <h3 className="text-lg font-bold text-text">{title}</h3>
        <div className="text-sm font-medium text-text/60 mb-3">{company}</div>
        <p className="text-text/80 text-sm leading-relaxed">
          {description}
        </p>
      "use client";

import { motion } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Code2, 
  Database, 
  Wrench, 
  ArrowRight, 
  Download,
  ExternalLink
} from "lucide-react";

// Animation variants pour réutilisation
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 py-20">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.span variants={fadeInUp} className="inline-block px-4 py-2 rounded-full bg-white/50 border border-primary/30 text-text font-medium text-sm backdrop-blur-sm">
              👋 Bonjour, je suis Lisa
            </motion.span>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold leading-tight">
              Développeuse <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Fullstack</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-text/80 max-w-2xl mx-auto font-light">
              3 ans d'expérience en alternance. <br className="hidden md:block" />
              Autonome, rigoureuse et prête pour mon premier CDI.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <a href="#contact" className="px-8 py-4 bg-text text-white rounded-full font-semibold hover:bg-text/90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                Me contacter <Mail size={20} />
              </a>
              <a href="/cv.pdf" className="px-8 py-4 bg-primary text-text rounded-full font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1">
                Télécharger mon CV <Download size={20} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stack Technique</h2>
            <p className="text-text/70">Les outils que je maîtrise au quotidien</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frontend */}
            <SkillCard 
              icon={<Code2 size={32} className="text-primary" />}
              title="Frontend"
              skills={["React.js", "Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion"]}
            />
            {/* Backend */}
            <SkillCard 
              icon={<Database size={32} className="text-primary" />}
              title="Backend"
              skills={["Node.js", "NestJS", "PostgreSQL", "Prisma", "API REST / GraphQL"]}
            />
            {/* Tools */}
            <SkillCard 
              icon={<Wrench size={32} className="text-primary" />}
              title="Outils & DevOps"
              skills={["Git / GitHub", "Docker", "CI/CD", "Figma", "Vercel"]}
            />
          </div>
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Projets Réalisés</h2>
            <p className="text-text/70">Une sélection de mes travaux académiques et professionnels</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard 
              title="E-Commerce Dashboard"
              description="Dashboard administrateur complet avec gestion des stocks en temps réel et analytiques."
              tags={["Next.js", "Supabase", "Recharts"]}
              color="bg-purple-100"
            />
            <ProjectCard 
              title="SaaS Booking App"
              description="Application de réservation de salles de réunion pour entreprises avec système de calendrier."
              tags={["React", "Node.js", "PostgreSQL"]}
              color="bg-blue-100"
            />
            <ProjectCard 
              title="Portfolio Photographe"
              description="Site vitrine immersif pour un photographe freelance avec galerie optimisée."
              tags={["Astro", "Tailwind", "Vercel"]}
              color="bg-pink-100"
            />
            <ProjectCard 
              title="Task Manager API"
              description="API robuste pour une application de gestion de tâches collaborative."
              tags={["NestJS", "Docker", "Swagger"]}
              color="bg-orange-100"
            />
          </div>
        </div>
      </section>

      {/* --- CAREER / TIMELINE SECTION --- */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Mon Parcours
          </motion.h2>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary before:to-transparent">
            <TimelineItem 
              date="2023 - 2025"
              title="Alternance - Développeuse Fullstack"
              company="TechSolutions Inc."
              description="Développement de nouvelles features sur le produit SaaS principal. Migration du legacy code vers Next.js. Mise en place de tests E2E."
            />
            <TimelineItem 
              date="2025"
              title="Master Expert Informatique"
              company="MyDigitalSchool"
              description="Spécialisation Développement Web & Mobile. Major de promotion."
            />
            <TimelineItem 
              date="2022 - 2023"
              title="Alternance - Développeuse Front-end"
              company="WebAgency"
              description="Intégration de maquettes Figma pixel-perfect. Création de sites vitrines pour des clients PME."
            />
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-text text-white rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden"
          >
            {/* Decorative circle */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prête à rejoindre votre équipe ?</h2>
            <p className="text-lg text-gray-300 mb-10">
              Je suis disponible immédiatement pour un entretien. Discutons de vos besoins et de comment je peux y répondre.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a href="mailto:lisa@example.com" className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-text font-bold rounded-full hover:bg-white transition-colors">
                <Mail size={20} /> lisa@example.com
              </a>
              <div className="flex justify-center gap-4">
                <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white">
                  <Linkedin size={24} />
                </a>
                <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white">
                  <Github size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-text/50 text-sm">
        <p>© {new Date().getFullYear()} Lisa. Designé et codé avec Next.js & Tailwind.</p>
      </footer>
    </main>
  );
}

// --- SUBCOMPONENTS ---

function SkillCard({ icon, title, skills }: { icon: React.ReactNode, title: string, skills: string[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-2xl shadow-sm border border-primary/10 hover:shadow-md transition-all"
    >
      <div className="mb-4 p-3 bg-secondary rounded-xl w-fit">{icon}</div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <ul className="space-y-2">
        {skills.map((skill, i) => (
          <li key={i} className="flex items-center gap-2 text-text/80">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ProjectCard({ title, description, tags, color }: { title: string, description: string, tags: string[], color: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-primary/10"
    >
      <div className={`h-48 ${color} flex items-center justify-center`}>
        {/* Placeholder for project image */}
        <span className="text-text/20 font-display text-4xl font-bold opacity-50 group-hover:scale-110 transition-transform duration-500">
          {title.split(' ')[0]}
        </span>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-text/70 mb-6">{description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-secondary text-text text-xs font-medium rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-text hover:text-primary transition-colors">
          Voir le projet <ArrowRight size={16} />
        </a>
      </div>
    </motion.div>
  );
}

function TimelineItem({ date, title, company, description }: { date: string, title: string, company: string, description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -translate-x-1/2 md:translate-x-0">
        <div className="w-2.5 h-2.5 bg-white rounded-full" />
      </div>
      
      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-primary/10 ml-auto md:ml-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
          <span className="font-bold text-primary text-sm">{date}</span>
        </div>
        <h3 className="text-lg font-bold text-text">{title}</h3>
        <div className="text-sm font-medium text-text/60 mb-3">{company}</div>
        <p className="text-text/80 text-sm leading-relaxed">
          {description}
        </p>
      