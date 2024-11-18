import { useNavigate } from "react-router-dom";
import styles from "../../../styles/templates/styles.module.css"
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { SucursalService } from "../../../services/SucursalService";
import { ImageService } from "../../../services/ImageService";
import { useForm } from "../../../hooks/useForm";
import useImage from "../../../hooks/useImage";
import { setSucursales } from "../../../redux/slices/sucursalSlice";
import { IUpdateSucursal } from "../../../endpoints/types/dtos/sucursal/IUpdateSucursal";
import { CategoriaService } from "../../../services/CategoriaService";

const ActualizarSucursal = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {sucursales, sucursalActiva} = useAppSelector((state) => state.sucursal);
  const sucursalService = new SucursalService('sucursales');

  const imageService = new ImageService("images");
  
  // Configura el hook personalizado useForm
  const { values, handleChanges, resetForm } = useForm({
    id: sucursalActiva?.id ?? 0,
    nombre: sucursalActiva?.nombre ?? '',
    idEmpresa: sucursalActiva?.empresa.id ?? 0,
    eliminado: sucursalActiva?.eliminado ? "Si" : "No",
    latitud: sucursalActiva?.latitud ?? 0,
    longitud: sucursalActiva?.longitud ?? 0,
    logo: sucursalActiva?.logo ?? '',
    categorias: sucursalActiva?.categorias.length ?? 0,
    esCasaMatriz: sucursalActiva?.esCasaMatriz ? "Si" : "No",
    horarioApertura: sucursalActiva?.horarioApertura ?? '',
    horarioCierre: sucursalActiva?.horarioCierre ?? '',

    domicilioId: sucursalActiva?.domicilio.id ?? 0,
    domicilioCalle: sucursalActiva?.domicilio.calle ?? '',
    domicilioNumero: sucursalActiva?.domicilio.numero ?? 0,
    domicilioCp: sucursalActiva?.domicilio.cp ?? 0,
    domicilioPiso: sucursalActiva?.domicilio.piso ?? 0,
    domicilioEliminado: sucursalActiva?.domicilio.eliminado ? "Si" : "No",
    domicilioNroDpto: sucursalActiva?.domicilio.nroDpto ?? 0,

    localidadId: sucursalActiva?.domicilio.localidad.id ?? 0,
    localidadNombre: sucursalActiva?.domicilio.localidad.nombre ?? '',
      
    provinciaId: sucursalActiva?.domicilio.localidad.provincia.id ?? 0,
    provinciaNombre: sucursalActiva?.domicilio.localidad.provincia.nombre ?? '',
    
    paisId: sucursalActiva?.domicilio.localidad.provincia.pais.id ?? 0,
    paisNombre: sucursalActiva?.domicilio.localidad.provincia.pais.nombre ?? ''
  });

  // Hook personalizado para manejar imágenes
  const { preview, handleImageChange } = useImage({ imageService, setValue: resetForm });

  const updateSucursalObj = async() => {
    const categoriaService = new CategoriaService('/categorias');

    const getAllCategories = async () => {
      const categorias = await categoriaService.getAllCategoriaBySucursalId(sucursalActiva!.id);
      return categorias ?? [];
    };
  
    const categories = await getAllCategories();
  
    const obj: IUpdateSucursal = {
      id: values.id,
      nombre: values.nombre,
      idEmpresa: values.idEmpresa,
      eliminado: values.eliminado === "Si" ? true : false,
      latitud: values.latitud,
      longitud: values.longitud,
      logo: values.logo,
      categorias: categories, // Asigna las categorias obtenidas
      esCasaMatriz: values.esCasaMatriz === "Si" ? true : false,
      horarioApertura: values.horarioApertura,
      horarioCierre: values.horarioCierre,
      domicilio: {
        id: values.domicilioId,
        calle: values.domicilioCalle,
        numero: values.domicilioNumero,
        cp: values.domicilioCp,
        piso: values.domicilioPiso,
        nroDpto: values.domicilioNroDpto,
        idLocalidad: values.localidadId,
      }
    }
  
    return obj;
  };
  
  // Maneja el envío del formulario
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const updatedSucursalObj = await updateSucursalObj();
      const updatedSucursal = await sucursalService.updateSucursal(values.id, updatedSucursalObj);
      if (updatedSucursal) {
        const updatedSucursales = sucursales.map((s) => (s.id === values.id ? updatedSucursal : s));
        dispatch(setSucursales(updatedSucursales));
        resetForm();
      } else {
        console.log("Error al actualizar la sucursal");
      }
    } catch (error) {
      console.log(error);
    } finally{
      navigate("/");
    }
  };


  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.overlay_content}>
          <h2>Actualizar Sucursal</h2>
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <label htmlFor="nombre">Nombre de la Sucursal:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={values.nombre}
              onChange={handleChanges}
              required
            />

            <label htmlFor="horario-apertura">Ingrese la hora de apertura:</label>
            <input 
              type="time"
              id="horario-apertura"
              name="horarioApertura"
              value={values.horarioApertura}
              onChange={handleChanges}
              required
            />

            <label htmlFor="horario-cierre">Ingrese la hora de cierre:</label>
            <input 
              type="time"
              id="horario-cierre"
              name="horarioCierre"
              value={values.horarioCierre}
              onChange={handleChanges}
              required
            />

            <label htmlFor="pais">País:</label>
            <input 
              type="text" 
              id="pais"
              name="pais"
              value={values.paisNombre}
              onChange={handleChanges}
              required
            /> 

            <label htmlFor="provincia">Provincia:</label>
            <input 
              type="text" 
              id="provincia"
              name="provincia"
              value={values.provinciaNombre}
              onChange={handleChanges}
              required
            />

            <label htmlFor="localidad">Localidad:</label>
            <input 
              type="text" 
              id="localidad"
              name="localidad"
              value={values.localidadNombre}
              onChange={handleChanges}
              required
            />

            <label htmlFor="latitud">Latitud:</label>
            <input 
              type="number" 
              id="latitud"
              name="latitud"
              value={values.latitud}
              onChange={handleChanges}
              required
            />

            <label htmlFor="longitud">Longitud:</label>
            <input 
              type="number" 
              id="longitud"
              name="longitud"
              value={values.longitud}
              onChange={handleChanges}
              required
            />
              
            <label htmlFor="nombreCalle">Nombre de la calle:</label>
            <input 
              type="text" 
              id="nombreCalle"
              name="nombreCalle"
              value={values.domicilioCalle}
              onChange={handleChanges}
              required
            />

            <label htmlFor="numeroCalle">Número de la calle:</label>
            <input 
              type="number" 
              id="numeroCalle"
              name="numeroCalle"
              value={values.domicilioNumero}
              onChange={handleChanges}
              required
            />

            <label htmlFor="cp">Código postal:</label>
            <input 
              type="number" 
              id="cp"
              name="cp"
              value={values.domicilioCp}
              onChange={handleChanges}
              required
            />

            <label htmlFor="numeroPiso">Número de piso:</label>
            <input 
              type="number" 
              id="numeroPiso"
              name="numeroPiso"
              value={values.domicilioPiso}
              onChange={handleChanges}
              required
            />

            <label htmlFor="numeroDepartamento">Número de departamento:</label>
            <input 
              type="number"
              id="numeroDepartamento" 
              name="numeroDepartamento"
              value={values.domicilioNroDpto}
              onChange={handleChanges}
              required
            />

            <label htmlFor="icono">Ícono de la Sucursal:</label>
            <input 
              type="file"
              id="icono"
              name="icono"
              onChange={handleImageChange}
              accept="image/*"
              required
            />

            {preview && (
                <div className="preview">
                    <img src={preview} alt="Vista previa del ícono" />
                </div>
            )}
            <div>
              <button type="submit" className="confirmar">Confirmar</button>
              <button onClick={() => navigate('/')} className="cancelar">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
      
    </>
  );
};

export default ActualizarSucursal;
