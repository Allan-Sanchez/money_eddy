# Money Eddy

Money Eddy es una aplicación híbrida (web y móvil) diseñada para la gestión de préstamos. La aplicación permite el registro de usuarios y préstamos, cálculo de intereses, historial de préstamos, notificaciones y un dashboard con métricas clave.

## Características

- **Registro de Usuarios**: Formulario para ingresar la información personal de los prestatarios (nombre, dirección, teléfono, etc.).
- **Registro de Préstamos**: Formulario para ingresar detalles del préstamo (monto, tasa de interés, plazo, etc.).
- **Cálculo de Intereses**: Funcionalidad para calcular el capital y los intereses basados en la tasa acordada.
- **Historial de Préstamos**: Tabla o lista que muestra todos los préstamos activos y completados.
- **Notificaciones**: Recordatorios para pagos próximos o vencidos.
- **Acceso Seguro**: Mecanismo de autenticación y autorización para proteger la información.
- **Dashboard**: Visualización de métricas clave, como el total de préstamos activos vs. completados, montos prestados mensualmente, ingresos por intereses generados, distribución de préstamos por tasa de interés y próximos pagos pendientes.

## Tecnologías Utilizadas

- **Frontend**: React, Vite, SCSS
- **Backend**: Node.js, Express
- **Base de Datos**: MySQL en AWS RDS
<!-- - **Autenticación**: Amazon Cognito -->
- **Infraestructura**: AWS (Lambda, S3, EC2)
- **Estado Global**: Zustand
- **Data Fetching**: @tanstack/react-query

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Allan-Sanchez/money_eddy.git
   cd money_eddy
