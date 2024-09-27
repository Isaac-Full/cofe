import VentasCafe from "../MODELS/cafe.js"

export async function getCafeListar(req, res) {
    const cofe = await VentasCafe.find()
    res.json(cofe)
}

export async function postCafeInsertar(req, res) {
    const id = await VentasCafe.getNextId()
    const body = req.body
    let msg = "La venta se ingreso correctamente, felicidades ratica 🐀"
    try {
        const cofe = new VentasCafe(body)
        cofe.id = id
        await cofe.save()
    } catch (error) {
        res.status(500).json(error, { msg: "hay un problema con la creacion de una venta, revise bien mi viejo 🤡" })
    }
    res.json({ msg: msg })
}

export async function putCafeActualizar(req, res) {
    const { id, nombreCliente, nombreFinca, peso, precioKilo } = req.body
    let msg = "La actualizacion de modifico correctamente, felicidades ratica 🐀"
    try {
        await VentasCafe.updateOne({ id: id }, { nombreCliente: nombreCliente, nombreFinca: nombreFinca, peso: peso, precioKilo: precioKilo })
    } catch (error) {
        res.status(500).json(error, { msg: "hay un problema con la actualizacion de los datos de la venta, reviselo mi viejo 🤡" })
    }
}

export async function deleteCafeEliminar(req, res) {
    const id = req.params.id
    try {
        await VentasCafe.deleteOne({ id: id }) //aca espera a que elimine un objeto segun el id proporcionado
        res.json("cafe eliminado con exito, felicidades ratica 🐀")
    } catch (error) {
        res.status(500).json(error, { msg: "hay un problema con la eliminacion del cafe, revise mi viejo 🤡" })
    }
}

export async function ValorTotalPagar(req, res) {
    const { id } = req.body //aca traera el requerimiento del id para poder iniciar con el try/catch y las condionales 
    try {
        const cofe = await VentasCafe.findOne({ id: id }) //crea una constante cofe que espera a que se encuentre el objeto segun el id
        const valorTotal = cofe.peso * cofe.precioKilo //se crea una constante donde se almacenan la multiplicacion entre el peso y el precio kilo del objeto que se encontro en la linea anterior 
        if (valorTotal < 2000) {
            cofe.valorTotalPagar = 2000 // aca creamos la condicional, donde si el valor total es menor a 2000 se le asignara al valor total del objeto encontrado anteriormente 2000
            cofe.save()
        } else {
            cofe.valorTotalPagar = valorTotal // si si es mayor o igual a 2000 se le asignara el valor de la constante anteriormente calculada 
            cofe.save()
        }
        res.json(cofe) //res.json devuelve el objeto entero en formato json
    } catch (error) {
        res.status(500).json(error, { msg: "mi viejo hay un error, reviselo 🤡" })
    }
}

export async function InfoCliente(req, res) {
    const { nombreCliente } = req.body
    try {
        const Data = await VentasCafe.find({ nombreCliente: nombreCliente })
        res.json(Data)
    } catch (error) {
        res.status(204).json(error, { msg: "mi viejo el cliente no tiene informacion adentro, revise 🤡" })
    }
}

export async function valorSumado(req, res) {
    const { nombreCliente } = req.body;

    try {
        // Busca las ventas del cliente
        const data = await VentasCafe.find({ nombreCliente: nombreCliente });

        // Verificar si hay ventas
        if (data.length === 0) {
            return res.json({ msg: "No se encontraron ventas para el cliente", totales: 0 });
        }

        // Sumar los valores de 'valorTotalPagar', verificando si son válidos
        const totales = data.reduce((total, venta) => {
            // Verifica si 'valorTotalPagar' está definido y es numérico, si no, lo considera como 0
            return total + (venta.valorTotalPagar ? venta.valorTotalPagar : 0);
        }, 0);

        res.json({ msg: "Mi viejo tenga todas las ventas, vea el total 🤖", totales });
    } catch (error) {
        console.error("Error al obtener las ventas:", error);
        res.json({ msg: "No se encontró café vendido", error });
    }
} 