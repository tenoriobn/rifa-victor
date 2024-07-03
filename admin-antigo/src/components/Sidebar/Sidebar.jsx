import React from 'react'

export default function Sidebar() {
  return (
    <div className='p-2 w-[300px] overflow-auto duration-500 bg-darkBlue shadow-opt1 fixed inset-y-0 left-0'>
      <div className='border-b border-black mt-5 pb-9 rounded-b-lg text-center'>
        <button className='mb-6 mt-5'>
          <i class="fas fa-external-link-alt" aria-hidden="true"></i> Sair
        </button>

        <div>
          <p className='leading-6'>Cliente: 27 - Ana</p>
          <p className='leading-6'>Site: 27 - Ana Lima Prêmios</p>
          <p className='text-[10px] leading-3'>SRV: 001</p>
        </div>
      </div>

      <div className="mt-9">
        <ul>
          <li>
            <a href="#" className='bg-darkgreen pl-[30px] py-4 pe-4 block uppercase border-b-2 border-darkBlue-400 rounded-s-lg rounded-b-lg border-r-8 border-lightGreen'>
              <i class="fa-solid fa-gauge"></i> Venda
            </a>

            <a href="#" className='pl-[30px] py-4 pe-4 block uppercase border-b-2 border-darkBlue-400 rounded-s-lg rounded-b-lg'>
            <i class="fa-solid fa-dice"></i> Sorteio
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
