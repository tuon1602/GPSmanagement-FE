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
import { PenLine, Trash2 } from "@/app/components/iconWrapper";

const colors = [
  "default",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];

const SIMTable = () => {
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
          <TableColumn>Type</TableColumn>
          <TableColumn>Provider</TableColumn>
          <TableColumn>Default Price</TableColumn>
          <TableColumn>Sale Price</TableColumn>
          <TableColumn>Quanitiy</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>abc</TableCell>
            <TableCell>abc</TableCell>
            <TableCell>abc</TableCell>
            <TableCell>5000</TableCell>
            <TableCell>2000</TableCell>
            <TableCell>1</TableCell>
            <TableCell className="flex gap-5">
              <PenLine />
              <Trash2 />
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

export default SIMTable;
