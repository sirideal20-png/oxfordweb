export type CalendarEvent = {
  date: string;
  title: string;
  description: string;
  type: 'holiday' | 'academic' | 'exam' | 'event' | 'break';
};

export type MonthData = {
  month: string;
  events: CalendarEvent[];
};

export type SemesterData = {
  title: string;
  subtitle: string;
  color: string;
  months: MonthData[];
};

// All academic calendar events for 2026 — shared between AcademicCalendarPage and CampusLifePage
export const allCalendarEvents: CalendarEvent[] = [
  // January
  { date: 'Jan 1', title: "New Year's Day", description: 'Public Holiday.', type: 'holiday' },
  { date: 'Jan 12', title: 'Spring Semester Orientation Day', description: 'Welcome speech, course registration.', type: 'academic' },
  { date: 'Jan 13', title: 'Classes Begin', description: 'Spring Semester commences.', type: 'academic' },
  { date: 'Jan 14', title: 'Study Tour — British Museum', description: 'British Museum, London — world history & culture.', type: 'event' },
  { date: 'Jan 16', title: 'Welcome Party 2026', description: "Grand Fresher's Reception — cultural performances & networking.", type: 'event' },
  { date: 'Jan 22', title: 'Inter-College Debate Competition', description: 'Topic: "AI Ethics in Education".', type: 'event' },
  { date: 'Jan 27', title: 'Study Tour — Bodleian Library', description: 'Oxford University & Bodleian Library tour.', type: 'event' },
  // February
  { date: 'Feb 10', title: 'Spring Book Fair', description: 'Academic publishers, tech books & student discounts.', type: 'event' },
  { date: 'Feb 14', title: 'Study Tour — Science Museum', description: 'Science Museum, London — "Future of Web Development with AI".', type: 'event' },
  { date: 'Feb 18', title: 'MoU Signing Ceremony', description: 'Partnership agreement with UK tech industry partners.', type: 'event' },
  { date: 'Feb 23', title: 'Speech Competition', description: 'Annual Public Speaking Championship.', type: 'event' },
  { date: 'Feb 25', title: 'Study Tour — Stonehenge', description: 'Stonehenge, Wiltshire — followed by Sports Tournament.', type: 'event' },
  // March
  { date: 'Mar 5', title: 'Cultural Exchange Day', description: 'International food, music & traditions showcase.', type: 'event' },
  { date: 'Mar 12', title: 'Internship & Careers Seminar', description: 'Industry panels, CV workshops & placement opportunities.', type: 'event' },
  { date: 'Mar 14', title: 'Study Tour — Tower of London', description: 'British royal history & Crown Jewels.', type: 'event' },
  { date: 'Mar 19', title: 'Essay Writing Competition', description: 'Theme: "Technology & Sustainable Development".', type: 'event' },
  { date: 'Mar 27', title: 'Study Tour — Cambridge', description: "Cambridge University & King's College Chapel.", type: 'event' },
  { date: 'Mar 30', title: 'Application Deadline — September 2026 Intake', description: 'Last date to submit applications for the September 2026 intake.', type: 'academic' },
  // April
  { date: 'Apr 3', title: 'Easter Weekend', description: 'UK Public Holiday (Apr 3–6).', type: 'holiday' },
  { date: 'Apr 9', title: 'Student Innovation Exhibition', description: 'Showcase of student projects & research posters.', type: 'event' },
  { date: 'Apr 13', title: 'SPRING MID-TERM EXAMS', description: 'Mid-semester examinations (Apr 13–17).', type: 'exam' },
  { date: 'Apr 21', title: 'Career Appointment Day', description: 'One-on-one career counselling sessions.', type: 'event' },
  { date: 'Apr 27', title: 'Study Tour — Windsor Castle', description: "Royal residence & St George's Chapel.", type: 'event' },
  // May
  { date: 'May 4', title: 'Early May Bank Holiday', description: 'UK Public Holiday.', type: 'holiday' },
  { date: 'May 8', title: 'Colour Day 🎨', description: 'Campus-wide colour festival.', type: 'event' },
  { date: 'May 14', title: 'Study Tour — Blenheim Palace', description: 'UNESCO World Heritage Site.', type: 'event' },
  { date: 'May 19', title: 'Internship Appointment Day', description: 'Summer internship matching & offer letters.', type: 'event' },
  { date: 'May 25', title: 'Spring Bank Holiday', description: 'UK Public Holiday.', type: 'holiday' },
  // June
  { date: 'Jun 3', title: 'MoU Signing Ceremony', description: 'Partnership with European university consortium.', type: 'event' },
  { date: 'Jun 8', title: 'Essay & Speech Finals', description: 'Grand finals — awards ceremony.', type: 'event' },
  { date: 'Jun 10', title: 'Spring Farewell Party', description: 'Farewell for graduating Spring batch.', type: 'event' },
  { date: 'Jun 15', title: 'SPRING FINAL EXAMS', description: 'End-of-semester examinations (Jun 15–19).', type: 'exam' },
  { date: 'Jun 29', title: 'Semester Break Begins', description: 'Faculty Administrative Week.', type: 'break' },
  // July
  { date: 'Jul 6', title: 'Summer Bootcamp Orientation', description: 'Short courses begin.', type: 'academic' },
  { date: 'Jul 14', title: 'Study Tour — Kew Gardens', description: 'Botanical science & sustainability.', type: 'event' },
  { date: 'Jul 23', title: 'Cybersecurity Conference', description: 'Digital security trends & best practices.', type: 'event' },
  { date: 'Jul 27', title: 'Study Tour — Edinburgh Castle', description: 'Edinburgh Castle & Royal Mile, Scotland.', type: 'event' },
  // August
  { date: 'Aug 7', title: 'Student Art & Design Exhibition', description: 'Creative works showcase.', type: 'event' },
  { date: 'Aug 14', title: 'Study Tour — Lake District', description: 'Nature & poetry trail.', type: 'event' },
  { date: 'Aug 20', title: 'Blockchain & FinTech Conference', description: 'Cryptocurrency, DeFi & digital banking.', type: 'event' },
  { date: 'Aug 28', title: 'Summer Farewell & Certificates', description: 'Bootcamp farewell & certificates awarded.', type: 'academic' },
  { date: 'Aug 31', title: 'Summer Bank Holiday', description: 'UK Public Holiday.', type: 'holiday' },
  // September
  { date: 'Sep 7', title: 'Fall Semester Orientation', description: 'Welcome and registration.', type: 'academic' },
  { date: 'Sep 11', title: 'Fall Welcome Party', description: 'Grand welcome reception.', type: 'event' },
  { date: 'Sep 14', title: 'Classes Begin — Fall', description: 'Fall Semester commences.', type: 'academic' },
  { date: 'Sep 18', title: 'Study Tour — Harry Potter Studio', description: 'Warner Bros. Studio Tour.', type: 'event' },
  { date: 'Sep 27', title: 'Study Tour — Hampton Court', description: 'Tudor history & gardens.', type: 'event' },
  // October
  { date: 'Oct 2', title: 'Autumn Book Fair', description: 'Academic publishers & career guides.', type: 'event' },
  { date: 'Oct 12', title: 'Cloud Computing Conference', description: 'AWS, Azure & GCP workshops.', type: 'event' },
  { date: 'Oct 14', title: 'Study Tour — Bletchley Park', description: 'WWII codebreaking & computing history.', type: 'event' },
  { date: 'Oct 26', title: 'FALL MID-TERM EXAMS', description: 'Mid-semester examinations (Oct 26–30).', type: 'exam' },
  // November
  { date: 'Nov 6', title: 'AI & Data Science Conference', description: 'Machine learning & automation.', type: 'event' },
  { date: 'Nov 11', title: 'Remembrance Day', description: 'Two-minute silence & wreath-laying.', type: 'holiday' },
  { date: 'Nov 13', title: 'Fall Debate Finals', description: "Grand finale — Chancellor's Debate Trophy.", type: 'event' },
  { date: 'Nov 14', title: 'Study Tour — York', description: 'York Minster & The Shambles.', type: 'event' },
  { date: 'Nov 27', title: 'Study Tour — Birmingham', description: 'Cadbury World & Jewellery Quarter.', type: 'event' },
  // December
  { date: 'Dec 3', title: 'Essay & Debate Awards', description: 'Annual literary & oratory awards.', type: 'event' },
  { date: 'Dec 7', title: 'Green Technology Conference', description: 'Sustainable tech innovations.', type: 'event' },
  { date: 'Dec 8', title: 'Fall Farewell Party', description: 'Grand farewell for graduating Fall batch.', type: 'event' },
  { date: 'Dec 14', title: 'FALL FINAL EXAMS', description: 'End-of-semester examinations (Dec 14–18).', type: 'exam' },
  { date: 'Dec 21', title: 'Winter Break Begins', description: 'Campus closed for holidays.', type: 'break' },
  { date: 'Dec 25', title: 'Christmas Day', description: 'UK Public Holiday.', type: 'holiday' },
];

