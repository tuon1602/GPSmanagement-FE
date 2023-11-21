import Image from "next/image";
import CustomButton from "./components/CustomButton";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Input } from "@nextui-org/input";

export default function Home() {
  return (
    <main className="">
      <CustomButton title="admin123" />
      <div>
        <Input variant="underlined" type="text" placeholder="Enter email"/>
      </div>
    </main>
  );
}
