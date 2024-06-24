import { atom } from "recoil";

export const estadoPacoteSelecionado = atom({
  key: 'pacoteSelecionado',
  default: 250,
});

export const estadoValorRange = atom({
  key: 'valorRange',
  default: 35,
});

export const estadoValorCompra = atom({
  key: 'valorCompra',
  default: '7,00',
});