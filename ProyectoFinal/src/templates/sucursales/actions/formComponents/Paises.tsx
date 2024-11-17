import { useEffect } from "react";
import { PaisService } from "../../../../services/PaisService";
import { useAppDispatch, useAppSelector } from "../../../../hooks/store";
import { setPaises } from "../../../../redux/slices/paisSlice";
import { IPais } from "../../../../endpoints/types/IPais";
import { useForm } from "../../../../hooks/useForm";

const Paises = () => {

  const {paises, paisActivo} = useAppSelector((state) => state.paises);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const fetchPaises = async () => {
        const paisesFromStorage = localStorage.getItem(`paises`);
        if (paisesFromStorage) {
          dispatch(setPaises(JSON.parse(paisesFromStorage)));
        } else {
          const paisService = new PaisService('paises');
          try {
            const paises_all = await paisService.getAll(); 
            dispatch(setPaises(paises_all as IPais[])); 
            localStorage.setItem(`paises`, JSON.stringify(paises_all));
          } catch (error) {
            console.log(error);
          }
        }
      };
    
      if (paisActivo) {
        fetchPaises();
      }
  
      return ()=>{
        localStorage.removeItem(`paises`);
        dispatch(setPaises([]));
      }
    
    }, [dispatch, paisActivo]);
    
    const { values, handleChanges } = useForm({
      id: 0,
      nombre: '',
    })

    return (
      <>
      <label htmlFor="pais">País:</label>
        <select id="pais" name="nombre" value={values.nombre} onChange={handleChanges} required >
            <option value="" selected disabled></option>
            {paises.map((pais) => (
                <option key={pais.id} value={pais.nombre}>
                    {pais.nombre}
                </option>
            ))}
        </select> 
      </>
    )
}

export default Paises;
