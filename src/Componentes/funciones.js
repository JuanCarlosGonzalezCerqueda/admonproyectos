import React from "react";
import { proy, tar, usr } from "./constantes";
import axios from "axios";

export function menuproyectos(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const container = document.getElementById('mens');
    if (!container) return;
    // Limpiar contenido previo
    container.innerHTML = '';
    // Construir menú usando DOM (evita inyectar strings con handlers como texto)
    const ul = document.createElement('ul');
    // `proy` contiene elementos React como <ul><li><a .../></li>...</ul>
    proy.forEach((item) => {
        const children = (item && item.props && item.props.children) || [];
        const lis = Array.isArray(children) ? children : [children];
        lis.forEach((li) => {
            // El anchor es normalmente li.props.children
            const anchorReact = (li && li.props && li.props.children) || null;
            const a = document.createElement('a');
            let href = '#';
            let onClick = null;
            let text = '';
            if (anchorReact && anchorReact.props) {
                href = anchorReact.props.href || '#';
                onClick = anchorReact.props.onClick || null;
                text = anchorReact.props.children || '';
            } else if (li && li.props && typeof li.props.children === 'string') {
                text = li.props.children;
            }
            a.href = href;
            a.textContent = typeof text === 'string' ? text : String(text);
            if (typeof onClick === 'function') {
                // Vincular el handler real de React (función) al elemento DOM
                a.addEventListener('click', function (ev) {
                    ev.preventDefault();
                    try {
                        onClick(ev);
                    } catch (err) {
                        // Evitar romper el menú si el handler falla
                        // eslint-disable-next-line no-console
                        console.error('Error en handler de menú:', err);
                    }
                });
            }
            const liElem = document.createElement('li');
            liElem.appendChild(a);
            ul.appendChild(liElem);
        });
    });
    container.appendChild(ul);
}
export function mentar(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const container = document.getElementById('mens');
    if (!container) return;
    // Limpiar contenido previo
    container.innerHTML = '';
    // Construir menú usando DOM (evita inyectar strings con handlers como texto)
    const ul = document.createElement('ul');
    // `tar` contiene elementos React como <ul><li><a .../></li>...</ul>
    tar.forEach((item) => {
        const children = (item && item.props && item.props.children) || [];
        const lis = Array.isArray(children) ? children : [children];
        lis.forEach((li) => {
            // El anchor es normalmente li.props.children
            const anchorReact = (li && li.props && li.props.children) || null;
            const a = document.createElement('a');
            let href = '#';
            let onClick = null;
            let text = '';
            if (anchorReact && anchorReact.props) {
                href = anchorReact.props.href || '#';
                onClick = anchorReact.props.onClick || null;
                text = anchorReact.props.children || '';
            } else if (li && li.props && typeof li.props.children === 'string') {
                text = li.props.children;
            }
            a.href = href;
            a.textContent = typeof text === 'string' ? text : String(text);
            if (typeof onClick === 'function') {
                // Vincular el handler real de React (función) al elemento DOM
                a.addEventListener('click', function (ev) {
                    ev.preventDefault();
                    try {
                        onClick(ev);
                    } catch (err) {
                        // Evitar romper el menú si el handler falla
                        // eslint-disable-next-line no-console
                        console.error('Error en handler de menú:', err);
                    }
                });
            }
            const liElem = document.createElement('li');
            liElem.appendChild(a);
            ul.appendChild(liElem);
        });
    });
    container.appendChild(ul);
}
export function menus(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const container = document.getElementById('mens');
    if (!container) return;
    // Limpiar contenido previo
    container.innerHTML = '';
    // Construir menú usando DOM (evita inyectar strings con handlers como texto)
    const ul = document.createElement('ul');
    // `usr` contiene elementos React como <ul><li><a .../></li>...</ul>
    usr.forEach((item) => {
        const children = (item && item.props && item.props.children) || [];
        const lis = Array.isArray(children) ? children : [children];
        lis.forEach((li) => {
            // El anchor es normalmente li.props.children
            const anchorReact = (li && li.props && li.props.children) || null;
            const a = document.createElement('a');
            let href = '#';
            let onClick = null;
            let text = '';
            if (anchorReact && anchorReact.props) {
                href = anchorReact.props.href || '#';
                onClick = anchorReact.props.onClick || null;
                text = anchorReact.props.children || '';
            } else if (li && li.props && typeof li.props.children === 'string') {
                text = li.props.children;
            }
            a.href = href;
            a.textContent = typeof text === 'string' ? text : String(text);
            if (typeof onClick === 'function') {
                // Vincular el handler real de React (función) al elemento DOM
                a.addEventListener('click', function (ev) {
                    ev.preventDefault();
                    try {
                        onClick(ev);
                    } catch (err) {
                        // Evitar romper el menú si el handler falla
                        // eslint-disable-next-line no-console
                        console.error('Error en handler de menú:', err);
                    }
                });
            }
            const liElem = document.createElement('li');
            liElem.appendChild(a);
            ul.appendChild(liElem);
        });
    });
    container.appendChild(ul);
}
export function mospro(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const container = document.getElementById('contenido');
    if (!container) return;
    // Petición al servidor y renderizado simple de resultados
    axios.get('http://localhost:3001/proyectos')
        .then(response => {
            const proyectos = response.data || [];
            if (!Array.isArray(proyectos) || proyectos.length === 0) {
                container.innerHTML = '<h2>Proyectos</h2><p>No hay proyectos disponibles.</p>';
                return;
            }
            // Construir una tabla dinámica con todas las propiedades encontradas
            const keysSet = new Set();
            proyectos.forEach(p => Object.keys(p || {}).forEach(k => keysSet.add(k)));
            const headers = Array.from(keysSet);
            const escapeHtml = (str) => String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');

            const html = ['<h2>Proyectos</h2>'];
            html.push('<div class="tabla-proyectos"><table border="1" cellpadding="6" cellspacing="0"><thead><tr>');
            headers.forEach(h => html.push(`<th>${escapeHtml(h)}</th>`));
            html.push('</tr></thead><tbody>');
            proyectos.forEach(p => {
                html.push('<tr>');
                headers.forEach(h => {
                    const val = p && Object.prototype.hasOwnProperty.call(p, h) ? p[h] : '';
                    // Mostrar objetos/arrays como JSON
                    const cell = (val !== null && typeof val === 'object') ? JSON.stringify(val) : String(val);
                    html.push(`<td>${escapeHtml(cell)}</td>`);
                });
                html.push('</tr>');
            });
            html.push('</tbody></table></div>');
            container.innerHTML = html.join('');
        })
        .catch(error => {
            // eslint-disable-next-line no-console
            console.error('Error al obtener proyectos:', error);
            container.innerHTML = '<h2>Proyectos</h2><p>Error al cargar proyectos.</p>';
        });
}
export function mostar(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const container = document.getElementById('contenido');
    if (!container) return;
    // Petición al servidor y renderizado simple de resultados
    axios.get('http://localhost:3001/tareas')
        .then(response => {
            const tareas = response.data || [];
            if (!Array.isArray(tareas) || tareas.length === 0) {
                container.innerHTML = '<h2>Tareas</h2><p>No hay tareas disponibles.</p>';
                return;
            }
            // Construir una tabla dinámica con todas las propiedades encontradas
            const keysSet = new Set();
            tareas.forEach(p => Object.keys(p || {}).forEach(k => keysSet.add(k)));
            const headers = Array.from(keysSet);
            const escapeHtml = (str) => String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');

            const html = ['<h2>Tareas</h2>'];
            html.push('<div class="tabla-tareas"><table border="1" cellpadding="6" cellspacing="0"><thead><tr>');
            headers.forEach(h => html.push(`<th>${escapeHtml(h)}</th>`));
            html.push('</tr></thead><tbody>');
            tareas.forEach(p => {
                html.push('<tr>');
                headers.forEach(h => {
                    const val = p && Object.prototype.hasOwnProperty.call(p, h) ? p[h] : '';
                    // Mostrar objetos/arrays como JSON
                    const cell = (val !== null && typeof val === 'object') ? JSON.stringify(val) : String(val);
                    html.push(`<td>${escapeHtml(cell)}</td>`);
                });
                html.push('</tr>');
            });
            html.push('</tbody></table></div>');
            container.innerHTML = html.join('');
        })
        .catch(error => {
            // eslint-disable-next-line no-console
            console.error('Error al obtener tareas:', error);
            container.innerHTML = '<h2>Tareas</h2><p>Error al cargar tareas.</p>';
        });
}
export function mosusr(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const container = document.getElementById('contenido');
    if (!container) return;
    // Petición al servidor y renderizado simple de resultados
    axios.get('http://localhost:3001/usuarios')
        .then(response => {
            const usuarios = response.data || [];
            if (!Array.isArray(usuarios) || usuarios.length === 0) {
                container.innerHTML = '<h2>Usuarios</h2><p>No hay usuarios disponibles.</p>';
                return;
            }
            // Construir una tabla dinámica con todas las propiedades encontradas
            const keysSet = new Set();
            usuarios.forEach(p => Object.keys(p || {}).forEach(k => keysSet.add(k)));
            const headers = Array.from(keysSet);
            const escapeHtml = (str) => String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');

            const html = ['<h2>Usuarios</h2>'];
            html.push('<div class="tabla-usuarios"><table border="1" cellpadding="6" cellspacing="0"><thead><tr>');
            headers.forEach(h => html.push(`<th>${escapeHtml(h)}</th>`));
            html.push('</tr></thead><tbody>');
            usuarios.forEach(p => {
                html.push('<tr>');
                headers.forEach(h => {
                    const val = p && Object.prototype.hasOwnProperty.call(p, h) ? p[h] : '';
                    // Mostrar objetos/arrays como JSON
                    const cell = (val !== null && typeof val === 'object') ? JSON.stringify(val) : String(val);
                    html.push(`<td>${escapeHtml(cell)}</td>`);
                });
                html.push('</tr>');
            });
            html.push('</tbody></table></div>');
            container.innerHTML = html.join('');
        })
        .catch(error => {
            // eslint-disable-next-line no-console
            console.error('Error al obtener usuarios:', error);
            container.innerHTML = '<h2>Usuarios</h2><p>Error al cargar usuarios.</p>';
        });
}
export function crepro(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const container = document.getElementById('contenido');
    if (!container) return;
    // Formulario con 3 campos y botón Guardar
    container.innerHTML = `
        <h2>Crear Proyecto</h2>
        <form id="form-crepro">
            <div class="form-row">
                <label for="crepro-nombre">Nombre</label>
                <input id="crepro-nombre" name="nombre" type="text" />
            </div>
            <div class="form-row">
                <label for="crepro-descripcion">Descripción</label>
                <input id="crepro-descripcion" name="descripcion" type="text" />
            </div>
            <div class="form-row">
                <label for="crepro-destimados">Dias estimados</label>
                <input id="crepro-destimados" name="destimados" type="text" />
            </div>
            <div class="form-row">
                <button id="crepro-guardar" type="submit">Guardar</button>
            </div>
            <div id="crepro-mensaje" style="margin-top:10px;"></div>
        </form>
    `;

    const form = document.getElementById('form-crepro');
    const mensaje = document.getElementById('crepro-mensaje');
    if (!form) return;
    form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        const nombre = document.getElementById('crepro-nombre').value.trim();
        const descripcion = document.getElementById('crepro-descripcion').value.trim();
        const destimados = document.getElementById('crepro-destimados').value.trim();
        // Validación mínima
        if (!nombre) {
            mensaje.innerText = 'El nombre es requerido.';
            return;
        }
        mensaje.innerText = 'Guardando...';
        const payload = { nombre, descripcion, destimados};
        axios.post('http://localhost:3001/proyectos', payload)
            .then(res => {
                mensaje.innerText = 'Proyecto creado correctamente.';
                // refrescar la lista de proyectos llamando a mospro si existe
                try {
                    if (typeof mospro === 'function') mospro();
                } catch (err) {
                    // eslint-disable-next-line no-console
                    console.error('No se pudo refrescar la lista:', err);
                }
            })
            .catch(err => {
                // eslint-disable-next-line no-console
                console.error('Error al crear proyecto:', err);
                mensaje.innerText = 'Error al crear proyecto.';
            });
    });
}
export function cretar(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const container = document.getElementById('contenido');
    if (!container) return;
    // Formulario con 3 campos y botón Guardar
    container.innerHTML = `
        <h2>Crear Tarea</h2>
        <form id="form-cretar">
            <div class="form-row">
                <label for="cretar-nombre">Nombre</label>
                <input id="cretar-nombre" name="nombre" type="text" />
            </div>
            <div class="form-row">
                <label for="cretar-descripcion">Descripción</label>
                <input id="cretar-descripcion" name="descripcion" type="text" />
            </div>
            <div class="form-row">
                <label for="cretar-destimados">Dias estimados</label>
                <input id="cretar-destimados" name="destimados" type="text" />
            </div>
            <div class="form-row">
                <label for="cretar-idpro">Proyecto</label>
                <input id="cretar-idpro" name="idpro" type="text" />
            </div>
            <div class="form-row">
                <button id="cretar-guardar" type="submit">Guardar</button>
            </div>
            <div id="cretar-mensaje" style="margin-top:10px;"></div>
        </form>
    `;

    const form = document.getElementById('form-cretar');
    const mensaje = document.getElementById('cretar-mensaje');
    if (!form) return;
    form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        const nombre = document.getElementById('cretar-nombre').value.trim();
        const descripcion = document.getElementById('cretar-descripcion').value.trim();
        const destimados = document.getElementById('cretar-destimados').value.trim();
        const idpro = document.getElementById('cretar-idpro').value.trim();
        // Validación mínima
        if (!nombre) {
            mensaje.innerText = 'El nombre es requerido.';
            return;
        }
        mensaje.innerText = 'Guardando...';
        const payload = { nombre, descripcion, destimados, idpro };
        axios.post('http://localhost:3001/tareas', payload)
            .then(res => {
                mensaje.innerText = 'tarea creada correctamente.';
                // refrescar la lista de tarjetas llamando a mostar si existe
                try {
                    if (typeof mostar === 'function') mostar();
                } catch (err) {
                    // eslint-disable-next-line no-console
                    console.error('No se pudo refrescar la lista:', err);
                }
            })
            .catch(err => {
                // eslint-disable-next-line no-console
                console.error('Error al crear tarea:', err);
                mensaje.innerText = 'Error al crear tarea.';
            });
    });
}
export function creusr(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const container = document.getElementById('contenido');
    if (!container) return;
    // Formulario con 3 campos y botón Guardar
    container.innerHTML = `
        <h2>Crear Usuario</h2>
        <form id="form-creusr">
            <div class="form-row">
                <label for="creusr-nombre">Nombre</label>
                <input id="creusr-nombre" name="nombre" type="text" />
            </div>
            <div class="form-row">
                <label for="creusr-apaterno">Apellido Paterno</label>
                <input id="creusr-apaterno" name="apaterno" type="text" />
            </div>
            <div class="form-row">
                <label for="creusr-amaterno">Apellido Materno</label>
                <input id="creusr-amaterno" name="amaterno" type="text" />
            </div>
            <div class="form-row">
                <button id="creusr-guardar" type="submit">Guardar</button>
            </div>
            <div id="creusr-mensaje" style="margin-top:10px;"></div>
        </form>
    `;

    const form = document.getElementById('form-creusr');
    const mensaje = document.getElementById('creusr-mensaje');
    if (!form) return;
    form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        const nombre = document.getElementById('creusr-nombre').value.trim();
        const apaterno = document.getElementById('creusr-apaterno').value.trim();
        const amaterno = document.getElementById('creusr-amaterno').value.trim();
        // Validación mínima
        if (!nombre) {
            mensaje.innerText = 'El nombre es requerido.';
            return;
        }
        mensaje.innerText = 'Guardando...';
        const payload = { nombre, apaterno, amaterno };
        axios.post('http://localhost:3001/usuarios', payload)
            .then(res => {
                mensaje.innerText = 'Usuario creado correctamente.';
                // refrescar la lista de usuarios llamando a mosusr si existe
                try {
                    if (typeof mosusr === 'function') mosusr();
                } catch (err) {
                    // eslint-disable-next-line no-console
                    console.error('No se pudo refrescar la lista:', err);
                }
            })
            .catch(err => {
                // eslint-disable-next-line no-console
                console.error('Error al crear usuario:', err);
                mensaje.innerText = 'Error al crear usuario.';
            });
    });
}
export function updpro(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const container = document.getElementById('contenido');
    if (!container) return;
    container.innerHTML = '<h2>Actualizar Proyecto</h2><p>Cargando proyectos...</p>';
    axios.get('http://localhost:3001/proyectos')
        .then(response => {
            const proyectos = response.data || [];
            if (!Array.isArray(proyectos) || proyectos.length === 0) {
                container.innerHTML = '<h2>Actualizar Proyecto</h2><p>No hay proyectos disponibles.</p>';
                return;
            }
            const escapeHtml = (str) => String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');

            const options = proyectos.map(p => {
                const id = p.id || p._id || p.codigo || p.idProyecto || '';
                const label = p.nombre || p.titulo || p.name || id || 'Proyecto';
                return `<option value="${escapeHtml(String(id))}">${escapeHtml(String(label))}</option>`;
            }).join('');

            const html = [];
            html.push('<h2>Actualizar Proyecto</h2>');
            html.push('<div class="select-proyecto">');
            html.push('<label for="updpro-select">Seleccione proyecto</label>');
            html.push('<select id="updpro-select"><option value="">-- seleccionar --</option>');
            html.push(options);
            html.push('</select>');
            html.push('</div>');

            html.push(`
                <form id="form-updpro" style="margin-top:12px; display:none;">
                    <div class="form-row">
                        <label for="updpro-nombre">Nombre</label>
                        <input id="updpro-nombre" name="nombre" type="text" />
                    </div>
                    <div class="form-row">
                        <label for="updpro-desc">Descripción</label>
                        <input id="updpro-desc" name="desc" type="text" />
                    </div>
                    <div class="form-row">
                        <label for="updpro-destimados">Días estimados</label>
                        <input id="updpro-destimados" name="destimados" type="text" />
                    </div>
                    <div class="form-row">
                        <button id="updpro-guardar" class="submit" type="submit">Actualizar</button>
                    </div>
                    <div id="updpro-mensaje" style="margin-top:10px;"></div>
                </form>
            `);

            container.innerHTML = html.join('');

            const select = document.getElementById('updpro-select');
            const form = document.getElementById('form-updpro');
            const mensaje = document.getElementById('updpro-mensaje');

            select.addEventListener('change', function () {
                const val = select.value;
                if (!val) {
                    form.style.display = 'none';
                    return;
                }
                const proyecto = proyectos.find(p => String(p.id || p._id || p.codigo || p.idProyecto || '') === val);
                if (!proyecto) {
                    mensaje.innerText = 'Proyecto no encontrado.';
                    form.style.display = 'none';
                    return;
                }
                const nombreEl = document.getElementById('updpro-nombre');
                const descEl = document.getElementById('updpro-desc');
                const destEl = document.getElementById('updpro-destimados');
                nombreEl.value = proyecto.nombre || proyecto.titulo || proyecto.name || '';
                descEl.value = proyecto.descripcion || proyecto.desc || proyecto.descripcionProyecto || '';
                destEl.value = proyecto.destimados || proyecto.duracion || proyecto.diasEstimados || '';
                mensaje.innerText = '';
                form.style.display = 'block';
            });

            form.addEventListener('submit', function (ev) {
                ev.preventDefault();
                const id = select.value;
                const nombre = document.getElementById('updpro-nombre').value.trim();
                const desc = document.getElementById('updpro-desc').value.trim();
                const destimados = document.getElementById('updpro-destimados').value.trim();
                if (!id) {
                    mensaje.innerText = 'Seleccione un proyecto.';
                    return;
                }
                if (!nombre) {
                    mensaje.innerText = 'El nombre es requerido.';
                    return;
                }
                mensaje.innerText = 'Actualizando...';
                const payload = { nombre, descripcion: desc, destimados };
                const url = `http://localhost:3001/proyectos/${encodeURIComponent(id)}`;
                axios.put(url, payload)
                    .then(res => {
                        mensaje.innerText = 'Proyecto actualizado correctamente.';
                        try { if (typeof mospro === 'function') mospro(); } catch (err) { console.error(err); }
                    })
                    .catch(err => {
                        console.error('Error al actualizar proyecto:', err);
                        mensaje.innerText = 'Error al actualizar proyecto.';
                    });
            });
        })
        .catch(error => {
            console.error('Error al cargar proyectos para actualizar:', error);
            container.innerHTML = '<h2>Actualizar Proyecto</h2><p>Error al cargar proyectos.</p>';
        });
}
export function updtar(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const container = document.getElementById('contenido');
    if (!container) return;
    container.innerHTML = '<h2>Actualizar Tarea</h2><p>Cargando tarea...</p>';
    axios.get('http://localhost:3001/tareas')
        .then(response => {
            const tareas = response.data || [];
            if (!Array.isArray(tareas) || tareas.length === 0) {
                container.innerHTML = '<h2>Actualizar Tarea</h2><p>No hay tareas disponibles.</p>';
                return;
            }
            const escapeHtml = (str) => String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');

            const options = tareas.map(p => {
                const id = p.id || p._id || p.codigo || p.idTarea || '';
                const label = p.nombre || p.titulo || p.name || id || 'tarea';
                return `<option value="${escapeHtml(String(id))}">${escapeHtml(String(label))}</option>`;
            }).join('');

            const html = [];
            html.push('<h2>Actualizar Tarea</h2>');
            html.push('<div class="select-tarea">');
            html.push('<label for="updtar-select">Seleccione tarea</label>');
            html.push('<select id="updtar-select"><option value="">-- seleccionar --</option>');
            html.push(options);
            html.push('</select>');
            html.push('</div>');

            html.push(`
                <form id="form-updtar" style="margin-top:12px; display:none;">
                    <div class="form-row">
                        <label for="updtar-nombre">Nombre</label>
                        <input id="updtar-nombre" name="nombre" type="text" />
                    </div>
                    <div class="form-row">
                        <label for="updtar-desc">Descripción</label>
                        <input id="updtar-desc" name="desc" type="text" />
                    </div>
                    <div class="form-row">
                        <label for="updtar-destimados">Días estimados</label>
                        <input id="updtar-destimados" name="destimados" type="text" />
                    </div>
                    <div class="form-row">
                        <label for="updtar-idpro">Proyecto</label>
                        <input id="updtar-idpro" name="idpro" type="text" />
                    </div>
                    <div class="form-row">
                        <button id="updtar-guardar" type="submit">Actualizar</button>
                    </div>
                    <div id="updtar-mensaje" style="margin-top:10px;"></div>
                </form>
            `);

            container.innerHTML = html.join('');

            const select = document.getElementById('updtar-select');
            const form = document.getElementById('form-updtar');
            const mensaje = document.getElementById('updtar-mensaje');

            select.addEventListener('change', function () {
                const val = select.value;
                if (!val) {
                    form.style.display = 'none';
                    return;
                }
                const tarea = tareas.find(p => String(p.id || p._id || p.codigo || p.idTarea || '') === val);
                if (!tarea) {
                    mensaje.innerText = 'Tarea no encontrada.';
                    form.style.display = 'none';
                    return;
                }
                const nombreEl = document.getElementById('updtar-nombre');
                const descEl = document.getElementById('updtar-desc');
                const destEl = document.getElementById('updtar-destimados');
                const idproEl = document.getElementById('updtar-idpro');
                nombreEl.value = tarea.nombre || tarea.titulo || tarea.name || '';
                descEl.value = tarea.descripcion || tarea.desc || tarea.descripcionTarea || '';
                destEl.value = tarea.destimados || tarea.duracion || tarea.diasEstimados || '';
                idproEl.value = tarea.idpro || '';
                mensaje.innerText = '';
                form.style.display = 'block';
            });

            form.addEventListener('submit', function (ev) {
                ev.preventDefault();
                const id = select.value;
                const nombre = document.getElementById('updtar-nombre').value.trim();
                const desc = document.getElementById('updtar-desc').value.trim();
                const destimados = document.getElementById('updtar-destimados').value.trim();
                const idpro = document.getElementById('updtar-idpro').value.trim();
                if (!id) {
                    mensaje.innerText = 'Seleccione una tarea.';
                    return;
                }
                if (!nombre) {
                    mensaje.innerText = 'El nombre es requerido.';
                    return;
                }
                mensaje.innerText = 'Actualizando...';
                const payload = { nombre, descripcion: desc, destimados, idpro };
                const url = `http://localhost:3001/tareas/${encodeURIComponent(id)}`;
                axios.put(url, payload)
                    .then(res => {
                        mensaje.innerText = 'Tarea actualizada correctamente.';
                        try { if (typeof mostar === 'function') mostar(); } catch (err) { console.error(err); }
                    })
                    .catch(err => {
                        console.error('Error al actualizar tarea:', err);
                        mensaje.innerText = 'Error al actualizar tarea.';
                    });
            });
        })
        .catch(error => {
            console.error('Error al cargar tareas para actualizar:', error);
            container.innerHTML = '<h2>Actualizar tarea</h2><p>Error al cargar tarea.</p>';
        });
}
export function updusr(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const container = document.getElementById('contenido');
    if (!container) return;
    container.innerHTML = '<h2>Actualizar Usuario</h2><p>Cargando usuario...</p>';
    axios.get('http://localhost:3001/usuarios')
        .then(response => {
            const usuarios = response.data || [];
            if (!Array.isArray(usuarios) || usuarios.length === 0) {
                container.innerHTML = '<h2>Actualizar Usuario</h2><p>No hay usuarios disponibles.</p>';
                return;
            }
            const escapeHtml = (str) => String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');

            const options = usuarios.map(p => {
                const id = p.id || p._id || p.codigo || p.idTarea || '';
                const label = p.nombre || p.titulo || p.name || id || 'usuario';
                return `<option value="${escapeHtml(String(id))}">${escapeHtml(String(label))}</option>`;
            }).join('');

            const html = [];
            html.push('<h2>Actualizar Usuario</h2>');
            html.push('<div class="select-usuario">');
            html.push('<label for="updusr-select">Seleccione usuario</label>');
            html.push('<select id="updusr-select"><option value="">-- seleccionar --</option>');
            html.push(options);
            html.push('</select>');
            html.push('</div>');

            html.push(`
                <form id="form-updusr" style="margin-top:12px; display:none;">
                    <div class="form-row">
                        <label for="updusr-nombre">Nombre</label>
                        <input id="updusr-nombre" name="nombre" type="text" />
                    </div>
                    <div class="form-row">
                        <label for="updusr-apaterno">Apellido Paterno</label>
                        <input id="updusr-apaterno" name="apaterno" type="text" />
                    </div>
                    <div class="form-row">
                        <label for="updusr-amaterno">Apellido Materno</label>
                        <input id="updusr-amaterno" name="amaterno" type="text" />
                    </div>
                    <div class="form-row">
                        <button id="updusr-guardar" type="submit">Actualizar</button>
                    </div>
                    <div id="updusr-mensaje" style="margin-top:10px;"></div>
                </form>
            `);

            container.innerHTML = html.join('');

            const select = document.getElementById('updusr-select');
            const form = document.getElementById('form-updusr');
            const mensaje = document.getElementById('updusr-mensaje');

            select.addEventListener('change', function () {
                const val = select.value;
                if (!val) {
                    form.style.display = 'none';
                    return;
                }
                const usuario = usuarios.find(p => String(p.id || p._id || p.codigo || p.idUsuario || '') === val);
                if (!usuario) {
                    mensaje.innerText = 'Usuario no encontrado.';
                    form.style.display = 'none';
                    return;
                }
                const nombreEl = document.getElementById('updusr-nombre');
                const apaternoEl = document.getElementById('updusr-apaterno');
                const amaternoEl = document.getElementById('updusr-amaterno');
                nombreEl.value = usuario.nombre || usuario.name || '';
                apaternoEl.value = usuario.apaterno || usuario.apellidoPaterno || '';
                amaternoEl.value = usuario.amaterno || usuario.apellidoMaterno || '';
                mensaje.innerText = '';
                form.style.display = 'block';
            }); 

            form.addEventListener('submit', function (ev) {
                ev.preventDefault();
                const id = select.value;
                const nombre = document.getElementById('updusr-nombre').value.trim();
                const apaterno = document.getElementById('updusr-apaterno').value.trim();
                const amaterno = document.getElementById('updusr-amaterno').value.trim();
                if (!id) {
                    mensaje.innerText = 'Seleccione un usuario.';
                    return;
                }
                if (!nombre) {
                    mensaje.innerText = 'El nombre es requerido.';
                    return;
                }
                mensaje.innerText = 'Actualizando...';
                const payload = { nombre, apaterno, amaterno };
                const url = `http://localhost:3001/usuarios/${encodeURIComponent(id)}`;
                axios.put(url, payload)
                    .then(res => {
                        mensaje.innerText = 'Usuario actualizado correctamente.';
                        try { if (typeof mosusr === 'function') mosusr(); } catch (err) { console.error(err); }
                    })
                    .catch(err => {
                        console.error('Error al actualizar usuario:', err);
                        mensaje.innerText = 'Error al actualizar usuario.';
                    });
            });
        })
        .catch(error => {
            console.error('Error al cargar usuarios para actualizar:', error);
            container.innerHTML = '<h2>Actualizar usuario</h2><p>Error al cargar usuario.</p>';
        });
}
export function elipro(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const container = document.getElementById('contenido');
    if (!container) return;
    container.innerHTML = '<h2>Eliminar Proyecto</h2><p>Cargando proyectos...</p>';
    axios.get('http://localhost:3001/proyectos')
        .then(response => {
            const proyectos = response.data || [];
            if (!Array.isArray(proyectos) || proyectos.length === 0) {
                container.innerHTML = '<h2>Eliminar Proyecto</h2><p>No hay proyectos disponibles.</p>';
                return;
            }
            const escapeHtml = (str) => String(str == null ? '' : str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');

            // construir tabla con botón eliminar por fila
            const keysSet = new Set();
            proyectos.forEach(p => Object.keys(p || {}).forEach(k => keysSet.add(k)));
            const headers = Array.from(keysSet);
            const html = [];
            html.push('<h2>Eliminar Proyecto</h2>');
            html.push('<div class="tabla-eliminar"><table border="1" cellpadding="6" cellspacing="0"><thead><tr>');
            headers.forEach(h => html.push(`<th>${escapeHtml(h)}</th>`));
            html.push('<th>Acciones</th>');
            html.push('</tr></thead><tbody>');
            proyectos.forEach(p => {
                const id = p.id || p._id || p.codigo || p.idProyecto || '';
                html.push('<tr data-id="' + escapeHtml(String(id)) + '">');
                headers.forEach(h => {
                    const val = p && Object.prototype.hasOwnProperty.call(p, h) ? p[h] : '';
                    const cell = (val !== null && typeof val === 'object') ? JSON.stringify(val) : String(val);
                    html.push(`<td>${escapeHtml(cell)}</td>`);
                });
                html.push(`<td><button class="btn-eliminar-proy" data-id="${escapeHtml(String(id))}">Eliminar</button></td>`);
                html.push('</tr>');
            });
            html.push('</tbody></table></div>');
            container.innerHTML = html.join('');

            // añadir listeners a botones eliminar
            const buttons = container.querySelectorAll('.btn-eliminar-proy');
            buttons.forEach(btn => {
                btn.addEventListener('click', function () {
                    const id = btn.getAttribute('data-id');
                    if (!id) return;
                    const confirmed = window.confirm('¿Eliminar proyecto con id ' + id + '? Esta acción no se puede deshacer.');
                    if (!confirmed) return;
                    // mostrar indicación
                    btn.disabled = true;
                    btn.textContent = 'Eliminando...';
                    const url = `http://localhost:3001/proyectos/${encodeURIComponent(id)}`;
                    axios.delete(url)
                        .then(() => {
                            // refrescar la lista
                            elipro();
                        })
                        .catch(err => {
                            // eslint-disable-next-line no-console
                            console.error('Error al eliminar proyecto:', err);
                            btn.disabled = false;
                            btn.textContent = 'Eliminar';
                            const msg = document.createElement('div');
                            msg.style.color = 'red';
                            msg.style.marginTop = '8px';
                            msg.textContent = 'Error al eliminar proyecto.';
                            container.insertBefore(msg, container.firstChild.nextSibling);
                        });
                });
            });
        })
        .catch(err => {
            // eslint-disable-next-line no-console
            console.error('Error al cargar proyectos para eliminar:', err);
            container.innerHTML = '<h2>Eliminar Proyecto</h2><p>Error al cargar proyectos.</p>';
        });
}
export function elitar(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const container = document.getElementById('contenido');
    if (!container) return;
    container.innerHTML = '<h2>Eliminar Tarea</h2><p>Cargando tareas...</p>';
    axios.get('http://localhost:3001/tareas')
        .then(response => {
            const tareas = response.data || [];
            if (!Array.isArray(tareas) || tareas.length === 0) {
                container.innerHTML = '<h2>Eliminar Tarea</h2><p>No hay tareas disponibles.</p>';
                return;
            }
            const escapeHtml = (str) => String(str == null ? '' : str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');

            // construir tabla con botón eliminar por fila
            const keysSet = new Set();
            tareas.forEach(p => Object.keys(p || {}).forEach(k => keysSet.add(k)));
            const headers = Array.from(keysSet);
            const html = [];
            html.push('<h2>Eliminar Tarea</h2>');
            html.push('<div class="tabla-eliminar"><table border="1" cellpadding="6" cellspacing="0"><thead><tr>');
            headers.forEach(h => html.push(`<th>${escapeHtml(h)}</th>`));
            html.push('<th>Acciones</th>');
            html.push('</tr></thead><tbody>');
            tareas.forEach(p => {
                const id = p.id || p._id || p.codigo || p.idTarea || '';
                html.push('<tr data-id="' + escapeHtml(String(id)) + '">');
                headers.forEach(h => {
                    const val = p && Object.prototype.hasOwnProperty.call(p, h) ? p[h] : '';
                    const cell = (val !== null && typeof val === 'object') ? JSON.stringify(val) : String(val);
                    html.push(`<td>${escapeHtml(cell)}</td>`);
                });
                html.push(`<td><button class="btn-eliminar-tar" data-id="${escapeHtml(String(id))}">Eliminar</button></td>`);
                html.push('</tr>');
            });
            html.push('</tbody></table></div>');
            container.innerHTML = html.join('');

            // añadir listeners a botones eliminar
            const buttons = container.querySelectorAll('.btn-eliminar-tar');
            buttons.forEach(btn => {
                btn.addEventListener('click', function () {
                    const id = btn.getAttribute('data-id');
                    if (!id) return;
                    const confirmed = window.confirm('¿Eliminar tarea con id ' + id + '? Esta acción no se puede deshacer.');
                    if (!confirmed) return;
                    // mostrar indicación
                    btn.disabled = true;
                    btn.textContent = 'Eliminando...';
                    const url = `http://localhost:3001/tareas/${encodeURIComponent(id)}`;
                    axios.delete(url)
                        .then(() => {
                            // refrescar la lista
                            elitar();
                        })
                        .catch(err => {
                            // eslint-disable-next-line no-console
                            console.error('Error al eliminar tarea:', err);
                            btn.disabled = false;
                            btn.textContent = 'Eliminar';
                            const msg = document.createElement('div');
                            msg.style.color = 'red';
                            msg.style.marginTop = '8px';
                            msg.textContent = 'Error al eliminar tarea.';
                            container.insertBefore(msg, container.firstChild.nextSibling);
                        });
                });
            });
        })
        .catch(err => {
            // eslint-disable-next-line no-console
            console.error('Error al cargar tareas para eliminar:', err);
            container.innerHTML = '<h2>Eliminar Tarea</h2><p>Error al cargar tareas.</p>';
        });
}
export function eliusr(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    const container = document.getElementById('contenido');
    if (!container) return;
    container.innerHTML = '<h2>Eliminar Usuario</h2><p>Cargando usuarios...</p>';
    axios.get('http://localhost:3001/usuarios')
        .then(response => {
            const usuarios = response.data || [];
            if (!Array.isArray(usuarios) || usuarios.length === 0) {
                container.innerHTML = '<h2>Eliminar Usuario</h2><p>No hay usuarios disponibles.</p>';
                return;
            }
            const escapeHtml = (str) => String(str == null ? '' : str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');

            // construir tabla con botón eliminar por fila
            const keysSet = new Set();
            usuarios.forEach(p => Object.keys(p || {}).forEach(k => keysSet.add(k)));
            const headers = Array.from(keysSet);
            const html = [];
            html.push('<h2>Eliminar Usuario</h2>');
            html.push('<div class="tabla-eliminar"><table border="1" cellpadding="6" cellspacing="0"><thead><tr>');
            headers.forEach(h => html.push(`<th>${escapeHtml(h)}</th>`));
            html.push('<th>Acciones</th>');
            html.push('</tr></thead><tbody>');
            usuarios.forEach(p => {
                const id = p.id || p._id || p.codigo || p.idUsuario || '';
                html.push('<tr data-id="' + escapeHtml(String(id)) + '">');
                headers.forEach(h => {
                    const val = p && Object.prototype.hasOwnProperty.call(p, h) ? p[h] : '';
                    const cell = (val !== null && typeof val === 'object') ? JSON.stringify(val) : String(val);
                    html.push(`<td>${escapeHtml(cell)}</td>`);
                });
                html.push(`<td><button class="btn-eliminar-usr" data-id="${escapeHtml(String(id))}">Eliminar</button></td>`);
                html.push('</tr>');
            });
            html.push('</tbody></table></div>');
            container.innerHTML = html.join('');

            // añadir listeners a botones eliminar
            const buttons = container.querySelectorAll('.btn-eliminar-usr');
            buttons.forEach(btn => {
                btn.addEventListener('click', function () {
                    const id = btn.getAttribute('data-id');
                    if (!id) return;
                    const confirmed = window.confirm('¿Eliminar usuario con id ' + id + '? Esta acción no se puede deshacer.');
                    if (!confirmed) return;
                    // mostrar indicación
                    btn.disabled = true;
                    btn.textContent = 'Eliminando...';
                    const url = `http://localhost:3001/usuarios/${encodeURIComponent(id)}`;
                    axios.delete(url)
                        .then(() => {
                            // refrescar la lista
                            eliusr();
                        })
                        .catch(err => {
                            // eslint-disable-next-line no-console
                            console.error('Error al eliminar usuario:', err);
                            btn.disabled = false;
                            btn.textContent = 'Eliminar';
                            const msg = document.createElement('div');
                            msg.style.color = 'red';
                            msg.style.marginTop = '8px';
                            msg.textContent = 'Error al eliminar usuario.';
                            container.insertBefore(msg, container.firstChild.nextSibling);
                        });
                });
            });
        })
        .catch(err => {
            // eslint-disable-next-line no-console
            console.error('Error al cargar usuarios para eliminar:', err);
            container.innerHTML = '<h2>Eliminar Usuario</h2><p>Error al cargar usuarios.</p>';
        });
}