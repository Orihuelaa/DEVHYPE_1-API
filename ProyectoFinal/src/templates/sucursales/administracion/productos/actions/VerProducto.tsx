import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../../hooks/store"
import styles from "../../../../../styles/templates/styles.module.css"

export default function VerProducto() {
  const {articuloActivo} = useAppSelector((state) => state.articulos);
  const navigate = useNavigate();
  return (
    <div className={styles.overlay}>
      <div className={styles.overlay_content}>
        {articuloActivo && (
          <div className={styles.overlay_content}>
            <h2>{articuloActivo.denominacion}</h2>
            <p>{articuloActivo.precioVenta}</p>
            <p>{articuloActivo.descripcion}</p>
            <p>{articuloActivo.categoria.denominacion}</p>
            <p>{articuloActivo.habilitado ? "Sí" : "No"}</p>
            <div>
              <button onClick={() => {navigate("/admin")}}>Volver</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

