// import { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAppDispatch } from "../../../../../hooks/store";
// import { AlergenoService } from "../../../../../services/AlergenoService";
// import useImage from "../../../../../hooks/useImage";
// import { IUpdateAlergeno } from "../../../../../endpoints/types/dtos/alergenos/IUpdateAlergeno";
// import { ErrorPage } from "../../../../ErrorPage";


const ActualizarAlergeno = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const dispatch = useAppDispatch();
//   const alergenoService = new AlergenoService('/alergenos/{id}');

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<IUpdateAlergeno>();

//   const { preview, handleImageChange } = useImage({ setValue });

//   useEffect(() => {
//     // Función para cargar los datos de la sucursal (suponiendo que tienes un servicio para obtener la sucursal)
//     const fetchAlergeno = async () => {
//       const response = await fetch(`/api/alergeno/${id}`);
//       if (response.ok) {
//         const data = await response.json();
//         // Llenamos el estado del formulario con los datos de la sucursal
//         setValue(data);
//       } else {
//         console.error("Error al cargar los datos de la sucursal");
//       }
//     };

//     if (id) {
//       fetchSucursal();
//     }
//   }, [id]);

//   // Maneja el envío del formulario
//     const onSubmit = async (data: IUpdateAlergeno) => {
//         try {
//         const updatedAlergeno = await alergenoService.updateAlergeno(Number(id), data);
//         if (updatedAlergeno) {
//             // Actualiza el estado de empresas en Redux con la empresa modificada
//             const updatedAlergenos = alergenos.map((e) => (e.id === Number(id) ? updatedAlergeno : e));
//             dispatch(setAlergenos(updatedAlergenos));
//             navigate('/');
//         } else {
//             ErrorPage("Error al actualizar la empresa");
//         }
//         } catch (error) {
//         console.error("Error al actualizar la empresa", error);
//         }
//     };

  return (
    <div>
{/* //       <h2>Actualizar Alérgeno</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <label htmlFor="denominacion">Nombre del Alérgeno:</label>
//         <input
//           type="text"
//           id="denominacion"
//           {...register("denominacion", { required: "Este campo es obligatorio" })}
//         />
//         {errors.denominacion && <p>{errors.denominacion.message}</p>}

//         <label htmlFor="imagen">Ícono del Alérgeno:</label>
//         <input type="file" id="imagen" accept="image/*" onChange={handleImageChange} />

//         {preview && (
//           <div className="preview">
//             <p>Vista previa del ícono:</p>
//             <img src={preview} alt="Vista previa del ícono" style={{ width: "50px", height: "50px" }} />
//           </div>
//         )}

//         <div>
//           <button type="submit">Actualizar</button>
//           <button type="button" onClick={() => navigate(`/alergenos`)}>Volver</button>
//         </div>
//       </form> */}
    </div>
  );
};

export default ActualizarAlergeno;
