import insta from '/public/assets/images/instagram.svg'
import wpp from '/public/assets/images/whatsapp.svg'
import { useConfig } from '../../../../src/context/ConfigContext'


const Links = () => {
  const config = useConfig();
  
  function formatLink(link) {
    if (!link.includes("https://")) {
      return `https://${link}`
    } else {
      return link;
    }
  }

  return (
    <section className='mb-16'>
        <div className='flex justify-center gap-3'>
            <a className='bg-[#E15426] p-3 w-10 rounded cursor-pointer' target='_blank' href={config.linkInsta ? formatLink(config.linkInsta) : "#"}>
              <img src={insta} alt="" />
            </a>
            <a className='bg-[#4CAF50] p-3 w-10 rounded cursor-pointer' target='_blank' href={config.linkWpp ? formatLink(config.linkWpp) : "#"}>
              <img src={wpp} alt="" />
            </a>
        </div>
    </section>
  )
}

export default Links