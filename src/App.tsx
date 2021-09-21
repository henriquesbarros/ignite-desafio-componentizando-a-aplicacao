import { MoviesProvider } from './hooks/useMovies';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

export function App() {
  return (
    <MoviesProvider>
        <div style={{ display: 'flex' }}>
          <SideBar/>
          <Content />
        </div>
    </MoviesProvider>
    
  )
}