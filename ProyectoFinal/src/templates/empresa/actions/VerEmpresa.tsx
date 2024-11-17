import { useNavigate } from "react-router-dom";
import styles from "../../../styles/templates/styles.module.css"
import { useAppSelector } from "../../../hooks/store";

const VerEmpresa = () => {
  const navigate = useNavigate();
  const {empresaActiva} = useAppSelector((state) => state.empresa);

  if (!empresaActiva) {
    console.log('No se pudo obtener la empresa')
    navigate("/");
  }
  
  return (
    <>
      {empresaActiva && (
        <div className={styles.overlay}>
          <div className={styles.overlay_content}>
            <h2>Empresa</h2>
              <div>
                <p>Nombre: {empresaActiva.nombre}</p>
                <p>Razón Social: {empresaActiva.razonSocial}</p>
                <p>CUIT: {empresaActiva.cuit}</p>
                <div>
                  <p>Logo: </p>
                  <img src={empresaActiva.logo ? empresaActiva.logo : ""} alt="Logo Empresa" />
                </div>
              </div>
            <button onClick={() => navigate('/')}>Volver</button>
          </div>
        </div>
      )}
    </>
  );
}; 

export default VerEmpresa;

