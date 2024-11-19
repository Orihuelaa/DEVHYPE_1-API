import ActualizarEmpresa from "./templates/empresa/actions/ActualizarEmpresa";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CrearEmpresa from "./templates/empresa/actions/CrearEmpresa";
import VerEmpresa from "./templates/empresa/actions/VerEmpresa";
import Home from "./templates/Home";
import ActualizarSucursal from "./templates/sucursales/actions/ActualizarSucursal";
import VerSucursal from "./templates/sucursales/actions/VerSucursal";
import CrearSucursal from "./templates/sucursales/actions/CrearSucursal";
import AdministrarSucursal from "./templates/sucursales/administracion/AdministrarSucursal";
import ActualizarCategoria from "./templates/sucursales/administracion/categorias/actions/ActualizarCategoria";
import CrearCategoria from "./templates/sucursales/administracion/categorias/actions/CrearCategoria";
import CrearSubCategoria from "./templates/sucursales/administracion/categorias/actions/CrearSubCategoria";
import ActualizarSubCategoria from "./templates/sucursales/administracion/categorias/actions/ActualizarSubCategoria";
import CrearAlergeno from "./templates/sucursales/administracion/alergenos/actions/CrearAlergeno";
import VerAlergeno from "./templates/sucursales/administracion/alergenos/actions/VerAlergeno";
import ActualizarAlergeno from "./templates/sucursales/administracion/alergenos/actions/ActualizarAlergeno";
import CrearProducto from "./templates/sucursales/administracion/productos/actions/CrearProducto";
import VerProducto from "./templates/sucursales/administracion/productos/actions/VerProducto";
import ActualizarProducto from "./templates/sucursales/administracion/productos/actions/ActualizarProducto";

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} /> 

        <Route path="/crear-empresa" element={<CrearEmpresa />} /> 
        <Route path="/ver-empresa" element={<VerEmpresa />} /> 
        <Route path="/editar-empresa" element={<ActualizarEmpresa />} /> 

        <Route path="/crear-sucursal" element={<CrearSucursal />} /> 
        <Route path="/ver-sucursal" element={<VerSucursal />} /> 
        <Route path="/editar-sucursal" element={<ActualizarSucursal />} /> 

        <Route path="/admin" element={<AdministrarSucursal />}/>

        <Route path="/admin/crear-categoria" element={<CrearCategoria />} /> 
        <Route path="/admin/editar-categoria" element={<ActualizarCategoria />} /> 

        <Route path="/admin/crear-subcategoria" element={<CrearSubCategoria />} /> 
        <Route path="/admin/editar-subcategoria" element={<ActualizarSubCategoria />} /> 

        <Route path="/admin/crear-alergeno" element={<CrearAlergeno />} /> 
        <Route path="/admin/ver-alergeno" element={<VerAlergeno />} /> 
        <Route path="/admin/editar-alergeno" element={<ActualizarAlergeno />} /> 

        <Route path="/admin/crear-producto" element={<CrearProducto />} /> 
        <Route path="/admin/ver-producto" element={<VerProducto />} /> 
        <Route path="/admin/editar-producto" element={<ActualizarProducto />} /> 

      </Routes>
    </Router>
  );
};

export default App;
