# FASE 1: Normalización de Angular

## Objetivo
Resolver las inconsistencias en las versiones de Angular (actualmente hay paquetes en v8 y v11 mezclados).

---

## Problema Actual
El proyecto tiene versiones mixtas de Angular:
- `@angular/core`: v11.0.5
- Otros paquetes `@angular/*`: v8.1.2

Esto causará problemas en las migraciones posteriores.

---

## Estrategia
Unificar todas las dependencias de Angular a la versión **11.2.x** (última de Angular 11).

---

## Pasos de Migración

### 1. Actualizar package.json

Modificar todas las dependencias de Angular a v11.2.14:

```json
"@angular/animations": "~11.2.14",
"@angular/common": "~11.2.14",
"@angular/core": "~11.2.14",
"@angular/forms": "~11.2.14",
"@angular/platform-browser": "~11.2.14",
"@angular/platform-browser-dynamic": "~11.2.14",
"@angular/router": "~11.2.14",
"@angular/compiler": "~11.2.14",
"@angular/compiler-cli": "~11.2.14",
"@angular/language-service": "~11.2.14",
"@angular/cli": "~11.2.19",
"@angular-devkit/build-angular": "~0.1102.19"
```

### 2. Actualizar TypeScript
Angular 11 requiere TypeScript 4.0.x:

```json
"typescript": "~4.0.8"
```

### 3. Actualizar Zone.js
```json
"zone.js": "~0.11.4"
```

### 4. Actualizar RxJS
```json
"rxjs": "~6.6.7"
```

### 5. Actualizar tslib
```json
"tslib": "^2.0.0"
```

### 6. Limpiar e Instalar
```bash
# Eliminar node_modules y lock file
rm -rf node_modules
rm package-lock.json

# Reinstalar dependencias
npm install
```

### 7. Actualizar Configuración de TypeScript

Verificar `tsconfig.json`:
```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "module": "es2020",
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2015",
    "lib": [
      "es2018",
      "dom"
    ]
  }
}
```

### 8. Compilar y Probar
```bash
# Compilar
npm run build

# Ejecutar en navegador
ionic serve

# Ejecutar tests
npm test
```

---

## Problemas Comunes y Soluciones

### Error: "Peer dependency mismatch"
**Solución**: Usar `--legacy-peer-deps` temporalmente:
```bash
npm install --legacy-peer-deps
```

### Error: "Module not found"
**Solución**: Limpiar caché y reinstalar:
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### Error en compilación de templates
**Solución**: Verificar que no haya sintaxis deprecada en templates HTML.

---

## Cambios en el Código

### Importaciones de RxJS
Si hay errores con RxJS, actualizar las importaciones:

**Antes:**
```typescript
import 'rxjs/add/operator/map';
```

**Después:**
```typescript
import { map } from 'rxjs/operators';
```

### Uso de Operadores
**Antes:**
```typescript
observable.map(x => x);
```

**Después:**
```typescript
observable.pipe(map(x => x));
```

---

## Verificación

### Checklist de Pruebas
- [ ] `npm run build` exitoso
- [ ] `ionic serve` funciona
- [ ] Navegación entre páginas funciona
- [ ] Formularios funcionan correctamente
- [ ] Servicios HTTP funcionan
- [ ] Autenticación funciona
- [ ] Storage funciona

---

## Criterios de Éxito
✅ Todas las dependencias de Angular en v11.2.x
✅ TypeScript en v4.0.x
✅ Proyecto compila sin errores
✅ Aplicación funciona correctamente
✅ Tests pasan (si los hay)

---

## Tiempo Estimado
⏱️ 3-6 horas

---

## Commit
```bash
git add .
git commit -m "feat: normalizar Angular a v11.2.14"
```

---

## Siguiente Paso
➡️ `03-ionic-4-to-5.md`
