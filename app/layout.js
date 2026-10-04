import './globals.css';
import './migration.css';
import './revamp.css';

export const metadata = {
  title: 'Qabila Abu Bakr - Seerah Circle',
  description: 'Seerat Circle dashboard for Gulistan-e-Jauhar'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
