export interface CalendarEvent {
  title: string;
  description?: string;
  location?: string;
  startDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm (24h)
  endTime?: string; // HH:mm (24h)
}

function formatICSDate(dateStr: string, timeStr: string): string {
  // Combine date and time to UTC-like or local floating representation: YYYYMMDDTHHmmss
  const cleanDate = dateStr.replace(/-/g, "");
  const [hours, minutes] = timeStr.split(":");
  const cleanTime = `${hours.padStart(2, "0")}${minutes.padStart(2, "0")}00`;
  return `${cleanDate}T${cleanTime}`;
}

export function generateICSContent(event: CalendarEvent): string {
  const dtStart = formatICSDate(event.startDate, event.startTime);
  const dtEnd = event.endTime
    ? formatICSDate(event.startDate, event.endTime)
    : formatICSDate(event.startDate, event.startTime);

  const now = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

  const uid = `${Date.now()}@nyupratap.org`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Nyu Pratap Mitra Mandal//Navratri Calendar//MR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${event.title.replace(/,/g, "\\,").replace(/;/g, "\\;")}`,
    `DESCRIPTION:${(event.description || "").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;")}`,
    `LOCATION:${(event.location || "डांगरवाडा असोदा, जि. जळगाव").replace(/,/g, "\\,").replace(/;/g, "\\;")}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadICSFile(event: CalendarEvent, filename?: string) {
  const ics = generateICSContent(event);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    filename || `${event.title.replace(/\s+/g, "_")}.ics`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
