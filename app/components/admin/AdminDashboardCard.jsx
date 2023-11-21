import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
const AdminDashboardCard = (props) => {
  const backGroundColor=props.iconColor
  console.log(backGroundColor)
  return (
    <div>
      <div className="w-[268px] border-1 rounded-small h-[120px] flex justify-center items-center">
        <div className="p-5 flex gap-5 content-center items-center">
          <div className="">
            <p className={`rounded-full p-4 bg-[#4424]`}>
              <span className={`bg-[${props.iconColor}]`}>{props.icon}</span>
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">{props.number}</h2>
            <p>{props.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCard;
