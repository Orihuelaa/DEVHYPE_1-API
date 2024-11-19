import { useNavigate } from "react-router-dom";
import styles from "../../../styles/templates/styles.module.css";
import { EmpresaService } from "../../../services/EmpresaService";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import { setEmpresas } from "../../../redux/slices/empresaSlice";
import { useForm } from "../../../hooks/useForm";
import { IUpdateEmpresaDto } from "../../../endpoints/types/dtos/empresa/IUpdateEmpresaDto";
import { useState } from "react";
import { UploadImage } from "../../image/UploadImage";

const ActualizarEmpresa = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {empresas, empresaActiva} = useAppSelector((state) => state.empresa);
  const empresaService = new EmpresaService('empresas');

  // Configura el hook personalizado useForm
  const { values, handleChanges, resetForm } = useForm({
    id: empresaActiva?.id ?? 0,
    nombre: empresaActiva?.nombre ?? "",
    razonSocial: empresaActiva?.razonSocial ?? "",
    cuit: empresaActiva?.cuit ?? 0,
    logo: empresaActiva?.logo ?? ""
  });  

  const [logo, setLogo] = useState<string | null>(null);

  // Maneja el envío del formulario
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const empresaData: IUpdateEmpresaDto = {
      ...values,
      logo: logo || "",
    };
    try {
      const updatedEmpresa = await empresaService.updateEmpresa(values.id, empresaData);
      if (updatedEmpresa) {
        // Aqui deberiamos implementar SweetAlert
        dispatch(setEmpresas([...empresas, updatedEmpresa]));
        resetForm();
        setLogo(null);
      } else {
        console.log("Error al actualizar la empresa");
      }
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.overlay_content}>
        <h2>Actualizar Empresa</h2>
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

          <label htmlFor="razonSocial">Razón Social:</label>
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
            type="text"
            id="cuit"
            name="cuit"
            value={values.cuit}
            onChange={handleChanges}
            placeholder="Ingrese el CUIT"
            required
          />

          <label htmlFor="logo">Ícono de la Empresa:</label>
          <UploadImage
            image={logo}  // URL de la imagen cargada
            setImage={setLogo}  // Función para actualizar la imagen
            typeElement="empresa"  // Tipo de elemento (si es necesario para la eliminación)
          />

          <div>
            <button type="submit" className="confirmar">Confirmar</button>
            <button type="button" onClick={() => navigate("/")} className="cancelar">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActualizarEmpresa;
