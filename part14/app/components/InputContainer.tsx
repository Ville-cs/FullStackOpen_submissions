import { Field } from "@/components/ui/field";

interface FieldContainerProps {
  children: React.ReactNode;
}

const FieldContainer = ({ children }: FieldContainerProps) => {
  return (
    <Field className="my-7 grid grid-cols-[120px_300px] items-center gap-4">
      {children}
    </Field>
  );
};

export default FieldContainer;
