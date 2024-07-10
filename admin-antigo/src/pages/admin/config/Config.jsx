import React, { useEffect } from "react";
import UseForm from "./UseForm";
import Input from "./Input";
import { sendRequest } from "../../../util/util";

export default function Config() {
  const nomePlataforma = UseForm("text");
  const nomeSite = UseForm("text");
  const logoSite = UseForm("file");
  const favIcon = UseForm("file");
  const linkWpp = UseForm("text");
  const linkInsta = UseForm("text");
  const email = UseForm("text");
  const tokenPublicMercadoPago = UseForm("text");
  const tokenMercadoPago = UseForm("text");
  const senha = UseForm("text");
  const pixel = UseForm("text");

  function loadData(data) {
    nomePlataforma.setValue(data.plataform_name);
    nomeSite.setValue(data.site_name);
    linkWpp.setValue(data.whatsapp_link);
    linkInsta.setValue(data.instagram_link);
    email.setValue(data.email);
    tokenPublicMercadoPago.setValue(data.mercadoPagoPublic);
    tokenMercadoPago.setValue(data.mercadoPagoAccessToken);
    pixel.setValue(data.meta_pixel);
  }

  useEffect(() => {
    async function getData() {
      try {
        const requestApiData = {
          method: "GET",
          url: "site-config",
        };
        const { data } = await sendRequest(requestApiData);
        if (data) {
          loadData(data);
        }
      } catch (error) {
        window.alert(`Houve um erro no servidor ${error}`);
      }
    }
    getData();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const isNomePlataformaValid = nomePlataforma.validate();
    const isNomeSite = nomeSite.validate();
    const isLinkWpp = linkWpp.validate();
    const isLinkInsta = linkInsta.validate();
    const isEmail = email.validate();
    const isTokenPublicMercadoPago = tokenPublicMercadoPago.validate();
    const isTokenMercadoPago = tokenMercadoPago.validate();
    const isPixel = pixel.validate();

    if (
      isNomePlataformaValid &&
      isNomeSite &&
      isLinkWpp &&
      isLinkInsta &&
      isEmail &&
      isTokenMercadoPago &&
      isTokenPublicMercadoPago &&
      isPixel
    ) {
      const formDataToSend = new FormData();
      formDataToSend.append("plataforma", nomePlataforma.value);
      formDataToSend.append("nomesite", nomeSite.value);
      if (logoSite.value) {
        formDataToSend.append("logosite", logoSite.value);
      }
      if (favIcon.value) {
        formDataToSend.append("faviconsite", favIcon.value);
      }
      formDataToSend.append("linkwppsite", linkWpp.value);
      formDataToSend.append("linkinstasite", linkInsta.value);
      formDataToSend.append("email", email.value);
      if (senha.length !== 0) {
        formDataToSend.append("password", senha.value);
      }
      formDataToSend.append("publickeymercado", tokenPublicMercadoPago.value);
      formDataToSend.append("secretmercadopago", tokenMercadoPago.value);
      formDataToSend.append("pixel", pixel.value);

      const requestApiData = {
        method: "POST",
        url: "site-config",
        body: formDataToSend,
        dataForm: true,
      };

      try {
        const response = await sendRequest(requestApiData);

        if (!response.success) {
          window.alert(response.msg);
          return;
        }
        window.alert("Dados atualizados com sucesso!")
        // window.location.href = '/rifas';
      } catch (error) {
        window.alert(`Houve um erro no servidor ${error}`);
      }
    } else {

    }
  }

  return (
    <>
      <section>
        <h1 className="text-2xl text-center text-blue-900 font-bold sm:text-3xl lg:text-4xl">
          Configuração
        </h1>

        <form
          className="flex flex-col gap-4 relative"
          encType="multipart/form-data"
          noValidate
          onSubmit={handleSubmit}
        >
          <Input
            label="Nome"
            id="nome"
            type="text"
            placeholder="Nome"
            {...nomeSite}
          />

          <Input
            label="Nome da Plataforma"
            id="nomePlataforma"
            type="text"
            placeholder="Digite um nome"
            {...nomePlataforma}
          />
          <Input label="Logo Site" id="logoSite" type="file" {...logoSite} />
          <Input label="Favicon" id="favIcon" type="file" {...favIcon} />

          <Input
            label="Link Whatsapp"
            id="wpp"
            type="text"
            placeholder="Grupo Whatsapp"
            {...linkWpp}
          />

          <Input
            label="Link Instagram"
            id="nome"
            type="text"
            placeholder="Grupo Whatsapp"
            {...linkInsta}
          />

          <Input
            label="E-mail"
            id="email"
            type="text"
            placeholder="Seu e-mail"
            {...email}
          />

          <Input
            label="Senha"
            id="senha"
            type="text"
            placeholder="Sua Senha"
            {...senha}
          />

          <Input
            label="Acesso Token public (Mercado Pago)"
            id="tokenPublic"
            type="text"
            placeholder="Token Public"
            {...tokenPublicMercadoPago}
          />

          <Input
            label="Acesso Token (Mercado Pago)"
            id="token"
            type="text"
            placeholder="Token"
            {...tokenMercadoPago}
          />

          <Input
            label="Pixel"
            id="pixel"
            type="text"
            placeholder="pixel"
            {...pixel}
          />

          <button type="submit" className="p-2 font-bold text-white bg-blue-900 rounded-lg text-base hover:bg-blue-950 transition-all duration-200">
            Salvar
          </button>
        </form>
      </section>
    </>
  );
}
