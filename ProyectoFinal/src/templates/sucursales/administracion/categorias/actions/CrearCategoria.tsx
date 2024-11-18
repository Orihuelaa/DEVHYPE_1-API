import { useNavigate } from "react-router-dom";
import { CategoriaService } from "../../../../../services/CategoriaService";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/store";
import { useForm } from "../../../../../hooks/useForm";
import { setCategorias } from "../../../../../redux/slices/categoriaSlice";

export default function CrearCategoria() {

  const navigate = useNavigate();
  const { categorias } = useAppSelector((state) => state.categorias);
  const dispatch = useAppDispatch();
  const categoriaService = new CategoriaService('categorias');

  const { values, handleChanges, resetForm } = useForm({
    denominacion: "",
    idEmpresa: 0,
    idCategoriaPadre: 0
  });


  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const nuevaCategoria = await categoriaService.createCategoria(values);
      if (nuevaCategoria !== null) {
        dispatch(setCategorias([...categorias, nuevaCategoria]));
        resetForm();
      } else {
        console.log("Error al crear la categoria");
      }
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/admin");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Crear una categoria padre</h2>

      <label htmlFor="denominacion"></label>
      <input type="text" name="denominacion" id="denominacion" value={values.denominacion} onChange={handleChanges}/>
      
      <button onClick={()=> navigate(`/admin`)} type="button">Cancelar</button>
      <button type="submit">Confirmar</button>
    </form>
  )
}