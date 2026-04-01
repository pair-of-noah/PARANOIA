import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Cpu, 
  Network, 
  Terminal, 
  Database, 
  Lock, 
  Zap, 
  ChevronRight, 
  Github, 
  ExternalLink,
  Layers,
  Server,
  Activity
} from "lucide-react";
import { cn } from "@/src/lib/utils";

// --- Types ---
interface Solution {
  id: string;
  name: string;
  original: string;
  patch: string;
  status: "Ark-Ready" | "In-Progress";
  description: string;
  category: "Core Infrastructure" | "Communication" | "Storage" | "Security";
}

// --- Data ---
const SOLUTIONS: Solution[] = [
  {
    id: "wireguard",
    name: "WireGuard Ark",
    original: "wg-easy",
    patch: "Paranoia Patch: SQLite-less. Keys generated on-the-fly from environment variables via Key Derivation CLI. Zero disk persistence.",
    status: "Ark-Ready",
    description: "Stateless VPN management with automated ephemeral client configuration.",
    category: "Core Infrastructure"
  },
  {
    id: "dashboard",
    name: "Cyber-Dash",
    original: "Homer",
    patch: "Stateless Wrapper: No config.yml on disk. Config is injected via encrypted environment variables at runtime.",
    status: "Ark-Ready",
    description: "A minimalist, ephemeral dashboard for your paranoid infrastructure.",
    category: "Core Infrastructure"
  },
  {
    id: "mail",
    name: "Ghost-Mail",
    original: "Postalserver",
    patch: "Memory-Only: All logs and temporary storage redirected to RAM-disk (tmpfs). Automatic wipe on container exit.",
    status: "In-Progress",
    description: "High-performance mail server with zero-trace logging policy.",
    category: "Communication"
  },
  {
    id: "vault",
    name: "Ark-Vault",
    original: "Bitwarden_RS",
    patch: "Stateless Proxy: Acts as a pass-through to an external encrypted bus. No local database storage.",
    status: "Ark-Ready",
    description: "Password management without the risk of local database compromise.",
    category: "Security"
  }
];

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full z-50 border-b border-neon-green/20 bg-cyber-black/80 backdrop-blur-md">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Shield className="w-6 h-6 text-neon-green" />
        <span className="font-mono font-bold text-xl tracking-tighter text-white glow-green">PARANOIA ARK</span>
      </div>
      <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
        <a href="#manifesto" className="hover:text-neon-green transition-colors">Manifesto</a>
        <a href="#architecture" className="hover:text-neon-green transition-colors">Architecture</a>
        <a href="#catalog" className="hover:text-neon-green transition-colors">Catalog</a>
        <a href="https://github.com/pair-of-noah/PARANOIA" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-neon-green border border-neon-green/30 px-3 py-1 hover:bg-neon-green/10 transition-all">
          <Github className="w-3 h-3" /> GitHub
        </a>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section id="manifesto" className="relative pt-32 pb-20 px-6 overflow-hidden min-h-screen flex flex-col justify-center">
    <div className="cyber-grid absolute inset-0 z-0 opacity-20" />
    <div className="max-w-4xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-block px-3 py-1 border border-neon-green/30 bg-neon-green/5 text-neon-green text-[10px] font-mono uppercase tracking-[0.2em] mb-6">
          System Protocol: ARK-01
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tighter">
          THE ERA OF <span className="text-neon-green glow-green">THIN CLIENTS</span> AND THE <span className="italic">ARK</span>
        </h1>
        <p className="text-xl text-gray-400 font-mono leading-relaxed mb-10 border-l-2 border-neon-green/30 pl-6">
          "Memory is a liability. Databases are targets. We are building the Ark — a stateless, ephemeral infrastructure that exists only in the moment of execution. No trace. No persistence. No compromise."
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="px-8 py-4 bg-neon-green text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-all border-glow-green">
            Deploy the Ark
          </button>
          <button className="px-8 py-4 border border-neon-green/30 text-neon-green font-bold uppercase tracking-widest text-sm hover:bg-neon-green/10 transition-all">
            Read Manifesto
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

