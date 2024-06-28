import { Helmet } from 'react-helmet-async';

import { AssetsView } from 'src/sections/assets/view';

// ----------------------------------------------------------------------

export default function AssetsPage() {
  return (
    <>
      <Helmet>
        <title> Assets </title>
      </Helmet>

      <AssetsView />
    </>
  );
}
