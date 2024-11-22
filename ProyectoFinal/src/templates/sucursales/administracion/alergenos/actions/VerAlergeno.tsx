import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../../hooks/store";
import styles from "../../../../../styles/templates/styles.module.css";
/* Importaciones MUI */
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const VerAlergeno = () => {
  const navigate = useNavigate();
  const {alergenoActivo} = useAppSelector((state) => state.alergenos);

  if (!alergenoActivo) {
    console.log('No se pudo obtener el alergeno');
    navigate("/administracion/alergenos");
  }

  return (
    <>
      {alergenoActivo && (
        <div className={styles.overlay}>
          <div className={styles.overlay_content}>
            <h2>Alergeno</h2>
            <div>
              <p>Denominacion: {alergenoActivo.denominacion}</p>
            </div>
            <div>
              <p>Imagen:</p>
              {alergenoActivo.imagen?.url ? (
                  <img
                    src={alergenoActivo.imagen.url}
                    alt={`Imagen de ${alergenoActivo.denominacion}`}
                    className={styles.image}
                  />
                ) : (
                  <p>No hay imagen disponible</p>
                )}
            </div>
                <Button variant="contained" startIcon={<ArrowBackIcon/>} sx={{ position: "absolute",top: "10px", right: "10px",
              backgroundColor:'white',color:'black',
            '&:hover': { backgroundColor: '#dadada', borderColor: 'black', }, }} 
            onClick={() => navigate('/')}>Volver</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default VerAlergeno;

