import dayjs from 'dayjs';

export const downloadFile = (data: object[], fileName: string = 'file.csv') => {
  if (!Array.isArray(data) || data.length === 0) {
    console.warn('No hay datos para exportar');
    return;
  }

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map((row) =>
      headers
        .map((field) => {
          const cell = row[field as keyof typeof row];
          const escaped = String(cell).replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(',')
    ),
  ];

  const csvContent = csvRows.join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `downloaded_${dayjs(new Date()).format(
    'DD/MM/YYYY'
  )}_${fileName}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
