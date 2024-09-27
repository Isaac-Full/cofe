import { Schema, model } from "mongoose";

const  ventasCafeSchema = new Schema ({
    id:{
        type:Number,
        required:true,
        uniqued:true,
    },
    nombreCliente:{
        type:String,
        required:true,
    },
    nombreFinca:{
        type:String,
        required:true,
    },
    peso:{
        type:Number,
        required:true,
        min:1,
        max:125,
    },
    precioKilo:{
        type:Number,
        required:true,
        min:1000,
        max:5000,
    },
    fecha:{
        type:Date,
        default:Date.now
    },
    valorTotalPagar:{
        type:Number,
    }, 
    valorSumado:{
        type:Number,
    }
})
ventasCafeSchema.statics.getNextId = async function() {
    const lastCell = await this.findOne().sort({ id: -1})
    return lastCell ? lastCell.id + 1 : 1
}

export default model ('VentasCafe', ventasCafeSchema, 'VentasCafe')
