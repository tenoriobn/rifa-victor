import { Outlet } from "react-router-dom";

export default function ContentLayout() {
  return (
    <section className="px-4 text-white">
      <section className="relative bg-secondary -top-4 w-full max-w-[36rem] m-auto rounded-xl p-4">
        <Outlet />
      </section>
    </section>
  );
}
