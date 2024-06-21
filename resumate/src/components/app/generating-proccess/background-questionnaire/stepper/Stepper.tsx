import range from "lodash/range";

type StepperProps = {
  stepsCount: number;
  currentStep: number;
};

export const Stepper = ({ stepsCount, currentStep }: StepperProps) => {
  const steps = range(0, stepsCount);

  return (
    <section className="flex gap-[5px]">
      {steps.map((step) => (
        <div
          key={step}
          className={`w-[100px] ${
            currentStep > step ? "bg-primary" : "bg-accent"
          } h-[13px] rounded-full`}
        />
      ))}
    </section>
  );
};
