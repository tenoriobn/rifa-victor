import { atom } from "recoil";

export const stateMenuActive = atom({
  key: 'menuActive',
  default: false,
});

export const stateUserLogin = atom({
  key: 'userLogin',
  default: null
})

export const stateOpenModalAcoesSorteio = atom({
  key: 'stateOpenModalAcoesSorteio',
  default: false,
});

export const stateOpenModalAdicionarCota = atom({
  key: 'stateOpenModalAdicionarCota',
  default: false,
});

export const stateOpenModalCotaPremiada = atom({
  key: 'stateOpenModalCotaPremiada',
  default: false,
});

export const stateOpenModalEditarCotaPremiada = atom({
  key: 'stateOpenModalEditarCotaPremiada',
  default: false,
});


export const stateOpenModalAdicionarPacote = atom({
  key: 'stateOpenModalAdicionarPacote',
  default: false,
});

export const stateOpenModalEditarPacote = atom({
  key: 'stateOpenModalEditarPacote',
  default: false,
});

export const stateOpenModalAdicionarUpsell = atom({
  key: 'stateOpenModalAdicionarUpsell',
  default: false,
});

export const stateOpenModalEditarUpsell = atom({
  key: 'stateOpenModalEditarUpsell',
  default: false,
});

export const stateOpenModalAdicionarUsuario = atom({
  key: 'stateOpenModalAdicionarUsuario',
  default: false,
});

export const stateOpenModalEditarUsuario = atom({
  key: 'stateOpenModalEditarUsuario',
  default: false,
});

export const stateOpenModalAdicionarConfPagamento = atom({
  key: 'stateOpenModalAdicionarConfPagamento',
  default: false,
});

export const stateOpenModalEditarConfPagamento = atom({
  key: 'stateOpenModalEditarConfPagament',
  default: false,
});

export const stateOpenModalNovoGanhador = atom({
  key: 'stateOpenModalAdicionarGanhador',
  default: false,
});

export const stateOpenModalEditarGanhador = atom({
  key: 'stateOpenModalEditarGanhador',
  default: false,
});

export const stateInfoRifaForm = atom({
  key: 'stateInfoRifaForm',
  default: {},
});