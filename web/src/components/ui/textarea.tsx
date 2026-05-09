import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, maxLength, ...props }, ref) => {
  const [internalLength, setInternalLength] = React.useState(
    String(props.defaultValue || "").length
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
      <textarea
        maxLength={maxLength}
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          "pb-6", // Add padding at the bottom so text doesn't overlap the counter
          className,
        )}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
      <div className="absolute right-2 bottom-2 text-[10px] font-medium text-muted-foreground bg-background px-1 pointer-events-none rounded-sm">
        {currentLength}/{maxLength}
      </div>
    </div>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
