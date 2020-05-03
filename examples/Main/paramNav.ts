import { useState, useEffect } from 'react';

function getPage(navParam: string): string {
  return (window.history.state || {})[navParam] || '';
}

export function useParamNav(navParam = 'page'): [string, (page: string) => void] {
  const [page, setPage] = useState(getPage(navParam));

  function navigate(newPage: string) {
    if (page !== newPage) {
      setPage(newPage);
      window.history.pushState({ [navParam]: newPage }, newPage);
    }
  }

  useEffect(() => {
    const cb = () => {
      setPage(getPage(navParam));
    };
    window.addEventListener('popstate', cb, false);

    return () => window.removeEventListener('popstate', cb);
  });

  return [page, navigate];
}
