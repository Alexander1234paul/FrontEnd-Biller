export interface ProductModel {
  id_producto: number;
  id_categoria: number;
  id_empresa: number;
  codigo: string;
  barras: string;
  nombre: string;
  descripcion: string;
  estado: boolean;
  fecha: Date;
}
