import { cn } from "@/lib/utils";

function Title({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-2xl md:3xl font-bold capitalize tracking-wide",
        className
      )}
    >
      {children}
    </h2>
  );
}

function Subtitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-gray-400 text-sm md:text-base", className)}>
      {children}
    </p>
  );
}

export default Title;
export { Subtitle };
function SubText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn("font-semibold text-gray-900", className)}>
      {children}
    </h3>
  );
}
export { SubText };
