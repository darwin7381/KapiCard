import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Palette, Type, Layout, MousePointer, Box, ArrowRight, Check, X, AlertCircle, Info, Copy, CheckCircle2, Zap } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import GlassCard from '../components/ui/GlassCard';
import SEO from '../components/SEO';

const Section = ({ title, id, children }) => (
    <section id={id} className="mb-16 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-8 pb-2 border-b border-border">{title}</h2>
        {children}
    </section>
);

const ComponentBlock = ({ title, description, children, code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mb-8 border border-border rounded-xl overflow-hidden bg-surface">
            <div className="p-6 border-b border-border">
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-text-muted mb-6">{description}</p>
                <div className="p-8 bg-background/50 rounded-lg border border-border/50 flex items-center justify-center gap-4 flex-wrap">
                    {children}
                </div>
            </div>
            <div className="bg-slate-900 p-4 relative group">
                <button
                    onClick={handleCopy}
                    className="absolute top-4 right-4 p-2 rounded-md bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
                <pre className="text-sm text-slate-300 overflow-x-auto font-mono">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
};

const DesignSystem = () => {
    const [activeSection, setActiveSection] = useState('colors');

    const sections = [
        { id: 'colors', title: 'Colors', icon: Palette },
        { id: 'typography', title: 'Typography', icon: Type },
        { id: 'buttons', title: 'Buttons', icon: MousePointer },
        { id: 'badges', title: 'Badges', icon: Box },
        { id: 'cards', title: 'Cards', icon: Layout },
        { id: 'guidelines', title: 'Guidelines', icon: Info },
    ];

    const scrollToSection = (id) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <SEO title="Design System" description="KapiCard Design System and Component Library" />

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar Navigation */}
                <aside className="lg:w-64 flex-shrink-0 hidden lg:block">
                    <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-text-main mb-2">Design System</h1>
                            <p className="text-text-muted text-sm">v1.0.0</p>
                        </div>
                        <nav className="space-y-1">
                            {sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeSection === section.id
                                        ? 'bg-primary text-white shadow-md'
                                        : 'text-text-muted hover:bg-surface-hover hover:text-text-main'
                                        }`}
                                >
                                    <section.icon className="w-4 h-4" />
                                    <span className="font-medium">{section.title}</span>
                                </a>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 md:p-12 max-w-5xl mx-auto">

                    {/* Colors */}
                    <Section title="Colors" id="colors">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-3">
                                <h3 className="font-medium text-text-muted">Primary</h3>
                                <div className="h-24 rounded-xl bg-primary shadow-lg flex items-end p-4 text-white font-mono text-sm">bg-primary</div>
                                <div className="grid grid-cols-5 gap-2">
                                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                                        <div key={shade} className={`h-8 rounded bg-violet-${shade}`} title={`violet-${shade}`} />
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h3 className="font-medium text-text-muted">Secondary</h3>
                                <div className="h-24 rounded-xl bg-secondary shadow-lg flex items-end p-4 text-white font-mono text-sm">bg-secondary</div>
                                <div className="grid grid-cols-5 gap-2">
                                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                                        <div key={shade} className={`h-8 rounded bg-pink-${shade}`} title={`pink-${shade}`} />
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h3 className="font-medium text-text-muted">Accent</h3>
                                <div className="h-24 rounded-xl bg-accent shadow-lg flex items-end p-4 text-white font-mono text-sm">bg-accent</div>
                                <div className="grid grid-cols-5 gap-2">
                                    {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                                        <div key={shade} className={`h-8 rounded bg-emerald-${shade}`} title={`emerald-${shade}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* Typography */}
                    <Section title="Typography" id="typography">
                        <div className="space-y-8 border border-border rounded-xl p-8 bg-surface">
                            <div className="space-y-2">
                                <p className="text-xs text-text-muted font-mono">Display / 7xl</p>
                                <h1 className="text-7xl font-bold">Find Your Card</h1>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs text-text-muted font-mono">Heading 1 / 5xl</p>
                                <h1 className="text-5xl font-bold">Heading 1</h1>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs text-text-muted font-mono">Heading 2 / 4xl</p>
                                <h2 className="text-4xl font-bold">Heading 2</h2>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs text-text-muted font-mono">Heading 3 / 3xl</p>
                                <h3 className="text-3xl font-bold">Heading 3</h3>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs text-text-muted font-mono">Body / Base</p>
                                <p className="text-base text-text-main max-w-2xl">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs text-text-muted font-mono">Small / sm</p>
                                <p className="text-sm text-text-muted">
                                    Small text for captions and secondary information.
                                </p>
                            </div>
                        </div>
                    </Section>

                    {/* Buttons */}
                    <Section title="Buttons" id="buttons">
                        <ComponentBlock
                            title="Button Variants"
                            description="Different styles for various actions and hierarchy."
                            code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>`}
                        >
                            <Button variant="primary">Primary</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="ghost">Ghost</Button>
                        </ComponentBlock>

                        <ComponentBlock
                            title="Button Sizes"
                            description="Available sizes for different contexts."
                            code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
                        >
                            <Button size="sm">Small</Button>
                            <Button size="md">Medium</Button>
                            <Button size="lg">Large</Button>
                        </ComponentBlock>
                    </Section>

                    {/* Badges */}
                    <Section title="Badges" id="badges">
                        <ComponentBlock
                            title="Status Badges"
                            description="Used to indicate status, category, or attributes."
                            code={`<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>`}
                        >
                            <Badge variant="primary">Primary</Badge>
                            <Badge variant="secondary">Secondary</Badge>
                            <Badge variant="accent">Accent</Badge>
                            <Badge variant="outline">Outline</Badge>
                            <Badge variant="success">Success</Badge>
                            <Badge variant="warning">Warning</Badge>
                            <Badge variant="danger">Danger</Badge>
                            <Badge variant="info">Info</Badge>
                        </ComponentBlock>
                    </Section>

                    {/* Cards */}
                    <Section title="Cards" id="cards">
                        <ComponentBlock
                            title="Glass Card"
                            description="Premium glassmorphism effect card for featured content."
                            code={`<GlassCard className="p-6">
  <h3 className="font-bold mb-2">Glass Card</h3>
  <p>Content goes here...</p>
