"use client";
// app/components/admin/product/ImportOrderTable.jsx
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  RadioGroup,
  Radio,
} from "@nextui-org/react";

const colors = [
  "default",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];

const OrderTable = () => {
    const [selectedColor, setSelectedColor] = React.useState("default");

    return (
      <div className="flex flex-col gap-3">
        <Table
          color={selectedColor}
          selectionMode="multiple"
          defaultSelectedKeys={["2", "3"]}
          aria-label="Import order table"
        >
          <TableHeader>
            <TableColumn>Order</TableColumn>
            <TableColumn>Product</TableColumn>
            <TableColumn>Provider</TableColumn>
            <TableColumn>Total Price</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>#4548843</TableCell>
              <TableCell>ST 901 AT MX</TableCell>
              <TableCell>sion@example.com</TableCell>
              <TableCell>37500000</TableCell>
              <TableCell>2023-10-12</TableCell>
              <TableCell className="font-semibold">SEND</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>#4545342</TableCell>
              <TableCell>e-Sim</TableCell>
              <TableCell>vietel@example.com</TableCell>
              <TableCell>7500000</TableCell>
              <TableCell>2023-10-31</TableCell>
              <TableCell className="font-semibold">IMPORTED</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <RadioGroup
          label="Selection color"
          orientation="horizontal"
          value={selectedColor}
          onValueChange={setSelectedColor}
        >
          {colors.map((color) => (
            <Radio key={color} color={color} value={color} className="capitalize">
              {color}
            </Radio>
          ))}
        </RadioGroup>
      </div>
    );
}

export default OrderTable