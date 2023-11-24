"use client";
import React, { useEffect,useState } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import GPSTable from "@/app/components/admin/product/GPSTable";
import SIMTable from "@/app/components/admin/product/SIMTable";
import { Input } from "@nextui-org/input";
import { Search, PenLine, Trash2 } from "@/app/components/iconWrapper";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { useDisclosure } from "@nextui-org/react";
import ServiceTable from "@/app/components/admin/service/ServiceTable";


const ServicePage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <h1 className="text-3xl font-bold">Service</h1>
      <Card className="mt-5">
        <CardHeader className="h-[118px]">
          <div className="flex justify-between w-full">
            <div className="flex gap-5">
              <Input
                className="w-[250px]"
                placeholder="Search"
                startContent={<Search />}
              />
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="w-[250px] h-[56px]">
                    Type
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="new">New file</DropdownItem>
                  <DropdownItem key="copy">Copy link</DropdownItem>
                  <DropdownItem key="edit">Edit file</DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Delete file
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div>
              <Button
                className="bg-black text-white h-[56px] px-10 "
                onPress={onOpen}
              >
                Add
              </Button>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Add Product
                      </ModalHeader>
                      <ModalBody>
                        <Input
                          required
                          key="outside"
                          type="text"
                          label="Product Name"
                          labelPlacement="outside"
                          placeholder="Enter your product name"
                        />
                        <Input
                          key="outside"
                          type="input"
                          label="Product Image"
                          labelPlacement="outside"
                          placeholder="Enter your product image"
                        />
                        <Input
                          required
                          key="outside"
                          type="text"
                          label="Inventory"
                          labelPlacement="outside"
                          placeholder="Number"
                        />
                        <Input
                          key="outside"
                          type="text"
                          label="Default Price"
                          labelPlacement="outside"
                          placeholder="Number"
                        />
                        <Input
                          key="outside"
                          type="text"
                          label="Sale Price"
                          labelPlacement="outside"
                          placeholder="Number"
                        />
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          className="bg-black text-white"
                          onPress={onClose}
                        >
                          Action
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="font-bold text-xl mb-5">Total Service: xxx</div>
          <ServiceTable/>
        </CardBody>
      </Card>
    </div>
  );
};

export default ServicePage;
