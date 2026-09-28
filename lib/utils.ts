const TZ = "America/Chicago"; // server renders in UTC on Vercel, so pin the zone

export function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    timeZone: TZ,
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function dateParts(iso: string) {
  const d = new Date(iso);
  const f = (o: Intl.DateTimeFormatOptions) => d.toLocaleString("en-US", { timeZone: TZ, ...o });
  return {
    day: f({ day: "2-digit" }),
    month: f({ month: "short" }),
    year: f({ year: "numeric" }),
    time: f({ hour: "numeric", minute: "2-digit" }),
  };
}
