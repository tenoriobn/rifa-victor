// useFormState.js
import { useRecoilState } from 'recoil';
import { stateInfoRifaForm } from '../../atom';

const useFormState = () => {
  const [formState, setFormState] = useRecoilState(stateInfoRifaForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return {
    formState,
    handleChange,
  };
};

export default useFormState;
