import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Layout } from './components';

function Router() {
  return (
    <div className="App">
      <Routes>
        <Route path={'/channel'} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Router;
