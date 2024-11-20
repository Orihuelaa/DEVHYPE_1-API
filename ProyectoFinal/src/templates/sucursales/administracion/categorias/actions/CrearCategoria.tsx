import { useNavigate } from "react-router-dom";
import { CategoriaService } from "../../../../../services/CategoriaService";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/store";
import { useForm } from "../../../../../hooks/useForm";
import { setCategorias } from "../../../../../redux/slices/categoriaSlice";
import { ICreateCategoria } from "../../../../../endpoints/types/dtos/categorias/ICreateCategoria";

export default function CrearCategoria() {

  const navigate = useNavigate();
  const {empresaActiva} = useAppSelector((state) => state.empresa);
  const {sucursalActiva} = useAppSelector((state) => state.sucursal);
  const { categorias, categoriaActiva } = useAppSelector((state) => state.categorias);
  const dispatch = useAppDispatch();
  const categoriaService = new CategoriaService('categorias');

  const { values, handleChanges, resetForm } = useForm({
    denominacion: "",
    idEmpresa:  empresaActiva?.id ?? 0,
    idCategoriaPadre: categoriaActiva?.categoriaPadre?.id ?? 0
  });

  const createCategoriaObj = () => {
    const categoriaObj: ICreateCategoria = {
      denominacion: values.denominacion,
      idEmpresa: values.idEmpresa,
      idCategoriaPadre: null
    };
    return categoriaObj;
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const categoriaObj = createCategoriaObj();
    const categoriaData: ICreateCategoria = {...categoriaObj};
    try {
      const nuevaCategoria = await categoriaService.createCategoria(categoriaData);
      if (nuevaCategoria !== null) {
        dispatch(setCategorias([...categorias, nuevaCategoria]));
        localStorage.setItem(`categories-${sucursalActiva?.id}`, JSON.stringify([...categorias, nuevaCategoria]));
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
    <>
      <form onSubmit={onSubmit}>
        <h2>Crear una categoria padre</h2>

        <label htmlFor="denominacion">Denominacion</label>
        <input type="text" name="denominacion" id="denominacion" value={values.denominacion} onChange={handleChanges}/>
        
        <button onClick={()=> navigate(`/admin)`)} type="button">Cancelar</button>
        <button type="submit">Confirmar</button>
      </form>
    </>
  );
}