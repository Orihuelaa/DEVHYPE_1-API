import { useNavigate } from "react-router-dom";
import { EmpresaService } from "../../../services/EmpresaService";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { setEmpresas } from "../../../redux/slices/empresaSlice";
import { useForm } from "../../../hooks/useForm";
import { UploadImage } from "../../image/UploadImage";
import { useState } from "react";
import { ICreateEmpresaDto } from "../../../endpoints/types/dtos/empresa/ICreateEmpresaDto";

const CrearEmpresa = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { empresas } = useAppSelector((state) => state.empresa);
  const empresaService = new EmpresaService("empresas");

  const { values, handleChanges, resetForm } = useForm({
    nombre: "",
    razonSocial: "",
    cuit: 0,
    logo: "",
  });

  const [logo, setLogo] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const empresaData: ICreateEmpresaDto = {
      ...values,
      logo: logo || "",
    };

    try {
      const nuevaEmpresa = await empresaService.createEmpresa(empresaData);
      if (nuevaEmpresa) {
        dispatch(setEmpresas([...empresas, nuevaEmpresa]));
        resetForm();
        setLogo(null);
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

        {/* Componente UploadImage para cargar el logo */}
        <label htmlFor="logo">Ícono de la Empresa:</label>
        <UploadImage
          image={logo}  // URL de la imagen cargada
          setImage={setLogo}  // Función para actualizar la imagen
          typeElement="empresa"  // Tipo de elemento (si es necesario para la eliminación)
        />

        <button type="submit">Confirmar</button>
        <button type="button" onClick={() => navigate("/")}>Cancelar</button>
      </form>
    </div>
  );
};

export default CrearEmpresa;
