import { useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { transicaoAnimada } from '../util/transicaoAnimada';

export default function ContentLayout() {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.clientWidth;
    }
  }, []);

  const animacao = transicaoAnimada();

  return (
    <section className="px-4 text-white">
      <div className="relative bg-lightGray -top-4 w-full max-w-[42rem] min-h-[718px] m-auto rounded-2xl p-4">
        <div ref={contentRef}>
        <motion.div
          {...animacao}
        >
          <Outlet />
        </motion.div>
        </div>
      </div>
    </section>
  );
}
