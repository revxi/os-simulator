export function roundRobin(processes, quantum = 2) {
  const n = processes.length;
  const queue = [];
  const remaining = processes.map(p => ({ ...p, remaining: p.burstTime }));
  const gantt = [];

  let time = 0;
  let index = 0;
  let completed = 0;

  remaining.sort((a, b) => a.arrivalTime - b.arrivalTime);

  const arrived = (t) => remaining.filter(p => !p.done && p.arrivalTime <= t && !queue.includes(p));

  while (completed < n) {
    // Enqueue newly arrived
    arrived(time).forEach(p => queue.push(p));

    const current = queue.shift();
    if (!current) {
      time++;
      continue;
    }

    const executionTime = Math.min(quantum, current.remaining);
    gantt.push({
      pid: current.pid,
      start: time,
      end: time + executionTime
    });

    time += executionTime;
    current.remaining -= executionTime;

    // Enqueue new arrivals after time update
    arrived(time).forEach(p => queue.push(p));

    if (current.remaining > 0) {
      queue.push(current);
    } else {
      current.done = true;
      current.turnaround = time - current.arrivalTime;
      current.waiting = current.turnaround - current.burstTime;
      completed++;
    }
  }

  const averageWT = (remaining.reduce((acc, p) => acc + p.waiting, 0) / n).toFixed(2);
  const averageTAT = (remaining.reduce((acc, p) => acc + p.turnaround, 0) / n).toFixed(2);

  return { gantt, averageWT, averageTAT };
}