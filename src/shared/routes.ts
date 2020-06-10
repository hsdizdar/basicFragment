import Counter from './Counter';
import SearchLog from './SearchLog';

const routes = [
  {
    path: '/',
    exact: true,
    component: Counter,
  },
  {
    path: '/log',
    exact: true,
    component: SearchLog,
  },
];

export default routes;
