# Fase 5a: Migración Angular 12 → 13 - COMPLETADA ✅

**Fecha de Completación:** 25 de enero de 2026

## Resumen

Migración exitosa de Angular 12.2.17 a Angular 13.3.12 con TypeScript 4.4.4. Se actualizó el sistema de lazy loading de módulos al nuevo formato con funciones arrow y se configuró skipLibCheck para compatibilidad con ionicons.

## Cambios de Versiones

### Angular Core
- `@angular/animations`: 12.2.17 → **13.3.12**
- `@angular/common`: 12.2.17 → **13.3.12**
- `@angular/compiler`: 12.2.17 → **13.3.12**
- `@angular/core`: 12.2.17 → **13.3.12**
- `@angular/forms`: 12.2.17 → **13.3.12**
- `@angular/platform-browser`: 12.2.17 → **13.3.12**
- `@angular/platform-browser-dynamic`: 12.2.17 → **13.3.12**
- `@angular/router`: 12.2.17 → **13.3.12**

### Angular DevKit
- `@angular-devkit/build-angular`: 12.2.17 → **13.3.11**
- `@angular/cli`: 12.2.17 → **13.3.11**
- `@angular/compiler-cli`: 12.2.17 → **13.3.12**
- `@angular/language-service`: 12.2.17 → **13.3.12**

### TypeScript
- `typescript`: 4.3.5 → **4.4.4**

**Nota:** Se usó TypeScript 4.4.4 en lugar de 4.6.4 por incompatibilidades con ionicons v5 (incluido en Ionic 5.9.4).

## Breaking Changes Resueltos

### 1. Formato de loadChildren Deprecado

**Error Original:**
```
error TS2322: Type 'string' is not assignable to type 'LoadChildrenCallback'.
```

**Solución:**
Angular 13 elimina el soporte para lazy loading con strings. Se debe usar el formato de función arrow con `import()`.

**Antes (Angular 12):**
```typescript
{
  path: 'auth',
  loadChildren: './pages/auth/auth.module#AuthPageModule'
}
```

**Después (Angular 13):**
```typescript
{
  path: 'auth',
  loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
}
```

### 2. Conflictos de Tipos con ionicons (TS2320)

**Error Original:**
```
error TS2320: Interface 'HTMLIonIconElement' cannot simultaneously extend types 'IonIcon' and 'HTMLStencilElement'.
Named property 'ariaHidden' of types 'IonIcon' and 'HTMLStencilElement' are not identical.
```

**Solución:**
Agregar `skipLibCheck: true` en tsconfig.json para omitir verificación de tipos en node_modules. Esto es necesario porque ionicons v5 (incluido en Ionic 5) tiene incompatibilidades con TypeScript 4.4+.

**Archivo:** [tsconfig.json](tsconfig.json)

```diff
"compilerOptions": {
  "baseUrl": "./",
  "outDir": "./dist/out-tsc",
  "sourceMap": true,
  "declaration": false,
  "module": "esnext",
  "moduleResolution": "node",
  "emitDecoratorMetadata": true,
  "experimentalDecorators": true,
  "importHelpers": true,
  "target": "es2015",
+ "skipLibCheck": true,
  "typeRoots": [
    "node_modules/@types"
  ],
```

## Modificaciones de Código

### Archivos Modificados

1. **package.json**
   - Actualización de todas las dependencias de Angular a 13.3.12/13.3.11
   - TypeScript actualizado a 4.4.4
   - Eliminadas dependencias @angular-devkit/architect, core y schematics (no existen en v13)

2. **src/app/app-routing.module.ts**
   - Convertidos todos los `loadChildren` al formato arrow function
   - 4 rutas actualizadas: auth, home, confirm, forgot

3. **src/app/pages/home/home-routing.module.ts**
   - Convertidos 22 `loadChildren` al formato arrow function
   - Rutas actualizadas: dashboard, clases, reservations, plans, profile
   - Todas las rutas child también actualizadas

