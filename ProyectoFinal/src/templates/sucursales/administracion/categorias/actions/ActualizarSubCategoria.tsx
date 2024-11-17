import { useNavigate } from "react-router-dom";

export default function ActualizarSubCategoria() {

  const navigate = useNavigate();

  return (
    <div>ActualizarSubCategoria
      <button onClick={()=> navigate(`/admin`)} type="button">Volver</button>
    </div>
  )
}
