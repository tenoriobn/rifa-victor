export const transicaoAnimada = () => ({
  initial: { x: -10, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
});

export const transicaoAnimadaMenu = () => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: .3 },
})