4. **tsconfig.json**
   - Agregado `"skipLibCheck": true` para omitir verificación en bibliotecas

## Resultados de Compilación

### Build Exitoso
```
✔ Browser application bundle generation complete.
✔ Copying assets complete.
✔ Index html generation complete.

Build at: 2026-01-25T00:20:31.664Z
Hash: 00c587798a20581e
Time: 34769ms (34.8 segundos)
```

### Estadísticas de Bundle

**Initial Chunks:**
- main.js: 555.61 kB (144.98 kB transferencia)
- styles.css: 45.70 kB (7.25 kB transferencia)
- polyfills.js: 45.28 kB (13.86 kB transferencia)
- runtime.js: 3.29 kB (1.52 kB transferencia)
- **Total:** 649.88 kB (167.61 kB transferencia)

**Lazy Chunks:**
- 79 módulos lazy-loaded
- Dashboard: 562.94 kB (110.93 kB transferencia)
- Swiper bundle: 97.16 kB (23.42 kB transferencia)

### Warnings

**CSS Selector Warnings (Ionic RTL):**
- 10 reglas CSS `:host-context([dir=rtl])` generan warnings
- No afectan funcionalidad

**TypeScript Unused Files:**
- 5 archivos marcados como "unused" (esperado en lazy loading)

**CommonJS Dependencies:**
- chart.js usa CommonJS (esperado, se optimizará en fases posteriores)

## Compatibilidad

### Entorno de Desarrollo
- ✅ Node.js: v22.21.1 (con `NODE_OPTIONS=--openssl-legacy-provider`)
- ✅ npm: Compatible
- ✅ Windows: Funcionando correctamente

### Stack Actual
- ✅ Ionic: 5.9.4
- ✅ Angular: **13.3.12**
- ✅ Capacitor: 3.9.0
- ✅ TypeScript: **4.4.4**

## Vulnerabilidades de Seguridad

```
47 vulnerabilities (7 low, 11 moderate, 26 high, 3 critical)
```

**Nota:** Vulnerabilidades reducidas de 91 a 47. Se resolverán progresivamente en las siguientes fases.

## Próximos Pasos

### Fase 5b: Angular 13 → 14
- Actualizar a Angular 14.3.0
- TypeScript → ~4.6.4 (requiere actualizar Ionic a v6)
- Resolver nuevos breaking changes

## Notas Técnicas

### Breaking Changes de Angular 13

1. **Lazy Loading con import():**
   - Formato string completamente eliminado
   - Obligatorio usar funciones arrow con dynamic imports
   - Mejora tree-shaking y code splitting

2. **View Engine Removido:**
   - Solo Ivy disponible (ya migrado en fases anteriores)

3. **Angular Package Format (APF) v13:**
   - Nueva estructura de distribución de paquetes
   - Mejor soporte para ES modules

4. **skipLibCheck Necesario:**
   - Por incompatibilidades de ionicons v5 con TypeScript moderno
   - Se resolverá al migrar a Ionic 6 (incluye ionicons v6)

### Comandos Utilizados

```bash
# Instalación de dependencias
npm install

# Build de producción
npm run build

# Build con legacy OpenSSL (Node 22)
set NODE_OPTIONS=--openssl-legacy-provider && ng build
```

### Rutas Actualizadas

**app-routing.module.ts:**
- `/auth`
- `/home`
- `/confirm`
- `/forgot`

**home-routing.module.ts:**
- `/home/tabs/dashboard`
- `/home/tabs/clases` (+ 7 child routes)
- `/home/tabs/plans` (+ 4 child routes)
- `/home/tabs/profile`

---

**Estado:** ✅ COMPLETADA
**Build:** ✅ EXITOSO
**Tiempo de Build:** 34.8 segundos
**Próxima Fase:** Fase 5b - Angular 13 → 14 + Ionic 5 → 6
