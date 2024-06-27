import { atom } from "recoil";
// import listaProdutos from "../data/produtos.json"

export const estadoPacoteSelecionado = atom({
  key: 'pacoteSelecionado',
  default: 250,
});

export const estadoValorRange = atom({
  key: 'valorRange',
  default: 0,
});

export const estadoValorCompra = atom({
  key: 'valorCompra',
  default: '7,00',
});

export const estadoTermosAceito = atom({
  key: 'termosAceito',
  default: false,
});

export const estadoFormularioPreenchido = atom({
  key: 'formularioPreenchido',
  default: false,
});

export const estadoRenderizaComponenteCadastro = atom({
  key: 'renderizaComponenteCadastro',
  default: false,
});

export const estadoRenderizaComponenteLogin = atom({
  key: 'renderizaComponenteLogin',
  default: false,
});

export const estadoProdutos = atom({
  key: 'produtos',
  default: [],
})

export const estadoProdutoSelecionado = atom({
  key: 'produtoSelecionado',
  default: {},
});

export const estadoRegulamento = atom({
  key: 'regulamento',
  default: {},
});

export const estadoGanhadores = atom({
  key: 'ganhadores',
  default: {},
});

export const estadoRifa = atom({
  key: 'rifa',
  default: '',
});