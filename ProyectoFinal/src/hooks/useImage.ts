/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ImageService } from "../services/ImageService";
import { FieldValues, UseFormSetValue } from "react-hook-form";

interface UseImageProps<T extends FieldValues> {
    imageService: ImageService;
    setValue: UseFormSetValue<T>;
  }
  const useImage = <T extends FieldValues,>({ imageService, setValue }: UseImageProps<T>) => {
    const [preview, setPreview] = useState<string | null>(null);
  
    // Función para manejar la selección de la imagen
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        // Generar vista previa de la imagen seleccionada
        setPreview(URL.createObjectURL(file));
  
        // Subir la imagen a la API
        const formData = new FormData();
        formData.append("file", file);
  
        try {
          const imageUrl = await imageService.uploadImage(formData);
          setValue("logo" as any, imageUrl as any); // Establecemos la URL de la imagen en el formulario
        } catch (error) {
          console.error("Error al subir la imagen", error);
        }
      }
    };
  
    return {
      preview,
      handleImageChange,
    };
  };
  

export default useImage;