</GlassCard>`}
                        >
                            <div className="w-full max-w-md">
                                <GlassCard className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                            <Layout className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">Glass Card</h3>
                                            <p className="text-xs text-text-muted">Premium Component</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-text-main mb-4">
                                        This card features a beautiful backdrop blur effect, subtle border, and hover elevation. Perfect for modern interfaces.
                                    </p>
                                    <Button size="sm" variant="outline" className="w-full">Action</Button>
                                </GlassCard>
                            </div>
                        </ComponentBlock>
                    </Section>

                    {/* Guidelines */}
                    <Section title="Guidelines" id="guidelines">
                        <div className="grid md:grid-cols-2 gap-6">
                            <GlassCard className="p-6">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="text-green-500" /> Do's
                                </h3>
                                <ul className="space-y-2 text-sm text-text-muted">
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Use primary color for main actions</li>
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Maintain consistent spacing</li>
                                    <li className="flex gap-2"><Check className="w-4 h-4 text-green-500 shrink-0" /> Use glassmorphism for featured content</li>
                                </ul>
                            </GlassCard>
                            <GlassCard className="p-6">
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <AlertCircle className="text-red-500" /> Don'ts
                                </h3>
                                <ul className="space-y-2 text-sm text-text-muted">
                                    <li className="flex gap-2"><X className="w-4 h-4 text-red-500 shrink-0" /> Don't mix more than 3 font sizes</li>
                                    <li className="flex gap-2"><X className="w-4 h-4 text-red-500 shrink-0" /> Avoid using pure black (#000000)</li>
                                    <li className="flex gap-2"><X className="w-4 h-4 text-red-500 shrink-0" /> Don't overuse gradients</li>
                                </ul>
                            </GlassCard>
                        </div>
                    </Section>

                </main>
            </div>
        </div>
    );
};

export default DesignSystem;
