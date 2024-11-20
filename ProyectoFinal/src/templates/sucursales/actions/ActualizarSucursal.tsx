import { useNavigate } from "react-router-dom";
import styles from "../../../styles/templates/styles.module.css"
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { SucursalService } from "../../../services/SucursalService";
import { useForm } from "../../../hooks/useForm";
import { setSucursales } from "../../../redux/slices/sucursalSlice";
import { IUpdateSucursal } from "../../../endpoints/types/dtos/sucursal/IUpdateSucursal";
import { CategoriaService } from "../../../services/CategoriaService";
import { useState } from "react";
import { UploadImage } from "../../image/UploadImage";
import Paises from "./formComponents/Paises";
import Provincias from "./formComponents/Provincias";
import Localidades from "./formComponents/Localidades";
import Button from '@mui/material/Button';
import { Stack } from "@mui/system";

const ActualizarSucursal = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {empresaActiva} = useAppSelector((state) => state.empresa);
  const {sucursales, sucursalActiva} = useAppSelector((state) => state.sucursal);
  const sucursalService = new SucursalService('sucursales');

  // Configura el hook personalizado useForm
  const { values, handleChanges, resetForm } = useForm({
    id: sucursalActiva?.id ?? 0,
    nombre: sucursalActiva?.nombre ?? "",
    idEmpresa: empresaActiva?.id ?? 0,
    eliminado: sucursalActiva?.eliminado === true ? "Si" : "No",
    latitud: sucursalActiva?.latitud ?? 0,
    longitud: sucursalActiva?.longitud ?? 0,
    
    domicilioId: sucursalActiva?.domicilio?.id ?? 0,
    domicilioCalle: sucursalActiva?.domicilio?.calle ?? "",
    domicilioNumero: sucursalActiva?.domicilio?.numero ?? 0,
    domicilioCp: sucursalActiva?.domicilio?.cp ?? 0,
    domicilioPiso: sucursalActiva?.domicilio?.piso ?? 0,
    domicilioNroDpto: sucursalActiva?.domicilio?.nroDpto ?? 0,
    domicilioIdLocalidad: sucursalActiva?.domicilio?.localidad?.id ?? 0,
    
    logo: "",
    categorias: '',
    esCasaMatriz: sucursalActiva?.esCasaMatriz === true ? "Si" : "No",
    horarioApertura: sucursalActiva?.horarioApertura ?? '',
    horarioCierre: sucursalActiva?.horarioCierre ?? ''
  });

  const [logo, setLogo] = useState<string | null>(null);

  const updateSucursalObj = async() => {
    
    const categoriaService = new CategoriaService('categorias');
    const getAllCategories = async () => {
      const categorias = await categoriaService.getAllCategoriaBySucursalId(sucursalActiva!.id);
      return categorias ?? [];
    };
  
    const categories = await getAllCategories();
  
    const sucursalObj: IUpdateSucursal = {
      id: values.id,
      nombre: values.nombre,
      idEmpresa: values.idEmpresa,
      eliminado: values.eliminado === "Si" ? true : false,
      latitud: values.latitud,
      longitud: values.longitud,
      
      domicilio: {
        id: values.domicilioId,
        calle: values.domicilioCalle,
        numero: values.domicilioNumero,
        cp: values.domicilioCp,
        piso: values.domicilioPiso,
        nroDpto: values.domicilioNroDpto,
        idLocalidad: values.domicilioIdLocalidad,
      },
      logo: logo ?? "",
      categorias: categories,
      esCasaMatriz: values.esCasaMatriz === "Si" ? true : false,
      horarioApertura: values.horarioApertura,
      horarioCierre: values.horarioCierre
    }
  
    return sucursalObj;
  };
  
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sucursalObj = await updateSucursalObj();
    const sucursalData: IUpdateSucursal = {
      ...sucursalObj,
      logo: logo || "",
    };
    try {
      const updatedSucursal = await sucursalService.updateSucursal(values.id, sucursalData);
      if (updatedSucursal) {
        const updatedSucursales = sucursales.map((s) => (s.id === values.id ? updatedSucursal : s));
        dispatch(setSucursales(updatedSucursales));
        resetForm();
        setLogo(null);
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
          {/* Formulario para agregar una nueva sucursal */}
          <form onSubmit={onSubmit} encType="multipart/form-data">
            <h3>Agregar nueva Sucursal</h3>
            <label htmlFor="nombre">Nombre de la Sucursal:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={values.nombre}
              onChange={handleChanges}
              required
            />

            <label htmlFor="hora-apertura">Ingrese la hora de apertura:</label>
            <input 
              type="time"
              id="hora-apertura"
              name="horarioApertura"
              value={values.horarioApertura}
              onChange={handleChanges}
              required
            />

            <label htmlFor="hora-cierre">Ingrese la hora de cierre:</label>
            <input 
              type="time"
              id="hora-cierre"
              name="horarioCierre"
              value={values.horarioCierre}
              onChange={handleChanges}
              required
            />

            <label htmlFor="es-casa-matriz">Es casa Matriz?</label>
            <select name="esCasaMatriz" id="es-casa-matriz" value={values.esCasaMatriz} onChange={handleChanges} required >
              <option value="" disabled></option>
              <option value="Si">Si</option>
              <option value="No">No</option>
            </select>

            <Paises />
            <Provincias />
            <Localidades />

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
              name="domicilioCalle"
              value={values.domicilioCalle}
              onChange={handleChanges}
              required
            />

            <label htmlFor="numeroCalle">Número de la calle:</label>
            <input 
              type="number" 
              id="numeroCalle"
              name="domicilioNumero"
              value={values.domicilioNumero}
              onChange={handleChanges}
              required
            />

            <label htmlFor="codigoPostal">Código postal:</label>
            <input 
              type="number" 
              id="codigoPostal"
              name="domicilioCp"
              value={values.domicilioCp}
              onChange={handleChanges}
              required
            />

            <label htmlFor="numeroPiso">Número de piso:</label>
            <input 
              type="number"
              id="numeroPiso"
              name="domicilioPiso" 
              value={values.domicilioPiso}
              onChange={handleChanges}
              required
            />

            <label htmlFor="numeroDepartamento">Número de departamento:</label>
            <input 
              type="number" 
              id="numeroDepartamento"
              name="domicilioNroDpto"
              value={values.domicilioNroDpto}
              onChange={handleChanges}
              required
            />

            <label htmlFor="logo">Ícono de la Sucursal:</label>
            <UploadImage
              image={logo}
              setImage={setLogo}
              typeElement="empresa"
            />

            <Stack direction="row" spacing={2}>
                  <Button type="submit" className="confirmar" variant="contained" color="success" >Confirmar</Button>
                  <Button sx={{ alignItems: 'end' }} onClick={() => navigate('/')} className="cancelar" variant="contained" color="error">Cancelar</Button>
            </Stack >
          </form>
        </div>
      </div>
    </>
  );
};

export default ActualizarSucursal;
