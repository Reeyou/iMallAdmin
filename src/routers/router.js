import PageLoading from '../components/PageLoading'
import Loadable from 'react-loadable'

const Index = Loadable({loader: () => import('../container/Index'), loading: PageLoading, delay: 400})