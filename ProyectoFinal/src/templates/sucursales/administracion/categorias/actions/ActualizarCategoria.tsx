import { useNavigate } from "react-router-dom";

export default function ActualizarCategoria() {

  const navigate = useNavigate();

  return (
    <div>ActualizarCategoria
      <button onClick={()=> navigate(`/admin`)} type="button">Volver</button>
    </div>
  )
}
