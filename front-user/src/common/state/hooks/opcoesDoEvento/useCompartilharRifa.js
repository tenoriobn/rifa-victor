const useCompartilharRifa = () => {
  const compartilharRifa = async () => {
    try {
      await navigator.share({
        title: 'Título do compartilhamento',
        text: 'Texto do compartilhamento',
        url: `${window.location.origin}/produtos`,
      });
    } catch (error) {
      alert(`Erro ao compartilhar, tente novamente!`);
    }
  };

  return {
    compartilharRifa,
  };
};

export default useCompartilharRifa;
