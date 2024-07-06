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