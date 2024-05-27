import { Spinner } from "@nextui-org/react";

export const Loader = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <Spinner size="md" color="default" />
    </div>
  );
};