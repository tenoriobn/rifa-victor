export default function CardNotificacaoErroPedidos() {
  return (
    <div className="fixed flex flex-col justify-end z-[55] top-0 right-0 w-full sm:w-96" role="region">
      <div className="px-4 sm:px-6 py-6 space-y-3 overflow-y-auto">
        <div>
          <div className="w-full pointer-events-auto bg-white  rounded-lg shadow-lg" role="status">
            <div className="relative overflow-hidden rounded-lg ring-1 ring-gray-200 dark:ring-gray-800">
              <div className="flex p-4 gap-3 items-center">
                {/* Empty divs */}
                <div className="w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">Erro ao carregar pedidos...</p>
                  {/* More content can go here */}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 mt-0">
                  {/* Empty divs */}
                  <button
                    type="button"
                    className="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-md text-sm gap-x-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 inline-flex items-center"
                    aria-label="Close"
                  >
                    <span className="i-heroicons-x-mark-20-solid flex-shrink-0 h-5 w-5" aria-hidden="true"></span>
                    {/* More content can go here */}
                  </button>
                </div>
              </div>
              <div className="absolute bottom-0 end-0 start-0 h-1 bg-red-500" style={{ width: '57.96%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
