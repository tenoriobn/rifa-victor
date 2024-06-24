import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Hero() {
  return (
    <div className="flex flex-col gap-6">
      <article className="rounded-xl bg-darkerBlue flex flex-col gap-2">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
        >
        <SwiperSlide>
          <img className="max-h-[572px]" src="https://imagedelivery.net/TuyDlh37fwpu3jSKwZ3-9g/1242c2aa-3ab5-46d0-9ebe-813df3e51900/rifa" alt="Slide 1" />
        </SwiperSlide>
            
        </Swiper>

        <article className="px-2 pb-2 flex flex-col gap-2">
          <h1 className="font-bold text-sm text-white sm:text-base">
            TITULO
          </h1>
          <mark className="px-2 py-1 text-xs font-bold bg-customGreen rounded text-white w-fit sm:text-sm">
            STATUS
          </mark>
        </article>
      </article>

      <article className="flex justify-center">
        <h2 className="text-sm font-normal md:text-base">
          POR APENAS{" "}
          <mark className="bg-darkBlue py-1 px-2 font-bold text-white rounded">
            R$ 5,00
          </mark>
        </h2>
      </article>

      <Link
        to="/meus-numeros"
        className="flex gap-1 items-center w-full bg-customBlue rounded-lg justify-center p-1 normal-transition cursor-pointer hover:bg-darkBlue sm:p-2"
      >
        <i className="icon-search text-lg sm:text-2xl"></i>
        <h2 className="font-bold text-sm sm:text-base">VER MEUS NÚMEROS</h2>
      </Link>

      <article className="flex gap-2 items-center text-sm sm:text-base">
        <h2 className="font-normal">Sorteio</h2>
        <mark className="py-1 px-2 font-bold rounded-lg text-white bg-[rgb(255,255,255,.5)]">
          15/12/2023
        </mark>
      </article>
    </div>
  );
}
