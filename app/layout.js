import './globals.css';

export const metadata = {
  title: 'BAM Admin',
  description: 'Administrador moderno creado con Next.js y React',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
