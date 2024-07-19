import { ModeSelect } from "@/components/ModeSelect";
import Navbar from "@/components/ui/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-gray-200">
        <ModeSelect />
        {children}
      </div>
    </>

  );
};

export default ProtectedLayout;
