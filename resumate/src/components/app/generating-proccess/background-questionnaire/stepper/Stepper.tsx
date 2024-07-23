import classNames from "classnames";

type Step = {
  name: string;
}

type StepperProps = {
  steps: Step[];
  currentStepIndex: number;
  onStepSelect: (stepIndex: number) => void;
};

export const Stepper = ({ steps, currentStepIndex, onStepSelect }: StepperProps) => {
  return (
    <section className="flex gap-[10px]">
      {steps.map((step, index) => (
        <div className="flex flex-col w-[100px] items-center gap-[10px] cursor-pointer" onClick={() => onStepSelect(index)}>
          <div
            key={step.name}
            className={classNames(
              'w-full h-[13px] rounded-full bg-accent',
              { 'bg-primary': currentStepIndex > index },
              { 'bg-dark': currentStepIndex === index },
            )}
          />
          <span className={classNames('opacity-60', { 'font-bold !opacity-100': currentStepIndex === index })}>{step.name}</span>
        </div>
      ))}
    </section>
  );
};
