import { atom } from "recoil";

export const estadoMenuAtivo = atom({
  key: 'menuAtivo',
  default: false,
})

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

export const estadoRenderizaInfoUsuario = atom({
  key: 'renderizaInfoUsuario',
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

export const estadoEditarPerfil = atom({
  key: 'editarPerfil',
  default: false,
});

export const estadoFinalizarPedido = atom({
  key: 'estadoFinalizarPedido',
  default: false,
});

export const estadoCadastro = atom({
  key: 'estadoCadastro',
  default: {
    nome: '',
    sobrenome: '',
    telefone: '',
  },
});

export const estadoUsuario = atom({
  key: 'estadoUsuario',
  default: null,
});

export const estadoErro = atom({
  key: 'estadoErro',
  default: null,
})

export const estadoErroCadastro = atom({
  key: 'estadoErroCadastro',
  default: null,
});

export const estadoRanking = atom({
  key: 'estadoRanking',
  default: [],
});

export const estadoCheckoutId = atom({
  key: 'estadoCheckoutId',
  default: {},
});

export const estadoCheckoutInfo = atom({
  key: 'estadoCheckoutInfo',
  default: null,
});

export const estadoPedidosUsuario = atom({
  key: 'estadoPedidosUsuario',
  default: null,
});