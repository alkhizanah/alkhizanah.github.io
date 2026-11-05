(() => {
  let format;
  try {
    format = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura-nu-arab', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });
  } catch {
    return;
  }

  for (const time of document.querySelectorAll('time[data-hijri]')) {
    const [year, month, day] = time.dateTime.slice(0, 10).split('-').map(Number);
    if (!year) continue;
    const hijri = document.createElement('span');
    hijri.className = 'hijri';
    hijri.lang = 'ar';
    hijri.dir = 'rtl';
    hijri.textContent = format.format(new Date(Date.UTC(year, month - 1, day)));
    time.after(hijri);
  }
})();
