import { Route } from 'react-router-dom';

// Función de envoltura para envolver un componente de ruta con FiltersOrdersProvider
const withFiltersOrdersProvider = (Component) => (props) => (
  <FiltersOrdersProvider>
    <Component {...props} />
  </FiltersOrdersProvider>
);

// Componentes de ruta
const routes = [
  { path: '/Dashboard-User/Information', component: UserInformation },
  { path: '/Dashboard-User/ListOrders', component: ListOrders },
  { path: '/Dashboard-User/DetailsOrder/:orderId', component: DetailsOrder },
  { path: '/Dashboard-User/DetailsHistoryPayment/:orderHistoryId', component: DetailsHistoryPayment },
  { path: '/Dashboard-User/HistoryPayment', component: HistoryPayment },
  { path: '/Dashboard-User/Profile', component: Profile },
  { path: '/Dashboard-User/ViewDollar', component: ViewDollar }
];

// Crear rutas con el proveedor envuelto
const wrappedRoutes = routes.map(({ path, component }) => (
  <Route
    key={path}
    path={path}
    element={withFiltersOrdersProvider(component)}
  />
));

// Renderizar las rutas
<Route element={<ProtectedRoute
  isAllowed={!!stateAuth.user && stateAuth.isAuthenticated && stateAuth.user.permissions && stateAuth.user.permissions.includes("gestionAdmin")}
/>}>
  {wrappedRoutes}
</Route>
