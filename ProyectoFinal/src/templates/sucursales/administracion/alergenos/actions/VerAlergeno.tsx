import { useNavigate, useParams } from "react-router-dom";


const VerAlergeno = () => {
  const {id} = useParams(); 
  const navigate = useNavigate();

  return (
    <>
      <div >
        <div >
          <h2>Detalles del Alérgeno</h2>
          <p>ID del alérgeno: {id}</p>
          <button onClick={() => navigate(`/admin/${id}`)}>Volver</button>
        </div>
      </div>
    </>
  );
};

export default VerAlergeno;

