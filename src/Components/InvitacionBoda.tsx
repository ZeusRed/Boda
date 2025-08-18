import React, { useEffect, useRef, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import selloOro from "../assets/sello.png";
import floresBoda from "../assets/flores2.png";
import "./InvitacionBoda.css";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
// import thyears from "../musica/thyears.mp3";
import thyears from "../musica/woodland.mp3"; // Asegúrate de que la ruta sea correcta
export interface FamiliaMember {
  nombre: string;
  boletosAsignados: number;
}

export interface SeleccionState {
  nombreSeleccionado: string | null;
  boletosSeleccionados: number;
  totalDisponible: number;
}
export const familiaData: FamiliaMember[] = [
  // { nombre: "EDITH VELA TORRES", boletosAsignados: 6 },
  // { nombre: "JOSE LUIS VELA TORRES", boletosAsignados: 3 },
  // { nombre: "PABLO LIMA", boletosAsignados: 4 },
  // { nombre: "YADIRA LIMA VELA", boletosAsignados: 4 },
  // { nombre: "VERO LIMA VELA", boletosAsignados: 2 },
  // { nombre: "MONICA LIMA VELA", boletosAsignados: 4 },
  // { nombre: "ANTONIA VELA DIAZ", boletosAsignados: 5 },
  // { nombre: "ENRIQUE ASENCION VELA", boletosAsignados: 4 },
  // { nombre: "REYNA VELA DIAZ", boletosAsignados: 2 },
  // { nombre: "ANAHI SOSA VELA", boletosAsignados: 2 },
  // { nombre: "VICENTE SOSA ORTEGA", boletosAsignados: 2 },
  // { nombre: "SELENE PEDRAZA SOSA", boletosAsignados: 6 },
  // { nombre: "ARACELY LEON", boletosAsignados: 2 },
  // { nombre: "ANTONIO PONCE LOPEZ", boletosAsignados: 1 },
  // { nombre: "YADIRA HERNANDEZ", boletosAsignados: 1 },
  // { nombre: "KAREN SALGADO", boletosAsignados: 2 },
  // { nombre: "ANALLELY GUZMÁN CASTRO", boletosAsignados: 3 },
  //   { nombre: "VALERIA LAPELUZ", boletosAsignados: 3 },
  // { nombre: "IBETH SOSA VELA", boletosAsignados: 5 },
  { nombre: "SIMON MUÑOZ", boletosAsignados: 1 },
  { nombre: "JORGE MUÑOZ", boletosAsignados: 4 },
  { nombre: "OSCAR SALAS", boletosAsignados: 2 },
  { nombre: "MARTIN SALAS", boletosAsignados: 1 },
  { nombre: "ISRA GARCIA", boletosAsignados: 1 },
  { nombre: "CELINE GARCIA", boletosAsignados: 1 },
  { nombre: "ALBERTO ROJAS", boletosAsignados: 3 },
  { nombre: "YESSENIA CRUZ", boletosAsignados: 1 },
  { nombre: "JONATHAN REYES", boletosAsignados: 1 },
];
const InvitacionBoda: React.FC = () => {
  const toast = React.useRef<Toast>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null); // ✅ tipado correcto
  const [abierta, setAbierta] = useState(false);
  const [modalConfirmar, setModalConfirmar] = useState(false);
  const [nombre, setNombre] = useState<string>("");
  const vigencia = new Date("2025-08-31"); // Fecha límite para confirmar asistencia
  const [isPlaying, setIsPlaying] = useState(false);
  const [boletosOptions, setBoletosOptions] = useState<
    { label: string; value: number }[]
  >([]);
  const [boletosSeleccionados, setBoletosSeleccionados] = useState<number>(0);

  const nombresOptions = familiaData.map((miembro) => ({
    label: `${miembro.nombre} (${miembro.boletosAsignados} disponibles)`,
    value: miembro.nombre,
    boletos: miembro.boletosAsignados,
  }));

  const handleNombreChange = (e: { value: string }) => {
    const miembroSeleccionado = nombresOptions.find(
      (opt) => opt.value === e.value
    );
    setNombre(e.value);

    if (miembroSeleccionado) {
      // Genera opciones desde 0 hasta el total de boletos asignados
      const nuevasOpciones = Array.from(
        { length: miembroSeleccionado.boletos + 1 },
        (_, i) => ({ label: i.toString(), value: i })
      );

      setBoletosOptions(nuevasOpciones);
      setBoletosSeleccionados(0); // Reinicia la selección
    }
  };

  const handleModalCondfirmar = () => {
    const phoneNumber = "5215951062215"; //"525572754139"; 
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
    const whatsappMessage = `Asistencia Confirmada:\nNombre: ${nombre}
    confirmaste ${boletosSeleccionados} boletos\n\n¡Gracias por confirmar tu asistencia! Estamos emocionados de celebrar este día especial contigo.\n\nDetalles del evento:\nFecha: 13 de Septiembre 2025\nHora: 3:30 P.M\nDirección: Calle Valle de Bravo Manzana AT Lote 2, Lomas de Tecamac, 55765.(https://maps.app.goo.gl/7CEDDCMvFm3nfuY59)\n\n¡Nos vemos pronto!!!! \n\nSaludos,\nFanny & Reynaldo\n\n*Este mensaje es automático, por favor no respondas.
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
        style={{ width: "400px" }} // Aumenté un poco el ancho
        modal
        onHide={() => setModalConfirmar(false)}
      >
        <div className="flex flex-column gap-3">
          <p>
            Selecciona tu nombre y la cantidad de boletos para confirmar
            asistencia.
          </p>

          <div className="p-field">
            <label htmlFor="nombre">Nombre:</label>
            <Dropdown
              id="nombre"
              value={nombre}
              options={nombresOptions}
              onChange={handleNombreChange}
              placeholder="Selecciona tu nombre"
              className="w-full"
            />
          </div>

          {nombre && (
            <div className="p-field">
              <label htmlFor="boletos">Boletos a usar:</label>
              <Dropdown
                id="boletos"
                value={boletosSeleccionados}
                options={boletosOptions}
                onChange={(e) => setBoletosSeleccionados(e.value)}
                placeholder="Selecciona cantidad"
                className="w-full"
              />
            </div>
          )}

          <div
            className="flex justify-content-end gap-2"
            style={{ marginTop: "1rem" }}
          >
            <Button
              label="Cancelar"
              icon="pi pi-times"
              className="p-button-secondary"
              onClick={() => setModalConfirmar(false)}
            />
            <Button
              label="Confirmar"
              icon="pi pi-check"
              className="p-button-success"
              onClick={handleModalCondfirmar}
              disabled={!nombre || boletosSeleccionados === 0}
              tooltip={
                !nombre
                  ? "Selecciona un nombre"
                  : boletosSeleccionados === 0
                  ? "Selecciona la cantidad de boletos"
                  : ""
              }
              tooltipOptions={{ position: "top" }}
            />
          </div>
        </div>
      </Dialog>
    );
  };
  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };
  const restartSong = () => {
    const audio = audioRef.current;
    if (!audio) return; // Asegúrate de que el audio esté definido
    audio.currentTime = 0; // Reinicia el tiempo de reproducción a 0
    if (!isPlaying) {
      audio.play(); // Si estaba en pausa, comienza a reproducir
      setIsPlaying(true);
    }
  };
  //play audio al abrir la invitación
  useEffect(() => {
    if (abierta && audioRef.current && vigencia >= new Date()) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [abierta]);
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
              <h2>
                Fanny <p>&</p> Reynaldo
              </h2>
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
            {vigencia < new Date() ? (
              <div className="mensaje-vigencia">
                <h1>Confirmación Expirada!</h1>
                <p>
                  La fecha límite para confirmar asistencia ha pasado. Gracias
                  por tu interés, te esperamos en la celebración de la Iglesia.
                </p>
                <Button
                  label="Cerrar invitación"
                  icon="pi pi-times"
                  className="p-button-primary p-button-raised p-5 mt-5"
                  onClick={() => setAbierta(false)}
                />
              </div>
            ) : (
              <div className="contenido-centro">
                <h1>
                  Fanny <p>&</p> Reynaldo
                </h1>
                <p>Junto a nuestros padres</p>

                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <div style={{ width: "50%", padding: "0 1px" }}>
                    <h3>
                      Reyna Vela
                      <br /> Vicente Sosa{" "}
                    </h3>
                  </div>
                  <div style={{ width: "50%", padding: "0 1px" }}>
                    <h3>
                      {" "}
                      Graciela Rivera <br /> Reynaldo Mejía{" "}
                    </h3>
                  </div>
                </div>

                <p>Tenemos el honor de invitarles</p>
                <p>a celebrar nuestra unión matrimonial civil</p>

                <div className="detalles" style={{ marginBottom: "2rem" }}>
                  <p>Sábado, 13 de Septiembre 2025</p>
                  <p>Hora: 3:30 P.M</p>
                  <p>Lugar:</p>
                  <div className="flex align-items-center gap-2 mt-2 mb-4">
                    <i className="pi pi-map-marker text-primary"></i>
                    <a
                      href="https://maps.app.goo.gl/7CEDDCMvFm3nfuY59"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary  font-medium mb-6"
                      style={{ margin: "0.5rem" }}
                    >
                      {/* Calle Valle de Bravo Manzana AT Lote 2,Lomas de
                      Tecamac,55765. */}
                      Salón de fiestas la Lunita
                    </a>
                  </div>
                  <p>Código de vestimenta opcional -FIESTA MEXICANA-</p>
                </div>
                <div className="flex justify-content-center">
                  <Button
                    icon={isPlaying ? "pi pi-pause" : "pi pi-play"} // Cambia el ícono según el estado
                    className="p-button-rounded p-button-success" // Estilo redondo
                    style={{
                      backgroundColor: "#2196F3",
                      borderColor: "#2196F3",
                    }}
                    onClick={togglePlay} // Maneja el clic
                  />
                  <Button
                    icon="pi pi-refresh" // Ícono de reiniciar
                    className="p-button-rounded p-button-danger" // Estilo redondo y color rojo
                    onClick={restartSong} // Maneja el clic
                  />
                  <audio ref={audioRef}>
                    <source src={thyears} type="audio/mpeg" />
                    Tu navegador no soporta el elemento de audio.
                  </audio>
                </div>
                <div className="flex justify-content-center">
                  <p>
                    Fecha limite de confirmación el 31 de agosto del 2025!!!!!
                  </p>
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
            )}
          </Card>
        )}
      </div>
    </>
  );
};

export default InvitacionBoda;
