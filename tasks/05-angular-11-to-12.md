# FASE 4: Angular 11 → Angular 12

## Objetivo
Actualizar Angular de v11 a v12.

---

## Documentación Oficial
📖 https://update.angular.io/?l=3&v=11.0-12.0

---

## Pasos de Migración

### 1. Usar Angular Update
```bash
ng update @angular/core@12 @angular/cli@12
```

O manualmente actualizar `package.json`:

```json
"@angular/animations": "~12.2.17",
"@angular/common": "~12.2.17",
"@angular/core": "~12.2.17",
"@angular/forms": "~12.2.17",
"@angular/platform-browser": "~12.2.17",
"@angular/platform-browser-dynamic": "~12.2.17",
"@angular/router": "~12.2.17",
"@angular/compiler": "~12.2.17",
"@angular/compiler-cli": "~12.2.17",
"@angular/language-service": "~12.2.17",
"@angular/cli": "~12.2.18",
"@angular-devkit/build-angular": "~12.2.18"
```

### 2. Actualizar TypeScript
```json
"typescript": "~4.3.5"
```

### 3. Actualizar Zone.js
```json
"zone.js": "~0.11.4"
```

### 4. Instalar
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Cambios Breaking en Angular 12

### 1. Strict Mode por Defecto
Angular 12 habilita strict mode por defecto en nuevos proyectos.

**Verificar `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "strictNullChecks": true
  }
}
```

**Opción**: Si hay muchos errores, temporalmente desactivar:
```json
{
  "compilerOptions": {
    "strict": false
  }
}
```

### 2. Producción por Defecto
El build de producción es ahora el predeterminado:
```bash
ng build  # Equivalente a ng build --prod
```

### 3. Deprecaciones Eliminadas

#### ViewEngine Removido
Angular 12 solo soporta Ivy. Verificar que no haya configuración de ViewEngine.

**Eliminar de `tsconfig.json` si existe:**
```json
"angularCompilerOptions": {
  "enableIvy": false  // ← Eliminar esta línea
}
```

---

## Cambios en el Código

### 1. Null Safety
Con `strictNullChecks` activado, actualizar código:

**Antes:**
```typescript
user: User;

ngOnInit() {
  this.user.name = 'John';  // Error si user puede ser null
}
```

**Después:**
```typescript
user: User | null = null;

ngOnInit() {
  if (this.user) {
    this.user.name = 'John';
  }
}

// O usar non-null assertion (si estás seguro)
this.user!.name = 'John';
```

### 2. Formularios Tipados (Preparación)
Angular 12 introduce formularios reactivos tipados (opcional por ahora):

```typescript
import { FormControl, FormGroup } from '@angular/forms';

// Ahora con tipos
const form = new FormGroup({
  name: new FormControl<string>(''),
  age: new FormControl<number>(0)
});
```

---

## Actualizar angular.json

Verificar configuración en `angular.json`:

```json
{
  "projects": {
    "app": {
      "architect": {
        "build": {
          "options": {
            "buildOptimizer": true,
            "optimization": true,
            "outputHashing": "all",
            "sourceMap": false,
            "namedChunks": false,
            "aot": true,
            "extractLicenses": true,
            "vendorChunk": false
          }
        }
      }
    }
  }
}
```

---

## Actualizar Ionic Angular Toolkit

```json
"@ionic/angular-toolkit": "^5.0.3"
```

---

## Testing

### Compilar
```bash
npm run build
```

### Servir
```bash
ionic serve
```

### Tests
```bash
npm test
```

---

## Verificación

### Checklist
- [ ] Compilación exitosa
- [ ] No hay warnings de deprecación
- [ ] App funciona en navegador
- [ ] Formularios funcionan
- [ ] Routing funciona
- [ ] HTTP requests funcionan
- [ ] Guards funcionan
- [ ] Interceptors funcionan

---

## Problemas Comunes

### Error: "Cannot find module"
**Solución**:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Error: "strictNullChecks"
**Solución temporal**: Desactivar en `tsconfig.json`:
```json
"strictNullChecks": false
```

### Error en tests
**Solución**: Actualizar imports de testing:
```typescript
import { TestBed } from '@angular/core/testing';
```

---

## Criterios de Éxito
✅ Angular actualizado a v12.2.x
✅ TypeScript actualizado a v4.3.x
✅ Build exitoso
✅ App funciona correctamente
✅ Tests pasan

---

## Tiempo Estimado
⏱️ 3-5 horas

---

## Commit
```bash
git add .
git commit -m "feat: migrar Angular de v11 a v12"
```

---

## Siguiente Paso
➡️ `06-ionic-5-to-6.md`
