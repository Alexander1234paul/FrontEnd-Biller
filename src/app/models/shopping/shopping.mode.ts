export interface ModelAuxProductI {
  direccion: string;
  id_producto: string;
  codigo: string;
  nombre: string;
  cantidad: number;
  precio: number;
  total: number;
}
export interface ModelShoppingI {
  id_compra: string;
  id_empresa: string;
  id_proveedor: string;
  estado: string;
  num_factura: string;
  total: string;
}
