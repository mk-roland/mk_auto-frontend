import { Route } from 'react-router-dom';
import HomePage from './pages/Home.jsx';
import CataloguePage from './pages/Catalogue.jsx';
import VehiculeDetailPage from './pages/VehiculeDetail.jsx';
import ContactPage from './pages/Contact.jsx';
import NotFoundPage from './pages/NotFound.jsx';

export const appRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/catalogue', element: <CataloguePage /> },
  { path: '/catalogue/:categorie?/:energie?/:boite?/:marque?', element: <CataloguePage /> },
  { path: '/vehicle/detail/:id', element: <VehiculeDetailPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '*', element: <NotFoundPage /> }, // toute URL inconnue → 404
];


export function renderRoutes() {
  return appRoutes.map(({ path, element }) => (
    <Route key={path} path={path} element={element} />
  ));
}