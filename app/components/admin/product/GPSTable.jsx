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
import { useRouter } from "next/navigation";
import Link from "next/link";

const colors = [
  "default",
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];

const GPSTable = (props) => {
  const router = useRouter();
  console.log(props.gpsData);
  console.log(props.gpsEventData);
  const [selectedColor, setSelectedColor] = React.useState("warning");
  const [filteredData, setFilteredData] = React.useState(props.simContent);

  React.useEffect(() => {
    // Filter data when props.inputData changes
    if (props.gpsData) {
      const searchTerm = props.gpsEventData.toLowerCase();
      const filteredResult = props.gpsData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.code.toLowerCase().includes(searchTerm) ||
          item.des.toLowerCase().includes(searchTerm)
      );
      setFilteredData(filteredResult);
    } else {
      // If no search input, display the original data
      setFilteredData(props.gpsEventData);
    }
  }, [props.gpsData, props.gpsEventData]);
  const handleDeleteGps = async (id) => {
    const deleteConfirm = window.confirm("Are you sure you want to delete");
    if (!deleteConfirm) {
      return;
    } else {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/gps/${id}`,
          {
            method: "DELETE",
          }
        );
        if (res.ok) {
            window.location.reload();
        }
      } catch (error) {
        console.error("Error fetching category");
      }
    }
  };
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
          <TableColumn>Description</TableColumn>
          <TableColumn>Default Price</TableColumn>
          <TableColumn>Sale Price</TableColumn>
          <TableColumn>Quanitiy</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredData &&
            filteredData.map((item, index) => (
              <TableRow key="1">
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.provider}</TableCell>
                <TableCell>{item.des}</TableCell>
                <TableCell>{item.importPrice}</TableCell>
                <TableCell>{item.salePrice}</TableCell>
                <TableCell>{item.quantity}</TableCell>

                <TableCell className="flex gap-5">
                  <Link href={`/dashboard/gpsdetail/${item.id}`}><PenLine /></Link>
                  <button onClick={() => handleDeleteGps(item.id)}>
                    <Trash2 />
                  </button>
                </TableCell>
              </TableRow>
            ))}
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

export default GPSTable;
