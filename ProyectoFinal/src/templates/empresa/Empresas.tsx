import { IEmpresa } from "../../endpoints/types/dtos/empresa/IEmpresa"
import {useNavigate } from "react-router-dom"
import styles from "../../styles/templates/styles.module.css"
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { EmpresaService } from "../../services/EmpresaService";
import { setEmpresaActiva, setEmpresas } from "../../redux/slices/empresaSlice";
import { useEffect } from "react";
import Sucursales from "../sucursales/Sucursales";
/* MUI importaciones */
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { common } from '@mui/material/colors';

const Empresas = () => {

  const dispatch = useAppDispatch();
  const {empresas, empresaActiva} = useAppSelector((state) => state.empresa); // Obtenemos las empresas del estado global
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchEmpresas = async () => {
      const empresasFromStorage = localStorage.getItem("empresas");
      if (empresasFromStorage) {
        dispatch(setEmpresas(JSON.parse(empresasFromStorage)));
      } else {
        const empresaService = new EmpresaService('empresas');
        try {
          const response = await empresaService.getAll(); 
          const empresas_all = response.filter((empresa) => (empresa as IEmpresa).id !== undefined);
          dispatch(setEmpresas(empresas_all as IEmpresa[])); 
          localStorage.setItem("empresas", JSON.stringify(empresas_all));
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchEmpresas();

    return () => {
      localStorage.removeItem('empresas');
      dispatch(setEmpresas([])); 
    }
  
  }, [dispatch]);
  
  

  const handleSetEmpresaActiva = (empresa: IEmpresa, route?: string) => {
    dispatch(setEmpresaActiva(empresa));
    if (route) navigate(route);
  };
  return (
    <div className={styles.layoutContainer}>
      <aside className={styles.empresas}>
        <div className="encabezado_empresa">
            <h2>Empresas</h2>
            <Button variant="contained" startIcon={<AddCircleIcon />} 
                sx={{ color: common.black, 
                backgroundColor: '#f0f0f0', 
                height: 40,
                '&:hover': {backgroundColor: '#DBD8D8',color: '#000' }, }}onClick={() => navigate("/crear-empresa")}>
              Crear Empresa
            </Button>
        </div>
        <ul className={styles.container_f}>
          {empresas.map((empresa: IEmpresa) => (
            <li className="boton_empresa" key={empresa.id} onClick={() => handleSetEmpresaActiva(empresa)}>
              <h3>{empresa.nombre}</h3>
              <div>
                <Button  
                    variant="outlined"
                    sx={{ 
                      width:35,
                      height: 35,
                      minWidth: 'unset',
                      color:'#000000',
                      borderColor: 'black',
                      '&:hover': { backgroundColor: '#89A8B2', borderColor: 'black', }, }}
                      aria-label="view" size="medium" 
                    onClick={(e) => { e.stopPropagation(); handleSetEmpresaActiva(empresa, `ver-empresa`); }}>
                      <VisibilityIcon fontSize="medium"></VisibilityIcon>
                </Button>
                <Button 
                   variant="outlined"
                   sx={{ 
                     width:35,
                     height: 35,
                     minWidth: 'unset',
                     color:'#000000',
                     borderColor: 'black',
                     '&:hover': { backgroundColor: '#89A8B2', borderColor: 'black', }, }}
                     aria-label="view" size="medium" 
                  onClick={(e) => { e.stopPropagation(); handleSetEmpresaActiva(empresa, `editar-empresa`) }}>
                    <EditIcon fontSize="medium"></EditIcon>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </aside>
      <section className={styles.sucursales}>
        {empresaActiva && <Sucursales />}
      </section>
    </div>
  );
  
};

export default Empresas
