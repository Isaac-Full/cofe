import { Router } from "express";
const cafeRoutes = Router()

import { getCafeListar, postCafeInsertar, putCafeActualizar, deleteCafeEliminar, ValorTotalPagar, InfoCliente, valorSumado} from "../CONTROLLER/cafe.js";

cafeRoutes.get('/', getCafeListar)
cafeRoutes.post('/', postCafeInsertar)
cafeRoutes.put('/', putCafeActualizar)
cafeRoutes.delete('/:id', deleteCafeEliminar)
cafeRoutes.put('/totalCliente', ValorTotalPagar)
cafeRoutes.get('/infoCliente', InfoCliente)
cafeRoutes.get('/sumas', valorSumado)

export default cafeRoutes