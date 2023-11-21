"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import Link from "next/link";
const DropdownCustom = (props) => {
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered" startContent={props?.icon}>
            {props.text}
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          {/* <DropdownItem key="new">New file</DropdownItem>
          <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger">
            Delete file
          </DropdownItem> */}
       {props.dropDownItem.map((item,index)=>(
        <DropdownItem key={index}><Link href={`/dashboard/${props.text}/${item}`}>{item}</Link></DropdownItem>
       ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropdownCustom;
