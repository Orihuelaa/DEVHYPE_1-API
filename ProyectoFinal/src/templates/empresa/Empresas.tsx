import { IEmpresa } from "../../endpoints/types/dtos/empresa/IEmpresa"
import {useNavigate } from "react-router-dom"
import styles from "../../styles/templates/styles.module.css"
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { EmpresaService } from "../../services/EmpresaService";
import { setEmpresaActiva, setEmpresas } from "../../redux/slices/empresaSlice";
import { useEffect } from "react";
import Sucursales from "../sucursales/Sucursales";

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
            <button onClick={() => navigate("/crear-empresa")}>
              Crear Empresa
            </button>
        </div>
        <ul className={styles.container_f}>
          {empresas.map((empresa: IEmpresa) => (
            <li className="boton_empresa" key={empresa.id} onClick={() => handleSetEmpresaActiva(empresa)}>
              <h3>{empresa.nombre}</h3>
              <div>
                <button onClick={(e) => { e.stopPropagation(); handleSetEmpresaActiva(empresa, `ver-empresa`); }}>
                  Ver
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleSetEmpresaActiva(empresa, `editar-empresa`) }}>
                  Editar
                </button>
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
