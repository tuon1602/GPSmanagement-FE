"use client"
import Image from "next/image";
import CustomButton from "../components/CustomButton";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const token = localStorage.getItem("token")
  if(token){
    router?.push("/dashboard")
  }
  else{
    router?.push("/login")
  }
  return (
    <main className="">
    <Link href="/login">Go to login</Link>
    </main>
  );
}
