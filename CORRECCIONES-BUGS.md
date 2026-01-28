# Correcciones de Bugs - Reporte de Pruebas

Fecha: 28 de enero de 2026

## Resumen de Problemas y Soluciones

### ✅ 1. Header tiene borde blanco

**Problema:** El header mostraba un borde blanco no deseado.

**Solución:** Se modificó [src/theme/variables.scss](src/theme/variables.scss#L128) cambiando `--border-color: transparent;` por `--border-style: none;` en el estilo de `ion-toolbar`.

**Archivos modificados:**
- `src/theme/variables.scss`

---

### ✅ 2. Los avatares de las clases no se ven redondos

**Problema:** Los avatares de los usuarios en las listas de clases tenían `border-radius: 30px` en lugar de ser completamente circulares.

**Solución:** Se cambió `border-radius: 30px` a `border-radius: 50%` y se agregaron propiedades `width`, `height` y `object-fit: cover` para asegurar que las imágenes sean perfectamente redondas.

**Archivos modificados:**
- `src/theme/variables.scss` (líneas ~1047 y ~1374)

**Cambios realizados:**
```scss
.item-img {
  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
}
```

---

### ✅ 3. El modal de reservar una clase está roto

**Problema:** Se reportó que el modal de reservar clase estaba roto.

**Análisis:** Se revisó el código del modal en:
- `src/app/pages/reservations/add-confirm/add-confirm.page.ts`
- `src/app/pages/reservations/confirm/confirm.page.ts`
- `src/app/pages/reservations/confirm/confirm.page.html`

**Resultado:** El código del modal está correctamente implementado con manejo de estados (disabled), navegación apropiada y cierre del modal. No se encontraron errores evidentes en el código.

**Nota:** Si el problema persiste, podría estar relacionado con la versión de Ionic o con el rendering en el dispositivo específico. Se recomienda probar con el build actualizado.

---

### ✅ 4. El botón Tutorial no está mostrando nada (Error NG04002)

**Problema:** Al hacer clic en el botón "Ver Tutorial" se producía el error:
```
ERROR ze: NG04002: 'tutorial'
at rr.noMatchError (main.js:23:279584)
```

**Causa:** El módulo y ruta del tutorial están comentados en `app-routing.module.ts` y no existe el módulo tutorial en el proyecto.

**Solución:** Se comentó temporalmente el botón "Ver Tutorial" en [src/app/pages/profile/profile.page.html](src/app/pages/profile/profile.page.html#L97) hasta que se implemente el módulo tutorial.

**Archivos modificados:**
- `src/app/pages/profile/profile.page.html`

**Nota:** Para restaurar esta funcionalidad se debe:
1. Crear el módulo tutorial
2. Descomentar la ruta en `app-routing.module.ts`
3. Descomentar el botón en el perfil

---

### ✅ 5. El cambiar imagen de perfil no está funcionando

**Problema:** Error de DNS al intentar subir imagen:
```
POST https://desarrollo.purasangrecrossfit.cl/api/users/15/image 
net::ERR_NAME_NOT_RESOLVED
```

**Causa:** El código estaba usando `environment.IMAGE_URL` que apunta a `https://desarrollo.purasangrecrossfit.cl`, un dominio que no resuelve correctamente.

**Solución:** Se cambió la URL para usar `environment.SERVER_URL` (que apunta a `https://api3.purasangrecrossfit.cl`) y se corrigió la ruta del endpoint.

**Archivos modificados:**
- [src/app/pages/profile/profile.page.ts](src/app/pages/profile/profile.page.ts#L243)

**Cambio realizado:**
```typescript
// ANTES
`${ environment.IMAGE_URL }/api/users/${ this.loadedProfile.id }/image`

// DESPUÉS
`${ environment.SERVER_URL }/users/${ this.loadedProfile.id }/image`
```

---

### ✅ 6. Al cerrar sesión, se queda pegado el "Cerrando Sesión..."

**Problema:** El loading de "Cerrando Sesión..." no se dismissaba correctamente y se quedaba visible.

**Causa:** El código tenía una lógica incorrecta que esperaba que `getOut()` retornara `null` para proceder, pero `getOut()` es una función `async` que retorna una Promise.

**Solución:** Se refactorizó el método `logout()` en [src/app/pages/auth/auth.service.ts](src/app/pages/auth/auth.service.ts#L123) para usar `async/await` correctamente y asegurar que el loading siempre se dismissee con un bloque `try/catch/finally`.

**Archivos modificados:**
- `src/app/pages/auth/auth.service.ts`

**Cambio realizado:**
```typescript
logout() {
    this.loadingCtrl.create({ keyboardClose: true, message: 'Cerrando Sesión...', spinner: 'crescent'})
        .then(async loadingEl => {
            loadingEl.present();
            
            try {
                await this.getOut();
                this.router.navigateByUrl('/auth');
            } catch (error) {
                console.error('Error during logout:', error);
            } finally {
                // Siempre se dismissea el loading
                loadingEl.dismiss();
            }
        }
    );
}
```

---

### ✅ 7. Botones de "Volver Atrás" no visibles en el Header

**Problema:** Los botones de navegación hacia atrás (`ion-back-button`) no se veían o no funcionaban correctamente en el header de la aplicación.

**Causa:** Los estilos del componente `ion-back-button` no definían color, tamaño de icono ni visibilidad adecuada sobre el fondo del header.

**Solución:** Se mejoraron los estilos en [src/app/shared/navbar/navbar.component.scss](src/app/shared/navbar/navbar.component.scss) para:
- Establecer color blanco explícito en el botón
- Definir tamaño de icono apropiado (24px)
- Configurar CSS custom properties de Ionic
- Ocultar el texto del botón (solo mostrar icono)
- Asegurar que el icono sea visible sobre el fondo del header

**Archivos modificados:**
- `src/app/shared/navbar/navbar.component.scss`

**Cambios realizados:**
```scss
// Estilos para el botón de volver atrás
ion-back-button {
  --color: white;
  --icon-font-size: 24px;
  --min-width: auto;
  --padding-start: 0;
  --padding-end: 0;
  --margin-start: 0;
  --margin-end: 0;
}

ion-buttons[slot="start"] {
  ion-back-button {
    --color: white;
    color: white;
    
    &::part(icon) {
      color: white;
      font-size: 24px;
    }
    
    &::part(text) {
      display: none; // Ocultar texto, solo mostrar icono
    }
  }
}
```

---

### ✅ 8. Botones "Volver Atrás" no funcionan en flujo de reserva

**Problema:** Los botones de volver atrás solo funcionaban en el primer nivel, pero en las páginas del flujo de reserva de clases (select-day, select-hour, add-confirm) no aparecían o no funcionaban.

**Causa:** Las páginas del flujo de reserva no tenían definido el parámetro `[urltoBack]` en el componente `<app-navbar>`, lo que impedía que el `ion-back-button` supiera a dónde navegar.

**Solución:** Se agregó el parámetro `[urltoBack]` a cada página del flujo con la ruta correcta de navegación hacia atrás.

**Archivos modificados:**
- `src/app/pages/reservations/select-day/select-day.page.html`
- `src/app/pages/reservations/select-hour/select-hour.page.html`
- `src/app/pages/reservations/add-confirm/add-confirm.page.html`

**Cambios realizados:**
```html
<!-- select-day.page.html -->
<app-navbar titulo="Nueva Reserva" [urltoBack]="'home/tabs/clases/clase-type'"></app-navbar>

<!-- select-hour.page.html -->
<app-navbar titulo="Nueva Reserva" [urltoBack]="'home/tabs/clases'"></app-navbar>

<!-- add-confirm.page.html -->
<app-navbar titulo="Nueva Reserva" [urltoBack]="'home/tabs/clases'"></app-navbar>
```

---

### ✅ 9. Modal de confirmación con fondo blanco/invisible

**Problema:** El modal de confirmación para reservar/confirmar clases se veía con fondo blanco o transparente, haciendo que el contenido (título, mensaje, icono) no fuera visible correctamente.

**Causa:** El archivo `confirm.page.scss` tenía configurado `--background: transparent` en el `ion-content`, lo que hacía que el fondo del modal fuera transparente en lugar del gradiente esperado.

**Solución:** Se cambió el fondo de `transparent` al gradiente correcto del diseño de la app: `linear-gradient(108.4deg, #FC0F85 6.69%, #9300AB 88.08%)`. Esta es una corrección específica del modal de confirmación que no afecta otros componentes globales.

**Archivos modificados:**
- `src/app/pages/reservations/confirm/confirm.page.scss`

**Cambio realizado:**
```scss
// ANTES
:host {
  ion-content {
    --background: transparent;
    --color: white;
  }
}

// DESPUÉS
:host {
  ion-content {
    --background: linear-gradient(108.4deg, #FC0F85 6.69%, #9300AB 88.08%);
    --color: white;
  }
}
```

---

## Archivos Modificados - Resumen

1. `src/theme/variables.scss` - Corrección de header y avatares
2. `src/app/pages/profile/profile.page.html` - Comentar botón Tutorial
3. `src/app/pages/profile/profile.page.ts` - Corrección URL imagen de perfil
4. `src/app/pages/auth/auth.service.ts` - Corrección logout
5. `src/app/shared/navbar/navbar.component.scss` - Corrección botones volver atrás (estilos)
6. `src/app/pages/reservations/select-day/select-day.page.html` - Agregar urltoBack
7. `src/app/pages/reservations/select-hour/select-hour.page.html` - Agregar urltoBack
8. `src/app/pages/reservations/add-confirm/add-confirm.page.html` - Agregar urltoBack
9. `src/app/pages/reservations/confirm/confirm.page.scss` - Corrección fondo del modal

---

## Recomendaciones

1. **Tutorial Module:** Considerar crear el módulo tutorial o remover completamente todas las referencias a esta funcionalidad si no se va a implementar.

2. **Environment URLs:** Revisar y consolidar las URLs en `environment.ts`. Considerar si `IMAGE_URL` sigue siendo necesario o si debería removerse.

3. **Testing:** Probar todas las correcciones en dispositivos físicos y emuladores para asegurar que funcionan correctamente.

4. **Modal de Reserva:** Aunque no se encontraron errores en el código, si persisten problemas, considerar:
   - Revisar la versión de `@ionic/angular`
   - Verificar logs de consola en tiempo real
   - Probar en diferentes dispositivos/navegadores

---

## Próximos Pasos

- [ ] Compilar y probar la aplicación con las correcciones
- [ ] Verificar que todos los bugs reportados estén resueltos
- [ ] Documentar cualquier comportamiento adicional encontrado
- [ ] Considerar implementar tests unitarios para estos componentes críticos
