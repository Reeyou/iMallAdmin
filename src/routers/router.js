import RouteLoading from '../components/RouteLoading'
import Loadable from 'react-loadable'

const Index = Loadable({loader: () => import('../container/Index'), loading: RouteLoading, delay: 400})