import { useNavigate} from "react-router-dom";
import styles from "../../../styles/templates/styles.module.css"
import useImage from "../../../hooks/useImage";
import { ImageService } from "../../../services/ImageService";
import { useForm } from "../../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { SucursalService } from "../../../services/SucursalService";
import { ICreateSucursal } from "../../../endpoints/types/dtos/sucursal/ICreateSucursal";
import { setSucursales } from "../../../redux/slices/sucursalSlice";
import Paises from "./formComponents/Paises";
import Provincias from "./formComponents/Provincias";
import Localidades from "./formComponents/Localidades";

const CrearSucursal = () => {
    
    const navigate = useNavigate();
    const {sucursales} = useAppSelector(state => state.sucursal);
    const dispatch = useAppDispatch();
    const sucursalService = new SucursalService("sucursales");
    const imageService = new ImageService("images");


    // Configura el hook personalizado useForm
    const { values, handleChanges, resetForm } = useForm({
        nombre: '',
        idEmpresa: 0,
        eliminado: '',
        latitud: 0,
        longitud: 0,
        logo: '',
        categorias: 0,
        esCasaMatriz: '',
        horarioApertura: '',
        horarioCierre: '',

        domicilioId: 0,
        domicilioCalle: '',
        domicilioNumero: 0,
        domicilioCp: 0,
        domicilioPiso: 0,
        domicilioEliminado: '',
        domicilioNroDpto: 0,

        localidadId: 0,
        localidadNombre: '',
        
        provinciaId: 0,
        provinciaNombre: '',
        
        paisId: 0,
        paisNombre: ''
    });

    // Hook personalizado para manejar imágenes
    const { preview, handleImageChange } = useImage({ imageService, setValue: resetForm });

    const crteateSucursalObj = () => {
        const sucursalObj: ICreateSucursal = {
            nombre: values.nombre,
            idEmpresa: Number(values.idEmpresa), // Asegúrate de convertirlo a un número
            latitud: Number(values.latitud),
            longitud: Number(values.longitud),
            logo: values.logo,
            esCasaMatriz: values.esCasaMatriz === "Si" ? true : false,
            horarioApertura: values.horarioApertura,
            horarioCierre: values.horarioCierre,
            domicilio: {
                calle: values.domicilioCalle,
                numero: Number(values.domicilioNumero),
                cp: Number(values.domicilioCp),
                piso: Number(values.domicilioPiso),
                nroDpto: Number(values.domicilioNroDpto),
                idLocalidad: values.localidadId,
            }
        };
        return sucursalObj;
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const sucursalObj = crteateSucursalObj();
            const nuevaSucursal = await sucursalService.createSucursal(sucursalObj);
            if (nuevaSucursal !== null) {
                dispatch(setSucursales([...sucursales, nuevaSucursal]));
                resetForm();
            } else {
                console.log("Error al crear la empresa");
            }
        } catch (error) {
            console.log(error);
        } finally {
            navigate("/");
        }
      };

    return (
        <>
            <div className={styles.overlay}>
                <div className={styles.overlay_content}>
                    {/* Formulario para agregar una nueva sucursal */}
                    <form onSubmit={onSubmit}>
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

                        <label htmlFor="icono">Ícono de la Sucursal:</label>
                        <input 
                            type="file"
                            id="icono"
                            name="icono"
                            onChange={handleImageChange}
                            accept="image/*"
                        />

                        {preview && (
                            <div>
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
}

export default CrearSucursal
