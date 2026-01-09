"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef, useEffect, useLayoutEffect } from "react";
import {
  Mail, 
  ArrowUpRight,
  Download,
  Code2,
  Layers,
  Zap,
  Search,
  PenTool,
  Rocket,
  MessageSquare,
  Terminal,
  Cpu,
  Globe
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });

// Register GSAP Plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef(null);
  const heroTextRef = useRef(null);
  const labSectionRef = useRef(null);
  const labContainerRef = useRef(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  
  // Mouse tracking for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const section = heroSectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top } = section.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // GSAP Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Text Reveal
      gsap.fromTo(heroTextRef.current, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.5 }
      );

      // Scroll Animations for Standard Sections
      gsap.utils.toArray(".gsap-reveal").forEach((elem: any) => {
        gsap.fromTo(elem,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: elem,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Horizontal Scroll for "The Lab"
      const labSection = labSectionRef.current;
      const labContainer = labContainerRef.current;

      if (labSection && labContainer) {
        // @ts-ignore
        const scrollWidth = labContainer.scrollWidth;
        const windowWidth = window.innerWidth;
        
        gsap.to(labContainer, {
          x: () => -(scrollWidth - windowWidth),
          ease: "none",
          scrollTrigger: {
            trigger: labSection,
            pin: true,
            scrub: 1,
            end: () => "+=" + (scrollWidth - windowWidth),
            invalidateOnRefresh: true,
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-background text-text selection:bg-primary selection:text-white overflow-x-hidden">
      
      {/* --- HERO SECTION (3D + Spotlight) --- */}
      <section 
        ref={heroSectionRef}
        className="relative h-screen flex flex-col justify-center items-center overflow-hidden group"
      >
        {/* 3D Scene Background */}
        <Scene3D />

        {/* Spotlight Gradient */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(162, 89, 255, 0.1),
                transparent 80%
              )
            `,
          }}
        />
        
        <div className="z-10 text-center px-4 relative w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md mx-auto"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-mono text-text-muted uppercase tracking-widest">Open to Work</span>
          </motion.div>

          <div ref={heroTextRef} className="relative">
            <h1 className="text-6xl md:text-9xl font-bold mb-6 tracking-tighter leading-none mix-blend-overlay opacity-30 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none blur-2xl">
              LISA.DEV
            </h1>
            
            <h1 className="text-6xl md:text-9xl font-bold mb-6 tracking-tighter leading-none relative z-20 bg-clip-text text-transparent bg-linear-to-b from-white via-white to-white/40 drop-shadow-2xl">
              LISA<span className="text-primary">.</span>DEV
            </h1>
          </div>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto font-light leading-relaxed mb-12 backdrop-blur-sm rounded-xl p-4"
          >
            Architecte digitale & Développeuse Fullstack.
            <br/> Je fusionne <span className="text-white font-medium">Code</span> et <span className="text-white font-medium">Créativité</span>.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <a href="#projects" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Explorer mon travail <ArrowUpRight size={20} />
            </a>
            <a href="/cv.pdf" className="px-8 py-4 glass-panel rounded-full hover:bg-white/10 transition-all hover:scale-105 flex items-center gap-2 border border-white/20">
              CV & Resume <Download size={18} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- INFINITE MARQUEE --- */}
      <div className="py-8 border-y border-white/5 bg-black/50 backdrop-blur-md overflow-hidden flex relative z-20">
        <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-16 items-center text-xl font-bold text-white/30 uppercase tracking-widest font-mono">
              <span className="text-primary">Next.js 16</span>
              <span></span>
              <span className="text-secondary">React Three Fiber</span>
              <span></span>
              <span>TypeScript</span>
              <span></span>
              <span className="text-accent">GSAP</span>
              <span></span>
              <span>Node.js</span>
              <span></span>
              <span>Docker</span>
              <span></span>
            </div>
          ))}
        </div>
      </div>

      {/* --- PHILOSOPHY SECTION --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="gsap-reveal">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Au-delà du code, <br/>
              <span className="text-gradient">une vision produit.</span>
            </h2>
            <div className="space-y-8">
              <PhilosophyItem 
                icon={<Zap className="text-yellow-400" />}
                title="Performance First"
                desc="Chaque milliseconde compte. J'optimise le Core Web Vitals et le rendu serveur pour une expérience instantanée."
              />
              <PhilosophyItem 
                icon={<Layers className="text-blue-400" />}
                title="Architecture Scalable"
                desc="Code modulaire, typage strict et tests automatisés. Je construis des bases solides pour la croissance future."
              />
              <PhilosophyItem 
                icon={<Code2 className="text-pink-400" />}
                title="Clean Code"
                desc="Un code lisible est un code maintenable. Je suis les principes SOLID et les meilleures pratiques de l'industrie."
              />
            </div>
          </div>
          <div className="gsap-reveal relative h-125 glass-panel rounded-3xl p-8 overflow-hidden group border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-secondary/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 font-mono text-sm text-blue-300/80 leading-relaxed h-full overflow-y-auto custom-scrollbar">
              {`// My approach to software engineering
class Developer implements Fullstack {
  constructor() {
    this.passion = Infinity;
    this.stack = ["Next.js", "Node", "Cloud"];
  }

  async solveProblem(challenge: Challenge) {
    const analysis = await this.analyze(challenge);
    const architecture = this.design(analysis);
    
    return this.build(architecture, {
      quality: "high",
      performance: "optimized",
      accessibility: true
    });
  }
  
  // Always learning, always improving
  private async continuousImprovement() {
    while(true) {
      await this.learnNewTech();
      await this.refactor();
    }
  }
}`}
            </div>
          </div>
        </div>
      </section>

      {/* --- PROCESSUS SECTION (New) --- */}
      <section className="py-32 px-6 relative z-10 bg-black/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24 gsap-reveal">
            <h2 className="text-4xl md:text-7xl font-bold mb-6">Mon Processus</h2>
            <p className="text-text-muted text-xl max-w-2xl mx-auto">De l'idée au déploiement, une méthodologie rigoureuse pour des résultats d'exception.</p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-primary via-secondary to-accent opacity-30 hidden md:block" />
            
            <div className="space-y-24">
              <ProcessStep 
                number="01" 
                title="Discovery" 
                desc="Analyse approfondie des besoins, définition des objectifs et de la stack technique."
                icon={<Search size={24} />}
                align="left"
              />
              <ProcessStep 
                number="02" 
                title="Design & UX" 
                desc="Création de wireframes et maquettes haute fidélité. Focus sur l'expérience utilisateur."
                icon={<PenTool size={24} />}
                align="right"
              />
              <ProcessStep 
                number="03" 
                title="Development" 
                desc="Code propre, performant et testé. Intégration continue et revues de code régulières."
                icon={<Code2 size={24} />}
                align="left"
              />
              <ProcessStep 
                number="04" 
                title="Launch" 
                desc="Déploiement automatisé, monitoring et optimisation post-lancement."
                icon={<Rocket size={24} />}
                align="right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- STACKED CARDS PROJECTS --- */}
      <section id="projects" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="gsap-reveal text-5xl md:text-8xl font-bold mb-24 text-center">Selected Works</h2>
          
          <div className="space-y-32">
            <StackedCard 
              index={1}
              title="E-Commerce Dashboard"
              category="SaaS B2B"
              description="Refonte complète du back-office d'un e-commerçant majeur. Gestion de 50k+ produits, analytics temps réel et gestion des stocks multi-entrepôts."
              techs={["Next.js 14", "TanStack Query", "Supabase", "Recharts"]}
              color="bg-[#0f0c29]"
              gradient="from-purple-500/20 to-blue-600/20"
            />
            <StackedCard 
              index={2}
              title="NeoBank Mobile App"
              category="Fintech"
              description="Application web progressive (PWA) pour une néobanque. Authentification biométrique, virements instantanés et visualisation des dépenses par IA."
              techs={["React Native", "TypeScript", "Node.js", "Redis"]}
              color="bg-[#000000]"
              gradient="from-emerald-500/20 to-cyan-600/20"
            />
            <StackedCard 
              index={3}
              title="Immersive Portfolio"
              category="Creative Dev"
              description="Site expérimental pour un studio de design. Utilisation intensive de WebGL pour des transitions fluides et des effets de distorsion."
              techs={["Three.js", "R3F", "GSAP", "Blender"]}
              color="bg-[#1a1a1a]"
              gradient="from-orange-500/20 to-red-600/20"
            />
          </div>
        </div>
      </section>

      {/* --- THE LAB (Horizontal Scroll) (New) --- */}
      <section ref={labSectionRef} className="relative h-screen bg-black z-50 overflow-hidden flex flex-col">
        <div className="max-w-7xl mx-auto w-full px-6 pt-32 mb-12 relative z-30">
          <h2 className="text-4xl md:text-6xl font-bold text-white">The Lab</h2>
          <p className="text-text-muted mt-2">Expérimentations & Side Projects</p>
        </div>
        
        <div ref={labContainerRef} className="flex gap-12 px-6 w-fit flex-1 items-center">
          <LabCard 
            title="WebGL Fluid Sim" 
            desc="Simulation de fluides interactive en WebGL natif."
            icon={<Globe />}
            color="bg-blue-900/20"
          />
          <LabCard 
            title="AI Chatbot" 
            desc="Interface de chat minimaliste connectée à OpenAI API."
            icon={<MessageSquare />}
            color="bg-green-900/20"
          />
          <LabCard 
            title="Rust CLI Tool" 
            desc="Outil en ligne de commande pour l'optimisation d'images."
            icon={<Terminal />}
            color="bg-orange-900/20"
          />
          <LabCard 
            title="IoT Dashboard" 
            desc="Monitoring temps réel de capteurs MQTT."
            icon={<Cpu />}
            color="bg-purple-900/20"
          />
          <div className="w-[50vw] flex items-center justify-center text-text-muted text-xl">
            More coming soon...
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS (New Animation) --- */}
      <section className="py-32 px-6 relative z-10 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center gsap-reveal">
            Ce qu'ils disent <span className="text-primary">de moi</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="Lisa a transformé notre vision en réalité. Son expertise technique et sa sensibilité design sont rares."
              author="Thomas D."
              role="CEO, TechStart"
            />
            <TestimonialCard 
              quote="Un code d'une propreté exemplaire. C'est un plaisir de travailler sur une codebase architecturée par Lisa."
              author="Sarah M."
              role="Lead Dev, BigCorp"
            />
            <TestimonialCard 
              quote="Efficace, proactive et créative. Elle a su proposer des solutions innovantes à nos problèmes complexes."
              author="Marc L."
              role="Product Owner, Agency"
            />
          </div>
        </div>
      </section>

      {/* --- CONTACT & FOOTER --- */}
      <footer className="relative py-32 px-6 overflow-hidden z-10">
        <div className="absolute inset-0 bg-linear-to-b` from-transparent to-primary/10 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="gsap-reveal">
            <h2 className="text-6xl md:text-9xl font-bold mb-8 tracking-tighter">
              LET'S TALK
            </h2>
            <p className="text-2xl text-text-muted mb-12 max-w-2xl mx-auto font-light">
              Un projet ambitieux ? Une équipe à renforcer ? <br/>
              Je suis prête à relever le défi.
            </p>
            
            <a 
              href="mailto:lisa@example.com"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              <Mail /> Démarrer une conversation
            </a>
          </div>

          <div className="mt-32 flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 text-text-muted text-sm">
            <div> 2025 Lisa. All rights reserved.</div>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// --- SUBCOMPONENTS ---

function PhilosophyItem({ icon, title, desc }: any) {
  return (
    <div className="flex gap-6 group hover:bg-white/5 p-4 rounded-xl transition-colors">
      <div className="mt-1 p-3 rounded-xl bg-white/5 h-fit border border-white/10 group-hover:border-primary/50 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-text-muted leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function StackedCard({ index, title, category, description, techs, color, gradient }: any) {
  return (
    <div className={`sticky top-32 rounded-3xl border border-white/10 overflow-hidden ${color} shadow-2xl gsap-reveal`}>
      <div className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-30`} />
      
      <div className="relative z-10 p-8 md:p-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 font-mono text-xl bg-white/5 backdrop-blur-sm">
              0{index}
            </span>
            <span className="text-primary tracking-widest uppercase text-sm font-bold">{category}</span>
          </div>
          
          <h3 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{title}</h3>
          <p className="text-lg text-text-muted mb-8 leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-3">
            {techs.map((tech: string) => (
              <span key={tech} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Abstract Visual Representation */}
        <div className="aspect-square rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center relative overflow-hidden group backdrop-blur-sm">
          <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="text-9xl font-bold text-white/5 select-none group-hover:scale-110 transition-transform duration-700 group-hover:text-white/10">
            {title.charAt(0)}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcessStep({ number, title, desc, icon, align }: any) {
  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 gsap-reveal ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>
      <div className={`flex-1 text-center ${align === 'right' ? 'md:text-left' : 'md:text-right'}`}>
        <h3 className="text-3xl font-bold mb-4">{title}</h3>
        <p className="text-text-muted">{desc}</p>
      </div>
      
      <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-black border border-primary/50 shadow-[0_0_20px_rgba(162,89,255,0.3)] text-primary">
        {icon}
        <div className="absolute -top-8 text-sm font-mono text-white/30">{number}</div>
      </div>
      
      <div className="flex-1 hidden md:block" />
    </div>
  );
}

function LabCard({ title, desc, icon, color }: any) {
  return (
    <div className={`w-100 h-125 shrink-0 rounded-3xl border border-white/10 p-8 flex flex-col justify-between group hover:border-white/30 transition-colors ${color} backdrop-blur-sm`}>
      <div className="p-4 bg-white/10 w-fit rounded-xl text-white mb-8">
        {icon}
      </div>
      
      <div>
        <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-text-muted leading-relaxed">{desc}</p>
      </div>
      
      <div className="flex justify-between items-center mt-8 pt-8 border-t border-white/10">
        <span className="font-mono text-xs text-white/50">EXPERIMENTAL</span>
        <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </div>
    </div>
  );
}

function TestimonialCard({ quote, author, role }: any) {
  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group transition-all duration-300 hover:bg-white/10 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(162,89,255,0.15)]"
    >
      <div className="relative z-10">
        <div className="mb-6 text-primary/50 group-hover:text-primary transition-colors">
          <MessageSquare size={32} />
        </div>
        <p className="text-lg text-white/80 italic mb-8 leading-relaxed">"{quote}"</p>
        <div>
          <div className="font-bold text-white">{author}</div>
          <div className="text-sm text-text-muted">{role}</div>
        </div>
      </div>
    </motion.div>
  )
}
