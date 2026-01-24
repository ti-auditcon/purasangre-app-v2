# FASE 0: Preparación y Auditoría

## Objetivo
Preparar el proyecto y establecer una base sólida antes de comenzar la migración.

---

## Checklist

### 1. Control de Versiones
- [ ] Crear rama de migración: `git checkout -b migration/ionic-8`
- [ ] Crear tag del estado actual: `git tag -a v0-pre-migration -m "Estado antes de migración"`
- [ ] Hacer commit del estado actual
- [ ] Crear backup del proyecto completo

### 2. Auditoría del Proyecto
- [ ] Revisar y documentar todas las dependencias actuales
- [ ] Identificar plugins de Cordova en uso
- [ ] Listar componentes de Ionic Native
- [ ] Identificar código personalizado que pueda verse afectado
- [ ] Documentar APIs deprecadas en uso

### 3. Instalación de Herramientas
```bash
# Actualizar npm a la última versión
npm install -g npm@latest

# Instalar herramientas útiles para la migración
npm install -g @ionic/cli@latest
npm install -g @angular/cli@latest
npm install -g npm-check-updates
```

### 4. Análisis de Dependencias
```bash
# Ver dependencias desactualizadas
npm outdated

# Generar reporte de dependencias
npm list --depth=0 > dependencias-antes.txt
```

### 5. Limpiar Proyecto
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules
rm package-lock.json
npm install

# Limpiar caché
npm cache clean --force
```

### 6. Testing Inicial
- [ ] Ejecutar `npm run build` - verificar que compila
- [ ] Ejecutar `npm test` - verificar tests actuales
- [ ] Ejecutar la app en navegador: `ionic serve`
- [ ] Ejecutar la app en Android (si es posible)
- [ ] Ejecutar la app en iOS (si es posible)
- [ ] Documentar funcionalidades principales a verificar después de cada migración

### 7. Documentación de Estado Actual
Crear archivo `ESTADO-ACTUAL.md` con:
- Versiones de todas las dependencias principales
- Funcionalidades principales de la app
- Problemas conocidos
- Configuraciones especiales
- Variables de entorno
- Integraciones externas (Firebase, APIs, etc.)

---

## Problemas Identificados Actualmente

### ⚠️ Versiones Inconsistentes de Angular
```json
"@angular/animations": "^8.2.14",
"@angular/common": "~8.1.2",
"@angular/core": "~11.0.5",     // ← Versión diferente
"@angular/forms": "~8.1.2",
```
**Acción**: Esto se resolverá en la Fase 1 (Normalización)

---

## Comandos Útiles

```bash
# Ver versión de Ionic CLI
ionic --version

# Ver información del proyecto
ionic info

# Ver estructura del proyecto
npm run ng -- version
```

---

## Criterios de Éxito
✅ Proyecto compila sin errores
✅ Aplicación funciona correctamente en estado actual
✅ Backup creado
✅ Documentación de estado actual completa
✅ Rama de migración creada

---

## Tiempo Estimado
⏱️ 2-4 horas

---

## Siguiente Paso
➡️ `02-normalizacion-angular.md`
