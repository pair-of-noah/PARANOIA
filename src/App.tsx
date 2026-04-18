import { useState, useEffect, useCallback } from 'react';
import { 
  Shield, 
  Smartphone, 
  Lock, 
  EyeOff, 
  Trash2, 
  Zap, 
  Menu, 
  X, 
  Github, 
  FileText, 
  ChevronRight,
  Sun,
  Moon,
  ArrowRight,
  Globe,
  Radio,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utilities ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface Doc {
  id: string;
  filename: string;
  title: string;
  excerpt: string;
  fullContent: string;
}

// --- Components ---

const Section = ({ 
  children, 
  className, 
  id 
}: { 
  children: React.ReactNode; 
  className?: string; 
  id?: string;
}) => (
  <section 
    id={id} 
    className={cn("min-h-screen flex flex-col justify-center py-20 px-6 md:px-12", className)}
  >
    <div className="max-w-6xl mx-auto w-full">
      {children}
    </div>
  </section>
);

const Card = ({ 
  children, 
  className,
  delay = 0
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={cn("glass p-8 rounded-none", className)}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/docs')
      .then(res => res.json())
      .then(data => setDocs(data))
      .catch(err => console.error('Failed to load docs:', err));
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-[#e0e0e0] font-sans selection:bg-[#f27d26] selection:text-white selection:bg-opacity-30">
      {/* Background decoration */}
      <div className="background-mesh" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 glass px-6 py-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-mono font-bold text-lg tracking-[4px] text-[#f27d26] flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
            PARANOIA
          </div>

          <div className="hidden md:flex items-center gap-6 text-[11px] font-medium tracking-widest uppercase">
            <button onClick={() => scrollTo('hero')} className="text-[#999] hover:text-white transition-colors">Manifesto</button>
            <button onClick={() => scrollTo('problem')} className="text-[#999] hover:text-white transition-colors">Concept</button>
            <button onClick={() => scrollTo('architecture')} className="text-[#999] hover:text-white transition-colors">Architecture</button>
            <button onClick={() => scrollTo('docs')} className="text-[#999] hover:text-white transition-colors">Knowledge Base</button>
            <a href="https://github.com" target="_blank" className="text-[#999] hover:text-white transition-colors pl-4 border-l border-white/10 uppercase">GitHub</a>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <button className="p-2 text-[#999]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[64px] left-0 right-0 z-40 glass md:hidden overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-6 text-sm font-bold uppercase tracking-widest">
              <button onClick={() => scrollTo('hero')} className="text-left">Home</button>
              <button onClick={() => scrollTo('problem')} className="text-left">Manifesto</button>
              <button onClick={() => scrollTo('architecture')} className="text-left">Architecture</button>
              <button onClick={() => scrollTo('docs')} className="text-left">Docs</button>
              <a href="https://github.com" className="flex items-center gap-2">GitHub <Github className="w-4 h-4" /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        
        {/* Block 1: Hero Section */}
        <Section id="hero" className="px-6 sm:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-4xl md:text-5xl font-light italic leading-tight mb-8">
              We live in an infrastructure owned by others.
            </h1>
            <p className="text-[#999] text-[15px] leading-relaxed mb-10">
              PARANOIA (Pair of Noah) is a manifesto and toolkit for absolute digital sovereignty. 
              We strip your smartphone of autonomy, turning it into a "thin client" to secure your digital life. 
              Your data belongs to you, not the cloud.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => {
                  const doc = docs.find(d => d.id === 'manifesto');
                  if (doc) setSelectedDoc(doc);
                }}
                className="cta-outline"
              >
                Read Full Manifesto
              </button>
            </div>
          </motion.div>
        </Section>

        {/* Block 2: The Fundamental Problem */}
        <Section id="problem" className="border-y border-white/5 bg-white/[0.01]">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-normal italic mb-8">
                Your smartphone is a corporate agent.
              </h2>
              <div className="space-y-6">
                {[
                  { title: "You are the currency", desc: "Apps harvest telemetry, profile you, and sell your attention." },
                  { title: "The illusion of control", desc: "Local data can be physically seized. Passwords fail under physical duress." },
                  { title: "The slavery of interruptions", desc: "Push notifications train your psyche to react to external stimuli." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#f27d26] shrink-0 shadow-[0_0_8px_#f27d26]" />
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wide mb-1 transition-colors">{item.title}</h4>
                      <p className="text-[#999] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Card className="h-64 flex items-center justify-center text-center">
                <blockquote className="italic text-xl font-display text-[#e0e0e0] leading-relaxed">
                  "In the PARANOIA architecture, your smartphone knows the address of a single server. Nothing more."
                </blockquote>
              </Card>
            </div>
          </div>
        </Section>

        {/* Block 3: Concept & Architecture */}
        <Section id="architecture">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-normal italic mb-4">The Digital Spacesuit</h2>
            <p className="text-[#999] uppercase tracking-[0.3em] text-[10px] font-bold">Zero Trust Infrastructure</p>
          </div>

          <div className="glass p-8 md:p-12 rounded-none mb-12 flex flex-col md:flex-row items-center justify-center gap-12 text-center md:text-left border-x-0 sm:border-x">
            <div className="space-y-4">
              <div className="p-5 border border-white/10 glass inline-block mb-2"><Smartphone className="w-8 h-8 text-[#f27d26]" /></div>
              <p className="font-mono font-bold uppercase tracking-[2px] text-[10px] text-[#f27d26]">Thin Client</p>
              <p className="text-[10px] text-[#999] uppercase tracking-wider">Rendering Engine</p>
            </div>
            <ArrowRight className="w-6 h-6 text-white/5 hidden md:block" />
            <div className="space-y-4 relative">
              <div className="p-5 border border-[#f27d26]/30 bg-[#f27d26]/5 inline-block mb-2 relative"><Shield className="w-8 h-8 text-[#f27d26]" /></div>
              <p className="font-mono font-bold uppercase tracking-[2px] text-[10px] text-[#f27d26]">The Ark</p>
              <p className="text-[10px] text-[#999] uppercase tracking-wider">Gateway Protocol</p>
            </div>
            <ArrowRight className="w-6 h-6 text-white/5 hidden md:block" />
            <div className="space-y-4">
              <div className="p-5 border border-white/10 glass inline-block mb-2"><Globe className="w-8 h-8 text-[#f27d26]" /></div>
              <p className="font-mono font-bold uppercase tracking-[2px] text-[10px] text-[#f27d26]">Hostile Internet</p>
              <p className="text-[10px] text-[#999] uppercase tracking-wider">Unsafe Environment</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Cpu />, title: "Data as LVM", desc: "Unified data pool on the server. Client is just a rendering engine." },
              { icon: <Shield />, title: "Death of Push", desc: "Shifting from Push to Pull. Your client stays silent." },
              { icon: <Lock />, title: "Zero Trust", desc: "No keys on device. Generated in RAM and vanish on reboot." },
              { icon: <Radio />, title: "Air Gap", desc: "No open API? The service does not exist in our reality." }
            ].map((item, i) => (
              <Card key={i} delay={i * 0.1} className="hover:border-[#f27d26] transition-colors group">
                <div className="mb-4 text-[#f27d26] opacity-50 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                <h4 className="font-display italic text-lg mb-3">{item.title}</h4>
                <p className="text-sm text-[#999] leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* Block 4: OPSEC & Censorship Resistance */}
        <Section id="opsec" className="bg-[#050505] text-white overflow-hidden relative border-y border-white/5">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(242,125,38,0.05),transparent_50%)]" />
          
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl font-normal italic mb-12 text-center">Engineered for <br /> Extreme Conditions</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: <EyeOff />, title: "Dead Man's Switch", desc: "Losing connection to a wearable instantly wipes session keys from RAM." },
                { icon: <Shield />, title: "Plausible Deniability", desc: "Under duress, the device displays a boring facade with mundane data." },
                { icon: <Trash2 />, title: "Scorched Earth", desc: "Imminent threats trigger a server-side Kill Switch for the data graph." },
                { icon: <Lock />, title: "Asynchronous Transport", desc: "Communication via PGP-encrypted containers disguised as mundane files." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-10 border border-white/5 bg-white/[0.02] hover:border-[#f27d26]/30 transition-colors">
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center text-[#f27d26]">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-wide mb-2">{item.title}</h4>
                    <p className="text-[#999] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Block 5: Junior Ark */}
        <Section id="junior">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2">
                <h2 className="font-display text-4xl md:text-5xl font-normal italic mb-6">Junior Ark</h2>
                <p className="text-[#999] text-lg font-light mb-8 italic leading-relaxed">
                  "We don't hide kids from the internet; we sanitize it."
                </p>
                <div className="space-y-4 text-[15px] opacity-80 mb-10">
                  <p>The Desktop is a workbench for creation.</p>
                  <p>The Smartphone is a strictly secured radio featuring an invisible AI firewall (The Lens).</p>
                </div>
                <button 
                  onClick={() => {
                    const doc = docs.find(d => d.id === 'junior');
                    if (doc) setSelectedDoc(doc);
                  }}
                  className="cta-outline"
                >
                  Discover Junior Ark
                </button>
              </div>
              <div className="md:w-1/2 w-full">
                <Card className="aspect-square flex items-center justify-center relative overflow-hidden bg-white/[0.01]">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 border-[40px] border-dashed border-[#f27d26]/5 rounded-full"
                  />
                  <div className="relative z-10 text-center">
                    <Shield className="w-16 h-16 text-[#f27d26] mx-auto mb-6 opacity-30" />
                    <p className="font-display italic text-2xl mb-1">The Lens</p>
                    <p className="font-mono text-[10px] uppercase tracking-[3px] text-[#f27d26] opacity-60">Active Filter</p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Section>

        {/* Block 6: Knowledge Base */}
        <Section id="docs" className="bg-[#080808]">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-normal italic mb-4">Knowledge Base</h2>
            <p className="text-[#999] max-w-2xl mx-auto uppercase text-[10px] tracking-[4px]">
              Direct Documents from Repository
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {docs.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedDoc(doc)}
                className="group cursor-pointer"
              >
                <div className="h-full glass p-10 rounded-none group-hover:border-[#f27d26] transition-all relative overflow-hidden">
                  <span className="font-mono text-[10px] text-[#f27d26] opacity-70 block mb-4 uppercase tracking-[2px]">
                    {doc.filename}
                  </span>
                  <h3 className="font-display font-normal italic text-2xl mb-4 group-hover:text-white transition-colors">{doc.title}</h3>
                  <p className="text-sm text-[#999] line-clamp-3 leading-relaxed">
                    {doc.excerpt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/10 px-6 sm:px-12 text-[11px] uppercase tracking-[1px] text-[#999]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <span className="inline-block w-1.5 h-1.5 bg-[#f27d26] rounded-full mr-3 shadow-[0_0_8px_#f27d26]" />
                Gateway Status: Secured
              </div>
              <a href="mailto:pairofnoah@gmail.com" className="hover:text-white transition-colors">Contact</a>
              <a href="https://github.com" className="hover:text-white transition-colors">GitHub</a>
            </div>
            <p className="font-serif italic capitalize normal-case text-xs">"The future belongs to those who own their attention."</p>
            <div className="flex items-center gap-2">
              v1.0.4-alpha
            </div>
          </div>
        </footer>
      </main>

      {/* Document Reader Overlay */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none"
          >
            <div className="absolute inset-0 bg-black/90 pointer-events-auto" onClick={() => setSelectedDoc(null)} />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="w-full max-w-4xl h-full glass rounded-none overflow-hidden flex flex-col relative pointer-events-auto border-white/10"
            >
              <div className="px-8 py-8 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] text-[#f27d26] uppercase tracking-[4px]">{selectedDoc.filename || 'DOCUMENT'}</span>
                  <span className="w-1.5 h-1.5 bg-[#f27d26] rounded-full shadow-[0_0_8px_#f27d26]" />
                  <span className="font-display italic text-xl">{selectedDoc.title}</span>
                </div>
                <button 
                  onClick={() => setSelectedDoc(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-[#999] hover:text-white"
                >
                  <X />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-12 md:p-20">
                <div className="markdown-body">
                  <Markdown>{selectedDoc.fullContent}</Markdown>
                </div>
              </div>

              <div className="p-10 border-t border-white/10 flex justify-center bg-white/[0.02]">
                <button 
                  onClick={() => setSelectedDoc(null)}
                  className="cta-outline min-w-[200px]"
                >
                  Close Archive
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
