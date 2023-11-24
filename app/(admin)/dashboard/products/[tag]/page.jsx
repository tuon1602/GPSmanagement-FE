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
import ProviderPage from "../ProviderPage";
import ServicePage from "../ServicePage";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImportPage from "../ImportPage";

const createGps = Yup.object().shape({
  url: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  code: Yup.string().required("Required"),
  provider: Yup.string().required("Required"),
  inventory: Yup.string().required("Required"),
  des: Yup.string().required("Required"),
  quantity: Yup.string().required("Required"),
  importPrice: Yup.string().required("Required"),
  salePrice: Yup.string().required("Required"),
});

const ProductsDetail = ({ params }) => {
  const [simData, setSimData] = useState("");
  const [GpsData, setGpsData] = useState("");
  const [simEventData, setSimEventData] = useState("");
  const [gpsEventData, setGpsEventData] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleSimInputChange = (event) => {
    setSimEventData(event.target.value);
  };
  const handleGpsInputChange = (event) => {
    setGpsEventData(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof window !== "undefined") {
          // Perform localStorage action
          const token = localStorage.getItem("token");
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sim`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (res.ok) {
            const data = await res.json();
            setSimData(data.content);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors, e.g., set an error state
      }
    };

    fetchData(); // Call the async function immediately

    // Note: If you ever need to clean up (e.g., cancel a request),
    // you can return a cleanup function here
  }, []);
  useEffect(() => {
    const fetchGPSData = async () => {
      try {
        if (typeof window !== "undefined") {
          // Perform localStorage action
          const token = localStorage.getItem("token");
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gps/`, {
            method: "GET",
          });

          if (res.ok) {
            const data = await res.json();
            setGpsData(data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors, e.g., set an error state
      }
    };

    fetchGPSData(); // Call the async function immediately

    // Note: If you ever need to clean up (e.g., cancel a request),
    // you can return a cleanup function here
  }, []);
  if (params.tag === "device") {
    return (
      <div>
        <ToastContainer />
        <h1 className="text-3xl font-bold">Product</h1>
        <div className="flex w-full flex-col mt-5">
          <Tabs aria-label="Options" colors="primary">
            <Tab key="gps" title="GPS">
              <Card>
                <CardHeader className="h-[118px]">
                  <div className="flex justify-between w-full">
                    <div className="flex gap-5">
                      <Input
                        className="w-[250px]"
                        placeholder="Search"
                        startContent={<Search />}
                        onChange={handleGpsInputChange}
                      />
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            variant="bordered"
                            className="w-[250px] h-[56px]"
                          >
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
                      <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        size="2xl"
                      >
                        <ModalContent>
                          {(onClose) => (
                            <>
                              <ModalHeader className="flex flex-col gap-1">
                                Add Product
                              </ModalHeader>
                              <ModalBody>
                                <Formik
                                  initialValues={{
                                    url: "",
                                    name: "",
                                    code: "",
                                    provider: "",
                                    inventory: "",
                                    des: "",
                                    quantity: "",
                                    importPrice: "",
                                    salePrice: "",
                                  }}
                                  validationSchema={createGps}
                                  onSubmit={async (values) => {
                                    // same shape as initial values
                                    console.log(values);
                                
                                    try {
                                      const res = await fetch(
                                        `${process.env.NEXT_PUBLIC_API_URL}/gps`,
                                        {
                                          method: "POST",
                                          headers: {
                                            "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({
                                            url: values.url,
                                            name: values.name,
                                            code: values.code,
                                            provider: values.provider,
                                            inventory: values.inventory,
                                            des: values.des,
                                            quantity: values.quantity,
                                            importPrice: values.importPrice,
                                            salePrice: values.salePrice,
                                          }),
                                        }
                                      );
                                      if (res.ok) {
                                        toast.success("Created Gps");
                                        const updatedRes = await fetch(
                                          `${process.env.NEXT_PUBLIC_API_URL}/gps/`,
                                          {
                                            method: "GET",
                                          }
                                        );

                                        if (updatedRes.ok) {
                                          const updatedData =
                                            await updatedRes.json();
                                          setGpsData(updatedData);
                                        } else {
                                          console.error(
                                            "Failed to fetch updated data"
                                          );
                                        }
                                      } else {
                                        toast.error("Error creating category");
                                      }
                                      //   if (!res.ok) {
                                      //     toast.error("Your username or password is incorrect");
                                      //   } else {
                                      //     const data = await res.json();
                                      //     localStorage.setItem("token", data.token);
                                      //     router.push("/dashboard");
                                      //   }
                                    } catch (error) {
                                      console.error(error);
                                    }
                                  }}
                                >
                                  {({ errors, touched }) => (
                                    <Form className="flex flex-col gap-4">
                                      <Field
                                        name="url"
                                        type="text"
                                        placeholder="Url"
                                        className="border p-3"
                                      />
                                      {errors.url && touched.url ? (
                                        <div className="text-red-500 text-sm">
                                          {errors.url}
                                        </div>
                                      ) : null}
                                      <Field
                                        name="name"
                                        type="text"
                                        placeholder="Name"
                                        className="border p-3"
                                      />
                                      {errors.name && touched.name ? (
                                        <div className="text-red-500 text-sm">
                                          {errors.name}
                                        </div>
                                      ) : null}
                                      <Field
                                        name="code"
                                        type="text"
                                        placeholder="Code"
                                        className="border p-3"
                                      />
                                      {errors.code && touched.code ? (
                                        <div className="text-red-500  text-sm">
                                          {errors.code}
                                        </div>
                                      ) : null}
                                      <Field
                                        name="provider"
                                        type="text"
                                        placeholder="Provider (Number)"
                                        className="border p-3"
                                      />
                                      {errors.provider && touched.provider ? (
                                        <div className="text-red-500 text-sm">
                                          {errors.provider}
                                        </div>
                                      ) : null}
                                      <Field
                                        name="inventory"
                                        type="text"
                                        placeholder="Inventory (Number)"
                                        className="border p-3"
                                      />
                                      {errors.inventory && touched.inventory ? (
                                        <div className="text-red-500 text-sm">
                                          {errors.inventory}
                                        </div>
                                      ) : null}
                                      <Field
                                        name="des"
                                        type="text"
                                        placeholder="Description"
                                        className="border p-3"
                                      />
                                      {errors.des && touched.des ? (
                                        <div className="text-red-500  text-sm">
                                          {errors.des}
                                        </div>
                                      ) : null}
                                      <Field
                                        name="quantity"
                                        type="text"
                                        placeholder="Quantity (Number)"
                                        className="border p-3"
                                      />
                                      {errors.quantity && touched.quantity ? (
                                        <div className="text-red-500 text-sm">
                                          {errors.quantity}
                                        </div>
                                      ) : null}
                                      <Field
                                        name="importPrice"
                                        type="text"
                                        placeholder="Price (Number)"
                                        className="border p-3"
                                      />
                                      {errors.importPrice &&
                                      touched.importPrice ? (
                                        <div className="text-red-500 text-sm">
                                          {errors.importPrice}
                                        </div>
                                      ) : null}
                                      <Field
                                        name="salePrice"
                                        type="text"
                                        placeholder="Sale Price (Number)"
                                        className="border p-3"
                                      />
                                      {errors.salePrice && touched.salePrice ? (
                                        <div className="text-red-500  text-sm">
                                          {errors.salePrice}
                                        </div>
                                      ) : null}
                                      <button
                                        type="submit"
                                        className="border-none py-2 rounded hover:opacity-75 bg-black text-white"
                                      >
                                        Create
                                      </button>
                                    </Form>
                                  )}
                                </Formik>
                              </ModalBody>
                            </>
                          )}
                        </ModalContent>
                      </Modal>
                    </div>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="font-bold text-xl">Total GPS: {GpsData && GpsData.length}</div>
                  <GPSTable gpsData={GpsData} gpsEventData={gpsEventData} />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="sim" title="SIM">
              <Card>
                <CardHeader>
                  <div className="flex justify-between w-full mt-5">
                    <div className="flex gap-5">
                      <Input
                        className="w-[604px]"
                        placeholder="Search"
                        startContent={<Search />}
                        onChange={handleSimInputChange}
                      />
                    </div>
                    <div>
                      <Button
                        className="bg-black text-white h-[56px] px-10 "
                        onPress={onOpen}
                      >
                        Add
                      </Button>
                      <Modal
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        size="2xl"
                      >
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
                <CardBody>
                  <SIMTable simContent={simData} inputData={simEventData} />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
  if (params.tag == "provider") {
    return <ProviderPage />;
  }
  if (params.tag == "service") {
    return <ServicePage />;
  }
  if (params.tag == "import") {
    return <ImportPage />;
  }
};

export default ProductsDetail;
