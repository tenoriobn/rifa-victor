import { Outlet } from "react-router-dom";

export default function ContentLayout() {
  return (
    <section className="px-4 text-white">
      <div className="relative bg-lightGray -top-4 w-full max-w-[42rem] min-h-[718px] m-auto rounded-2xl p-4">
        <Outlet />
      </div>
    </section>
  );
}
