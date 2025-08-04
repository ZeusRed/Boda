import React from 'react';
import InvitacionBoda from './Components/InvitacionBoda';
import 'primereact/resources/themes/saga-blue/theme.css';  // Tema de PrimeReact
import 'primereact/resources/primereact.min.css';          // Estilos base de PrimeReact
import 'primeicons/primeicons.css';                        // Iconos de PrimeIcons
const App: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #f9f5f0 0%, #e8e0d5 100%)',
      padding: '2rem'
    }}>
      <InvitacionBoda />
    </div>
  );
};

export default App;