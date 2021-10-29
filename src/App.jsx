import PublicLayout from "../../store/src/layouts/PublicLayout";
import PrivateLayout from "../../store/src/layouts/PrivateLayout";
import AuthLayout from "../../store/src/layouts/AuthLayout";
import Admin from "./pages/admin/Index";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/styles.css";
import Productos from "./pages/admin/Productos";
import Usuarios from "./pages/admin/Usuarios";
import Ventas from "./pages/admin/Ventas";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route
            path={[
              "/admin",
              "/admin/productos",
              "/admin/usuarios",
              "/admin/ventas",
            ]}
          >
            <PrivateLayout>
              <Switch>
                <Route path="/admin/productos">
                  <Productos />
                </Route>
                <Route path="/admin/usuarios">
                  <Usuarios />
                </Route>
                <Route path="/admin/ventas">
                  <Ventas />
                </Route>
                <Route path="/admin">
                  <Admin />
                </Route>
              </Switch>
            </PrivateLayout>
          </Route>

          <Route path={["/login", "/registro"]}>
            <AuthLayout>
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/registro">
                  <Register />
                </Route>
              </Switch>
            </AuthLayout>
          </Route>
          <Route path={["/"]}>
            <PublicLayout>
              <Switch>
                <Route path="/">
                  <Index />
                </Route>
              </Switch>
            </PublicLayout>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
