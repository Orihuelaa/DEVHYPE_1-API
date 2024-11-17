import Swal from "sweetalert2";
import { IAlergenos } from "../endpoints/types/dtos/alergenos/IAlergenos";
import { ICreateAlergeno } from "../endpoints/types/dtos/alergenos/ICreateAlergeno";
import { IUpdateAlergeno } from "../endpoints/types/dtos/alergenos/IUpdateAlergeno";
import { BackendClient } from "./BackendClient";

const API_URL = import.meta.env.VITE_URL_API;

export class AlergenoService extends BackendClient<IAlergenos | ICreateAlergeno | IUpdateAlergeno> {
    constructor(baseUrl: string) {
        super(`${API_URL}/${baseUrl}`);
    }

    async createAlergeno(element: ICreateAlergeno): Promise<IAlergenos | null> {
        Swal.fire({
            title: "Creando alergeno... ",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(Swal.getDenyButton());
            },
        });
        try {
            const response = await fetch(`${this.baseUrl}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(element),
            });
            const data = await response.json();
            return data as IAlergenos;
        } finally {
            Swal.close();
        }
    }
    
    async updateAlergeno(id: number, element: IUpdateAlergeno): Promise<IAlergenos | null> {
        Swal.fire({
            title: "Editando alergeno... ",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(Swal.getDenyButton());
            },
        });
        try {
            const response = await fetch(`${this.baseUrl}/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(element),
            });
            const data = await response.json();
            return data as IAlergenos;
        } finally {
            Swal.close();
        }
    }

    async deleteAlergeno(id: number): Promise<void> {
        Swal.fire({
            title: "Eliminando alergeno... ",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(Swal.getDenyButton());
            },
        });
        try {
            const response = await fetch(`${this.baseUrl}/delete/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Error`);
            }
        } finally {
            Swal.close();
        }
    }

    
}