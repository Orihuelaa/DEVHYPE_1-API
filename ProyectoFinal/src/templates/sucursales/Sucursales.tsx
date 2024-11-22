import { useNavigate } from "react-router-dom";
import styles from "../../styles/templates/styles.module.css"
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useEffect } from "react";
import { SucursalService } from "../../services/SucursalService";
import { ISucursal } from "../../endpoints/types/dtos/sucursal/ISucursal";
import { setSucursalActiva, setSucursales } from "../../redux/slices/sucursalSlice";
/* importaciones material UI */
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { common } from '@mui/material/colors';

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
      <div className="encabezado_sucursales">
        <h2>Sucursales en: {empresaActiva?.nombre}</h2>
        <Button variant="contained" startIcon={<AddCircleIcon />} 
      sx={{ color: common.black, 
            backgroundColor: '#f0f0f0', 
            height: 40,
            '&:hover': {backgroundColor: '#DBD8D8',color: '#000' }, }} onClick={() => navigate("/crear-sucursal")}>Crear Sucursal</Button>
      </div>
      <ul className={styles.container_g}>
        {sucursales.map((sucursal) => (
          <li  key={sucursal.id} onClick={() => handleSetSucursalActiva(sucursal)}>
            <h3>{sucursal.nombre}</h3>
            <p>Apertura: {sucursal.horarioApertura} hs - {sucursal.horarioCierre} hs</p>
            <div className="imagen_sucursales">
              <img src={sucursal.logo} />
            </div>
            <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
              <Button variant="outlined"
                sx={{ 
                  width:40,
                  height: 40,
                  minWidth: 'unset',
                  color:'#000000',
                  '&:hover': {backgroundColor: '#DBD8D8', }, }}
                  aria-label="view" size="medium" 
                onClick={(e) => {e.stopPropagation(); handleSetSucursalActiva(sucursal, `/admin`)}}>
                 <AssignmentIcon fontSize="medium"></AssignmentIcon>
              </Button>
              <Button variant="outlined"
                sx={{ 
                  width:40,
                  height: 40,
                  minWidth: 'unset',
                  color:'#000000',
                  '&:hover': {backgroundColor: '#DBD8D8', }, }}
                  aria-label="view" size="medium" 
                  onClick={(e) => {e.stopPropagation(); handleSetSucursalActiva(sucursal,`/editar-sucursal`)}}>
                <EditIcon fontSize="medium"></EditIcon>
              </Button>
              <Button variant="outlined"
                sx={{ 
                  width:40,
                  height: 40,
                  minWidth: 'unset',
                  color:'#000000',
                  '&:hover': {backgroundColor: '#DBD8D8', }, }}
                  aria-label="view" size="medium" 
                  onClick={(e) => {e.stopPropagation(); handleSetSucursalActiva(sucursal, `/ver-sucursal`)}}>
                  <VisibilityIcon fontSize="medium"></VisibilityIcon>
              </Button>
            </Stack>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Sucursales