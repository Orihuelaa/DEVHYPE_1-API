// import { useNavigate } from "react-router-dom";
// import { CategoriaService } from "../../../../../services/CategoriaService";
// import { useAppDispatch, useAppSelector } from "../../../../../hooks/store";
// import { useForm } from "../../../../../hooks/useForm";
// import { setCategorias } from "../../../../../redux/slices/categoriaSlice";
// import { IUpdateCategoria } from "../../../../../endpoints/types/dtos/categorias/IUpdateCategoria";
// import { SucursalService } from "../../../../../services/SucursalService";

// export default function ActualizarCategoria() {

//   const navigate = useNavigate();
//   const { categorias, categoriaActiva } = useAppSelector((state) => state.categorias);
//   const dispatch = useAppDispatch();
//   const categoriaService = new CategoriaService('categorias');

// const { values, handleChanges, resetForm } = useForm({
//   id: categoriaActiva?.id ?? 0,
//   denominacion:  categoriaActiva?.denominacion ?? '',
//   eliminado: categoriaActiva?.eliminado ? 'Si' : 'No',
//   idEmpresa: categoriaActiva?.idEmpresa ?? 0,
//   idSucursales: categoriaActiva ?.idSucursales ?? 0,
//   idCategoriaPadre: 0
// });

//   const updateCategoriaObj = async() => {
//     const sucursalService = new SucursalService('/sucursales');

//     const getAllCategories = async () => {
//       const sucursales = await sucursalService.(sucursalActiva!.id);
//       return categorias ?? [];
//     };
  
//     const categories = await getAllCategories();
  
//     const obj: IUpdateCategoria = {
//       id: values.id,
//       denominacion: values.denominacion,
//       eliminado: values.eliminado === "Si" ? true : false,
//       idEmpresa: values.idEmpresa,
//       idSucursales: [sucursales],
//       idCategoriaPadre: values.idCategoriaPadre
//     }
  
//     return obj;
//   };

//   const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     try {
//       const updatedCategoriaObj = await updateCategoriaObj();
//       const updatedCategoria = await categoriaService.updateCategoria(values.id, updatedCategoriaObj);
//       if (updatedCategoria) {
//         const updatedCategorias = categorias.map((c) => (c.id === values.id ? updatedCategoria : c));
//         dispatch(setCategorias(updatedCategorias));
//         resetForm();
//       } else {
//         console.log("Error al crear la categoria");
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       navigate("/admin");
//     }
//   };

//   return (
//     <form onSubmit={onSubmit}>
//       <h2>Crear una categoria padre</h2>

//       <label htmlFor="denominacion"></label>
//       <input type="text" name="denominacion" id="denominacion" value={values.denominacion} onChange={handleChanges}/>
      
//       <button onClick={()=> navigate(`/admin`)} type="button">Cancelar</button>
//       <button type="submit">Confirmar</button>
//     </form>
//   )
// }