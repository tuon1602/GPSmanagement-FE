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
import ProviderTable from "@/app/components/admin/product/ProviderTable";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const createProvider = Yup.object().shape({
  code: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  contactName: Yup.string().required("Required"),
  contactPhone: Yup.string().required("Required"),
  email: Yup.string().email("Email invalid").required("Required"),
  addressDetail: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
  tag: Yup.string().required("Required"),
  idCard: Yup.string().required("Required"),
  wardCode: Yup.string().required("Required"),
});

const ProviderPage = () => {
    const token= localStorage.getItem('token')
  const [providerAllData, setProviderAllData] = useState("");
  const [providerInputData, setProviderInputData] = useState("");

  const handleProviderInput = (event) => {
    setProviderInputData(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof window !== "undefined") {
          // Perform localStorage action
          const token = localStorage.getItem("token");
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/provider`,
            {
                headers:{
                    "Authorization": `Bearer ${token}`
                },
              method: "GET",
            }
          );
          if (res.ok) {
            const data = await res.json();
            console.log(data);
            setProviderAllData(data);
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      <h1 className="text-3xl font-bold">Provider</h1>
      <Card className="mt-5">
        <CardHeader>
          <div className="flex justify-between w-full mt-5">
            <div className="flex gap-5">
              <Input
                className="w-[604px]"
                placeholder="Search"
                startContent={<Search />}
                onChange={handleProviderInput}
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
                        Add Provider
                      </ModalHeader>
                      <ModalBody>
                        <Formik
                          initialValues={{
                            code: "",
                            name: "",
                            contactPhone: "",
                            contactName: "",
                            email: "",
                            addressDetail: "",
                            role: "",
                            tag: "",
                            idCard: "",
                            wardCode: "",
                          }}
                          validationSchema={createProvider}
                          onSubmit={async (values) => {
                            // same shape as initial values
                            console.log(values);

                            try {
                              const res = await fetch(
                                `${process.env.NEXT_PUBLIC_API_URL}/provider`,
                                {
                                  method: "POST",
                                  headers: {
                                    "Authorization": `Bearer ${token}`,
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    code: values.code,
                                    name: values.name,
                                    contactPhone: values.contactPhone,
                                    contactName: values.contactName,
                                    email: values.email,
                                    addressDetail: values.addressDetail,
                                    role: values.role,
                                    tag: values.tag,
                                    idCard: values.idCard,
                                    wardCode: values.wardCode,
                                  }),
                                }
                              );
                              if (res.ok) {
                                toast.success("Created Gps");
                                const updatedRes = await fetch(
                                  `${process.env.NEXT_PUBLIC_API_URL}/provider`,
                                  {
                                    headers:{
                                        "Authorization": `Bearer ${token}`,
                                    },
                                    method: "GET",
                                  }
                                );

                                if (updatedRes.ok) {
                                  const updatedData = await updatedRes.json();
                                  setProviderAllData(updatedData);
                                } else {
                                  console.error("Failed to fetch updated data");
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
                                name="code"
                                type="text"
                                placeholder="Code"
                                className="border p-3"
                              />
                              {errors.code && touched.code ? (
                                <div className="text-red-500 text-sm">
                                  {errors.code}
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
                                name="contactPhone"
                                type="text"
                                placeholder="Contact Phone (Number)"
                                className="border p-3"
                              />
                              {errors.contactPhone && touched.contactPhone ? (
                                <div className="text-red-500 text-sm">
                                  {errors.contactPhone}
                                </div>
                              ) : null}
                              <Field
                                name="contactName"
                                type="text"
                                placeholder="Contact Name"
                                className="border p-3"
                              />
                              {errors.contactName && touched.contactName ? (
                                <div className="text-red-500  text-sm">
                                  {errors.contactName}
                                </div>
                              ) : null}

                              <Field
                                name="email"
                                type="email"
                                placeholder="Email"
                                className="border p-3"
                              />
                              {errors.email && touched.email ? (
                                <div className="text-red-500 text-sm">
                                  {errors.email}
                                </div>
                              ) : null}
                              <Field
                                name="addressDetail"
                                type="text"
                                placeholder="Address"
                                className="border p-3"
                              />
                              {errors.addressDetail && touched.addressDetail ? (
                                <div className="text-red-500  text-sm">
                                  {errors.addressDetail}
                                </div>
                              ) : null}
                              <Field
                                name="role"
                                type="text"
                                placeholder="Role"
                                className="border p-3"
                              />
                              {errors.role && touched.role ? (
                                <div className="text-red-500 text-sm">
                                  {errors.role}
                                </div>
                              ) : null}
                              <Field
                                name="tag"
                                type="text"
                                placeholder="Tag"
                                className="border p-3"
                              />
                              {errors.tag && touched.tag ? (
                                <div className="text-red-500 text-sm">
                                  {errors.tag}
                                </div>
                              ) : null}
                              <Field
                                name="idCard"
                                type="text"
                                placeholder="Identify card"
                                className="border p-3"
                              />
                              {errors.idCard && touched.idCard ? (
                                <div className="text-red-500  text-sm">
                                  {errors.idCard}
                                </div>
                              ) : null}
                              <Field
                                name="wardCode"
                                type="text"
                                placeholder="Ward Code"
                                className="border p-3"
                              />
                              {errors.wardCode && touched.wardCode ? (
                                <div className="text-red-500  text-sm">
                                  {errors.wardCode}
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
        <CardBody className="mt-5">
          <ProviderTable
            providerData={providerAllData}
            providerInputData={providerInputData}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default ProviderPage;
