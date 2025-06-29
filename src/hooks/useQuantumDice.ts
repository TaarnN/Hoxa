// useQuantumDice.ts
export function useQuantumDice(sides = 6) {
  return () =>
    new Promise<number>((resolve) => {
      setTimeout(() => {
        const result = Math.floor(Math.random() * sides) + 1;
        resolve(result);
      }, Math.random() * 1000);
    });
}
