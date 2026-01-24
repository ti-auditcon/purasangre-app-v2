# FASE 2: Ionic 4 → Ionic 5

## Objetivo
Actualizar de Ionic 4.11.8 a Ionic 5.9.x manteniendo Angular 11.

---

## Documentación Oficial
📖 https://ionicframework.com/docs/reference/migration

---

## Pasos de Migración

### 1. Actualizar Ionic Framework
```json
"@ionic/angular": "^5.9.4"
```

### 2. Actualizar Ionic Native
```json
"@ionic-native/core": "^5.36.0",
"@ionic-native/splash-screen": "^5.36.0",
"@ionic-native/status-bar": "^5.36.0",
"@ionic-native/in-app-browser": "^5.36.0"
```

### 3. Actualizar Ionic Storage
```json
"@ionic/storage": "^3.0.6"
```

### 4. Actualizar Ionic Angular Toolkit
```json
"@ionic/angular-toolkit": "^3.1.1"
```

### 5. Instalar Dependencias
```bash
npm install
```

---

## Cambios Breaking en Ionic 5

### 1. Ionic Storage v3
**Cambio**: Nueva API basada en promesas

**Antes:**
```typescript
import { Storage } from '@ionic/storage';

constructor(private storage: Storage) {}

async ngOnInit() {
  await this.storage.ready();
  this.storage.get('key');
}
```

**Después:**
```typescript
import { Storage } from '@ionic/storage-angular';

export class MyComponent {
  private storage: Storage | null = null;

  constructor(private storageService: Storage) {}

  async ngOnInit() {
    this.storage = await this.storageService.create();
    this.storage.get('key');
  }
}
```

**Actualización en AppModule:**
```typescript
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    IonicStorageModule.forRoot()
  ]
})
```

### 2. Cambios en Componentes

#### ion-back-button
**Antes:**
```html
<ion-back-button defaultHref="/"></ion-back-button>
```

**Después (sin cambios, pero verificar funcionamiento)**:
```html
<ion-back-button defaultHref="/"></ion-back-button>
```

#### ion-item
- Verificar que `ion-item` con `button` sigue funcionando
- Revisar slots en items

### 3. Actualizaciones de CSS

#### Variables CSS
Ionic 5 usa más variables CSS. Revisar `theme/variables.scss`:
- Agregar nuevas variables si es necesario
- Verificar colores personalizados

---

## Archivos a Modificar

### 1. src/app/app.module.ts
```typescript
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    // ... otros imports
    IonicStorageModule.forRoot()
  ]
})
```

### 2. Servicios que usan Storage
Actualizar todos los servicios que usen `@ionic/storage`:

**Buscar archivos:**
```bash
grep -r "@ionic/storage" src/
```

**Actualizar cada servicio:**
```typescript
import { Storage } from '@ionic/storage-angular';

export class AuthService {
  private storage: Storage | null = null;

  constructor(private storageService: Storage) {
    this.init();
  }

  async init() {
    this.storage = await this.storageService.create();
  }

  async saveToken(token: string) {
    await this.storage?.set('token', token);
  }

  async getToken() {
    return await this.storage?.get('token');
  }
}
```

---

## Verificar Plugins de Ionic Native

### Plugins a verificar:
- `@ionic-native/splash-screen`
- `@ionic-native/status-bar`
- `@ionic-native/in-app-browser`

**Nota**: Ionic Native está deprecado, pero seguirá funcionando por ahora. Se migrará a Capacitor plugins más adelante.

---

## Testing

### Checklist
- [ ] Compilación exitosa
- [ ] Aplicación inicia correctamente
- [ ] Storage funciona (guardar/leer datos)
- [ ] Navegación funciona
- [ ] Componentes UI se ven correctamente
- [ ] Modales funcionan
- [ ] Alertas funcionan
- [ ] Toasts funcionan
- [ ] Action sheets funcionan
- [ ] Loading controllers funcionan

### Comandos de Prueba
```bash
# Compilar
npm run build

# Servir en navegador
ionic serve

# Build para Android
ionic cap sync android
```

---

## Problemas Comunes

### Error: "Cannot find module '@ionic/storage-angular'"
**Solución**:
```bash
npm install @ionic/storage-angular --save
```

### Error con Ionic Storage v2 a v3
**Solución**: Seguir la guía de migración oficial:
```bash
npm install @ionic/storage-angular@latest
```

### Estilos rotos
**Solución**: Verificar que no se hayan eliminado variables CSS personalizadas.

---

## Criterios de Éxito
✅ Ionic actualizado a v5.9.x
✅ Ionic Storage migrado a v3
✅ Todos los componentes funcionan
✅ Storage funciona correctamente
✅ Build exitoso
✅ App funciona en navegador y dispositivos

---

## Tiempo Estimado
⏱️ 4-8 horas

---

## Commit
```bash
git add .
git commit -m "feat: migrar de Ionic 4 a Ionic 5"
```

---

## Siguiente Paso
➡️ `04-capacitor-1-to-3.md`
