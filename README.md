
- Clona el repositorio:
git clone https://github.com/cristianlunachavarro/challenge-uala.git
cd transactions-dashboard

- Instala dependencias:
npm install

- Ejecuta el proyecto:
npm run dev

- Arquitectura utilizada
src/
│
├── api/               # Lógica de llamadas a APIs
├── assets/            # Imagenes
├── components/        # Componentes reutilizables de UI
├── hooks/             # Hooks personalizados
├── pages/             # Páginas principales de la app
├── store/             # Estados globales de la app
└── types/             # Definiciones TypeScript
└── utils/             # Funciones ts


React con TypeScript como base de desarrollo.

TailwindCSS para estilos rápidos y responsivos.

Dayjs para el formateo de fechas.

Exportación a CSV implementada manualmente sin dependencias externas.

Skeletons animados para mejorar la experiencia mientras se carga la data.


- Posibles mejoras a futuro

Autenticación de usuario con OAuth o JWT.

Gráficas de ingresos con librerías como Recharts o Chart.js.

Persistencia local (LocalStorage) para cachear datos y mejorar performance.