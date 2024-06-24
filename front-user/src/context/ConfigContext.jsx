import React, { useEffect, useState } from 'react';
import { sendRequest } from '../common/util/util';

const ConfigContext = React.createContext(null);
export function useConfig() {
    return React.useContext(ConfigContext);
}

export function ConfigProvider({ children }) {
    const [faviconUrl, setFaviconUrl] = useState(localStorage.getItem('favicon_url'));
    const [logoUrl, setLogoUrl] = useState(localStorage.getItem('logo_url'));
    const [linkWpp, setLinkWpp] = useState();
    const [linkInsta, setLinkInsta] = useState();
    const [title, setTitle] = useState();

    function generatePixel(pixelId) {
        const script = document.createElement('script');
        script.innerHTML = `
            !(function (f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function () {
                n.callMethod
                ? n.callMethod.apply(n, arguments)
                : n.queue.push(arguments);
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = "2.0";
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s);
            })(
            window,
            document,
            "script",
            "https://connect.facebook.net/en_US/fbevents.js"
            );
            fbq("init", "${pixelId}");
            fbq("track", "PageView");
        `;
        const noscript = document.createElement('noscript');
        noscript.innerHTML = `<img
            height="1"
            width="1"
            style="display: none"
            src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1"
        />`;
        document.body.prepend(noscript);
        document.body.prepend(script);
    }

    useEffect(() => {
        async function getSiteConfig() {
            const requestData = {
                method: "GET",
                url: `config`,
            }

            try {
                const response = await sendRequest(requestData);

                if (!response.success) {
                    return;
                }
                if (response.data) {
                    const responseData = response.data;
                    document.title = responseData.site_name;
                    setTitle(responseData.site_name);
                    let link = document.querySelector("link[rel~='icon']");
                    if (!link) {
                        link = document.createElement('link');
                        link.rel = 'icon';
                        document.head.appendChild(link);
                    }
                    setFaviconUrl(responseData.url_favicon_site);
                    link.href = responseData.url_favicon_site;
                    localStorage.setItem('favicon_url', responseData.url_favicon_site);
                    setLogoUrl(responseData.url_logo_site);
                    localStorage.setItem('logo_url', responseData.url_logo_site);
                    setLinkInsta(responseData.instagram_link);
                    setLinkWpp(responseData.whatsapp_link);
                    generatePixel(responseData.meta_pixel);
                }
            } catch (error) {
                // window.alert(`Houve um erro no servidor ${error}`);
            }
        }
        getSiteConfig();
    }, []);
    const value = { faviconUrl, linkWpp, linkInsta, title, logoUrl };
    return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}