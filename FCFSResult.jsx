import React from 'react';

function FCFSResult({ processes }) {
  if (processes.length === 0) return null;

  const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  let time = 0;
  const results = sorted.map((p) => {
    const start = Math.max(time, p.arrivalTime);
    const finish = start + p.burstTime;
    const tat = finish - p.arrivalTime;
    const wt = tat - p.burstTime;
    time = finish;
    return {
      ...p,
      start,
      finish,
      tat,
      wt
    };
  });

  const avgWT = (results.reduce((a, b) => a + b.wt, 0) / results.length).toFixed(2);
  const avgTAT = (results.reduce((a, b) => a + b.tat, 0) / results.length).toFixed(2);

  return (
    <div className="fcfs-result">
      <h3>FCFS Scheduling Result</h3>
      <table>
        <thead>
          <tr>
            <th>PID</th>
            <th>AT</th>
            <th>BT</th>
            <th>Start</th>
            <th>Finish</th>
            <th>TAT</th>
            <th>WT</th>
          </tr>
        </thead>
        <tbody>
          {results.map((p, i) => (
            <tr key={i}>
              <td>{p.pid}</td>
              <td>{p.arrivalTime}</td>
              <td>{p.burstTime}</td>
              <td>{p.start}</td>
              <td>{p.finish}</td>
              <td>{p.tat}</td>
              <td>{p.wt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p><strong>Average Waiting Time:</strong> {avgWT}</p>
      <p><strong>Average Turnaround Time:</strong> {avgTAT}</p>

      <div className="gantt-chart">
        <h4>Gantt Chart</h4>
        <div style={{ display: 'flex' }}>
          {results.map((p, i) => (
            <div
              key={i}
              style={{
                padding: '10px',
                border: '1px solid black',
                background: '#cce5ff',
                marginRight: '2px',
                textAlign: 'center'
              }}
            >
              {p.pid}
              <div style={{ fontSize: '10px' }}>{p.start} - {p.finish}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FCFSResult;
