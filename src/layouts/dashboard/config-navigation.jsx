import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'employees',
    path: '/employees',
    icon: icon('ic_user'),
  },
  {
    title: 'assets',
    path: '/assets',
    icon: icon('ic_asset'),
  }
];

export default navConfig;
