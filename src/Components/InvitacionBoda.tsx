import React, { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import selloOro from "../assets/sello.png";
import floresBoda from "../assets/flores1.png";
import "./InvitacionBoda.css";

const InvitacionBoda: React.FC = () => {
  const [abierta, setAbierta] = useState(false);

  return (
    <div className={`invitacion-pagina ${abierta ? "abierta" : ""}`}>
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
          <img
            src={floresBoda}
            alt="Flores arriba derecha"
            className="flores-esquina arriba-derecha"
          />
          <img
            src={floresBoda}
            alt="Flores abajo izquierda"
            className="flores-esquina abajo-izquierda"
          />

          <div className="contenido-centro">
            <h1>Fanny & Reynaldo</h1>
            <p>Junto a nuestras familias</p>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ width: "50%", padding: "0 1px" }}>
                <h3>
                  {" "}
                  Graciela Rivera Lujano <br /> Reynaldo Mejía Cruz{" "}
                </h3>
              </div>
              <div style={{ width: "50%", padding: "0 1px" }}>
                <h3>
                  Reynalda Vela <br /> Vicente Guillermo Sosa{" "}
                </h3>
              </div>
            </div>

            <p>Tenemos el honor de invitarles</p>
            <p>a celebrar nuestra unión matrimonial civil</p>
            <div className="detalles" style={{ marginBottom: "2rem" }}>
              <p>Sábado, 13 de Septiembre 2025</p>
              <p>Hora: 3:30 P.M</p>
              <p>Dirección:</p>
              <div className="flex align-items-center gap-2 mt-2 mb-4">
                <i className="pi pi-map-marker text-primary"></i>
                <a
                  href="https://maps.app.goo.gl/7CEDDCMvFm3nfuY59"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary  font-medium mb-6"
                  style={{ margin: "0.5rem" }}
                >
                  Calle Valle de Bravo Manzana AT Lote 2,Lomas de Tecamac,55765.
                </a>
              </div>
            </div>
            <div className="flex justify-content-center">
              <Button
                label="Confirmar Asistencia"
                icon="pi pi-envelope"
                className="p-button-secondary p-button-raised p-5" style={{ marginBottom: "1rem" }}
                onClick={() => setAbierta(true)}
            
              />
            </div>
            <Button
              label="Cerrar invitación"
              icon="pi pi-times"
              className="p-button-primary p-button-raised p-5 mt-5"
              onClick={() => setAbierta(false)}
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default InvitacionBoda;
