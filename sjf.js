export function sjf(processes) {
  const n = processes.length;
  let time = 0;
  let completed = 0;
  let visited = Array(n).fill(false);
  let gantt = [], totalWT = 0, totalTAT = 0;

  const sorted = processes.map(p => ({ ...p })).sort((a, b) => a.arrivalTime - b.arrivalTime);

  while (completed < n) {
    let idx = -1;
    let minBT = Number.MAX_VALUE;

    for (let i = 0; i < n; i++) {
      if (!visited[i] && sorted[i].arrivalTime <= time && sorted[i].burstTime < minBT) {
        minBT = sorted[i].burstTime;
        idx = i;
      }
    }

    if (idx === -1) {
      time++;
    } else {
      const start = time;
      const end = start + sorted[idx].burstTime;
      time = end;

      const tat = end - sorted[idx].arrivalTime;
      const wt = tat - sorted[idx].burstTime;

      gantt.push({ 
        pid: sorted[idx].pid, 
        start, 
        end, 
        burst: sorted[idx].burstTime,
        arrival: sorted[idx].arrivalTime,
        wt, tat 
      });

      totalWT += wt;
      totalTAT += tat;
      visited[idx] = true;
      completed++;
    }
  }

  return {
    gantt,
    averageWT: (totalWT / n).toFixed(2),
    averageTAT: (totalTAT / n).toFixed(2),
  };
}