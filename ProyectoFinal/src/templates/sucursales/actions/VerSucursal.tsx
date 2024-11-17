import { useNavigate } from "react-router-dom";
import styles from "../../../styles/templates/styles.module.css"
import { useAppSelector } from "../../../hooks/store";

const VerSucursal = () => {
  const navigate = useNavigate();
  const {sucursalActiva} = useAppSelector((state) => state.sucursal);
  
  if (!sucursalActiva) {
    console.log("Error al cargar la sucursal");
    navigate("/"); 
  }

  // Formateamos el domicilio
  const domicilio_ = [
    sucursalActiva?.domicilio.calle,
    sucursalActiva?.domicilio.numero,
    sucursalActiva?.domicilio.cp,
    sucursalActiva?.domicilio.localidad.nombre,
    sucursalActiva?.domicilio.localidad.provincia.nombre,
    sucursalActiva?.domicilio.localidad.provincia.pais.nombre,
  ]
    .filter(Boolean) // Filtra valores `undefined`, `null` y vacíos
    .join(", "); // Une con comas y un espacio
  
  return (
    <>
      {sucursalActiva && (
      <div className={styles.overlay}>
        <div className={styles.overlay_content}>
          <h2>Sucursal</h2>
          <p>Nombre: {sucursalActiva?.nombre}</p> 
          <p>Empresa: {sucursalActiva?.empresa.nombre}</p>
          <p>Domicilio: {domicilio_}</p>
          <p>¿Casa Matriz?: {sucursalActiva?.esCasaMatriz ? "Si" : "No"}</p>
          <p>Horario Apertura: {sucursalActiva?.horarioApertura}hs</p>
          <p>Horario Cierre: {sucursalActiva?.horarioCierre}hs</p>
          <p>Logo: {sucursalActiva.logo ? "Tiene" : "No Tiene"}</p>
          <button onClick={() => navigate("/")}>Volver</button>
        </div>
      </div>
      )}
    </>
  );
};

export default VerSucursal
