import React from "react";
import Logo from "@/app/assets/logo/Logo.png";
import Image from "next/image";
import CustomButton from "../CustomButton";
import { Button } from "@nextui-org/button";
import {
  Plus,
  LayoutGrid,
  AlignLeft,
  Package,
  ChevronRight,
  UploadCloud,
  Database,
  Users,
  MessageSquare,
  Settings,
} from "@/app/components/iconWrapper";
import Link from "next/link";
import DropdownCustom from "../DropdownCustom";
const AdminNavigation = () => {
  return (
    <div className="min-h-screen flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <Image src={Logo} alt="logo" width="125" height="125" />
        <Button startContent={<Plus />} size="md" className="text-white bg-black">
          Add Clients
        </Button>
        <Link href="/dashboard" className="flex gap-2">
          <LayoutGrid width={24} height={24} />
          DashBoard
        </Link>
        <Link href="/dashboard/general" className="flex gap-2">
          <AlignLeft width={24} height={24} />
          General
        </Link>
        <DropdownCustom
          text="products"
          dropDownItem={["device", "provider", "import", "service"]}
          icon={<Package />}
        />
        <DropdownCustom
          text="clients"
          dropDownItem={["subscribers"]}
          icon={<Users />}
        />
        <DropdownCustom
          text="reports"
          dropDownItem={["FAQ", "reports"]}
          icon={<MessageSquare />}
        />
        <Link href="/settings" className="flex gap-2">
          <Settings width={24} height={24} />
          Settings
        </Link>
      </div>
      <div>
        <CustomButton title="Logout"/>
      </div>
    </div>
  );
};

export default AdminNavigation;
