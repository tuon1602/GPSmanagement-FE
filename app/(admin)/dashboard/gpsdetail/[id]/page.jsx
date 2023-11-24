"use client";
import React, { useEffect,useState} from "react";
import { useParams } from "next/navigation";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const GPSDetailPage = () => {
  const [gpsDetailData, setGpsDetailData] = useState([]);
  const params = useParams();
  useEffect(() => {
    try {
      const getGpsDetail = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gps/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setGpsDetailData(data);
        }
      };
  
      getGpsDetail();
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);
  useEffect(()=>{
console.log(gpsDetailData);
  },[])
  return (
    <div>
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

          //   try {
          //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gps`, {
          //       method: "POST",
          //       headers: {
          //         "Content-Type": "application/json",
          //       },
          //       body: JSON.stringify({
          //         url: values.url,
          //         name: values.name,
          //         code: values.code,
          //         provider: values.provider,
          //         inventory: values.inventory,
          //         des: values.des,
          //         quantity: values.quantity,
          //         importPrice: values.importPrice,
          //         salePrice: values.salePrice,
          //       }),
          //     });
          //     //   if (!res.ok) {
          //     //     toast.error("Your username or password is incorrect");
          //     //   } else {
          //     //     const data = await res.json();
          //     //     localStorage.setItem("token", data.token);
          //     //     router.push("/dashboard");
          //     //   }
          //   } catch (error) {
          //     console.error(error);
          //   }
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
              <div className="text-red-500 text-sm">{errors.url}</div>
            ) : null}
            <Field
              name="name"
              type="text"
              placeholder="Name"
              className="border p-3"
            />
            {errors.name && touched.name ? (
              <div className="text-red-500 text-sm">{errors.name}</div>
            ) : null}
            <Field
              name="code"
              type="text"
              placeholder="Code"
              className="border p-3"
            />
            {errors.code && touched.code ? (
              <div className="text-red-500  text-sm">{errors.code}</div>
            ) : null}
            <Field
              name="provider"
              type="text"
              placeholder="Provider (Number)"
              className="border p-3"
            />
            {errors.provider && touched.provider ? (
              <div className="text-red-500 text-sm">{errors.provider}</div>
            ) : null}
            <Field
              name="inventory"
              type="text"
              placeholder="Inventory (Number)"
              className="border p-3"
            />
            {errors.inventory && touched.inventory ? (
              <div className="text-red-500 text-sm">{errors.inventory}</div>
            ) : null}
            <Field
              name="des"
              type="text"
              placeholder="Description"
              className="border p-3"
            />
            {errors.des && touched.des ? (
              <div className="text-red-500  text-sm">{errors.des}</div>
            ) : null}
            <Field
              name="quantity"
              type="text"
              placeholder="Quantity (Number)"
              className="border p-3"
            />
            {errors.quantity && touched.quantity ? (
              <div className="text-red-500 text-sm">{errors.quantity}</div>
            ) : null}
            <Field
              name="importPrice"
              type="text"
              placeholder="Price (Number)"
              className="border p-3"
            />
            {errors.importPrice && touched.importPrice ? (
              <div className="text-red-500 text-sm">{errors.importPrice}</div>
            ) : null}
            <Field
              name="salePrice"
              type="text"
              placeholder="Sale Price (Number)"
              className="border p-3"
            />
            {errors.salePrice && touched.salePrice ? (
              <div className="text-red-500  text-sm">{errors.salePrice}</div>
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
    </div>
  );
};

export default GPSDetailPage;
