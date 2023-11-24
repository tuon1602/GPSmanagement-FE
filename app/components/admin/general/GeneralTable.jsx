"use client";
import React, { useState, useEffect } from "react";
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
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const createCategory = Yup.object().shape({
  name: Yup.string().required("Required"),
  code: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const GeneralTable = () => {
  const token = localStorage.getItem("token");
  const [categoryData, setCategoryData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof window !== "undefined") {
          // Perform localStorage action
          const token = localStorage.getItem("token");
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/category/`,
            {
              headers:{
                "Authorization": `Bearer ${token}`
              },
              method: "GET",
            }
          );
          if (res.ok) {
            const data = await res.json();
            setCategoryData(data);
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
  const handleDeleteCategory = async (id) => {
    const deleteConfirm = window.confirm("Are you sure you want to delete");
    if (!deleteConfirm) {
      return;
    } else {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/category/${id}`,
          {
            method: "DELETE",
          }
        );
        if (res.ok) {
          const updatedRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/category/`,
            {
              headers:{
                "Authorization": `Bearer ${token}`
              },
              method: "GET",
            }
          );

          if (updatedRes.ok) {
            const updatedData = await updatedRes.json();
            setCategoryData(updatedData);
          } else {
            console.error("Failed to fetch updated data");
          }
        }
      } catch (error) {
        console.error("Error fetching category");
      }
    }
  };
  return (
    <div>
      <ToastContainer />
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
                  <Formik
                    initialValues={{
                      name: "",
                      code: "",
                      description: "",
                    }}
                    validationSchema={createCategory}
                    onSubmit={async (values) => {
                      // same shape as initial values
                      console.log(values);
                      // const username = values.username;
                      // const password = values.password;
                      try {
                        const res = await fetch(
                          `${process.env.NEXT_PUBLIC_API_URL}/category`,
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              name: values.name,
                              code: values.code,
                              description: values.description,
                            }),
                          }
                        );
                        if (res.ok) {
                          toast.success("Created category");
                          const updatedRes = await fetch(
                            `${process.env.NEXT_PUBLIC_API_URL}/category/`,
                            {
                              headers:{
                                "Authorization": `Bearer ${token}`
                              },
                              method: "GET",
                            }
                          );

                          if (updatedRes.ok) {
                            const updatedData = await updatedRes.json();
                            setCategoryData(updatedData);
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
                          name="name"
                          type="text"
                          placeholder="Title"
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
                          <div className="text-red-500 text-sm">
                            {errors.code}
                          </div>
                        ) : null}
                        <Field
                          name="description"
                          type="text"
                          placeholder="Description"
                          className="border p-3"
                        />
                        {errors.description && touched.description ? (
                          <div className="text-red-500  text-sm">
                            {errors.description}
                          </div>
                        ) : null}
                        <button
                          type="submit"
                          className="border-none py-2 rounded hover:opacity-75 bg-slate-500"
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
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>General Title</TableColumn>
          <TableColumn>Code</TableColumn>
          <TableColumn>Descripion</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {categoryData &&
            categoryData.map((item, index) => (
              <TableRow>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell className="flex gap-5">
                  <PenLine  />
                  <button className="cursor-pointer" onClick={() => handleDeleteCategory(item.id)}>
                    <Trash2 />
                  </button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GeneralTable;
