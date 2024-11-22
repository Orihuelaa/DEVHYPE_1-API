import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { useEffect, useState } from "react";
import { setArticuloActivo, setArticulos } from "../../../../redux/slices/articuloSlice";
import { ArticuloService } from "../../../../services/ArticuloService";
import { IProductos } from "../../../../endpoints/types/dtos/productos/IProductos";
import { useForm } from "../../../../hooks/useForm";
import { setCategoriaActiva, setCategorias } from "../../../../redux/slices/categoriaSlice";
import { CategoriaService } from "../../../../services/CategoriaService";
import { ICategorias } from "../../../../endpoints/types/dtos/categorias/ICategorias";

const Productos = () => {
  const navigate = useNavigate();
  const { categorias } = useAppSelector((state) => state.categorias);
  const { articulos } = useAppSelector((state) => state.articulos);
  const { sucursalActiva } = useAppSelector((state) => state.sucursal);
  const dispatch = useAppDispatch();

  const [filteredArticulos, setFilteredArticulos] = useState<IProductos[]>(articulos); 

  useEffect(() => {
    const fetchArticulosYCategorias = async () => {
      const articulosFromStorage = localStorage.getItem(`articulos-${sucursalActiva?.id}`);
      const categoriasFromStorage = localStorage.getItem(`categorias-${sucursalActiva?.id}`);

      const articuloService = new ArticuloService('articulos');
      const categoriaService = new CategoriaService('categorias');

      if (articulosFromStorage) {
        dispatch(setArticulos(JSON.parse(articulosFromStorage)));
      } else {
        try {
          const response = await articuloService.getArticulosBySucursal(sucursalActiva!.id);
          const articulos_all = response?.filter((articulo) => (articulo as IProductos).id !== undefined);
          
          dispatch(setArticulos(articulos_all as IProductos[]));
          localStorage.setItem(`articulos-${sucursalActiva?.id}`, JSON.stringify(articulos_all));
        } catch (error) {
          console.log(error);
        }
      }

      if (categoriasFromStorage) {
        dispatch(setCategorias(JSON.parse(categoriasFromStorage)));
      } else {
        try {
          const response = await categoriaService.getAllCategoriaPadreBySucursalId(sucursalActiva!.id);
          const categorias_all = response?.filter((categoria) => (categoria as ICategorias).id !== undefined);
          
          dispatch(setCategorias(categorias_all as ICategorias[]));
          localStorage.setItem(`categorias-${sucursalActiva?.id}`, JSON.stringify(categorias_all));
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    if (sucursalActiva) {
      fetchArticulosYCategorias();
    }

    return () => {
      localStorage.removeItem(`articulos-${sucursalActiva?.id}`);
      localStorage.removeItem(`categorias-${sucursalActiva?.id}`);
      
      dispatch(setArticulos([]));
      dispatch(setCategorias([]));
    }

  }, [dispatch, sucursalActiva]);

  const { values, handleChanges } = useForm({
    categorias: "",
  });

  const handleEliminarProducto = async (id: number) => {
    const articuloService = new ArticuloService('articulos');

    const confirmDelete = window.confirm("¿Estás seguro de eliminar este producto?");
    if (confirmDelete) {
      try {
        await articuloService.deleteArticuloById(id);
        dispatch(setArticulos(articulos.filter((articulo) => articulo.id !== id)));
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  }

  const handleSetArticuloActivo = (articulo: IProductos, route?: string) => {
    dispatch(setArticuloActivo(articulo));
    if (route) navigate(route);
  };

  const handleCategoriaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoria = event.target.value;
    // Filtrar artículos por la categoría seleccionada
    if (selectedCategoria === "") {
      setFilteredArticulos(articulos);
      dispatch(setCategoriaActiva(null));
    } else {
      setFilteredArticulos(articulos.filter((articulo) => articulo.categoria.denominacion === selectedCategoria));
      // Actualizamos el estado de la categoría activa
      const categoriaActiva = categorias.find(
        (categoria) => categoria.denominacion === selectedCategoria
      );
      dispatch(setCategoriaActiva(categoriaActiva || null));
    }
  };

  return (
    <>
      <div>
        <button onClick={() => navigate(`/admin/crear-producto`)}>Crear Producto</button>
      </div>
      <div>
        <h3>Filtrar por categoria:</h3>
        <label htmlFor="categorias"></label>
        <select
          id="categorias"
          name="categorias"
          value={values.categorias}
          onChange={(e) => {
            handleChanges(e);
            handleCategoriaChange(e);
          }}
          required
        >
          <option value="">
            -Todas las Categorias-
          </option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.denominacion}>
              {categoria.denominacion}
            </option>
          ))}
        </select>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripcion</th>
              <th>Categoria</th>
              <th>Habilitado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticulos.length === 0 ? (
              <tr>
                <td colSpan={6}>No hay artículos disponibles en esta categoría.</td>
              </tr>
            ) : (
              filteredArticulos.map((articulo) => (
                <tr key={articulo.id} onClick={() => handleSetArticuloActivo(articulo)}>
                  <td>{articulo.denominacion}</td>
                  <td>{articulo.precioVenta}</td>
                  <td>{articulo.descripcion}</td>
                  <td>{articulo.categoria.denominacion}</td>
                  <td>{articulo.habilitado ? "Sí" : "No"}</td>
                  <td>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetArticuloActivo(articulo, `/admin/ver-producto`);
                      }}
                    >
                      Ver
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetArticuloActivo(articulo, `/admin/editar-producto`);
                      }}
                    >
                      Editar
                    </button>
                    <button onClick={() => handleEliminarProducto(articulo.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Productos;