import Swal from "sweetalert2";
import { ICreateSucursal } from "../endpoints/types/dtos/sucursal/ICreateSucursal";
import { ISucursal } from "../endpoints/types/dtos/sucursal/ISucursal";
import { IUpdateSucursal } from "../endpoints/types/dtos/sucursal/IUpdateSucursal";
import { BackendClient } from "./BackendClient";

const API_URL = import.meta.env.VITE_URL_API;

export class SucursalService extends BackendClient<ISucursal | ICreateSucursal | IUpdateSucursal> {
    constructor(baseUrl: string) {
        super(`${API_URL}/${baseUrl}`);
    }

    // Verificar si existe sucursal como casa matriz
    // async function ()=>{}

    async createSucursal(element: ICreateSucursal): Promise<ISucursal | null> {
        Swal.fire({
            title: "Creando sucursal...",
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
            return data as ISucursal;
        } finally {
            Swal.close();
        }
    }
    async updateSucursal(id: number, element: IUpdateSucursal): Promise<ISucursal | null> {
        Swal.fire({
            title: "Editando sucursal...",
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
            return data as ISucursal;
        } finally {
            Swal.close();
        }
    }

    async getAllSucursalesPorEmpresaId(empresaId: number): Promise<ISucursal[]>{
        Swal.fire({
            title: "Editando sucursal...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(Swal.getDenyButton());
            },
        });
        try {
            const response = await fetch(`${this.baseUrl}/porEmpresa/${empresaId}`);
            const data = await response.json();
            return data as ISucursal[];
        } finally {
            Swal.close();
        }
    }
}
