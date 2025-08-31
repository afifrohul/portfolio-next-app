import Footer from "@/components/footer";
import Header from "@/components/header";
import { Separator } from "@/components/ui/separator";

export default function FeLayout({ children }) {
  return (
    <div className="flex justify-center items-center w-full flex-col gap-2">
      <div className="w-3xl flex flex-col gap-8 min-h-screen">
        <div className="flex gap-6 items-center justify-between pt-8">
          <Header />
        </div>
        <Separator />
        {children}
        <Footer></Footer>
      </div>
    </div>
  );
}