/**
 * Parse a short date like "Jan 14" into a full Date for 2026.
 */
export function parseCalendarDate(dateStr: string): Date {
  const d = new Date(`${dateStr}, 2026`);
  return d;
}

/**
 * Get upcoming events from today (or a given date).
 */
export function getUpcomingEvents(count = 10): CalendarEvent[] {
  const now = new Date();
  return allCalendarEvents
    .filter(e => parseCalendarDate(e.date) >= now)
    .slice(0, count);
}

/**
 * Generate an ICS calendar string for a single event.
 */
export function generateICS(event: CalendarEvent): string {
  const d = parseCalendarDate(event.date);
  const ymd = d.toISOString().split('T')[0].replace(/-/g, '');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Oxford Skills Center//EN',
    'BEGIN:VEVENT',
    `DTSTART;VALUE=DATE:${ymd}`,
    `DTEND;VALUE=DATE:${ymd}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    'LOCATION:Oxford Skills Center',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

/**
 * Generate an ICS file for multiple events.
 */
export function generateMultiICS(events: CalendarEvent[]): string {
  const vevents = events.map(event => {
    const d = parseCalendarDate(event.date);
    const ymd = d.toISOString().split('T')[0].replace(/-/g, '');
    return [
      'BEGIN:VEVENT',
      `DTSTART;VALUE=DATE:${ymd}`,
      `DTEND;VALUE=DATE:${ymd}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      'LOCATION:Oxford Skills Center',
      'END:VEVENT',
    ].join('\r\n');
  }).join('\r\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Oxford Skills Center//EN',
    vevents,
    'END:VCALENDAR',
  ].join('\r\n');
}

/**
 * Download an ICS file.
 */
export function downloadICS(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const eventTypeColors: Record<CalendarEvent['type'], { bg: string; text: string; label: string }> = {
  holiday: { bg: 'bg-red-100', text: 'text-red-700', label: 'Holiday' },
  academic: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Academic' },
  exam: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Exam' },
  event: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Event' },
  break: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Break' },
};
