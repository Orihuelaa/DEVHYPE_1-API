import { useNavigate } from "react-router-dom";
import styles from "../../../styles/templates/styles.module.css"
import { useAppSelector } from "../../../hooks/store";
/* Importaciones MUI */
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
          <Button variant="contained" startIcon={<ArrowBackIcon/>} sx={{ position: "absolute",top: "10px", right: "10px",
          backgroundColor:'white',color:'black',
        '&:hover': { backgroundColor: '#dadada', borderColor: 'black', }, }} 
        onClick={() => navigate('/')}>Volver</Button>
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
          </div>
        </div>
      )}
    </>
  );
}; 

export default VerEmpresa;

