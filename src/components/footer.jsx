import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="">
      <Separator className=""></Separator>
      <div className="flex flex-col lg:flex-row justify-between items-center p-4 gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 ">
            <a
              href="https://www.instagram.com/afif.rohul/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 duration-150 transition-all"
            >
              <FaInstagram></FaInstagram>
            </a>
            <a
              href="https://www.linkedin.com/in/afifrohul/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 duration-150 transition-all"
            >
              <FaLinkedin></FaLinkedin>
            </a>
            <a
              href="https://github.com/afifrohul"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 duration-150 transition-all"
            >
              <FaGithub></FaGithub>
            </a>
            <a
              href="mailto:afifmemyself22@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 duration-150 transition-all"
            >
              <FaEnvelope></FaEnvelope>
            </a>
          </div>
          <div className="flex gap-2 items-center justify-center lg:justify-start">
            <Image src="/afif.svg" alt="Logo" width={16} height={16} className="w-3 h-3"/>
            <p className="text-xs lg:text-base italic">Afif Rohul</p>
          </div>
        </div>
        <p className="text-xs text-center lg:text-base text-gray-500">
          &copy; {new Date().getFullYear()} Personal Portfolio. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
