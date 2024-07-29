/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { estadoRifa, stateSiteConfig } from '../../common/state/atom';

const PageTitle = ({ children }) => {
  const siteConfig = useRecoilValue(stateSiteConfig);
  const rifa = useRecoilValue(estadoRifa)
  const location = useLocation();

  let description = siteConfig.share_description ;
  let image = siteConfig.share_image;
  let url = window.location.href;
  let title = siteConfig.site_title;

  if (location.pathname.match(/^\/[^/]+\/\d+$/)) {
    title = rifa.title;
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
      </Helmet>
      {children}
    </>
  );
};

export default PageTitle;
