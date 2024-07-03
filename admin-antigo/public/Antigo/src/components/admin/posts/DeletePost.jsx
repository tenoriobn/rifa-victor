import Loading from "../../Loading";

export default function DeletePost(props) {
  return (
    <div className="fixed flex flex-col items-center justify-center z-40 top-0 bottom-0 left-0 right-0 bg-transparentBlack min-h-screen p-2 pt-10 pb-10 sm:p-10">
      {props.deleteLoading ? (
        <div className="flex flex-col items-center justify-center bg-white p-16 sm:p-28 sm:pr-40 sm:pl-40 rounded-2xl ">
          <Loading usePrimary={true} />
        </div>
      ) : (
        <div className="bg-white p-4 sm:p-20 pt-16 pb-10 rounded-2xl">
          {props.success ? (
            <div className="flex flex-col gap-6 items-center justify-center">
              <h2 className="text-lg sm:text-2xl text-center font-medium text-green-500">
                Rifa deletada com sucesso.
              </h2>

              <button
                onClick={props.closeDeleteContainer}
                type="button"
                className="p-2 pl-6 pr-6 font-medium rounded-lg bg-primary hover:bg-blue-900 transition-all duration-200 text-white cursor-pointer sm:pl-10 sm:pr-10"
              >
                Fechar
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-10">
              <h2 className="text-blue-900 font-bold text-lg sm:text-2xl max-w-[40ch] text-center">
                Você tem certeza que quer deletar a Rifa <br />
                <mark className="text-red-500 font-bold text-base sm:text-lg">
                  {props.postName}
                </mark>
                ?
              </h2>

              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={props.closeDeleteContainer}
                  type="button"
                  className="p-2 pl-6 pr-6 font-medium rounded-lg bg-primary hover:bg-blue-900 transition-all duration-200 text-white cursor-pointer sm:pl-10 sm:pr-10"
                >
                  Cancelar
                </button>
                <button
                  onClick={props.handleDeletePost}
                  type="button"
                  className="p-2 pl-6 pr-6 font-medium rounded-lg bg-red-500 hover:bg-red-700 transition-all duration-200 text-white cursor-pointer sm:pl-10 sm:pr-10"
                >
                  Deletar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
