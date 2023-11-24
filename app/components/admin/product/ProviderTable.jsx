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

const ProviderTable = (props) => {
    const token = localStorage.getItem('token');
  console.log(props.providerData);
  console.log(props.providerInputData);

  const [selectedColor, setSelectedColor] = React.useState("warning");
  const [filteredData, setFilteredData] = React.useState(props.providerData);
  React.useEffect(() => {
    // Filter data when props.inputData changes
    if (props.providerInputData && props.providerData) {
      const searchTerm = props.providerInputData.toLowerCase();
      const filteredResult = props.providerData.filter(
        (item) =>
          item.code.toLowerCase().includes(searchTerm) ||
          item.name.toLowerCase().includes(searchTerm) ||
          item.contactName.toLowerCase().includes(searchTerm)
        //   item.email.toLowerCase().includes(searchTerm)
      );
      setFilteredData(filteredResult);
    } else {
      // If no search input, display the original data
      setFilteredData(props.providerData);
    }
  }, [props.providerInputData, props.providerData]);
  const handleDeleteProvider = async (id) => {
    const deleteConfirm = window.confirm("Are you sure you want to delete");
    if (!deleteConfirm) {
      return;
    } else {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/provider/${id}`,
          {
            headers:{
                "Authorization": `Bearer ${token}`,
            },
            method: "DELETE",
          }
        );
        if (res.ok) {
          window.location.reload();
        }
      } catch (error) {
        console.error("Error deleting provider");
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
          <TableColumn>Id</TableColumn>
          <TableColumn>Code</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Contact name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredData &&
            filteredData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.contactName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell className="flex gap-5">
                  <PenLine />
                  <button onClick={() => handleDeleteProvider(item.id)}>
                    <Trash2 />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          {/* <TableRow>
            <TableCell>1</TableCell>
            <TableCell>2</TableCell>
            <TableCell>3</TableCell>
            <TableCell>45</TableCell>
            <TableCell>5</TableCell>
            <TableCell className="flex gap-5">
              <PenLine />
              <Trash2 />
            </TableCell>
          </TableRow> */}
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

export default ProviderTable;
