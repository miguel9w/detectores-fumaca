import { ION_PROPERTIES, CHEMICAL_INFO } from "../utils/constants";

export const ChemicalInfo = () => {
  const ion = ION_PROPERTIES;
  const info = CHEMICAL_INFO[ion.symbol];

  return (
    <div className="chemical-info">
      <h2>Identificação Química do Ion</h2>
      <p>
        <strong>Símbolo:</strong> {ion.symbol}
      </p>
      <p>
        <strong>Número Atômico (Z):</strong> {ion.atomicNumber}
      </p>
      <p>
        <strong>Carga:</strong> {ion.charge}
      </p>
      <p>
        <strong>Configuração Eletrônica:</strong> {ion.electronConfiguration}
      </p>
      {info && (
        <div className="applications">
          <h3>Aplicações</h3>
          <ul>
            {info.applications.map((app, index) => (
              <li key={index}>{app}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};