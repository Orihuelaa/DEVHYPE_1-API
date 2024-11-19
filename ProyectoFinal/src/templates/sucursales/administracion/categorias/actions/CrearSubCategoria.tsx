import { useNavigate } from "react-router-dom";

export default function CrearSubCategoria() {

  const navigate = useNavigate();

  return (
    <div>VerSubCategoria
      <button onClick={()=> navigate(`/admin`)} type="button">Volver</button>
    </div>
  )
}