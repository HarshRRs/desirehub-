import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
    {
        variants: {
            variant: {
                default: "bg-gradient-to-r from-violet-deep to-neon-pink text-white hover:shadow-[0_0_15px_rgba(255,0,127,0.5)] hover:scale-105 active:scale-95 border-none",
                outline: "border border-violet-deep text-white hover:bg-violet-deep/20 hover:shadow-[0_0_10px_rgba(92,46,145,0.3)]",
                ghost: "hover:bg-white/10 text-white",
                link: "text-primary underline-offset-4 hover:underline",
                neon: "bg-transparent border border-neon-pink text-neon-pink shadow-[0_0_10px_rgba(255,0,127,0.3)] hover:bg-neon-pink hover:text-white hover:shadow-[0_0_20px_rgba(255,0,127,0.6)]",
            },
            size: {
                default: "h-10 py-2 px-6",
                sm: "h-9 px-4 rounded-full",
                lg: "h-12 px-8 rounded-full text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
