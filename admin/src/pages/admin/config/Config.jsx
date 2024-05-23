import React from "react";
import UseForm from "./UseForm";
import Input from "./Input";

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



  function handleSubmit(event) {
    event.preventDefault();
    const isNomePlataformaValid = nomePlataforma.validate();
    const isLogoSiteValid = logoSite.validate();
    const isFavIconValid = favIcon.validate();
    const isNomeSite = nomeSite.validate();
    const isLinkWpp = linkWpp.validate();
    const isLinkInsta = linkInsta.validate();
    const isEmail = email.validate();
    const isTokenPublicMercadoPago = tokenPublicMercadoPago.validate();
    const isTokenMercadoPago = tokenMercadoPago.validate();
    const isSenha = senha.validate();
    const isPixel = pixel.validate();

    if (
      isNomePlataformaValid &&
      isLogoSiteValid &&
      isFavIconValid &&
      isNomeSite &&
      isLinkWpp &&
      isLinkInsta &&
      isEmail &&
      isTokenMercadoPago &&
      isTokenPublicMercadoPago &&
      isSenha &&
      isPixel
    ) {
      const requestData = new FormData();
      requestData.append("plataforma", nomePlataforma.value);
      requestData.append("nomesite", nomeSite.value);
      requestData.append("logosite", logoSite.value);
      requestData.append("faviconsite", favIcon.value);
      requestData.append("linkwppsite", linkWpp.value);
      requestData.append("linkwppista", linkInsta.value);
      requestData.append("email", email.value);
      requestData.append("senha", senha.value);
      requestData.append("tokenpublicmercadopago", tokenPublicMercadoPago.value);
      requestData.append("tokenmercadopago", tokenMercadoPago.value);
      requestData.append("pixel", pixel.value);
      for (let val of requestData.entries()) {
        console.log(val);
      }
      console.log("Enviar");
    } else {
      console.log("Não enviar");
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
