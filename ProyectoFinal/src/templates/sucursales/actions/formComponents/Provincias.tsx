import { useAppDispatch, useAppSelector } from '../../../../hooks/store';
import { useEffect } from 'react';
import { ProvinciaService } from '../../../../services/ProvinciaService';
import { setProvinciaActiva, setProvincias } from '../../../../redux/slices/provinciaSlice';
import { IProvincia } from '../../../../endpoints/types/IProvincia';
import { useForm } from '../../../../hooks/useForm';

const Provincias = () => {

  const {paisActivo} = useAppSelector((state) => state.paises);
  const {provincias} = useAppSelector((state) => state.provincias);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const fetchProvincias = async () => {
      const provinciasFromStorage = localStorage.getItem(`provincias`);
      
      if (provinciasFromStorage) {
        dispatch(setProvincias(JSON.parse(provinciasFromStorage)));
      } else {
        try {
            const provinciaService = new ProvinciaService('provincias');
              const provincias_all = await provinciaService.getProvinciasByPaisId(paisActivo!.id); 
              dispatch(setProvincias(provincias_all as IProvincia[])); 
              localStorage.setItem(`provincias`, JSON.stringify(provincias_all));
            } catch (error) {
              console.log(error);
            }
          }
        };
      
        if (paisActivo) {
          fetchProvincias();
        }
    
        return ()=>{
          localStorage.removeItem(`provincias`);
          dispatch(setProvincias([]));
        }
      
      }, [dispatch, paisActivo]);

      const { values, handleChanges } = useForm({
        id: 0,
        nombre: '',
      })

      return (
        <>
          <label htmlFor="provincia">Provincia:</label>
          <select id="provincia" name="nombre" value={values.nombre} onChange={handleChanges} required >
            <option value="" disabled>-Seleccione una provincia-</option>
            {provincias.map((provincia) => (
              <option key={provincia.id} value={provincia.nombre} onClick={() => dispatch(setProvinciaActiva(provincia))}>
                {provincia.nombre}
              </option>
            ))}
          </select>
        </>
      )
}

export default Provincias
