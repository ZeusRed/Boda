import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import selloOro from '../assets/sello.png';
import floresBoda from '../assets/flores1.png';
import './InvitacionBoda.css';

const InvitacionBoda: React.FC = () => {
  const [abierta, setAbierta] = useState(false);

  return (
    <div className={`invitacion-pagina ${abierta ? 'abierta' : ''}`}>
      {!abierta ? (
        <Card className="carta-cerrada-prime" onClick={() => setAbierta(true)}>
          <div className="sello-contenedor">
            <img src={selloOro} alt="Sello" className="sello" />
            <div className="texto-sello">Nuestro Matrimonio Civil</div>
          </div>
          <div className="flores-inferiores"> 
            <img src={floresBoda} alt="Flores" />
          </div>
          <div className="info-novios">
            <h2>Fanny & Reynaldo</h2>
            <p>13 • 09 • 2025</p>
          </div>
        </Card>
      ) : (
        <Card className="carta-abierta-prime">
          <img src={floresBoda} alt="Flores arriba derecha" className="flores-esquina arriba-derecha" />
          <img src={floresBoda} alt="Flores abajo izquierda" className="flores-esquina abajo-izquierda" />

          <div className="contenido-centro">
            <h1>Fanny & Reynaldo</h1>
            <p>Junto a nuestras familias</p>
            <p>tienen el honor de invitarles</p>
            <p>a celebrar nuestra unión matrimonial</p>

            <div className="detalles">
              <p>Sábado, 13 de Septiembre 2025</p>
              <p>3:30 horas</p>
              <p>....</p>
              <p>Ozumbilla, Tecamac</p>
            </div>

            <Button
              label="Cerrar invitación"
              icon="pi pi-times"
              className="p-button-primary p-button-raised"
              onClick={() => setAbierta(false)}
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default InvitacionBoda;
