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
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/react";
import DropdownCustom from "../../DropdownCustom";
import { Plus, Trash2, PenLine } from "@/app/components/iconWrapper";
import { Input } from "@nextui-org/input";

const GeneralTable = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold">General</h1>
      </div>
      <div className="flex flex-row-reverse mb-5">
        <Button onPress={onOpen} className="bg-black text-white px-10">
          Add
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add General
                </ModalHeader>
                <ModalBody>
                  <form className="flex flex-col gap-5">
                    <div>
                      <label>General Type</label>
                      <Input type="text" placeholder="Your type" className="mt-2" />
                    </div>
                    <div>
                      <label>Code</label>
                      <Input type="text" placeholder="Your code" className="mt-2"/>
                    </div>
                    <div>
                      <label>Description</label>
                      <Input type="text" placeholder="Description" className="mt-2"/>
                    </div>
                  </form>
                </ModalBody>

                <ModalFooter>
                  <Button
                    className="bg-black text-white w-full"
                    onPress={onClose}
                  >
                    Add
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>General Title</TableColumn>
          <TableColumn>Code</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>
              {" "}
              <DropdownCustom
                text="Type of GPS"
                dropDownItem={["Product", "Provider"]}
              />
            </TableCell>

            <TableCell>CEO</TableCell>
            <TableCell className="flex gap-2 items-center content-center">
              <span>
                <Plus />
              </span>
              <span>
                <PenLine />
              </span>
              <span>
                <Trash2 />
              </span>
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>
              {" "}
              <DropdownCustom
                text="Type of Provider"
                dropDownItem={["Product", "Provider"]}
              />
            </TableCell>
            <TableCell>Technical Lead</TableCell>
            <TableCell>CEO</TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>Jane Fisher</TableCell>
            <TableCell>Senior Developer</TableCell>
            <TableCell>CEO</TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>William Howard</TableCell>
            <TableCell>Community Manager</TableCell>
            <TableCell>CEO</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default GeneralTable;
