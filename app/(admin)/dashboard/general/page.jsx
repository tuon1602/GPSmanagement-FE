import React from "react";
import AdminNavigation from "@/app/components/admin/AdminNavigation";
import AdminGeneral from "@/app/components/admin/AdminGeneral";

const page = () => {
  return (
    <div>
      {/* <div className="flex gap-5 w-screen">
        <div className="p-5">
          <div className="h-full fixed">
            <AdminNavigation />
          </div>
        </div>
        <div className="flex-1 p-5 ml-64">
          <AdminGeneral/>
        </div>
      </div> */}
      <AdminGeneral/>
    </div>
  );
};

export default page;
