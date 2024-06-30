import { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { estadoMenuAtivo } from '../../atom';

export default function useAtivarMenu() {
  const [menuAtivo, setMenuAtivo] = useRecoilState(estadoMenuAtivo);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAtivo(false);
      }
    }

    if (menuAtivo) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [menuAtivo, setMenuAtivo]);

  return {
    menuAtivo,
    setMenuAtivo,
    menuRef,
  };
}
