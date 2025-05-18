
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

- Funcionalidades
* Permite visualizar transacciones consumiendo una API externa
* Permite filtras las transacciones por fechas, tarjetas, cuotas, monto y metodo de cobro, ademas seleccionando dos o mas opciones. 
* Permite filtrar por semana, mes y día.
* Permite exportar las transacciones a un archivo con formato CSV
* Permite general un grafico de las transacciones filtradas por mes y semana (desde el dia inicial, hasta la fecha actual), el grafico muestra el numero de transacciones y el monto total por día.

- Testing con Jest
- Correr test
npx jest

* Valida que los datos de las transacciones mostrados sean los correctos
* Validamos que renderice multiples trasacciones
* Valida que en el caso que no haya transacciones, muestres la vista de "No hay resultados que mostrar.."
* Valida que el skeleton de transacciones se muestre cuando la consulta se esta haciendo (loading)
* Valida que se muestres lo metodos de pago guardados en el Store

- Posibles mejoras a futuro

Autenticación de usuario con OAuth o JWT.
Persistencia local (LocalStorage) para cachear datos y mejorar performance.
