# FASE 9: Ionic 6 → Ionic 7 + Angular 16-17

## Objetivo
Actualizar a Ionic 7 con Angular 16 o 17 (Ionic 7 soporta Angular 14-17).

---

## Documentación Oficial
📖 https://ionicframework.com/docs/updating/7-0

---

## Parte A: Angular 15 → Angular 16

### 1. Actualizar Angular a v16

```bash
ng update @angular/core@16 @angular/cli@16
```

O en `package.json`:
```json
"@angular/animations": "~16.2.12",
"@angular/common": "~16.2.12",
"@angular/core": "~16.2.12",
"@angular/forms": "~16.2.12",
"@angular/platform-browser": "~16.2.12",
"@angular/platform-browser-dynamic": "~16.2.12",
"@angular/router": "~16.2.12",
"@angular/compiler": "~16.2.12",
"@angular/compiler-cli": "~16.2.12",
"@angular/language-service": "~16.2.12",
"@angular/cli": "~16.2.14",
"@angular-devkit/build-angular": "~16.2.14"
```

```json
"typescript": "~5.1.6",
"zone.js": "~0.13.3"
```

**Instalar:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
ionic serve
```

### 2. Opcional: Actualizar a Angular 17

**Si quieres ir a Angular 17:**
```json
"@angular/animations": "~17.3.0",
"@angular/common": "~17.3.0",
"@angular/core": "~17.3.0",
"@angular/forms": "~17.3.0",
"@angular/platform-browser": "~17.3.0",
"@angular/platform-browser-dynamic": "~17.3.0",
"@angular/router": "~17.3.0",
"@angular/compiler": "~17.3.0",
"@angular/compiler-cli": "~17.3.0",
"@angular/language-service": "~17.3.0",
"@angular/cli": "~17.3.8",
"@angular-devkit/build-angular": "~17.3.8"
```

```json
"typescript": "~5.4.5"
```

---

## Parte B: Actualizar Ionic 6 → Ionic 7

### 1. Actualizar Ionic Framework

```json
"@ionic/angular": "^7.8.0"
```

### 2. Actualizar Ionic Angular Toolkit
```json
"@ionic/angular-toolkit": "^9.0.0"
```

### 3. Instalar
```bash
npm install
```

---

## Cambios Breaking en Ionic 7

### 1. Overlays (Modals, Popovers, etc.)

**Cambio importante**: Los overlays ahora usan inline modals por defecto.

**Antes (Ionic 6):**
```typescript
async presentModal() {
  const modal = await this.modalController.create({
    component: MyModalComponent
  });
  return await modal.present();
}
```

**Después (Ionic 7 - sigue funcionando igual):**
```typescript
async presentModal() {
  const modal = await this.modalController.create({
    component: MyModalComponent
  });
  return await modal.present();
}
```

**Nueva forma inline (opcional):**
```html
<ion-modal [isOpen]="isModalOpen">
  <ng-template>
    <app-my-modal></app-my-modal>
  </ng-template>
</ion-modal>
```

### 2. ion-datetime - Mejoras Continuadas

**Verificar formato de fechas:**
```html
<ion-datetime 
  presentation="date"
  [(ngModel)]="selectedDate"
  [preferWheel]="true">
</ion-datetime>
```

### 3. Formularios - ion-input, ion-textarea

**Nuevo atributo `fill`:**
```html
<!-- Nuevo en Ionic 7 -->
<ion-input 
  fill="solid"
  label="Email"
  type="email">
</ion-input>

<ion-input 
  fill="outline"
  label="Password"
  type="password">
</ion-input>
```

**Opciones de fill:**
- `solid` - Fondo sólido
- `outline` - Solo borde
- Sin fill - Estilo tradicional

### 4. Actualizar ion-item

**Verificar slots:**
```html
<ion-item>
  <ion-icon slot="start" name="person"></ion-icon>
  <ion-label>Usuario</ion-label>
  <ion-icon slot="end" name="chevron-forward"></ion-icon>
</ion-item>
```

---

## Actualizaciones de Estilos

### 1. Nuevas Variables CSS

**Actualizar `theme/variables.scss`:**

```scss
:root {
  // Ionic 7 introduce nuevas shadow variables
  --ion-box-shadow-color: rgba(0, 0, 0, 0.2);
  
  // Verificar variables de colores
  --ion-color-step-50: #f2f2f2;
  --ion-color-step-100: #e6e6e6;
  --ion-color-step-150: #d9d9d9;
  --ion-color-step-200: #cccccc;
  // ... etc
}
```

### 2. Actualizar Estilos de Formularios

Si personalizaste estilos de inputs, verificar que sigan funcionando:

```scss
ion-input {
  --background: white;
  --border-color: #ddd;
  --border-radius: 8px;
  --padding-start: 16px;
  --padding-end: 16px;
}
```

---

## Modernización con Angular Signals (Opcional)

### Angular 16+ introduce Signals

**Puedes empezar a usar signals en componentes nuevos:**

```typescript
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-ejemplo',
  template: `
    <h1>Contador: {{ count() }}</h1>
    <ion-button (click)="increment()">+</ion-button>
  `
})
export class EjemploComponent {
  count = signal(0);

  increment() {
    this.count.set(this.count() + 1);
  }
}
```

**Nota**: No es necesario migrar todo a signals, es opcional.

---

## Standalone Components (Opcional)

### Empezar a crear componentes standalone

**Ejemplo:**
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-nueva-pagina',
  templateUrl: './nueva-pagina.component.html',
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class NuevaPaginaComponent {}
```

**Nota**: Los módulos tradicionales siguen funcionando perfectamente.

---

## Testing Exhaustivo

### Checklist de UI
- [ ] Modals funcionan (controller y inline)
- [ ] Popovers funcionan
- [ ] Action Sheets funcionan
- [ ] Alerts funcionan
- [ ] Toasts funcionan
- [ ] Loading funcionan
- [ ] Inputs se ven bien con nuevos estilos
- [ ] Textareas funcionan
- [ ] Selects funcionan
- [ ] Datetimes funcionan
- [ ] Botones funcionan
- [ ] Cards se ven bien
- [ ] Lists se ven bien
- [ ] Tabs funcionan
- [ ] Segments funcionan

### Testing de Funcionalidad
- [ ] Navegación funciona
- [ ] Formularios validan correctamente
- [ ] HTTP requests funcionan
- [ ] Storage funciona
- [ ] Autenticación funciona
- [ ] Guards funcionan

---

## Problemas Comunes

### Error: "Can't bind to 'isOpen' since it isn't a known property"
**Solución**: Asegurarse de importar IonicModule en el módulo.

### Estilos de inputs rotos
**Solución**: Ionic 7 cambió los estilos por defecto. Actualizar CSS personalizado.

### Modals no se abren
**Solución**: Verificar que el componente esté declarado correctamente.

### Error con Angular 17 y Vite
**Solución**: Angular 17 usa Vite por defecto en nuevos proyectos, pero proyectos migrados siguen con webpack. Está bien.

---

## Criterios de Éxito
✅ Angular actualizado a v16 o v17
✅ Ionic actualizado a v7
✅ TypeScript actualizado a v5.1+ o v5.4+
✅ Build exitoso
✅ Todos los componentes funcionan
✅ UI se ve correcta
✅ Formularios funcionan
✅ Navegación funciona

---

## Tiempo Estimado
⏱️ 6-10 horas

---

## Commit
```bash
git add .
git commit -m "feat: migrar a Ionic 7 y Angular 16/17"
```

---

## Siguiente Paso
➡️ `11-capacitor-5-to-6.md`
