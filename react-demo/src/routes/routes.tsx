import Home from '@src/views/Home/index';
import PlanList from '@src/views/Plan/planList';
import PlanDetail from '@src/views/Plan/planDetail';

const About = () => <h2>页面一</h2>;
const Users = () => <h2>页面二</h2>;

const Routers = [
  {
    path:'/',
    component: PlanList
  },
  {
    path:'/planDetail',
    component: PlanDetail
  },
  {
    path:'/about',
    component: About
  },
  {
    path:'/users',
    component: Users
  },
  {
    path:'/404',
    component: Home
  },
];

export default Routers;
