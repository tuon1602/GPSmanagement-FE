"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Radio, RadioGroup } from "@nextui-org/radio";
import {PenLine,Trash2} from "@/app/components/iconWrapper"

const colors = [
  "default",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];

const ServiceTable = () => {
  const [selectedColor, setSelectedColor] = React.useState("warning");
  return (
    <div className="flex flex-col gap-3">
      <Table
        color={selectedColor}
        selectionMode="multiple"
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Duration</TableColumn>
          <TableColumn>Default Price</TableColumn>
          <TableColumn>Time</TableColumn>
          <TableColumn>Actions</TableColumn>

        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>abc</TableCell>
            <TableCell>23232323</TableCell>
            <TableCell>10000000</TableCell>
            <TableCell>365 days</TableCell>  
            <TableCell className="flex gap-5">
                <PenLine/>
                <Trash2/>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <RadioGroup
        orientation="horizontal"
        value={selectedColor}
        onValueChange={setSelectedColor}
      ></RadioGroup>
    </div>
  );
};

export default ServiceTable;
