import { useNavigate } from "react-router-dom";
import { AlergenoService } from "../../../../../services/AlergenoService";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/store";
import { IImagen } from "../../../../../endpoints/types/IImagen";
import { IUpdateAlergeno } from "../../../../../endpoints/types/dtos/alergenos/IUpdateAlergeno";
import { useState } from "react";
import { setAlergenos } from "../../../../../redux/slices/alergenoSlice";
import styles from "../../../../../styles/templates/styles.module.css"
import { UploadImage } from "../../../../image/UploadImage";
import { useForm } from "../../../../../hooks/useForm";
import Button from '@mui/material/Button';
import { Stack } from "@mui/system";





const ActualizarAlergeno = () => {
  const navigate = useNavigate();
  const {alergenos, alergenoActivo } = useAppSelector((state) => state.alergenos);
  const dispatch = useAppDispatch();
  const alergenoService = new AlergenoService('alergenos');

  const {values, handleChanges, resetForm} = useForm({
    id: alergenoActivo!.id,
    denominacion: alergenoActivo?.denominacion ?? "",

    imagenId: alergenoActivo?.imagen?.id ?? 0,
    imagenName: alergenoActivo?.imagen?.name ?? "",
    imagenUrl: alergenoActivo?.imagen?.url ?? "",
    imagenEliminado: alergenoActivo?.imagen?.eliminado ? "Si" : "No",

    
  });

  const [imagen, setImagen] = useState<IImagen | null>(null);

  const updateAlergenoObj = async() => {

    const alergenoObj: IUpdateAlergeno = {
      id: values.id,
      denominacion: values.denominacion,
      imagen: imagen,
    }

    return alergenoObj;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const updatedAlergenoObj = await updateAlergenoObj();
      const updateAlergeno = await alergenoService.updateAlergeno(values.id, updatedAlergenoObj);

      if (updateAlergeno) {
        const updatedAlergenos = alergenos.map((a) => (a.id === values.id ? updateAlergeno : a));
        dispatch(setAlergenos(updatedAlergenos));
        resetForm();
      } else {
        console.log("Error al crear la alergeno");
      }
    }catch (error) {
      console.log(error);
    } finally {
      navigate("/admin");
    }
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.overlay_content}>
        <form onSubmit={onSubmit}>
          <h2>Actualizar Alergeno</h2>
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
          <Stack direction="row" spacing={2}  sx={{display: 'flex',justifyContent: 'space-between', marginTop:'15px'}}>
            <Button type="submit" className="confirmar" variant="contained" color="success" >Confirmar</Button>
            <Button sx={{ marginLeft: 'auto' }} onClick={() => navigate('/')} className="cancelar" variant="contained" color="error">Cancelar</Button>
          </Stack >
          
        </form>
        
      </div>
    </div>
  );
};

export default ActualizarAlergeno;
