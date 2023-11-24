"use client";

import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
// app/dashboard/products/import/add/page.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Input, Button, select } from "@nextui-org/react";
// import ImportTable from "@/app/components/admin/product/ImportTable";
import ImportTable from "@/app/components/admin/product/ImportTable";
import OrderTable from "@/app/components/admin/product/OrderTable";
import { PlusSquare, MinusSquare } from "@/app/components/iconWrapper";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { useDisclosure } from "@nextui-org/react";
import { formatToVN } from "@/app/utils/helper";
const ImportPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // 1 la bat modal cho freaking GPS , 0 la provider
  const [modalFlag, setModalFlag] = useState(0);

  // const []
  const [searchTerm, setSearchTerm] = useState("");
  const [getProviders, setGetProviders] = useState("");
  const [getGpsData, setGetGpsData] = useState([]);
  const [selectedGps, setSelectedGps] = useState([]);
  const [getProviderDetail, setProviderDetail] = useState({
    id: "",
    contactName: "",
    code: "",
    email: "",
  });

  const totalQuantity = useMemo(
    () => selectedGps.reduce((acc, curr) => acc + curr.gpsQuantity, 0),
    [selectedGps]
  );
  const totalPrice = useMemo(
    () =>
      formatToVN(
        selectedGps.reduce(
          (acc, curr) => acc + curr.gpsQuantity * curr.importPrice,
          0
        )
      ),
    [selectedGps]
  );

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };
  const handleChooseProvider = (item) => {
    setProviderDetail({
      id: item.id,
      contactName: item.contactName,
      code: item.code,
      email: item.email,
    });
  };

  const handleChooseGps = (item) => {
    setSelectedGps((prev) => [...prev, { ...item, gpsQuantity: 1 }]);
  };
  const handleTotalQuality = (event) => {
    setTotalQuality(event.target.value);
  };

  const handleOnUpdateGPSQuantity = useCallback(
    (item, type) => {
      let temp = [...selectedGps];
      const targetIdx = temp.findIndex((gps) => gps.id === item.id);

      switch (type) {
        case "increase":
          temp[targetIdx].gpsQuantity++;
          break;
        case "decrease":
          if (temp[targetIdx].gpsQuantity === 1) {
            // delete
            temp.splice(targetIdx, 1);
          } else {
            temp[targetIdx].gpsQuantity--;
          }
          break;
      }

      setSelectedGps(temp);
    },
    [selectedGps]
  );

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        if (typeof window !== "undefined") {
          // Perform localStorage action
          const token = localStorage.getItem("token");
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/provider`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              method: "GET",
            }
          );

          if (res.ok) {
            const data = await res.json();
            setGetProviders(data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProviderData(); // Call the async function immediately
  }, []);
  useEffect(() => {
    const fetchGetGpsData = async () => {
      try {
        if (typeof window !== "undefined") {
          // Perform localStorage action
          const token = localStorage.getItem("token");
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gps/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            method: "GET",
          });

          if (res.ok) {
            const data = await res.json();
            setGetGpsData(data);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchGetGpsData(); // Call the async function immediately
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">Import</h1>
      <Tabs aria-label="Options" className="mt-5" size="lg">
        <Tab key="Created import" title="Create import">
          <Card>
            <CardBody>
              <div>
                <div className="mb-10 text-xl font-semibold">
                  IMPORT REQUIREMENT
                </div>
                <div className="flex items-center justify-between p-4 mb-10 border rounded-2xl">
                  <div>
                    <Button size="small" className="ml-10 text-black">
                      CANCEL
                    </Button>
                  </div>
                  <div>
                    <Button size="small" className="mr-10 text-white bg-black">
                      ADD +
                    </Button>
                  </div>
                </div>
                <div className="border rounded-xl">
                  <ImportTable />
                </div>
                <div className="p-5 mt-10 border rounded-2xl">
                  <div className="p-5 mb-5 border rounded-2xl">
                    <div className="flex justify-between mb-3">
                      Provider
                      {getProviderDetail.code &&
                        getProviderDetail.contactName &&
                        getProviderDetail.email && (
                          <Button
                            className="text-white bg-black"
                            onClick={() => {
                              setProviderDetail({
                                contactName: "",
                                code: "",
                                email: "",
                              });
                              setSelectedGps([])
                            }}
                          >
                            Clear
                          </Button>
                        )}
                    </div>
                    <hr
                      width="100%"
                      size="15px"
                      align="center"
                      className="mb-3"
                    />
                    <Button
                      onPress={() => {
                        onOpen();
                        setModalFlag(0);
                      }}
                      className={`${
                        getProviderDetail.contactName &&
                        getProviderDetail.code &&
                        getProviderDetail.email
                          ? "invisible"
                          : "visible"
                      }`}
                    >
                      Add Provider
                    </Button>
                    {getProviderDetail.contactName &&
                      getProviderDetail.code &&
                      getProviderDetail.email && (
                        <div className="flex justify-between">
                          <p>
                            <span className="text-gray-500">Contact Name:</span>{" "}
                            {getProviderDetail.contactName}
                          </p>
                          <p>
                            <span className="text-gray-500">Email: </span>
                            {getProviderDetail.email}
                          </p>
                          <p>
                            <span className="text-gray-500">Code: </span>
                            {getProviderDetail.code}
                          </p>
                        </div>
                      )}
                    <Modal
                      isOpen={isOpen && modalFlag === 0}
                      onOpenChange={onOpenChange}
                      size="4xl"
                    >
                      <ModalContent>
                        {(onClose) => (
                          <>
                            <ModalHeader className="flex flex-col gap-1">
                              Add Provider
                            </ModalHeader>
                            <ModalBody>
                              {getProviders &&
                                getProviders.map((item, index) => (
                                  <div className="mt-2 border border-gray-200 rounded cursor-pointer hover:bg-opacity-50">
                                    <div
                                      className="p-2"
                                      onClick={() => {
                                        handleChooseProvider(item);
                                        onClose();
                                      }}
                                    >
                                      <p className="">{item.contactName}</p>
                                      <p className="text-sm text-gray-500">
                                        {item.email}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                            </ModalBody>
                            <ModalFooter></ModalFooter>
                          </>
                        )}
                      </ModalContent>
                    </Modal>
                  </div>
                  <div className="p-5 mb-5 border rounded-2xl">
                    <div className="mb-3">Products</div>
                    <hr
                      width="100%"
                      size="15px"
                      align="center"
                      className="mb-3"
                    />
                    {getProviderDetail.contactName &&
                      getProviderDetail.code &&
                      getProviderDetail.email && (
                        <div>
                          {selectedGps &&
                            selectedGps.map((item, index) => (
                              <div className="border border-gray-200 rounded my-5 p-4 flex gap-4">
                                <p>
                                  Product:{" "}
                                  <span className="font-bold">{item.name}</span>
                                </p>
                                <p>
                                  Description:{" "}
                                  <span className="font-bold">{item.des}</span>
                                </p>
                                <p>
                                  Price:{" "}
                                  <span className="font-bold">
                                    {formatToVN(item.importPrice)}
                                  </span>
                                </p>
                                <div className="flex gap-2">
                                  <p>Quantity: </p>
                                  <MinusSquare
                                    onClick={() =>
                                      handleOnUpdateGPSQuantity(
                                        item,
                                        "decrease"
                                      )
                                    }
                                  />
                                  <span>{item.gpsQuantity}</span>
                                  <PlusSquare
                                    onClick={() =>
                                      handleOnUpdateGPSQuantity(
                                        item,
                                        "increase"
                                      )
                                    }
                                  />
                                </div>
                                <p>
                                  TotalCost:
                                  <span className="font-bold">
                                    {formatToVN(
                                      item.importPrice * item.gpsQuantity
                                    )}
                                  </span>
                                </p>
                              </div>
                            ))}
                          <Button
                            className="text-white bg-black"
                            onPress={() => {
                              onOpen();
                              setModalFlag(1);
                            }}
                          >
                            Select GPS
                          </Button>
                          <Modal
                            isOpen={isOpen && modalFlag === 1}
                            onOpenChange={onOpenChange}
                          >
                            <ModalContent>
                              {(onClose) => (
                                <>
                                  <ModalHeader className="flex flex-col gap-1">
                                    Add Product
                                  </ModalHeader>
                                  <ModalBody>
                                    {getGpsData &&
                                      getGpsData
                                        .filter(
                                          (item) =>
                                            item.provider ===
                                              getProviderDetail.id &&
                                            !selectedGps.some(
                                              (gps) => gps.id == item.id
                                            )
                                        )
                                        .map((item, index) => (
                                          <div className="mt-2 border border-gray-200 rounded cursor-pointer hover:bg-opacity-50">
                                            <div
                                              className="p-2"
                                              onClick={() => {
                                                handleChooseGps(item);
                                                onClose();
                                              }}
                                            >
                                              <p className="">{item.name}</p>
                                              <p className="text-sm text-gray-500">
                                                {formatToVN(item.importPrice)}
                                              </p>
                                            </div>
                                          </div>
                                        ))}
                                  </ModalBody>
                                </>
                              )}
                            </ModalContent>
                          </Modal>
                        </div>
                      )}
                  </div>
                  <div className="flex mb-3">
                    <div>Total quantity</div>
                    <div className="ml-[200px]">{totalQuantity}</div>
                  </div>
                  <hr width="20%" size="15px" align="center" className="my-3" />
                  <div className="flex mb-3">
                    <div>Total price</div>
                    <div className="ml-[224px]">{totalPrice} vnd</div>
                  </div>
                  <hr width="20%" size="15px" align="center" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="History" title="History">
          <Card>
            <CardBody>
              <div>
                <div className="flex items-center justify-between p-4 mb-4 border rounded-2xl">
                  <div>
                    <Input
                      placeholder="Search by brand name"
                      value={searchTerm}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="ml-10"
                    />
                  </div>
                  <div>
                    <Button size="small" className="mr-10 text-white bg-black">
                      ADD +
                    </Button>
                  </div>
                </div>

                <div className="p-10 border rounded-2xl">
                  <OrderTable />
                </div>
                <div></div>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ImportPage;
