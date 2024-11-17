import Swal from "sweetalert2";
import { ICreateProducto } from "../endpoints/types/dtos/productos/ICreateProducto";
import { IProductos } from "../endpoints/types/dtos/productos/IProductos";
import { IUpdateProducto } from "../endpoints/types/dtos/productos/IUpdateProducto";
import { BackendClient } from "./BackendClient";

const API_URL = import.meta.env.VITE_URL_API;

export class ArticuloService extends BackendClient<IProductos | ICreateProducto | IUpdateProducto> {
    constructor(baseUrl : string) {
        super(`${API_URL}${baseUrl}`);
    }

    async createArticulo(element: ICreateProducto): Promise<IProductos | null> {
       Swal.fire({
           title: "Creando Producto... ",
           allowOutsideClick: false,
           didOpen: () => {
               Swal.showLoading(Swal.getDenyButton());
           },
       })
       try {
         const response = await fetch(`${this.baseUrl}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(element),
        });
        const data = await response.json();
        return data as IProductos;
       } finally {
        Swal.close();
       }
    }

    async updateArticulo(element: IUpdateProducto, id: number): Promise<IProductos | null> {
        Swal.fire({
            title: "Editando Producto... ",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(Swal.getDenyButton());
            },
        })
        try {
            const response = await fetch(`${this.baseUrl}/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(element),
            });
            const newData = await response.json();
            return newData as IProductos;
        } finally {
            Swal.close();
        }
    }

    async deleteArticuloById(id: number){
        Swal.fire({
            title: "Eliminando Producto... ",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(Swal.getDenyButton());
            },
        })
        try {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            return data as IProductos;
        } finally {
            Swal.close();
        }
    }

    async getArticulosPagedBySucursal(idSucursal: number): Promise<IProductos[] | null> {
        Swal.fire({
            title: "Obteniendo Productos... ",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(Swal.getDenyButton());
            },
        })
        try {
            const response = await fetch(`${this.baseUrl}/pagedPorSucursal/${idSucursal}`);
            if (!response.ok) {
                throw new Error('Error');
            }
            const data = await response.json();
            return data as IProductos[];
        } finally {
            Swal.close();
        }
    }

    async getArticulosBySucursal(idSucursal: number): Promise<IProductos[] | null> {
        Swal.fire({
            title: "Obteniendo Productos... ",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(Swal.getDenyButton());
            },
        })
        try {
            const response = await fetch(`${this.baseUrl}/porSucursal/${idSucursal}`);
            if (!response.ok) {
                throw new Error('Error');
            }
            const data = await response.json();
            return data as IProductos[];
        } finally {
            Swal.close();
        }
    }

    async getArticuloById(id: number): Promise<IProductos | null> {
        Swal.fire({
            title: "Obteniendo Producto... ",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading(Swal.getDenyButton());
            },
        })
        try {
            const response = await fetch(`${this.baseUrl}/${id}`);
            if (!response.ok) {
                throw new Error('Error');
            }
            const data = await response.json();
            return data as IProductos;
        } finally {
            Swal.close();
        }
    }


}