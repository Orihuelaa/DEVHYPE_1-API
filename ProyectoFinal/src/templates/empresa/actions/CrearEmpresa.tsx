import { useNavigate } from "react-router-dom";
import { EmpresaService } from "../../../services/EmpresaService";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { setEmpresas } from "../../../redux/slices/empresaSlice";
import { ImageService } from "../../../services/ImageService";
import useImage from "../../../hooks/useImage";
import { useForm } from "../../../hooks/useForm";

const CrearEmpresa = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {empresas} = useAppSelector((state) => state.empresa);
  const empresaService = new EmpresaService('empresas');
  const imageService = new ImageService('images');

  const { values, handleChanges, resetForm } = useForm({
    nombre: "",
    razonSocial: "",
    cuit: 0,
    logo: ""
  });

  // Custom Hook useImage
  const { preview, handleImageChange } = useImage({ imageService, setValue: resetForm });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const nuevaEmpresa = await empresaService.createEmpresa(values);
      if (nuevaEmpresa !== null) {
        dispatch(setEmpresas([...empresas, nuevaEmpresa]));
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
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="nombre">Nombre de la Empresa:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={values.nombre}
            onChange={handleChanges}
            placeholder="Ingrese el nombre de la empresa"
            required
          />

        <label htmlFor="razon-social">Razón Social:</label>
        <input
            type="text"
            id="razonSocial"
            name="razonSocial"
            value={values.razonSocial}
            onChange={handleChanges}
            placeholder="Ingrese la razón social"
            required
          />

        <label htmlFor="cuit">CUIT:</label>
        <input
            type="number"
            id="cuit"
            name="cuit"
            value={values.cuit}
            onChange={handleChanges}
            placeholder="Ingrese el CUIT"
            required
          />

        {/* Campo para seleccionar el logo */}
        <label htmlFor="logo">Ícono de la Empresa:</label>
        <input type="file" id="logo" name="logo" accept="image/*" onChange={handleImageChange}/>

        {/* Vista previa de la imagen */}
        {preview && (
          <div>
            <img src={preview} alt="Vista previa del ícono" />
          </div>
        )}

        <button type="submit">Confirmar</button>
        <button type="button" onClick={() => navigate("/")}>Cancelar</button>
      </form>
    </div>
  );
};

export default CrearEmpresa;















// // Hook useForm (React Hook Form)
// const { 
//   register,          // Registra los campos del formulario
//   handleSubmit,      // Maneja el envío del formulario
//   setValue,          // Establece el valor de un campo del formulario
//   // watch,             // Observa el valor de un campo en tiempo real
//   formState: { errors } // Accede al estado del formulario, incluyendo errores
// } = useForm<ICreateEmpresaDto>();