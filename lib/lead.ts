// lib/lead.ts

export function leadCode(id: number) {
  return `LED-${id.toString().padStart(5, "0")}`;
}

export function leadColor(status: string) {
  switch (status) {
    case "NEW":
      return "blue";

    case "CONTACTED":
      return "orange";

    case "FOLLOW_UP":
      return "yellow";

    case "QUALIFIED":
      return "green";

    case "WON":
      return "emerald";

    case "LOST":
      return "red";

    default:
      return "gray";
  }
}