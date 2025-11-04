import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Separator } from "@/components/ui/separator";

export default function FeLayout({ children }) {
  return (
    <div className="flex justify-center items-center w-full flex-col gap-2">
      <div className="w-full lg:w-4xl flex flex-col gap-6 lg:gap-8 min-h-screen px-4 border-x-1">
        <div className="flex gap-6 items-center justify-between pt-8">
          <Navbar />
        </div>
        {/* <Separator /> */}
        {children}
        <Footer></Footer>
      </div>
    </div>
  );
}
