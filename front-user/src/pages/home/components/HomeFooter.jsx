export default function HomeFooter(props) {
  return (
    <footer
      onClick={() => props.openPaymentContainer()}
      className="flex items-center justify-center duration-300 transition-all hover:bg-green-800 gap-2 bg-green-700 p-4 cursor-pointer fixed left-0 right-0 bottom-0"
    >
      <p className="font-bold text-base text-white">COMPRAR AGORA</p>

      <mark className="bg-transparent text-white font-bold">
        R${props.rifaPrice.toFixed(2)}
      </mark>
    </footer>
  );
}
