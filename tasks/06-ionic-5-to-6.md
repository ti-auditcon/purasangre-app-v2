# FASE 5: Ionic 5 → Ionic 6 + Angular 13-14

## Objetivo
Actualizar a Ionic 6 y Angular 14 (Ionic 6 soporta Angular 12-15).

---

## Documentación Oficial
📖 https://ionicframework.com/docs/updating/6-0

---

## Parte A: Angular 12 → Angular 14

### 1. Actualizar a Angular 13 primero

```json
"@angular/animations": "~13.3.12",
"@angular/common": "~13.3.12",
"@angular/core": "~13.3.12",
"@angular/forms": "~13.3.12",
"@angular/platform-browser": "~13.3.12",
"@angular/platform-browser-dynamic": "~13.3.12",
"@angular/router": "~13.3.12",
"@angular/compiler": "~13.3.12",
"@angular/compiler-cli": "~13.3.12",
"@angular/language-service": "~13.3.12",
"@angular/cli": "~13.3.11",
"@angular-devkit/build-angular": "~13.3.11"
```

```json
"typescript": "~4.6.4"
```

**Instalar:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Compilar y probar:**
```bash
npm run build
ionic serve
```

### 2. Luego actualizar a Angular 14

```json
"@angular/animations": "~14.3.0",
"@angular/common": "~14.3.0",
"@angular/core": "~14.3.0",
"@angular/forms": "~14.3.0",
"@angular/platform-browser": "~14.3.0",
"@angular/platform-browser-dynamic": "~14.3.0",
"@angular/router": "~14.3.0",
"@angular/compiler": "~14.3.0",
"@angular/compiler-cli": "~14.3.0",
"@angular/language-service": "~14.3.0",
"@angular/cli": "~14.2.13",
"@angular-devkit/build-angular": "~14.2.13"
```

```json
"typescript": "~4.7.4"
```

**Instalar:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Parte B: Actualizar Ionic 5 → Ionic 6

### 1. Actualizar Dependencias

```json
"@ionic/angular": "^6.7.5"
```

### 2. Actualizar Ionic Angular Toolkit
```json
"@ionic/angular-toolkit": "^6.1.0"
```

### 3. Instalar
```bash
npm install
```

---

## Cambios Breaking en Ionic 6

### 1. Colores de Sombras Actualizados
Ionic 6 usa un nuevo sistema de sombreado.

**Actualizar `theme/variables.scss`:**
```scss
:root {
  --ion-color-step-50: #f2f2f2;
  --ion-color-step-100: #e6e6e6;
  --ion-color-step-150: #d9d9d9;
  // ... etc
}
```

### 2. Tipografía Actualizada
Nueva tipografía por defecto.

**Verificar en `global.scss`:**
```scss
// Si tienes overrides de fuentes, verificarlos
```

### 3. Form Components
Los componentes de formulario tienen nueva apariencia.

**Cambios en ion-input, ion-textarea:**
- Nuevo diseño por defecto
- Verificar apariencia en toda la app

### 4. ios/md Mode
Ionic 6 mejora el modo iOS/Material Design.

**En `app.module.ts` (opcional):**
```typescript
IonicModule.forRoot({
  mode: 'md' // Forzar Material Design en todas las plataformas
})
```

---

## Actualizar Componentes Deprecados

### 1. ion-button
**Verificar atributos deprecados:**
- `expand` sigue funcionando
- `fill` sigue funcionando
- `shape` sigue funcionando

### 2. ion-datetime
**Gran cambio en Ionic 6:**

**Antes (Ionic 5):**
```html
<ion-datetime 
  displayFormat="DD/MM/YYYY"
  pickerFormat="DD MMMM YYYY"
  [(ngModel)]="myDate">
</ion-datetime>
```

**Después (Ionic 6):**
```html
<ion-datetime 
  presentation="date"
  [(ngModel)]="myDate">
</ion-datetime>
```

**En TypeScript:**
```typescript
// Formato de fecha cambió
myDate: string = '2024-01-24T00:00:00';  // ISO 8601
```

### 3. ion-picker
El picker tradicional está deprecado.

**Migrar a:**
- `ion-picker-column` para pickers personalizados
- `ion-datetime` para fechas
- `ion-select` para selecciones simples

---

## Actualizar Gestos (si aplica)

Si usas `hammerjs`:

**Ionic 6 usa gestos web nativos:**
```typescript
// Verificar si hammerjs sigue siendo necesario
// Ionic 6 tiene su propio sistema de gestos
```

**Puede que ya no necesites:**
```json
// Eliminar si no lo usas directamente
"hammerjs": "^2.0.8",
"ionic-long-press": "^2.0.2"
```

---

## Actualizar Configuración de Build

### angular.json
Verificar opciones de build actualizadas:

```json
{
  "builder": "@angular-devkit/build-angular:browser",
  "options": {
    "outputPath": "www",
    "index": "src/index.html",
    "main": "src/main.ts",
    "polyfills": "src/polyfills.ts",
    "tsConfig": "tsconfig.app.json",
    "inlineStyleLanguage": "scss",
    "assets": [
      "src/assets",
      "src/manifest.json"
    ],
    "styles": [
      "src/theme/variables.scss",
      "src/global.scss"
    ]
  }
}
```

---

## Testing Exhaustivo

### Checklist de UI
- [ ] Botones se ven correctamente
- [ ] Inputs/Textareas funcionan y se ven bien
- [ ] Selects funcionan
- [ ] Datetimes funcionan con nuevo formato
- [ ] Modals funcionan
- [ ] Popovers funcionan
- [ ] Action Sheets funcionan
- [ ] Alerts funcionan
- [ ] Toasts funcionan
- [ ] Loading funcionan
- [ ] Cards se ven bien
- [ ] Lists se ven bien
- [ ] Headers/Toolbars se ven bien
- [ ] Tabs funcionan
- [ ] Segments funcionan

### Testing de Formularios
- [ ] Validaciones funcionan
- [ ] Submit funciona
- [ ] Reset funciona
- [ ] Valores se guardan correctamente

### Testing de Navegación
- [ ] Router funciona
- [ ] Navigation guards funcionan
- [ ] Deep linking funciona
- [ ] Back button funciona

---

## Problemas Comunes

### Error: "ion-datetime format"
**Solución**: Actualizar formato de fechas a ISO 8601:
```typescript
// Antes
myDate = '24/01/2024';

// Después
myDate = '2024-01-24T00:00:00';
```

### Estilos rotos
**Solución**: Revisar `theme/variables.scss` y actualizar variables de color.

### Formularios se ven diferentes
**Solución**: Normal en Ionic 6, ajustar estilos personalizados si es necesario.

---

## Criterios de Éxito
✅ Angular actualizado a v14
✅ Ionic actualizado a v6
✅ Build exitoso
✅ Todos los componentes funcionan
✅ Formularios funcionan correctamente
✅ Navegación funciona
✅ UI se ve correcta en iOS y Android

---

## Tiempo Estimado
⏱️ 8-12 horas

---

## Commit
```bash
git add .
git commit -m "feat: migrar a Ionic 6 y Angular 14"
```

---

## Siguiente Paso
➡️ `07-capacitor-3-to-4.md`
