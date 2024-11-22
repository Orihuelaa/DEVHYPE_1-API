import { useEffect, useState } from "react";
import { ICreateProducto } from "../../../../../endpoints/types/dtos/productos/ICreateProducto";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/store"
import { useForm } from "../../../../../hooks/useForm";
import { ArticuloService } from "../../../../../services/ArticuloService";
import { IImagen } from "../../../../../endpoints/types/IImagen";
import { setArticulos } from "../../../../../redux/slices/articuloSlice";
import { useNavigate } from "react-router-dom";
import { setCategoriaActiva, setCategorias } from "../../../../../redux/slices/categoriaSlice";
import { CategoriaService } from "../../../../../services/CategoriaService";
import { ICategorias } from "../../../../../endpoints/types/dtos/categorias/ICategorias";
import { setAlergenoActivo, setAlergenos } from "../../../../../redux/slices/alergenoSlice";
import { AlergenoService } from "../../../../../services/AlergenoService";
import { IAlergenos } from "../../../../../endpoints/types/dtos/alergenos/IAlergenos";
import { UploadImage } from "../../../../image/UploadImage";
import Button from '@mui/material/Button';
import { Stack } from "@mui/system";
import styles from "../../../../../styles/templates/styles.module.css"

export default function CrearProducto() {

  const { categorias, categoriaActiva } = useAppSelector((state) => state.categorias);
  const { articulos } = useAppSelector((state) => state.articulos);
  const { alergenos, alergenoActivo } = useAppSelector((state) => state.alergenos);
  const { sucursalActiva } = useAppSelector((state) => state.sucursal);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const articuloService = new ArticuloService('articulos');

  const [imagen, setImagen] = useState<IImagen | null>(null);
  const [alergenosSeleccionados, setAlergenosSeleccionados] = useState<IAlergenos[]>([]);

  useEffect(() => {
    const fetchCategoriasYAlergenos = async () => {
      try {
        const categoriasFromStorage = localStorage.getItem(`categorias-${sucursalActiva?.id}`);
        const alergenosFromStorage = localStorage.getItem(`alergenos-${sucursalActiva?.id}`);
        if (categoriasFromStorage) {
          dispatch(setCategorias(JSON.parse(categoriasFromStorage)));
        } else {
          const categoriaService = new CategoriaService('categorias');
          const response = await categoriaService.getAllCategoriaPadreBySucursalId(sucursalActiva!.id);
          const categorias_all = response?.filter((categoria) => (categoria as ICategorias).id !== undefined);
          dispatch(setCategorias(categorias_all as ICategorias[]));
          localStorage.setItem(`categorias-${sucursalActiva?.id}`, JSON.stringify(categorias_all));
        }

        if (alergenosFromStorage) {
          dispatch(setAlergenos(JSON.parse(alergenosFromStorage)));
        } else {
          const alergenoService = new AlergenoService('alergenos');
          const response = await alergenoService.getAll();
          const alergenos_all = response?.filter((alergeno) => (alergeno as IAlergenos).id !== undefined);
          dispatch(setAlergenos(alergenos_all as IAlergenos[]));
          localStorage.setItem(`alergenos-${sucursalActiva?.id}`, JSON.stringify(alergenos_all));
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (sucursalActiva) {
      fetchCategoriasYAlergenos();
    }

    return () => {
      localStorage.removeItem(`categorias-${sucursalActiva?.id}`);
      dispatch(setCategoriaActiva(null));
    };

  }, [dispatch, sucursalActiva]);

  const { values, handleChanges, resetForm } = useForm({
    denominacion: '',
    precioVenta: 0,
    descripcion: '',
    habilitado: '',
    codigo: '',
    idCategoria: categoriaActiva?.id ?? 0,
    idAlergenos: 0,
    imagenes: '',
    
    categoria: categoriaActiva?.denominacion ?? '',
    alergeno: '',
  });

  const createArticuloObj = (alergenosSeleccionados: IAlergenos[]) => {
    const articuloObj: ICreateProducto = {
      denominacion: values.denominacion,
      precioVenta: values.precioVenta,
      descripcion: values.descripcion,
      habilitado: true,
      codigo: values.codigo,
      idCategoria: values.idCategoria,
      idAlergenos: alergenosSeleccionados.map((alergeno) => alergeno.id),
      imagenes: imagen ? [imagen] : []
    };

    return articuloObj;
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const articuloObj = createArticuloObj(alergenosSeleccionados);
    const articuloData: ICreateProducto = { ...articuloObj };
    try {
      const nuevoArticulo = await articuloService.createArticulo(articuloData);
      if (nuevoArticulo !== null) {
        dispatch(setArticulos([...articulos, nuevoArticulo]));
        localStorage.setItem(`articulos-${sucursalActiva?.id}`, JSON.stringify([...articulos, nuevoArticulo]));
        resetForm();
      } else {
        console.log("Error al crear el producto");
      }
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/admin");
    }
  };

  const handleToogleAlergenoActivo = (alergeno: IAlergenos) => {
    if (alergenoActivo?.id === alergeno.id) {
      dispatch(setAlergenoActivo(null));
      setAlergenosSeleccionados(alergenosSeleccionados.filter((a) => a.id !== alergeno.id));
    } else {
      dispatch(setAlergenoActivo(alergeno));
      setAlergenosSeleccionados([...alergenosSeleccionados, alergeno]);
    }
  };

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.overlay_content}>
          <form onSubmit={onSubmit}>
            <h2>Crear un Articulo</h2>

            <label htmlFor="denominacion">Denominacion</label>
            <input type="text" name="denominacion" id="denominacion" value={values.denominacion} onChange={handleChanges} required />

            <label htmlFor="categoria">Categoria:</label>
            <select id="categoria" name="categoria" value={values.categoria} onChange={handleChanges} required >
              <option value="" disabled>-Seleccione una categoria-</option>
              {categorias.map((categoria) => (
                <option key={categoria.id || categoria.denominacion} value={categoria.denominacion} onClick={() => dispatch(setCategoriaActiva(categoria))}>
                  {categoria.denominacion}
                </option>
              ))}
            </select>

            <label htmlFor="alergeno">Alérgenos:</label>
            <select id="alergeno" name="alergeno" required>
              <option value="" disabled>-Seleccione un Alérgeno-</option>
              {alergenos.map((alergeno) => (
                <option
                  key={alergeno.id}
                  value={alergeno.denominacion}
                  onClick={() => handleToogleAlergenoActivo(alergeno)}
                >
                  {alergeno.denominacion}
                </option>
              ))}
            </select>

            <label htmlFor="precioVenta">Precio de Venta:</label>
            <input type="number" name="precioVenta" id="precioVenta" value={values.precioVenta} onChange={handleChanges} required />

            <label htmlFor="codigo">Codigo:</label>
            <input type="text" name="codigo" id="codigo" value={values.codigo} onChange={handleChanges} required />

            {/* Implementar checkbox */}
            <label htmlFor="habilitado">Habilitado:</label>
            <select name="habilitado" id="habilitado" value={values.habilitado} onChange={handleChanges} required>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>

            <label htmlFor="descripcion">Descripcion:</label>
            <input type="text" name="descripcion" id="descripcion" value={values.descripcion} onChange={handleChanges} required />

            <label htmlFor="imagen">Imagen:</label>
            <UploadImage
              imageObjeto={imagen}
              setImageObjeto={setImagen}
              typeElement="alergeno"
            />

            <Stack direction="row" spacing={2}  sx={{display: 'flex',justifyContent: 'space-between', marginTop:'15px'}}>
              <Button sx={{positions:'absolute',left:'10px'}} type="submit" className="confirmar" variant="contained" color="success" >Confirmar</Button>
              <Button sx={{ right:'970px' }} onClick={() => navigate('/')} className="cancelar" variant="contained" color="error">Cancelar</Button>
            </Stack >
          </form>
        </div>
      </div>
      
      
    </>
  );
}