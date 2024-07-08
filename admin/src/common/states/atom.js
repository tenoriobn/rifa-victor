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

export const stateOpenModalTrocarBilhete = atom({
  key: 'stateOpenModalTrocarBilhete',
  default: false,
});

export const stateOpenModalVerCota = atom({
  key: 'stateOpenModalVerCota',
  default: false,
});

export const stateOpenModalVerInfoCliente = atom({
  key: 'stateOpenModalVerInfoCliente',
  default: false,
});

export const stateInfoRifaForm = atom({
  key: 'stateInfoRifaForm',
  default: {
    title: "",
    description_resume: "",
    show_site: "sim",
    emphasis: "",
    show_top: "sim",
    video: "",
    
    // SomenteEditar
    qtd_cotas_geral: "",
    qtd_digit_cotas: "",
    // SomenteEditar
    qntd_cota: "",
    price: "",
    qntd_cota_min_order: "",
    qntd_cota_max_order: "",
    qntd_cota_max_client: "",

    data_sortition: "",
    initial_sale: "",
    end_sale: "",
    time_pay: "",
    gateway: "mercadopago", 
    service_charge: "", 
    text_service_charge: "",

    // SomenteEditar
    double_quota: "nao",
    double_quota_text: "",
    // SomenteEditar
    title_cotas_awarded: "",
    description_cotas_awarded: "",
    title_upsell: "",
    description_upsell: "",

    facebook_pixel: "",
    facebook_token: "",
    tiktok_pixel: "",

    whatsapp_group: "",
    link_ebook: "",
    nota_fiscal: "sim",

    description_product: "",
    description_sortition: "",
    description_role: "",
    description_order_approve: "",
  },
});

export const stateFiltroUsuarioTable = atom({
  key: 'stateFiltroUsuarioTable',
  default: {},
})

export const stateSiteConfig = atom({
  key: 'stateSiteConfig',
  default: {},
})