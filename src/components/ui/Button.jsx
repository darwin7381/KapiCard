import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-primary text-white shadow-glow hover:shadow-lg hover:-translate-y-0.5",
        secondary: "bg-secondary text-white shadow-md hover:shadow-lg hover:-translate-y-0.5",
        success: "bg-green-500 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-green-600",
        outline: "border-2 border-primary text-primary hover:bg-primary/5",
        ghost: "text-text-muted hover:text-primary hover:bg-primary/5",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
