# FASE 7: Angular 14 → Angular 15

## Objetivo
Actualizar Angular de v14 a v15.

---

## Documentación Oficial
📖 https://update.angular.io/?l=3&v=14.0-15.0

---

## Pasos de Migración

### 1. Actualizar Angular

**Usar Angular CLI:**
```bash
ng update @angular/core@15 @angular/cli@15
```

**O manualmente en `package.json`:**
```json
"@angular/animations": "~15.2.10",
"@angular/common": "~15.2.10",
"@angular/core": "~15.2.10",
"@angular/forms": "~15.2.10",
"@angular/platform-browser": "~15.2.10",
"@angular/platform-browser-dynamic": "~15.2.10",
"@angular/router": "~15.2.10",
"@angular/compiler": "~15.2.10",
"@angular/compiler-cli": "~15.2.10",
"@angular/language-service": "~15.2.10",
"@angular/cli": "~15.2.11",
"@angular-devkit/build-angular": "~15.2.11"
```

### 2. Actualizar TypeScript
```json
"typescript": "~4.9.5"
```

### 3. Actualizar RxJS
```json
"rxjs": "~7.8.1"
```

### 4. Actualizar Zone.js
```json
"zone.js": "~0.12.0"
```

### 5. Instalar
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Cambios Importantes en Angular 15

### 1. Standalone Components (Opcional)
Angular 15 introduce componentes standalone como estable.

**Por ahora no es necesario migrar**, pero puedes empezar a usarlos en componentes nuevos:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-ejemplo',
  templateUrl: './ejemplo.component.html',
  standalone: true,  // Nuevo
  imports: [CommonModule, IonicModule]  // Nuevo
})
export class EjemploComponent {}
```

### 2. Directivas de Router Standalone
```typescript
// En el futuro se podrá usar:
import { provideRouter } from '@angular/router';

// Pero por ahora seguir con RouterModule
```

### 3. Mejoras en Formularios Reactivos Tipados
Los formularios reactivos ahora son fuertemente tipados:

```typescript
import { FormControl, FormGroup } from '@angular/forms';

// Tipado automático
const form = new FormGroup({
  name: new FormControl(''),  // TypeScript infiere el tipo
  email: new FormControl('')
});

// form.value es de tipo { name: string | null, email: string | null }
```

---

## Actualizar angular.json

Verificar configuración de `angular.json`:

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "app": {
      "projectType": "application",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "www",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.app.json",
            "inlineStyleLanguage": "scss"
          }
        }
      }
    }
  }
}
```

---

## Actualizar Imports

### 1. Verificar imports de RxJS
Si usas operadores deprecados, actualizarlos:

**Antes:**
```typescript
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

of(1, 2, 3).pipe(map(x => x * 2));
```

**Después (igual, solo verificar):**
```typescript
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

of(1, 2, 3).pipe(map(x => x * 2));
```

### 2. Date Pipe con zona horaria
```typescript
// Ahora soporta mejor las zonas horarias
{{ date | date:'short':'UTC' }}
```

---

## Cambios en Testing

### Actualizar archivos de test si es necesario

**test.ts**
```typescript
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Inicialización de testing
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
```

---

## Deprecaciones a Revisar

### 1. NgModules (Futuro)
Aunque no es necesario cambiar ahora, Angular está moviendo hacia standalone components.

**Nota**: Mantener NgModules por ahora, migrar a standalone en el futuro si se desea.

### 2. RouterModule.forRoot
Sigue funcionando igual:
```typescript
RouterModule.forRoot(routes)
```

---

## Compilar y Probar

```bash
# Compilar
npm run build

# Servir
ionic serve

# Tests
npm test
```

---

## Verificación

### Checklist
- [ ] Build exitoso sin errores
- [ ] Build exitoso sin warnings importantes
- [ ] App funciona en navegador
- [ ] Routing funciona correctamente
- [ ] Formularios funcionan
- [ ] HTTP requests funcionan
- [ ] Guards funcionan
- [ ] Interceptors funcionan
- [ ] Pipes funcionan
- [ ] Services funcionan

---

## Problemas Comunes

### Error: "Cannot find module"
**Solución**:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Error con RxJS
**Solución**: Verificar que RxJS esté en v7.8.x:
```bash
npm install rxjs@~7.8.1
```

### Error en tests
**Solución**: Actualizar configuración de testing en `test.ts`.

### Error: "Polyfills"
**Solución**: En Angular 15, polyfills ahora es un array en angular.json:
```json
"polyfills": ["zone.js"]
```

---

## Criterios de Éxito
✅ Angular actualizado a v15.2.x
✅ TypeScript actualizado a v4.9.x
✅ RxJS actualizado a v7.8.x
✅ Build exitoso
✅ App funciona correctamente
✅ Tests pasan
✅ No hay deprecation warnings críticos

---

## Tiempo Estimado
⏱️ 3-5 horas

---

## Commit
```bash
git add .
git commit -m "feat: migrar Angular de v14 a v15"
```

---

## Siguiente Paso
➡️ `09-capacitor-4-to-5.md`
