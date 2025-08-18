import React, { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import selloOro from "../assets/sello.png";
import floresBoda from "../assets/flores2.png";
import "./InvitacionBoda.css";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

const InvitacionBoda: React.FC = () => {
  const toast = React.useRef<Toast>(null);
  const [abierta, setAbierta] = useState(false);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [nombre, setNombre] = useState<string>("");
  const handleModalCondfirmar = () => {
    const phoneNumber = "525572754139"; //"5215951062215";
    if (toast.current) {
      toast.current.show({
        severity: "success",
        summary: "Asistencia Confirmada",
        detail:
          "¡Gracias por confirmar tu asistencia!.Enviaremos un whatsapp con más detalles.",
        life: 3000,
      });
    }
    // Aquí podrías agregar la lógica para enviar un mensaje de WhatsApp
    const whatsappMessage = `Asistencia Confirmada:\nNombre: ${nombre}\n\n¡Gracias por confirmar tu asistencia! Estamos emocionados de celebrar este día especial contigo.\n\nDetalles del evento:\nFecha: 13 de Septiembre 2025\nHora: 3:30 P.M\nDirección: Calle Valle de Bravo Manzana AT Lote 2, Lomas de Tecamac, 55765.(https://maps.app.goo.gl/7CEDDCMvFm3nfuY59)\n\n¡Nos vemos pronto!!!! \n\nSaludos,\nFanny & Reynaldo\n\n*Este mensaje es automático, por favor no respondas.
    `;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    const newWindow = window.open(url, "_blank");

    // Cerrar después de unos segundos (no siempre funciona)
    setTimeout(() => {
      if (newWindow && !newWindow.closed) newWindow.close();
    }, 1000);
    setTimeout(() => setModalConfirmar(false), 1000);
    setNombre(""); // Limpia el nombre después de confirmar
    setAbierta(false); // Cierra la invitación después de confirmar
  };
  const openModalConfirmar = () => {
    setModalConfirmar(true);
  };
  const modalConf = () => {
    return (
      <Dialog
        header="Confirmar Asistencia"
        visible={abierta}
        style={{ width: "350px" }}
        modal
        onHide={() => setModalConfirmar(false)}
      >
        <p>
          Para confirmar su asistencia escribe su nombre para que podamos contar
          con su asistencia.
        </p>
        <InputText
          type="text"
          placeholder="Tu nombre"
          className="input-nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ width: "100%" }}
        />
        <div
          className="botones"
          style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}
        >
          <Button
            label="Confirmar"
            icon="pi pi-check"
            className="p-button-success"
            onClick={handleModalCondfirmar}
          />
          <Button
            label="Cancelar"
            icon="pi pi-times"
            className="p-button-secondary"
            onClick={() => setModalConfirmar(false)}
          />
        </div>
      </Dialog>
    );
  };
  return (
    <>
      {modalConfirmar && modalConf()}
      <div className={`invitacion-pagina ${abierta ? "abierta" : ""}`}>
        {!abierta ? (
          <Card
            className="carta-cerrada-prime"
            onClick={() => setAbierta(true)}
          >
            <div className="sello-contenedor">
              <img src={selloOro} alt="Sello" className="sello" />
              <div className="texto-sello">Nuestro Matrimonio Civil</div>
            </div>
            <div className="flores-inferiores">
              <img src={floresBoda} alt="Flores" />
            </div>
            <div className="info-novios">
              <h2>Fanny  <p>&</p> Reynaldo</h2>
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
              <h1>Fanny <p>&</p> Reynaldo</h1>
              <p>Junto a nuestros padres</p>

              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div style={{ width: "50%", padding: "0 1px" }}>
                  <h3>
                    Reyna Vela 
                    <br /> Vicente Sosa {" "}
                  </h3>
                </div>
                <div style={{ width: "50%", padding: "0 1px" }}>
                  <h3>
                    {" "}
                    Graciela Rivera <br /> Reynaldo Mejía {" "}
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
                    Calle Valle de Bravo Manzana AT Lote 2,Lomas de
                    Tecamac,55765.
                  </a>
                </div>
                  <p>Código de vestimenta opcional -FIESTA MEXICANA-</p>
              </div>
              <div className="flex justify-content-center">
                <Button
                  label="Confirmar Asistencia"
                  icon="pi pi-envelope"
                  className="p-button-secondary p-button-raised p-5"
                  style={{ marginBottom: "1rem" }}
                  onClick={openModalConfirmar}
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
    </>
  );
};

export default InvitacionBoda;