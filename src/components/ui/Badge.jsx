const Badge = ({ children, variant = 'primary', className = '' }) => {
    const variants = {
        primary: "bg-primary/10 text-primary border-primary/20",
        secondary: "bg-secondary/10 text-secondary border-secondary/20",
        outline: "border border-text-muted/20 text-text-muted",
        accent: "bg-accent/10 text-accent-dark border-accent/20",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
