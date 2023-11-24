"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { UserCircle, CalendarClock, Dot } from "@/app/components/iconWrapper";

export default function App() {
  return (
    <Table removeWrapper aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>ACCOUNT</TableColumn>
        <TableColumn>CREATED</TableColumn>
        <TableColumn>ROLE</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell className="flex items-center content-center gap-2">
            <UserCircle />
            Admin
          </TableCell>
          <TableCell className="font-semibold">
            <div className="flex items-center content-center gap-2">
              <CalendarClock />
              Oct 29, 2023
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center content-center gap-2 text-blue-500">
              <Dot />
              CEO
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}