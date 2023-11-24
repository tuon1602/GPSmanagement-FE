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

const SIMTable = (props) => {
    console.log(props.inputData)
  const [selectedColor, setSelectedColor] = React.useState("warning");
  const [filteredData,setFilteredData] = React.useState(props.simContent)
  React.useEffect(() => {
    // Filter data when props.inputData changes
    if (props.inputData) {
      const searchTerm = props.inputData.toLowerCase();
      const filteredResult = props.simContent.filter(
        (item) =>
          item.phone.toLowerCase().includes(searchTerm) ||
          item.providerName.toLowerCase().includes(searchTerm) ||
          item.providerCode.toLowerCase().includes(searchTerm) ||
          item.simCode.toLowerCase().includes(searchTerm)
      );
      setFilteredData(filteredResult);
    } else {
      // If no search input, display the original data
      setFilteredData(props.simContent);
    }
  }, [props.inputData, props.simContent]);
  const handleDeleteSimData = ()=>{

  }
  return (
    <div className="flex flex-col gap-3">
      <Table
        color={selectedColor}
        selectionMode="multiple"
        aria-label="Example static collection table"
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Provider</TableColumn>
          <TableColumn>Default Price</TableColumn>
          <TableColumn>Phone Number</TableColumn>
          <TableColumn>Provider Code</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredData && filteredData?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.simCode}</TableCell>
              <TableCell>{item.providerName}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.providerCode}</TableCell>
              <TableCell className="flex gap-5">
                <PenLine />
                <Trash2 />
                {/* <button onClick={handleDeleteSimData(item.)}><Trash2 /></button> */}
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

export default SIMTable;
