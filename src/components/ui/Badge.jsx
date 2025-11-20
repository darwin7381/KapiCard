const Badge = ({ children, variant = 'primary', className = '' }) => {
    const variants = {
        primary: "bg-primary/5 text-primary/90 border-primary/10",
        secondary: "bg-secondary/5 text-secondary/90 border-secondary/10",
        outline: "border border-border text-text-muted",
        accent: "bg-accent/5 text-accent border-accent/10",
        success: "bg-green-50 text-green-700 border-green-200",
        warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
        danger: "bg-red-50 text-red-700 border-red-200",
        info: "bg-blue-50 text-blue-700 border-blue-200",
    };

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium border ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};

export default Badge;
