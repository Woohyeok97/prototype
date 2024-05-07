import { useRouter, useSearchParams } from 'next/navigation';

interface StepProviderProps<T> {
  children: React.ReactNode;
  name: T;
  isDefault?: boolean;
}
export default function useStep<T extends string>() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentStep = searchParams.get('step');

  const setStep = (step: T) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', step);
    router.push(`?${params.toString()}`);
  };

  function StepProvider({ children, name, isDefault }: StepProviderProps<T>) {
    if (currentStep === null && isDefault) {
      return <>{children}</>;
    }
    if (currentStep === name) {
      return <>{children}</>;
    }
  }

  return { currentStep, StepProvider, setStep };
}
