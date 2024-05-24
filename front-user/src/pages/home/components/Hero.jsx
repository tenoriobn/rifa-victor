import { Link } from "react-router-dom";
import imgRifa from "../../../../public/assets/images/exRifa.jpg";

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

export default function Hero(props) {
  return (
    <section>
      <div className="flex flex-col gap-6">
        <article className="rounded-xl bg-darkerBlue flex flex-col gap-2">
          {/* <picture>
            <img
              src={props.rifaData.thumbnail}
              alt="Produto da Rifa"
              className="rounded-t-xl w-full max-h-[576px] object-cover"
            />
          </picture> */}

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation
          >
            <SwiperSlide>
              <img className="max-h-[572px]" src={imgRifa} alt="Slide 1" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="max-h-[572px]" src={imgRifa} alt="Slide 2" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="max-h-[572px]" src={imgRifa} alt="Slide 3" />
            </SwiperSlide>
            <SwiperSlide>
              <img className="max-h-[572px]" src={imgRifa} alt="Slide 4" />
            </SwiperSlide>
          </Swiper>

          <article className="px-2 pb-2 flex flex-col gap-2">
            <h1 className="font-bold text-sm text-white sm:text-base">
              {props.rifaData.title}
            </h1>
            <mark className="px-2 py-1 text-xs font-bold bg-customGreen rounded text-white w-fit sm:text-sm">
              {props.rifaData.rifaStatus}
            </mark>
          </article>
        </article>

        <article className="flex justify-center">
          <h2 className="text-sm font-normal md:text-base">
            POR APENAS{" "}
            <mark className="bg-darkBlue py-1 px-2 font-bold text-white rounded">
              R$ {props.rifaData.price}
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
            {props.rifaData.rifaDate}
          </mark>
        </article>
      </div>
    </section>
  );
}
