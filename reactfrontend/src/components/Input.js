import React, { useState } from 'react';

const Input = () => {
  const [wemeter, setWemeter] = useState('');
  const [busId, setBusId] = useState('');
  const [PF, setPF] = useState('');
  const [kW, setKW] = useState('');
  const [kWh, setKWh] = useState('');
  const [kVArh, setKVArh] = useState('');
  const [oleo, setOleo] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (!wemeter.trim() || !busId.trim() || !PF.trim() || !kW.trim() || !kWh.trim() || !kVArh.trim() || !oleo.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const body = {
        wemeter: parseInt(wemeter),
        bus_id: parseInt(busId),
        payload: {
          PF: parseFloat(PF),
          kW: parseFloat(kW),
          kWh: parseFloat(kWh),
          kVArh: parseFloat(kVArh),
          oleo: parseFloat(oleo)
        }
      };

      const response = await fetch('http://localhost:5000/meter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setSuccessMessage('Dados enviados com sucesso!');
        setError('');
        setWemeter('');
        setBusId('');
        setPF('');
        setKW('');
        setKWh('');
        setKVArh('');
        setOleo('');
      } else {
        const errorMessage = await response.text();
        setError(`Erro ao enviar dados: ${errorMessage}`);
      }
    } catch (err) {
      setError('Ocorreu um erro ao enviar os dados.');
      console.error('Erro ao enviar dados:', err.message);
    }
  };

  return (
    <div>
      <h1>Enviar Dados</h1>
      <form onSubmit={onSubmitForm}>
        <div>
          <label>
            WeMeter:
            <input
              type="number"
              value={wemeter}
              onChange={(e) => setWemeter(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Bus ID:
            <input
              type="number"
              value={busId}
              onChange={(e) => setBusId(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            PF:
            <input
              type="number"
              value={PF}
              onChange={(e) => setPF(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            kW:
            <input
              type="number"
              value={kW}
              onChange={(e) => setKW(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            kWh:
            <input
              type="number"
              value={kWh}
              onChange={(e) => setKWh(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            kVArh:
            <input
              type="number"
              value={kVArh}
              onChange={(e) => setKVArh(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Óleo:
            <input
              type="number"
              value={oleo}
              onChange={(e) => setOleo(e.target.value)}
            />
          </label>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
        <button type="submit">Enviar Dados</button>
      </form>
    </div>
  );
};

export default Input;
