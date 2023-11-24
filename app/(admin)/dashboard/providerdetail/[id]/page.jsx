"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const GPSDetailPage = () => {
  // Perform localStorage action

  const [providerData, setProviderData] = useState({
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
  });
  const params = useParams();
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const getProviderDetail = async () => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/provider/${params.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setProviderData(data);
        }
      };

      getProviderDetail();
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/provider/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            code: providerData.code,
            name: providerData.name,
            contactPhone: providerData.contactPhone,
            contactName: providerData.contactName,
            email: providerData.email,
            addressDetail: providerData.addressDetail,
            role: providerData.role,
            tag: providerData.tag,
            idCard: providerData.idCard,
            wardCode: providerData.wardCode,
            // Add other fields you want to update
          }),
        }
      );

      if (response.ok) {
        toast.success("Your Provider has been updated");
        window.location.replace("/dashboard/products/provider");
      } else {
        toast.error("Your Provider update failed");
      }
    } catch (error) {
      console.error("Error updating provider:", error);
    }
  };
  return (
    <div className="flex flex-col gap-5">
      <ToastContainer />
      <Input
        type="text"
        label="Code"
        placeholder="Provider Code"
        labelPlacement="outside"
        value={providerData.code}
        onChange={(e) =>
          setProviderData({ ...providerData, code: e.target.value })
        }
      />
      <Input
        type="text"
        label="name"
        placeholder="Provider Name"
        labelPlacement="outside"
        value={providerData.name}
        onChange={(e) =>
          setProviderData({ ...providerData, name: e.target.value })
        }
      />
      <Input
        type="text"
        label="Contact Phone"
        placeholder="Contact Phone"
        labelPlacement="outside"
        value={providerData.contactPhone}
        onChange={(e) =>
          setProviderData({ ...providerData, contactPhone: e.target.value })
        }
      />
      <Input
        type="text"
        label="Contact Name"
        placeholder="Contact Name"
        labelPlacement="outside"
        value={providerData.contactName}
        onChange={(e) =>
          setProviderData({ ...providerData, contactName: e.target.value })
        }
      />
      <Input
        type="email"
        label="Email"
        placeholder="Email"
        labelPlacement="outside"
        value={providerData.email}
        onChange={(e) =>
          setProviderData({ ...providerData, email: e.target.value })
        }
      />
      <Input
        type="text"
        label="Address Detail"
        placeholder="Address"
        labelPlacement="outside"
        value={providerData.addressDetail}
        onChange={(e) =>
          setProviderData({ ...providerData, addressDetail: e.target.value })
        }
      />
      <Input
        type="text"
        label="Role"
        placeholder="Role"
        labelPlacement="outside"
        value={providerData.role}
        onChange={(e) =>
          setProviderData({ ...providerData, role: e.target.value })
        }
      />
      <Input
        type="text"
        label="Tag"
        placeholder="Tag"
        labelPlacement="outside"
        value={providerData.tag}
        onChange={(e) =>
          setProviderData({ ...providerData, tag: e.target.value })
        }
      />
      <Input
        type="text"
        label="Identify Card"
        placeholder="Identify Card"
        labelPlacement="outside"
        value={providerData.idCard}
        onChange={(e) =>
          setProviderData({ ...providerData, idCard: e.target.value })
        }
      />
      <Input
        type="text"
        label="Ward Code"
        placeholder="Ward Code"
        labelPlacement="outside"
        value={providerData.wardCode}
        onChange={(e) =>
          setProviderData({ ...providerData, wardCode: e.target.value })
        }
      />

      <Button className="text-white bg-black" onClick={handleUpdate}>
        Update
      </Button>
    </div>
  );
};

export default GPSDetailPage;
