interface DescriptionProps {
  children: React.ReactNode;
}

const Description = ({ children }: DescriptionProps) => {
  return <div className="my-5 text-xl">{children}</div>;
};

export default Description;
