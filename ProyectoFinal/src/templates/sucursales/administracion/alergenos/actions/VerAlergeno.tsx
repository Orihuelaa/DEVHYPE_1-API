import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../../hooks/store";
import styles from "../../../../../styles/templates/styles.module.css";



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
            <button onClick={() => navigate('/admin')}>Volver</button>
          </div>
        </div>
      )}
    </>
  );
};

export default VerAlergeno;

