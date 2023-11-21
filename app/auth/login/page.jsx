"use client";
import React, { useEffect } from "react";
import { X } from "@/app/components/IconWrapper";

const ModalComponent = () => {
  const [tab, setTab] = React.useState(0); // 0 is login and 1 is logup

  useEffect(() => {
    const modal = document.getElementById("my_modal_1");

    const openModal = () => {
      modal.showModal();
    };

    const closeModal = () => {
      modal.close();
    };

    document
      .getElementById("openModalBtn")
      .addEventListener("click", openModal);
    document
      .getElementById("closeModalBtn")
      .addEventListener("click", closeModal);

    return () => {
      // Cleanup event listeners when component unmounts
      document
        .getElementById("openModalBtn")
        .removeEventListener("click", openModal);
      document
        .getElementById("closeModalBtn")
        .removeEventListener("click", closeModal);
    };
  }, []);

  const handleLogin = () => {
    // Xử lý đăng nhập ở đây, có thể sử dụng API hoặc các phương thức xác thực khác
    console.log("Đăng nhập với Email:", email, "và Password:", password);
  };

  return (
    <div>
      <button id="openModalBtn" className="btn">
        Open Modal
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div role="tablist" className="relative bg-white tabs tabs-bordered">
            <div id="closeModalBtn" className="absolute top-0 right-0 bg-white">
              <X />
            </div>

            {/* Tab LOGIN */}
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="LOGIN"
              onClick={() => setTab(0)}
              checked={tab === 0}
            />
            <div role="tabpanel" className="p-10 tab-content">
              <div className="p-8 bg-white rounded shadow-md w-full">
                <h2
                  className={`mb-4 text-lg font-semibold ${
                    tab === 0 ? "text-black" : "text-gray-500"
                  } text-center`}
                >
                  WELCOME TO OUR GPS SERVICE
                </h2>
                <form>
                  <div className="mb-4">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={""}
                      placeholder="Your email/IMEI"
                      onChange={() => {}}
                      className="w-full p-2 mt-1"
                      required
                    />
                    <hr width="100%" size="15px" align="center" />
                  </div>

                  <div className="mb-4">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={""}
                      placeholder="password"
                      onChange={() => {}}
                      className="w-full p-2 mt-1 text-black"
                      required
                    />
                    <hr width="100%" size="15px" align="center" />
                  </div>

                  <div className="flex items-center justify-between mb-4">
                      <a href="#" className="underline">
                        Forgot Password?
                      </a>
                  </div>



                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2 underline" />
                      Remember me
                    </label>
                  </div>

                  <div className="flex items-center justify-between pt-5">
                    <button
                      type="button"
                      onClick={handleLogin}
                      className="px-4 py-2 bg-white-500 text-black border"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Tab LOGUP */}
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="LOGUP"
              onClick={() => setTab(1)}
              checked={tab === 1}
            />
            <div role="tabpanel" className="p-10 tab-content">
              <h2
                className={`mb-4 text-lg font-semibold ${
                  tab === 1 ? "text-black" : "text-gray-500"
                } text-center`}
              >
                LOGUP
              </h2>
              {/* ... Các trường logup khác */}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ModalComponent;
