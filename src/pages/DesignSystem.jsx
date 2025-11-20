import { motion } from 'framer-motion';
import { Palette, Type, Layout, Zap, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import GlassCard from '../components/ui/GlassCard';
import SEO from '../components/SEO';

const DesignSystem = () => {
    const [copiedColor, setCopiedColor] = useState(null);

    const copyToClipboard = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedColor(id);
        setTimeout(() => setCopiedColor(null), 2000);
    };

    const colors = [
        { name: 'Primary', var: '--color-primary', value: '#8b5cf6', description: 'Main brand color' },
        { name: 'Secondary', var: '--color-secondary', value: '#f472b6', description: 'Accent color' },
        { name: 'Accent', var: '--color-accent', value: '#10b981', description: 'Success & highlights' },
        { name: 'Background', var: '--color-background', value: '#f8f9fa', description: 'Page background' },
        { name: 'Surface', var: '--color-surface', value: '#ffffff', description: 'Card backgrounds' },
        { name: 'Border', var: '--color-border', value: '#e5e7eb', description: 'Borders & dividers' },
        { name: 'Text Main', var: '--color-text-main', value: '#1f2937', description: 'Primary text' },
        { name: 'Text Muted', var: '--color-text-muted', value: '#6b7280', description: 'Secondary text' },
    ];

    const typography = [
        { name: 'Display', class: 'text-5xl font-bold', sample: 'Display Heading' },
        { name: 'Heading 1', class: 'text-4xl font-bold', sample: 'Heading 1' },
        { name: 'Heading 2', class: 'text-3xl font-bold', sample: 'Heading 2' },
        { name: 'Heading 3', class: 'text-2xl font-bold', sample: 'Heading 3' },
        { name: 'Heading 4', class: 'text-xl font-bold', sample: 'Heading 4' },
        { name: 'Body Large', class: 'text-lg', sample: 'Large body text for emphasis' },
        { name: 'Body', class: 'text-base', sample: 'Regular body text for content' },
        { name: 'Body Small', class: 'text-sm', sample: 'Small text for captions and labels' },
        { name: 'Caption', class: 'text-xs', sample: 'Extra small text for metadata' },
    ];

    const spacing = [
        { name: 'xs', value: '0.25rem', pixels: '4px' },
        { name: 'sm', value: '0.5rem', pixels: '8px' },
        { name: 'md', value: '1rem', pixels: '16px' },
        { name: 'lg', value: '1.5rem', pixels: '24px' },
        { name: 'xl', value: '2rem', pixels: '32px' },
        { name: '2xl', value: '3rem', pixels: '48px' },
        { name: '3xl', value: '4rem', pixels: '64px' },
    ];

    const shadows = [
        { name: 'sm', value: '0 1px 2px rgba(0,0,0,0.05)', usage: 'Subtle elevation' },
        { name: 'md', value: '0 4px 6px rgba(0,0,0,0.1)', usage: 'Cards, dropdowns' },
        { name: 'lg', value: '0 10px 15px rgba(0,0,0,0.1)', usage: 'Modals, popovers' },
        { name: 'xl', value: '0 20px 25px rgba(0,0,0,0.15)', usage: 'Hero elements' },
        { name: '2xl', value: '0 25px 50px rgba(0,0,0,0.25)', usage: 'Maximum depth' },
        { name: 'glow', value: '0 0 20px rgba(139,92,246,0.3)', usage: 'Interactive highlights' },
    ];

    const borderRadius = [
        { name: 'sm', value: '0.375rem', pixels: '6px' },
        { name: 'md', value: '0.5rem', pixels: '8px' },
        { name: 'lg', value: '0.75rem', pixels: '12px' },
        { name: 'xl', value: '1rem', pixels: '16px' },
        { name: '2xl', value: '1.5rem', pixels: '24px' },
        { name: 'full', value: '9999px', pixels: 'Full circle' },
    ];

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title="Design System"
                description="KapiCard design system documentation including colors, typography, components, and guidelines."
            />

            {/* Hero */}
            <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                            Design System
                        </h1>
                        <p className="text-xl text-text-muted">
                            Complete visual language and component library for KapiCard
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Color Palette */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <Palette className="w-8 h-8 text-primary" />
                        <h2 className="text-3xl font-bold text-text-main">Color Palette</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {colors.map((color, index) => (
                            <motion.div
                                key={color.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <GlassCard className="overflow-hidden">
                                    <div
                                        className="h-32 relative group cursor-pointer"
                                        style={{ backgroundColor: color.value }}
                                        onClick={() => copyToClipboard(color.value, color.name)}
                                    >
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                            {copiedColor === color.name ? (
                                                <Check className="w-8 h-8 text-white" />
                                            ) : (
                                                <Copy className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-text-main mb-1">{color.name}</h3>
                                        <p className="text-sm text-text-muted mb-2">{color.description}</p>
                                        <code className="text-xs bg-surface-hover px-2 py-1 rounded">{color.value}</code>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>

                    {/* Gradients */}
                    <div className="mt-8">
                        <h3 className="text-xl font-bold text-text-main mb-4">Brand Gradients</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <GlassCard>
                                <div className="h-24 bg-gradient-to-r from-primary to-secondary rounded-t-xl"></div>
                                <div className="p-4">
                                    <p className="font-medium text-text-main">Primary Gradient</p>
                                    <code className="text-xs text-text-muted">from-primary to-secondary</code>
                                </div>
                            </GlassCard>
                            <GlassCard>
                                <div className="h-24 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-t-xl"></div>
                                <div className="p-4">
                                    <p className="font-medium text-text-main">Subtle Background</p>
                                    <code className="text-xs text-text-muted">from-primary/10 via-secondary/10 to-accent/10</code>
                                </div>
                            </GlassCard>
                            <GlassCard>
                                <div className="h-24 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-700 rounded-t-xl"></div>
                                <div className="p-4">
                                    <p className="font-medium text-text-main">Card Gradient (Visa)</p>
                                    <code className="text-xs text-text-muted">from-blue-500 via-blue-600 to-indigo-700</code>
                                </div>
                            </GlassCard>
                        </div>
                    </div>
                </section>

                {/* Typography */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <Type className="w-8 h-8 text-primary" />
                        <h2 className="text-3xl font-bold text-text-main">Typography</h2>
                    </div>

                    <GlassCard>
                        <div className="divide-y divide-border">
                            {typography.map((type, index) => (
                                <div key={type.name} className="p-6 flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className={`${type.class} text-text-main`}>{type.sample}</p>
                                    </div>
                                    <div className="text-right ml-8">
                                        <p className="font-medium text-text-main text-sm">{type.name}</p>
                                        <code className="text-xs text-text-muted">{type.class}</code>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>

                    <div className="mt-6">
                        <GlassCard className="p-6">
                            <h3 className="font-bold text-text-main mb-3">Font Family</h3>
                            <p className="text-text-muted mb-2">Primary: <code className="bg-surface-hover px-2 py-1 rounded">Inter, system-ui, sans-serif</code></p>
                            <p className="text-text-muted">Monospace: <code className="bg-surface-hover px-2 py-1 rounded font-mono">Menlo, Monaco, monospace</code></p>
                        </GlassCard>
                    </div>
                </section>

                {/* Shadow System */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-text-main mb-8">Shadow System</h2>
                    <GlassCard>
                        <div className="divide-y divide-border">
                            {shadows.map((shadow) => (
                                <div key={shadow.name} className="p-6 flex items-center gap-8">
                                    <div className="w-32">
                                        <p className="font-bold text-text-main">{shadow.name}</p>
                                        <p className="text-sm text-text-muted">{shadow.usage}</p>
                                    </div>
                                    <div className="flex-1">
                                        <div
                                            className="w-32 h-32 bg-surface rounded-xl"
                                            style={{ boxShadow: shadow.value }}
                                        ></div>
                                    </div>
                                    <code className="text-xs text-text-muted max-w-xs">{shadow.value}</code>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </section>

                {/* Border Radius */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-text-main mb-8">Border Radius</h2>
                    <GlassCard>
                        <div className="divide-y divide-border">
                            {borderRadius.map((radius) => (
                                <div key={radius.name} className="p-6 flex items-center gap-8">
                                    <div className="w-24">
                                        <p className="font-bold text-text-main">{radius.name}</p>
                                        <p className="text-sm text-text-muted">{radius.pixels}</p>
                                    </div>
                                    <div className="flex-1">
                                        <div
                                            className="w-24 h-24 bg-primary"
                                            style={{ borderRadius: radius.value }}
                                        ></div>
                                    </div>
                                    <code className="text-sm text-text-muted">{radius.value}</code>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </section>

                {/* Animation & Transitions */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-text-main mb-8">Animation & Transitions</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <GlassCard className="p-6">
                            <h3 className="font-bold text-text-main mb-4">Duration</h3>
                            <ul className="space-y-2 text-text-muted">
                                <li><code className="bg-surface-hover px-2 py-1 rounded">150ms</code> - Quick interactions</li>
                                <li><code className="bg-surface-hover px-2 py-1 rounded">200ms</code> - Standard transitions</li>
                                <li><code className="bg-surface-hover px-2 py-1 rounded">300ms</code> - Smooth animations</li>
                                <li><code className="bg-surface-hover px-2 py-1 rounded">500ms</code> - Complex animations</li>
                            </ul>
                        </GlassCard>
                        <GlassCard className="p-6">
                            <h3 className="font-bold text-text-main mb-4">Easing Functions</h3>
                            <ul className="space-y-2 text-text-muted">
                                <li><code className="bg-surface-hover px-2 py-1 rounded">ease-in-out</code> - Smooth start & end</li>
                                <li><code className="bg-surface-hover px-2 py-1 rounded">ease-out</code> - Natural deceleration</li>
                                <li><code className="bg-surface-hover px-2 py-1 rounded">ease-in</code> - Smooth acceleration</li>
                            </ul>
                        </GlassCard>
                        <GlassCard className="p-6">
                            <h3 className="font-bold text-text-main mb-4">Scale Transforms</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-primary rounded-lg hover:scale-105 transition-transform cursor-pointer"></div>
                                    <code className="text-sm">hover:scale-105</code>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-secondary rounded-lg hover:scale-110 transition-transform cursor-pointer"></div>
                                    <code className="text-sm">hover:scale-110</code>
                                </div>
                            </div>
                        </GlassCard>
                        <GlassCard className="p-6">
                            <h3 className="font-bold text-text-main mb-4">Motion Principles</h3>
                            <ul className="space-y-2 text-text-muted text-sm">
                                <li>• Respect <code>prefers-reduced-motion</code></li>
                                <li>• Use Framer Motion for complex sequences</li>
                                <li>• Keep animations purposeful, not decorative</li>
                                <li>• Maintain 60fps performance</li>
                            </ul>
                        </GlassCard>
                    </div>
                </section>

                {/* Form Elements */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-text-main mb-8">Form Elements</h2>
                    <GlassCard className="p-8">
                        <div className="space-y-6 max-w-md">
                            <div>
                                <label className="block text-sm font-medium text-text-main mb-2">Text Input</label>
                                <input
                                    type="text"
                                    placeholder="Enter text..."
                                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-main mb-2">Select Dropdown</label>
                                <select className="w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                    <option>Option 3</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-text-main mb-2">Textarea</label>
                                <textarea
                                    placeholder="Enter message..."
                                    rows={3}
                                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                                ></textarea>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="checkbox-demo"
                                    className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary/50"
                                />
                                <label htmlFor="checkbox-demo" className="text-sm text-text-main">Checkbox option</label>
                            </div>
                        </div>
                    </GlassCard>
                </section>

                {/* Component States */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-text-main mb-8">Interactive States</h2>
                    <GlassCard className="p-8">
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-text-main mb-3">Button States</h3>
                                <div className="flex flex-wrap gap-4">
                                    <Button>Default</Button>
                                    <Button className="hover:opacity-90">Hover</Button>
                                    <Button className="opacity-75">Active</Button>
                                    <Button className="ring-2 ring-primary/50">Focus</Button>
                                    <Button disabled className="opacity-50 cursor-not-allowed">Disabled</Button>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-text-main mb-3">Card States</h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="p-4 border border-border rounded-lg bg-surface">
                                        <p className="text-sm font-medium">Default</p>
                                    </div>
                                    <div className="p-4 border border-border rounded-lg bg-surface-hover shadow-md">
                                        <p className="text-sm font-medium">Hover</p>
                                    </div>
                                    <div className="p-4 border-2 border-primary rounded-lg bg-primary/5 ring-2 ring-primary/20">
                                        <p className="text-sm font-medium">Selected</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </section>

                {/* Spacing */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <Layout className="w-8 h-8 text-primary" />
                        <h2 className="text-3xl font-bold text-text-main">Spacing Scale</h2>
                    </div>

                    <GlassCard>
                        <div className="divide-y divide-border">
                            {spacing.map((space) => (
                                <div key={space.name} className="p-6 flex items-center gap-8">
                                    <div className="w-24">
                                        <p className="font-bold text-text-main">{space.name}</p>
                                        <p className="text-sm text-text-muted">{space.pixels}</p>
                                    </div>
                                    <div className="flex-1">
                                        <div
                                            className="bg-primary h-8"
                                            style={{ width: space.value }}
                                        ></div>
                                    </div>
                                    <code className="text-sm text-text-muted">{space.value}</code>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </section>

                {/* Components */}
                <section className="mb-20">
                    <div className="flex items-center gap-3 mb-8">
                        <Zap className="w-8 h-8 text-primary" />
                        <h2 className="text-3xl font-bold text-text-main">Components</h2>
                    </div>

                    {/* Buttons */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-text-main mb-4">Buttons</h3>
                        <GlassCard className="p-8">
                            <div className="flex flex-wrap gap-4">
                                <Button variant="primary">Primary Button</Button>
                                <Button variant="secondary">Secondary Button</Button>
                                <Button variant="outline">Outline Button</Button>
                                <Button variant="ghost">Ghost Button</Button>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-4">
                                <Button size="sm">Small</Button>
                                <Button size="md">Medium</Button>
                                <Button size="lg">Large</Button>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Badges */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-text-main mb-4">Badges</h3>
                        <GlassCard className="p-8">
                            <div className="flex flex-wrap gap-3">
                                <Badge variant="primary">Primary</Badge>
                                <Badge variant="secondary">Secondary</Badge>
                                <Badge variant="success">Success</Badge>
                                <Badge variant="warning">Warning</Badge>
                                <Badge variant="danger">Danger</Badge>
                                <Badge variant="info">Info</Badge>
                            </div>
                        </GlassCard>
                    </div>

                    {/* Cards */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-text-main mb-4">Cards</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <GlassCard className="p-6">
                                <h4 className="font-bold text-text-main mb-2">Glass Card</h4>
                                <p className="text-text-muted">
                                    Semi-transparent card with backdrop blur effect for modern UI
                                </p>
                            </GlassCard>
                            <div className="bg-surface border border-border rounded-xl p-6 shadow-sm">
                                <h4 className="font-bold text-text-main mb-2">Standard Card</h4>
                                <p className="text-text-muted">
                                    Solid background card with subtle border and shadow
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Guidelines */}
                <section>
                    <h2 className="text-3xl font-bold text-text-main mb-8">Design Guidelines</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <GlassCard className="p-6">
                            <h3 className="font-bold text-text-main mb-3">🎨 Color Usage</h3>
                            <ul className="space-y-2 text-text-muted">
                                <li>• Use Primary for main CTAs and brand elements</li>
                                <li>• Secondary for accents and highlights</li>
                                <li>• Accent for success states and positive actions</li>
                                <li>• Maintain WCAG AA contrast ratios</li>
                            </ul>
                        </GlassCard>
                        <GlassCard className="p-6">
                            <h3 className="font-bold text-text-main mb-3">📐 Spacing</h3>
                            <ul className="space-y-2 text-text-muted">
                                <li>• Use 8px base grid (sm, md, lg, xl)</li>
                                <li>• Consistent padding within components</li>
                                <li>• Generous whitespace for readability</li>
                                <li>• Responsive spacing adjustments</li>
                            </ul>
                        </GlassCard>
                        <GlassCard className="p-6">
                            <h3 className="font-bold text-text-main mb-3">✨ Animations</h3>
                            <ul className="space-y-2 text-text-muted">
                                <li>• Use Framer Motion for complex animations</li>
                                <li>• Subtle hover effects on interactive elements</li>
                                <li>• Smooth transitions (200-300ms)</li>
                                <li>• Respect prefers-reduced-motion</li>
                            </ul>
                        </GlassCard>
                        <GlassCard className="p-6">
                            <h3 className="font-bold text-text-main mb-3">🔤 Typography</h3>
                            <ul className="space-y-2 text-text-muted">
                                <li>• Clear hierarchy with size and weight</li>
                                <li>• Line height 1.5 for body text</li>
                                <li>• Limited font sizes for consistency</li>
                                <li>• Readable contrast on all backgrounds</li>
                            </ul>
                        </GlassCard>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DesignSystem;
