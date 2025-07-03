import React from 'react'; 
import "../../../styles/comprasdetalles.css";

const ComprasDetalles = () => {
  return (
    <section className="admin-compras-wrapper">
      <section className="compra-admin">
        <header className="compra-header">
          <h2>Compras Administrador</h2>
        </header>

        <article className="detalle-compra">
          <h3>Detalles de Compras</h3>

          <div className="usuario-info">
            <img
              src="https://i.imgur.com/1Q9Z1Z1.png"
              alt="Foto del usuario"
              className="foto-usuario"
            />
            <div className="datos-usuario">
              <p><strong>Martina Gutierrez</strong></p>
              <p>martinagutinf1@gmail.com</p>
            </div>
            <div className="contacto-usuario">
              <p><strong>Teléfonos</strong></p>
              <p>2281 391092</p>
            </div>
          </div>

          <div className="detalle-servicios">
            <p><strong>Servicios comprados:</strong></p>
            <ul>
              <li><strong>VUELO:</strong> Buenos Aires (Ezeiza) – Brasil, Río de Janeiro | Ida: 12/08/2025, Vuelta: 30/08/2025 | Aerolínea Argentina</li>
              <li><strong>HOTEL:</strong> Hilton, 1 noche(s), Brasil, Río de Janeiro</li>
              <li><strong>AUTO:</strong> Ford 1.3 días, Brasil, Río de Janeiro</li>
              <li><strong>PAQUETE:</strong> Tulum, México | Relax</li>
            </ul>
            <p><strong>Fecha y hora de la compra:</strong> 12/08/2025 – 16:43hs Sábado</p>
            <p><strong>Total Pagado:</strong> $3.045.350 ARS</p>
            <p><strong>Número de operación:</strong> N°3554</p>
            <p><strong>Estado de la compra:</strong> Pagado</p>
          </div>
        </article>
      </section>
    </section>
  );
};

export default ComprasDetalles;
