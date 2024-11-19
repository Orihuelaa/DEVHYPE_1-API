import { useNavigate } from "react-router-dom";
import styles from "../../styles/templates/styles.module.css"
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useEffect } from "react";
import { SucursalService } from "../../services/SucursalService";
import { ISucursal } from "../../endpoints/types/dtos/sucursal/ISucursal";
import { setSucursalActiva, setSucursales } from "../../redux/slices/sucursalSlice";

const Sucursales = () => {
  const dispatch = useAppDispatch();
  const {empresaActiva} = useAppSelector((state) => state.empresa);
  const {sucursales} = useAppSelector((state) => state.sucursal); // Obtenemos las empresas del estado global
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSucursales = async () => {
      const sucursalesFromStorage = localStorage.getItem(`sucursales-${empresaActiva?.id}`);
      
      if (sucursalesFromStorage) {
        dispatch(setSucursales(JSON.parse(sucursalesFromStorage)));
      } else {
        const sucursalService = new SucursalService(`sucursales`);
        try {
          const sucursales_all = await sucursalService.getAllSucursalesPorEmpresaId(empresaActiva!.id); 
          dispatch(setSucursales(sucursales_all as ISucursal[])); 
          localStorage.setItem(`sucursales-${empresaActiva?.id}`, JSON.stringify(sucursales_all));
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    if (empresaActiva) {
      fetchSucursales();
    }

    return ()=>{
      localStorage.removeItem(`sucursales-${empresaActiva?.id}`);
      dispatch(setSucursales([]));
    }
  
  }, [dispatch, empresaActiva]);
  

  const handleSetSucursalActiva = (sucursal: ISucursal, route?: string) => {
    dispatch(setSucursalActiva(sucursal));
    if (route) navigate(route);
  };

  return (
    <main>
      <h2>Sucursales en: {empresaActiva?.nombre}</h2>
      <button onClick={() => navigate("/crear-sucursal")}>Crear Sucursal</button>
      <ul className={styles.container_g}>
        {sucursales.map((sucursal) => (
          <li  key={sucursal.id} onClick={() => handleSetSucursalActiva(sucursal)}>
            <h3>{sucursal.nombre}</h3>
            <p>Apertura: {sucursal.horarioApertura}hs - {sucursal.horarioCierre}hs</p>
            <img src={sucursal.logo} alt="Logo" /> {/* <-- Revisar funcionalidad del logo */}
            <div>
              <button onClick={(e) => {e.stopPropagation(); handleSetSucursalActiva(sucursal, `/admin`)}}>Admin</button>
              <button onClick={(e) => {e.stopPropagation(); handleSetSucursalActiva(sucursal, `/editar-sucursal`)}}>Editar</button>
              <button onClick={(e) => {e.stopPropagation(); handleSetSucursalActiva(sucursal, `/ver-sucursal`)}}>Ver</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Sucursales
