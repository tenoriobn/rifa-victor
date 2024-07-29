import { atom } from "recoil";

export const stateUserDate = atom({
  key: 'stateUserDate',
  default: {}
})

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

export const stateNovoGanhador = atom({
  key: 'stateNovoGanhador',
  default: {},
})

export const stateNovoGanhadorInfo = atom({
  key: 'stateNovoGanhadorInfo',
  default: {},
})

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

export const stateOpenModalNovaImagem = atom({
  key: 'stateOpenModalNovaImagem',
  default: false,
});

export const stateOpenModalAdicionarNumeros = atom({
  key: 'stateOpenModalAdicionarNumeros',
  default: false,
});

export const stateOpenModalAdicionarBilhetePremiado = atom({
  key: 'stateOpenModalAdicionarBilhetePremiado',
  default: false,
});

export const stateInfoRifaForm = atom({
  key: 'stateInfoRifaForm',
  default: {
    emphasis: "nao",
    show_site :  "sim",
    show_top: "nao",
    rifa_payment: {
      gateway: "mercadopago"
    },
    rifa_awarded: {
      cotas_double: "nao"
    },
    rifa_others: {
      nota_fiscal: "nao"
    }
    // title: "",
    // description_resume: "",
    // show_site: "sim",
    // emphasis: "",
    // show_top: "sim",
    // video: "",
    
    // // SomenteEditar
    // qtd_cotas_geral: "",
    // qtd_digit_cotas: "",
    // // SomenteEditar
    // qntd_cota: "",
    // price: "",
    // qntd_cota_min_order: "",
    // qntd_cota_max_order: "",
    // qntd_cota_max_client: "",

    // data_sortition: "",
    // initial_sale: "",
    // end_sale: "",
    // time_pay: "",
    // gateway: "mercadopago", 
    // service_charge: "", 
    // text_service_charge: "",

    // // SomenteEditar
    // cotas_double: "nao",
    // text_cotas_double: "",
    // // SomenteEditar
    // title_cotas_awarded: "",
    // description_cotas_awarded: "",
    // title_upsell: "",
    // description_upsell: "",

    // facebook_pixel: "",
    // facebook_token: "",
    // tiktok_pixel: "",

    // whatsapp_group: "",
    // link_ebook: "",
    // nota_fiscal: "nao",

    // description_product: "",
    // description_sortition: "",
    // description_role: "",
    // description_order_approve: "",
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


export const stateVisibilidadeColunaTabelaRanking = atom({
  key: 'stateVisibilidadeColunaTabelaRanking',
  default: {
    posicao: true,
    cliente: true,
    telefone: true,
    cidade: true,
    sorteio: true,
    quantidade: true,
    total: true,
    acoes: true,
  },
});

export const stateNovoUsuario = atom({
  key: 'stateNovoUsuario',
  default: {},
})

export const stateEditarUsuario = atom({
  key: 'stateEditarUsuario',
  default: {},
})

export const stateUsuarioInfoTable = atom({
  key: 'stateUsuarioInfoTable',
  default: [],
})
export const stateFiltroSorteio = atom({
  key: 'stateFiltroSorteio',
  default: {},
})

export const stateIdModalAcoesSorteio = atom({
  key: 'stateIdModalAcoesSorteio',
  default: '',
})

export const stateIdModal = atom({
  key: 'stateIdModal',
  default: '',
})

export const stateTabelaCotasInfo = atom({
  key: 'stateTabelaCotasInfo',
  default: [],
});

export const stateCotasPremiadas = atom({
  key: 'stateCotasPremiadas',
  default: {qntd_cota: '', award: '', show_site: 'sim', status: 'disponivel'},
});

export const stateImagensRifa = atom({
  key: 'stateImagensRifa',
  default: [],
});

export const stateImagemRifaUpload = atom({
  key: 'stateImagemRifaUpload',
  default: '',
});


export const stateTabelaPacotesInfo = atom({
  key: 'stateTabelaPacotesInfo',
  default: [],
});

export const statePacote = atom({
  key: 'statePacote',
  default: {
    cod_promo: "",
    popular: "sim",
    qntd_cota: null,
    rifas_id: null,
    valor_total: null,
    value_cota: 0,
    status: "Ativo"
  },
});

export const statePedidosInfo = atom({
  key: 'statePedidosInfo',
  default: []
})

export const statePedidosInfoModal = atom({
  key: 'statePedidosInfoModal',
  default: {}
})

export const stateClientesInfo = atom({
  key: 'stateClientesInfo',
  default: []
})

export const stateClienteInfoModal = atom({
  key: 'stateClienteInfoModal',
  default: {}
})

export const openModalVerInfoCliente = atom({
  key: 'openModalVerInfoCliente',
  default: false
})

export const stateOpenModalEditarInfoCliente = atom({
  key: 'stateOpenModalEditarInfoCliente',
  default: false
})

// export const PedidosInfoModal = atom({
//   key: 'statePedidosInfoModal',
//   default: []
// })

export const stateTabelaSorteioInfo = atom({
  key: 'stateTabelaSorteioInfo',
  default: [],
});

export const stateRankingInfoTable = atom({
  key: 'stateRankingInfoTable',
  default: []
})

export const stateRankingInfoModal = atom({
  key: 'stateRankingInfoModal',
  default: {}
})


// SUPER ADMIN -> Definir Ganhador
export const stateInfoCotaSorteada = atom({
  key: 'stateInfoCotaSorteada',
  default: '',
});

export const stateAtualizaTableInfoCotaSorteada = atom({
  key: 'stateAtualizaTableInfoCotaSorteada',
  default: false,
});

export const stateInfoBilhetePremiado = atom({
  key: 'stateInfoBilhetePremiado',
  default: '',
});

export const stateInfoAdicionarNumeros = atom({
  key: 'stateInfoAdicionarNumeros',
  default: '',
});

export const stateOptionsRifa = atom({
  key: 'stateOptionsRifa',
  default: [],
});

export const stateConfigPagamento = atom({
  key: ' stateConfigPagamento',
  default: {},
})

export const stateConfigPagamentoTable = atom({
  key: ' stateConfigPagamentoTable',
  default: {},
})

export const stateUpsellInfo = atom({
  key: 'stateUpsellInfo',
  default: {},
})

export const stateUpsellInfoTable = atom({
  key: 'stateUpsellInfoTable',
  default: [],
})

export const stateConsultaCota = atom({
  key: 'stateConsultaCota',
  default: {},
})

export const stateAtualizaTableConsultaCota = atom({
  key: 'stateAtualizaTableConsultaCota',
  default: [],
})

export const stateVendasOrderFilter = atom({
  key: 'stateVendasOrderFilter',
  default: {},
})

export const stateDadosVendas = atom({
  key: 'stateDadosVenda',
  default: {},
})

export const stateOpenModalAdicionarAfiliados = atom({
  key: 'stateOpenModalAdicionarAfiliados',
  default: false,
});

export const stateOpenModalVerAfiliados = atom({
  key: 'stateOpenModalVerAfiliados',
  default: false,
});

export const stateOpenModalEditarAfiliados = atom({
  key: 'stateOpenModalEditarAfiliados',
  default: false,
});

export const stateAfiliadosInfoModal = atom({
  key: 'stateAfiliadosInfoModal',
  default: {},
});
