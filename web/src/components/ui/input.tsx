import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, maxLength, ...props }, ref) => {
    const [internalLength, setInternalLength] = React.useState(
      String(props.defaultValue || "").length
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (props.value === undefined) {
        setInternalLength(e.target.value.length);
      }
      if (props.onChange) {
        props.onChange(e);
      }
    };

    const currentLength = props.value !== undefined ? String(props.value).length : internalLength;

    if (!maxLength) {
      return (
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
          )}
          ref={ref}
          onChange={props.onChange}
          {...props}
        />
      );
    }

    return (
      <div className="relative w-full">
        <input
          type={type}
          maxLength={maxLength}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "pr-14", // space for the counter
            className,
          )}
          ref={ref}
          onChange={handleChange}
          {...props}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-medium text-muted-foreground bg-background px-1 pointer-events-none">
          {currentLength}/{maxLength}
        </div>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
