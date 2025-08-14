// Hook utilitário para converter timestamp em dia da semana
export function useWeekday() {
  return (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("pt-BR", {
      weekday: "short",
      day: "numeric",
    });
  };
}
