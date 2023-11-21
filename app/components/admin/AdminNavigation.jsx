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
    <div className="min-h-screen">
      <div className="flex flex-col gap-6">
        <Image src={Logo} alt="logo" width="125" height="125" />
        <Button startContent={<Plus />} size="md">
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
          dropDownItem={["device", "provider","import","service"]}
          icon={<Package />}
        />
        <DropdownCustom
          text="Products"
          dropDownItem={["Product", "Provider"]}
          icon={<UploadCloud />}
        />
        <DropdownCustom
          text="Products"
          dropDownItem={["Product", "Provider"]}
          icon={<Database />}
        />
        <DropdownCustom
          text="Products"
          dropDownItem={["Product", "Provider"]}
          icon={<Users />}
        />
        <DropdownCustom
          text="Products"
          dropDownItem={["Product", "Provider"]}
          icon={<MessageSquare />}
        />
        <Link href="/settings" className="flex gap-2">
          <Settings width={24} height={24} />
          Settings
        </Link>
      </div>
    </div>
  );
};

export default AdminNavigation;
