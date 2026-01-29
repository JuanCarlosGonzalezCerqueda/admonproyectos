import React from "react";
import { mospro, crepro, updpro, elipro, mostar, mosusr, updusr, updtar, cretar, creusr, elitar, eliusr } from "./funciones";


export const proy = [
    <ul>
    <li key="1"><a href="#mospro" onClick={mospro}>Mostrar</a></li>
        <li key="2"><a href="#crepro" onClick={crepro}>Crear</a></li>
    <li key="3"><a href="#updpro" onClick={updpro}>Actualizar</a></li>
    <li key="4"><a href="#elimpro" onClick={elipro}>Eliminar</a></li>
    </ul>
];
export const tar = [
    <ul>
        <li key="1"><a href="#mostar" onClick={mostar}>Mostrar</a></li>
        <li key="2"><a href="#cretar" onClick={cretar}>Crear</a></li>
        <li key="3"><a href="#updtar" onClick={updtar}>Actualizar</a></li>
        <li key="4"><a href="#elimtar" onClick={elitar}>Eliminar</a></li>
    </ul>
];
export const usr = [
    <ul>
        <li key="1"><a href="#mosusr" onClick={mosusr}>Mostrar</a></li>
        <li key="2"><a href="#creusr" onClick={creusr}>Crear</a></li>
        <li key="3"><a href="#updusr" onClick={updusr}>Actualizar</a></li>
        <li key="4"><a href="#elimusr" onClick={eliusr}>Eliminar</a></li>
    </ul>
];