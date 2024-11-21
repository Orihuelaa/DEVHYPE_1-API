import { useState } from "react";
import {useNavigate } from "react-router-dom";
import { ICreateAlergeno } from "../../../../../endpoints/types/dtos/alergenos/ICreateAlergeno";
import { useForm } from "../../../../../hooks/useForm";
import { AlergenoService } from "../../../../../services/AlergenoService";
import { setAlergenos } from "../../../../../redux/slices/alergenoSlice";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/store";
import { IImagen } from "../../../../../endpoints/types/IImagen";
import { UploadImage } from "../../../../image/UploadImage";
import styles from "../../../../../styles/templates/styles.module.css";


const CrearAlergeno = () => {

  const navigate = useNavigate();
  const { alergenos } = useAppSelector((state) => state.alergenos);
  const {sucursalActiva} = useAppSelector((state) => state.sucursal);

  const dispatch = useAppDispatch();
  const alergenoService = new AlergenoService('alergenos');

  const{ values, handleChanges, resetForm } = useForm({
    denominacion: "",
    imagenName: '',
    imagenUrl: '',
  });
  
  const [imagen, setImagen] = useState<IImagen | null>(null);

  const createAlergenoObj = () => {
    const alergenoObj: ICreateAlergeno = {
      denominacion: values.denominacion,
      imagen: imagen
    };
    return alergenoObj;
  }

const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  
  const alergenoObj = createAlergenoObj();
  const alergenoData: ICreateAlergeno = {
      ...alergenoObj,
      imagen: imagen,
  };
  try {
      const nuevoAlergeno = await alergenoService.createAlergeno(alergenoData);
      if (nuevoAlergeno !== null) {
          dispatch(setAlergenos([...alergenos, nuevoAlergeno]));
          localStorage.setItem(`alergenos-${sucursalActiva?.id}`, JSON.stringify([...alergenos, nuevoAlergeno]));
          resetForm();
          setImagen(null);
      } else {
          console.log("Error al crear el alergeno");
      }
  } catch (error) {
      console.log(error);
  } finally {
      navigate("/admin");
  }
};

  return (
    <>
    <div className={styles.container}>
      <div className={styles.container_f}>
        <form onSubmit={onSubmit}>
          <h2>Crear Alergeno</h2>
          <label htmlFor="denominacion">Denominacion:</label>

          <input
            type="text"
            id="denominacion"
            name="denominacion"
            value={values.denominacion}
            onChange={handleChanges}
          />

          <label htmlFor="imagen">Imagen:</label>
          <UploadImage
            imageObjeto={imagen}
            setImageObjeto={setImagen}
            typeElement="alergeno"
          />
          
          <div>
            <button onClick={() => navigate('/admin')} className="cancelar">Cancelar</button>
            <button type="submit">Crear</button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default CrearAlergeno;