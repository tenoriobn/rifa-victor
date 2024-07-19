import styled from "styled-components"
import { stateNovoGanhador } from "../../../../common/states/atom";
import { useRecoilState } from "recoil";
import useImageUpload from "../../../../common/states/Hook/useImageUpload";

const Form = styled.form`
  font-size: .9rem;
  width: 100%;

  label {
    display: block;
  }

  input {
    display: block;
    margin-bottom: 10px;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background: #41414b;
    border: none;
    outline: 0;
    margin-top: 10px;
    padding: 10px 5px;
    color: #fff;
    box-sizing: border-box;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  select {
    display: block;
    margin-bottom: 10px;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background-color: #41414b;
    border: none;
    outline: 0;
    margin-top: 10px;
    padding: 10px 5px;
    color: #fff;
  }

  input[type=submit] {
    background-color: #07b353;
    color: #fff;
    font-weight: 700;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    outline: 0;
    border: none;
    cursor: pointer;
    margin-top: 20px;
    transition: all .3s ease-in-out;
  }

  input[type=submit]:hover {
    opacity: .8;
  }
`;

export default function ModalNovoGanhador() {
  const [novoGanhador, setNovoGanhador] = useRecoilState(stateNovoGanhador);
    const { handleFileChange } = useImageUpload(setNovoGanhador, novoGanhador);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
    
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setNovoGanhador({...novoGanhador, image: reader.result})
  //   };
  //   reader.readAsDataURL(file);
  // }



  const handleSaveChanges = async (event) => {
    event.preventDefault();

    try {

      console.log('adicionarGanhador:', novoGanhador)

      // const response = await postDados("http://seu-backend.com/api/site/config", siteConfig);
      // setSiteConfig(response.data)


    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <Form action="" id="frmAddPack" method="POST" onSubmit={handleSaveChanges}>
      <label htmlFor="">
        Foto
        <input 
          type="file" 
          name="imagem" 
          id="imagem" 
          accept="image/*"
          // onChange={(e) => setNovoGanhador({...novoGanhador, image: e.target.value})}  
          onChange={handleFileChange}
        />
      </label>

      <label htmlFor="">
        Nome
        <input 
          type="text" 
          name="name" 
          id="name" 
          defaultValue={novoGanhador.name || ""}  
          onChange={(e) => setNovoGanhador({ ...novoGanhador, name: e.target.value })} 
          required
        />
      </label>
      <label htmlFor="">
        Cota
        <input 
          type="number"
          name="number" 
          id="number" 
          defaultValue={novoGanhador.number || ""}  
          onChange={(e) => setNovoGanhador({ ...novoGanhador, numberCota: e.target.value })} 
          required
        />
      </label>

      <label htmlFor="id_raffle" id="label_id_rifa" style={{display: "block"}}>
        Sorteio
        <select 
          name="id_raffle" 
          id="id_raffle" 
          value={novoGanhador.sorteio}  
          onChange={(e) => setNovoGanhador({ ...novoGanhador, sorteio: e.target.value })} 
          required
        >
          <option value="">Selecione</option>
          <option value="174">SAVEIRO CROSS DOS SONHOS </option>
          <option value="178">F250 OU 50K NO PIX</option>
        </select>
      </label>


      <input id="sendEditPack" type="submit" defaultValue="Enviar" />
    </Form>
  )
}
