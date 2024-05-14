import { Outlet } from "react-router-dom";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";
import { useState } from "react";

export default function AdminLayout() {
  const [isSidebarActive, setIsSidebarActive] = useState(() => false);

  return (
    <div className="">
      <Header
        isSidebarActive={isSidebarActive}
        toggleSidebar={() => toggleSidebar(setIsSidebarActive)}
      />

      <Sidebar
        toggleSidebar={() => toggleSidebar(setIsSidebarActive)}
        isSidebarActive={isSidebarActive}
      />

      <main
        className={`main lg:ml-20 mt-20 transition-all duration-200 block p-3 lg:p-4 bg-[#F5F5F5] ${
          isSidebarActive && "lg:ml-40"
        }`}
      >
        <section>
          <div className="p-3 pt-6 pb-6 bg-white rounded-lg shadow-md">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
}

function toggleSidebar(setIsSidebarActive) {
  setIsSidebarActive((prevSidebarActive) => !prevSidebarActive);
}