const ArchitectureSection = () => {
  const layers = [
    { name: "Network Layer", icon: Network, desc: "Encrypted mesh with zero-trust routing.", color: "text-neon-cyan" },
    { name: "Bus Layer", icon: Layers, desc: "Stateless message bus for ephemeral communication.", color: "text-neon-magenta" },
    { name: "Client Layer", icon: Cpu, desc: "Thin clients with zero disk persistence.", color: "text-neon-green" }
  ];

  return (
    <section id="architecture" className="py-24 px-6 bg-cyber-gray/30 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-4 font-mono uppercase tracking-tighter">System Architecture</h2>
          <div className="h-1 w-20 bg-neon-green" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {layers.map((layer, idx) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="p-8 border border-white/5 bg-cyber-black/50 hover:border-neon-green/30 transition-all group"
            >
              <layer.icon className={cn("w-12 h-12 mb-6 transition-transform group-hover:scale-110", layer.color)} />
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{layer.name}</h3>
              <p className="text-gray-500 font-mono text-sm leading-relaxed">{layer.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-12 border border-neon-green/10 bg-neon-green/[0.02] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-neon-green opacity-30">
            ARK_CORE_V1.0.4
          </div>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-6">THE "PARANOIA PATCH" STANDARD</h3>
              <p className="text-gray-400 font-mono text-sm leading-relaxed mb-6">
                Every component in the Ark is audited and patched to remove "memory". We strip out databases, telemetry, and disk logging. If it can't be ephemeral, it doesn't belong in the Ark.
              </p>
              <ul className="space-y-3">
                {["Zero Persistence", "Memory-Only Execution", "Encrypted Runtime", "Automated Wipe"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-neon-green font-mono text-xs">
                    <Zap className="w-3 h-3" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-64 h-64">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-dashed border-neon-green/20 rounded-full" 
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-4 border border-neon-green/40 rounded-full" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="w-16 h-16 text-neon-green glow-green" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SolutionCard = ({ solution }: { solution: Solution }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="group relative p-6 border border-white/5 bg-cyber-black hover:border-neon-green/40 transition-all flex flex-col h-full"
  >
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-neon-green/5 border border-neon-green/20">
        <Terminal className="w-5 h-5 text-neon-green" />
      </div>
      <div className={cn(
        "px-2 py-1 text-[9px] font-mono uppercase tracking-tighter border",
        solution.status === "Ark-Ready" ? "border-neon-green text-neon-green bg-neon-green/5" : "border-neon-magenta text-neon-magenta bg-neon-magenta/5"
      )}>
        {solution.status}
      </div>
    </div>
    
    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-green transition-colors uppercase tracking-tight">
      {solution.name}
    </h3>
    <div className="text-[10px] font-mono text-gray-500 mb-4 flex items-center gap-2">
      <span className="text-gray-600">Original:</span> {solution.original}
    </div>
    
    <p className="text-gray-400 text-sm mb-6 flex-grow leading-relaxed">
      {solution.description}
    </p>
    
    <div className="p-4 bg-cyber-gray/50 border-l-2 border-neon-green/30 mb-6">
      <p className="text-[11px] font-mono text-neon-green/80 italic leading-snug">
        {solution.patch}
      </p>
    </div>

    <div className="flex items-center justify-between pt-4 border-t border-white/5">
      <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">{solution.category}</span>
      <button className="text-neon-green hover:text-white transition-colors">
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  </motion.div>
);

const CatalogSection = () => {
  const [filter, setFilter] = useState<string>("all");
  const categories = ["all", ...Array.from(new Set(SOLUTIONS.map(s => s.category)))];

  const filtered = filter === "all" ? SOLUTIONS : SOLUTIONS.filter(s => s.category === filter);

  return (
    <section id="catalog" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4 font-mono uppercase tracking-tighter">Solutions Catalog</h2>
            <p className="text-gray-500 font-mono text-sm">Ark-Ready components for your ephemeral stack.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-4 py-1 text-[10px] font-mono uppercase tracking-widest border transition-all",
                  filter === cat ? "bg-neon-green text-black border-neon-green" : "border-white/10 text-gray-500 hover:border-neon-green/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map(solution => (
              <div key={solution.id}>
                <SolutionCard solution={solution} />
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-20 px-6 border-t border-white/5 bg-cyber-black">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
      <div className="col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-6 h-6 text-neon-green" />
          <span className="font-mono font-bold text-xl tracking-tighter text-white">PARANOIA ARK</span>
        </div>
        <p className="text-gray-500 font-mono text-sm max-w-md leading-relaxed">
          A project by <a href="https://github.com/pair-of-noah" className="text-neon-green hover:underline">pair-of-noah</a>. 
          Dedicated to the philosophy of ephemerality and zero-trust infrastructure.
        </p>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Resources</h4>
        <ul className="space-y-4 font-mono text-xs text-gray-500">
          <li><a href="#" className="hover:text-neon-green transition-colors">Documentation</a></li>
          <li><a href="#" className="hover:text-neon-green transition-colors">Security Audit</a></li>
          <li><a href="#" className="hover:text-neon-green transition-colors">Contribution Guide</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">System Status</h4>
        <div className="flex items-center gap-2 text-neon-green font-mono text-[10px]">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          ARK_CORE: OPERATIONAL
        </div>
        <div className="mt-4 text-gray-600 font-mono text-[10px]">
          UPTIME: 99.9999%
          <br />
          NODES: 128_ACTIVE
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-gray-600">
      <span>© 2026 PAIR-OF-NOAH. ALL RIGHTS RESERVED.</span>
      <span className="text-neon-green/30">ENCRYPTED_WITH_AES_256_GCM</span>
    </div>
  </footer>
);

export default function App() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-cyber-black selection:bg-neon-green selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <ArchitectureSection />
        <CatalogSection />
      </main>
      <Footer />
      
      {/* Background noise/grain effect */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
