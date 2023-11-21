"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

const RecentSubsribeTable = () => {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Tracking no</TableColumn>
        <TableColumn>Product name</TableColumn>
        <TableColumn>Serial</TableColumn>
        <TableColumn>Service</TableColumn>
        <TableColumn>Price VND</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Tony Reichert</TableCell>
          <TableCell>CEO</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Active</TableCell>

        </TableRow>
        <TableRow key="2">
          <TableCell>Zoey Lang</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Active</TableCell>

        </TableRow>
        <TableRow key="3">
          <TableCell>Jane Fisher</TableCell>
          <TableCell>Senior Developer</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Active</TableCell>

        </TableRow>
        <TableRow key="4">
          <TableCell>William Howard</TableCell>
          <TableCell>Community Manager</TableCell>
          <TableCell>Vacation</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Active</TableCell>

        </TableRow>
      </TableBody>
    </Table>
  );
};

export default RecentSubsribeTable;
