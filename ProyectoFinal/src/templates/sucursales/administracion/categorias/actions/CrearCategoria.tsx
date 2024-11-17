import { useNavigate } from "react-router-dom";

export default function CrearCategoria() {

  const navigate = useNavigate();

  return (
    <div>CrearCategoria
      <button onClick={()=> navigate(`/admin`)} type="button">Volver</button>
    </div>
  )
}