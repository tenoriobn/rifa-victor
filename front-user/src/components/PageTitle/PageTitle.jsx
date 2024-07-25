/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { estadoRifa, stateSiteConfig } from '../../common/state/atom';

const PageTitle = ({ children }) => {
  const siteConfig = useRecoilValue(stateSiteConfig);
  const rifa = useRecoilValue(estadoRifa)

  console.log('rifa', rifa.title)
  console.log(siteConfig)

  const location = useLocation();

  let title = siteConfig.site_title;
  if (location.pathname.match(/^\/[^/]+\/\d+$/)) {
    title = rifa.title;
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
};

export default PageTitle;
