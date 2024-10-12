import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Button } from 'react-bootstrap';

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Ejemplo de eventos
  const events = [
    {
      id: 1,
      title: 'Monitoría de Programación Avanzada',
      description: 'Monitoría sobre temas avanzados en programación. Incluye estructura de datos y algoritmos complejos.',
      start: new Date(2024, 9, 9, 14, 0),
      end: new Date(2024, 9, 9, 16, 0),
      location: 'Aula 303, Edificio A',
    },
    {
      id: 2,
      title: 'Escuela de Formación en Matemáticas',
      description: 'Sesión enfocada en cálculo diferencial e integral. Preparación para exámenes finales.',
      start: new Date(2024, 9, 11, 10, 0),
      end: new Date(2024, 9, 11, 12, 0),
      location: 'Aula 101, Edificio B',
    },
  ];

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);  // Guardar el evento seleccionado
    setShowModal(true);  // Mostrar modal
  };

  const handleCloseModal = () => {
    setShowModal(false);  // Cerrar modal
    setSelectedEvent(null);  // Limpiar selección
  };

  return (
    <div style={{ height: '500px', margin: '20px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}  // Detectar clic en evento
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
        }}
      />

      {selectedEvent && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedEvent.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Descripción:</strong> {selectedEvent.description}</p>
            <p><strong>Fecha y hora:</strong> {moment(selectedEvent.start).format('LLL')} - {moment(selectedEvent.end).format('LLL')}</p>
            <p><strong>Ubicación:</strong> {selectedEvent.location}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Calendario;
