"use client";
import React, { useEffect, useState } from "react";
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
import ClientsTable from "@/app/components/admin/clients/ClientsTable";

const SubscriberPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <h1 className="text-3xl font-bold">Subscribers</h1>
      <Card className="mt-5">
        <CardHeader>
          <div className="flex justify-between w-full mt-5">
            <div className="flex gap-5">
              <Input
                className="w-[604px]"
                placeholder="Search"
                startContent={<Search />}
              />
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
                          label="Serial"
                          labelPlacement="outside"
                          placeholder="Enter your Serial Number"
                        />
                        <Input
                          key="outside"
                          type="input"
                          label="Provider"
                          labelPlacement="outside"
                          placeholder="Provider"
                        />
                        <Input
                          required
                          key="outside"
                          type="text"
                          label="Price"
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
        <CardBody className="mt-5">
         <ClientsTable />
        </CardBody>
      </Card>
    </div>
  );
};

export default SubscriberPage;
