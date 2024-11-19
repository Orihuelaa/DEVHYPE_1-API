import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { CategoriaService } from "../../../../services/CategoriaService";
import { useEffect } from "react";
import { setCategoriaActiva, setCategorias, setShowSubCategoria } from "../../../../redux/slices/categoriaSlice";
import { ICategorias } from "../../../../endpoints/types/dtos/categorias/ICategorias";
import SubCategorias from "./SubCategorias";

const Categorias = () => {
  
  const navigate = useNavigate();
  const {sucursalActiva} = useAppSelector((state) => state.sucursal);
  const {categorias, mostrarSubCategoria} = useAppSelector((state) => state.categorias);
  const dispatch = useAppDispatch();


  useEffect(() => {
    const fetchCategorias = async () => {
      const categoriasFromStorage = localStorage.getItem(`categorias-${sucursalActiva?.id}`);
      
      if (categoriasFromStorage) {
        dispatch(setCategorias(JSON.parse(categoriasFromStorage)));
      } else {
        const categoriaService = new CategoriaService('categorias');
        try {
          const response = await categoriaService.getAllCategoriaBySucursalId(sucursalActiva!.id);
          const categorias_all = response?.filter((categoria) => (categoria as ICategorias).id !== undefined);
          
          dispatch(setCategorias(categorias_all as ICategorias[]));
          localStorage.setItem(`categorias-${sucursalActiva?.id}`, JSON.stringify(categorias_all));
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    if (sucursalActiva) {
      fetchCategorias();
    }

    return ()=>{
      localStorage.removeItem(`categorias-${sucursalActiva?.id}`);
      dispatch(setCategorias([]));
    }

  }, [dispatch, sucursalActiva]);
  

  const handleSetCategoriaActiva = (categoria: ICategorias, route?: string) => {
    dispatch(setCategoriaActiva(categoria));
    if (route) navigate(route);
  };

  const handleToggleSubCategorias = (categoria: ICategorias) => {
    if (mostrarSubCategoria?.id === categoria.id) {
      dispatch(setShowSubCategoria(null)); // Ocultar las subcategorías si ya están visibles
    } else {
      dispatch(setShowSubCategoria(categoria)); // Mostrar subcategorías
    }
  };

  return (
    <>
      <div>
        <button onClick={() => navigate(`/admin/crear-categoria`)}>Crear Categoría</button>
      </div>
      <ul>
        {categorias.map((categoria) => (
            <li key={categoria.id} onClick={() => handleSetCategoriaActiva(categoria)}>
              <span>{categoria.denominacion}</span>
              <button onClick={(e)=> {e.stopPropagation(); handleToggleSubCategorias(categoria); handleSetCategoriaActiva(categoria)}}> {mostrarSubCategoria?.id === categoria.id ? 'Ocultar' : 'Mostrar'} Subcategorias</button>
              <button onClick={(e) => {e.stopPropagation(); handleSetCategoriaActiva(categoria, `/admin/editar-categoria`);}}>Actualizar Categoría</button>
              <button onClick={(e) => {e.stopPropagation(); handleSetCategoriaActiva(categoria, `/admin/crear-subcategoria`);}}>Agregar Subcategoría</button>
              {mostrarSubCategoria?.id === categoria.id && <SubCategorias />}
            </li>
        ))}
      </ul>
    </>
  );
};

export default Categorias;