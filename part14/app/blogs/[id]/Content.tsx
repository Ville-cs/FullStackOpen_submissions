import { HTMLAttributes, ReactNode } from "react";

interface ContentProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

const Content = ({ children, ...props }: ContentProps) => {
  return (
    <span {...props} className="text-xl text-red-400">
      {children}
    </span>
  );
};

export default Content;
