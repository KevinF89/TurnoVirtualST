import { Component } from '@angular/compiler/src/core';
import { FunctionExpr } from '@angular/compiler';

export interface Mensaje{
    tipo?: tipoMensaje;
    mensaje: string;
}



export enum tipoMensaje{
    Confirmacion,
    Informacion,
    Verificacion,
    Error
}

export enum respuestaMensaje{
    Aceptar,
    Cancelar,
    Cerrar
}

