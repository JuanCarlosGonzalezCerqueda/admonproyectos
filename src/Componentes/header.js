import React from "react";
import { menuproyectos } from "./funciones";
import { mentar } from "./funciones";
import { menus } from "./funciones";

function Header() {
  return (
    <header>
      <h1>Sistema administracion de proyectos</h1>
        <nav id="menpri">
            <ul>
                <li><a href="#" onClick={menuproyectos}>Proyectos</a></li>
                <li><a href="#tareas" onClick={mentar}>Tareas</a></li>
                <li><a href="#usuarios" onClick={menus}>Usuarios</a></li>
            </ul>
        </nav>
    </header>
  );
}
export default Header;