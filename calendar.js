"use strict";

(() => {
  const songs = window.ARNIE_CALENDAR_SONGS || {};
  const grid = document.getElementById("calendar-grid");
  const monthTitle = document.getElementById("month-title");
  const mobileSongList = document.getElementById("mobile-song-list");
  const featuredLabel = document.getElementById("featured-label");
  const featuredHeading = document.getElementById("featured-heading");
  const featuredOverline = document.getElementById("featured-overline");
  const selectedDateLabel = document.getElementById("selected-date");
  const featuredTitle = document.getElementById("featured-song-title");
  const featuredMeta = document.getElementById("featured-song-meta");
  const featuredDescription = document.getElementById("featured-description");
  const media = document.getElementById("featured-media");
  const watchButton = document.getElementById("watch-performance");
  const sourceLink = document.getElementById("original-archive-link");
  const youtubeLink = document.getElementById("watch-on-youtube");
  const playbackStatus = document.getElementById("playback-status");
  const announcement = document.getElementById("selection-announcement");
  const today = localDate(new Date());
  // Open on the curated November collection.
  let selectedDate = new Date(2026, 10, 11, 12);
  let visibleMonth = new Date(2026, 10, 1, 12);
  let selectedSong = null;

  const fullDateFormatter = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const monthFormatter = new Intl.DateTimeFormat(undefined, { year: "numeric", month: "long" });

  function localDate(value) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate(), 12);
  }

  function dateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function dateFromKey(key) {
    const [year, month, day] = key.split("-").map(Number);
    return new Date(year, month - 1, day, 12);
  }

  function sameDate(first, second) {
    return dateKey(first) === dateKey(second);
  }

  function songForDate(date) {
    return Object.prototype.hasOwnProperty.call(songs, dateKey(date)) ? songs[dateKey(date)] : null;
  }

  function hasPlayableVideo(song) {
    return Boolean(song && typeof song.youtubeId === "string" && /^[A-Za-z0-9_-]{11}$/.test(song.youtubeId));
  }

  function makePlaceholderArt(song) {
    const cover = document.createElement("div");
    cover.className = "classic-song-art";
    const note = document.createElement("span");
    note.className = "classic-song-art-note";
    note.setAttribute("aria-hidden", "true");
    note.textContent = "♫";
    const title = document.createElement("span");
    title.className = "classic-song-art-title";
    title.textContent = song ? song.title : "Morning Maniac Music";
    cover.append(note, title);
    return cover;
  }

  function resetFeaturedMedia(song) {
    media.classList.remove("is-playing");
    if (!hasPlayableVideo(song)) {
      media.replaceChildren(makePlaceholderArt(song));
      return;
    }
    // Use YouTube's thumbnail service for the owner's exact selected video.
    // Fall back gracefully if thumbnails are blocked or unavailable.
    const image = document.createElement("img");
    image.className = "featured-video-thumbnail";
    image.src = `https://i.ytimg.com/vi/${encodeURIComponent(song.youtubeId)}/hqdefault.jpg`;
    image.alt = `Video thumbnail for ${song.title}`;
    image.loading = "eager";
    image.decoding = "async";
    image.addEventListener("error", () => {
      if (media.contains(image)) media.replaceChildren(makePlaceholderArt(song));
    }, { once: true });
    media.replaceChildren(image);
  }

  function updateFeaturedSong(date, shouldAnnounce = true) {
    selectedDate = localDate(date);
    selectedSong = songForDate(selectedDate);
    const isToday = sameDate(selectedDate, today);
    featuredLabel.textContent = isToday ? "Today’s Music Calendar" : "Featured Selection";
    featuredHeading.textContent = selectedSong ? "A Classic for the Day" : "More Music Coming Soon";
    featuredOverline.textContent = selectedSong ? "Morning Maniac Music · Song of the Day" : "More Songs Ahead";
    selectedDateLabel.textContent = fullDateFormatter.format(selectedDate);
    featuredTitle.textContent = selectedSong ? selectedSong.title : "This Date Is Not Yet Populated";
    featuredMeta.textContent = selectedSong
      ? (selectedSong.artist ? `${selectedSong.artistLabel}: ${selectedSong.artist}` : "From Arnie’s Morning Maniac Music archive")
      : "Select a highlighted date to explore an archived song.";
    featuredDescription.textContent = selectedSong
      ? (hasPlayableVideo(selectedSong)
        ? "Selected from Arnie’s Morning Maniac Music collection. Play the recording here or open it on YouTube; the original song page is also available."
        : "The recording is unavailable here, but you can visit Arnie’s original song page.")
      : "There’s no song featured for this date yet. Choose a highlighted day to explore Arnie’s collection.";
    resetFeaturedMedia(selectedSong);

    if (selectedSong && selectedSong.sourceUrl) {
      sourceLink.href = selectedSong.sourceUrl;
      sourceLink.hidden = false;
    } else {
      sourceLink.hidden = true;
      sourceLink.removeAttribute("href");
    }
    if (hasPlayableVideo(selectedSong)) {
      youtubeLink.href = `https://www.youtube.com/watch?v=${encodeURIComponent(selectedSong.youtubeId)}`;
      youtubeLink.hidden = false;
      watchButton.disabled = false;
      watchButton.innerHTML = '<span aria-hidden="true">▶</span> Play Original Recording';
      playbackStatus.textContent = "If playback is unavailable here, choose Watch on YouTube.";
    } else {
      youtubeLink.hidden = true;
      youtubeLink.removeAttribute("href");
      watchButton.disabled = true;
      watchButton.textContent = selectedSong ? "Video Unavailable" : "Song Coming Soon";
      playbackStatus.textContent = selectedSong
        ? "Recording unavailable. Visit Arnie’s original song page."
        : "Choose a highlighted date to discover a song.";
    }
    if (shouldAnnounce) {
      announcement.textContent = selectedSong
        ? `${fullDateFormatter.format(selectedDate)}: ${selectedSong.title}.`
        : `${fullDateFormatter.format(selectedDate)}: not yet populated.`;
    }
  }

  function renderCalendar(focusKey = null) {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstOfMonth = new Date(year, month, 1, 12);
    const firstDayOffset = firstOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0, 12).getDate();
    const cellCount = Math.ceil((firstDayOffset + daysInMonth) / 7) * 7;
    const selectedInVisibleMonth = selectedDate.getFullYear() === year && selectedDate.getMonth() === month;
    const fragment = document.createDocumentFragment();
    let tabStopAssigned = false;

    monthTitle.textContent = monthFormatter.format(firstOfMonth);
    document.getElementById("previous-month").setAttribute("aria-label", `Show ${monthFormatter.format(new Date(year, month - 1, 1, 12))}`);
    document.getElementById("next-month").setAttribute("aria-label", `Show ${monthFormatter.format(new Date(year, month + 1, 1, 12))}`);
    grid.replaceChildren();

    for (let index = 0; index < cellCount; index += 1) {
      const dayNumber = index - firstDayOffset + 1;
      // Preserve weekday alignment without showing dates from adjacent months.
      if (dayNumber < 1 || dayNumber > daysInMonth) {
        const spacer = document.createElement("div");
        spacer.className = "calendar-empty-slot";
        spacer.setAttribute("aria-hidden", "true");
        fragment.append(spacer);
        continue;
      }
      const cellDate = new Date(year, month, dayNumber, 12);
      const song = songForDate(cellDate);
      const key = dateKey(cellDate);
      const isToday = sameDate(cellDate, today);
      const isSelected = sameDate(cellDate, selectedDate);
      const cell = document.createElement("div");
      const button = document.createElement("button");
      const number = document.createElement("span");
      const mark = document.createElement("span");
      const songTitle = document.createElement("span");

      cell.className = "calendar-cell";
      cell.setAttribute("role", "gridcell");
      cell.setAttribute("aria-selected", String(isSelected));

      button.type = "button";
      button.className = "day-button";
      button.dataset.date = key;
      button.setAttribute("aria-label", song ? `${fullDateFormatter.format(cellDate)} — ${song.title}` : `${fullDateFormatter.format(cellDate)} — Coming soon`);
      button.setAttribute("aria-pressed", String(isSelected));
      if (isToday) {
        button.classList.add("is-today");
        button.setAttribute("aria-current", "date");
      }
      if (isSelected) button.classList.add("is-selected");

      const shouldBeTabStop = selectedInVisibleMonth
        ? isSelected
        : (!tabStopAssigned);
      button.tabIndex = shouldBeTabStop ? 0 : -1;
      if (shouldBeTabStop) tabStopAssigned = true;

      number.className = "day-number";
      number.textContent = String(cellDate.getDate());
      mark.className = "day-song-mark";
      mark.setAttribute("aria-hidden", "true");
      mark.textContent = song ? "♫" : "";
      if (song) {
        button.classList.add("has-song");
        songTitle.className = "day-song-title";
        songTitle.textContent = song.title;
        songTitle.title = song.title;
        button.append(number, songTitle, mark);
      } else {
        button.append(number, mark);
      }
      cell.append(button);
      fragment.append(cell);
    }

    grid.append(fragment);

    // On phones the seven-column grid cannot legibly display long titles.
    // Offer a complete, tappable song index underneath instead.
    mobileSongList.replaceChildren();
    const songEntries = Object.entries(songs)
      .filter(([key]) => key.startsWith(`${year}-${String(month + 1).padStart(2, "0")}-`))
      .sort(([first], [second]) => first.localeCompare(second));
    if (songEntries.length) {
      const listHeading = document.createElement("h4");
      listHeading.textContent = "Songs this month";
      mobileSongList.append(listHeading);
      for (const [key, song] of songEntries) {
        const songDate = dateFromKey(key);
        const item = document.createElement("button");
        item.type = "button";
        item.className = "mobile-song-item";
        if (key === dateKey(selectedDate)) item.classList.add("is-selected");
        const day = document.createElement("span");
        day.className = "mobile-song-day";
        day.textContent = String(songDate.getDate());
        const title = document.createElement("span");
        title.className = "mobile-song-title";
        title.textContent = song.title;
        item.append(day, title);
        item.addEventListener("click", () => selectDate(songDate));
        mobileSongList.append(item);
      }
    }

    if (focusKey) {
      const target = grid.querySelector(`[data-date="${focusKey}"]`);
      if (target) {
        grid.querySelectorAll(".day-button").forEach(button => { button.tabIndex = -1; });
        target.tabIndex = 0;
        target.focus();
      }
    }
  }

  function selectDate(date) {
    const target = localDate(date);
    visibleMonth = new Date(target.getFullYear(), target.getMonth(), 1, 12);
    updateFeaturedSong(target);
    renderCalendar(dateKey(target));
    document.querySelector(".featured-section").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function moveFocus(button, dayOffset) {
    const target = dateFromKey(button.dataset.date);
    target.setDate(target.getDate() + dayOffset);
    const targetKey = dateKey(target);
    const targetButton = grid.querySelector(`[data-date="${targetKey}"]`);

    if (targetButton) {
      grid.querySelectorAll(".day-button").forEach(item => { item.tabIndex = -1; });
      targetButton.tabIndex = 0;
      targetButton.focus();
    } else {
      visibleMonth = new Date(target.getFullYear(), target.getMonth(), 1, 12);
      renderCalendar();
      const newButton = grid.querySelector(`[data-date="${targetKey}"]`);
      if (newButton) {
        grid.querySelectorAll(".day-button").forEach(item => { item.tabIndex = -1; });
        newButton.tabIndex = 0;
        newButton.focus();
      }
    }
  }

  grid.addEventListener("click", event => {
    const button = event.target.closest(".day-button");
    if (button) selectDate(dateFromKey(button.dataset.date));
  });

  grid.addEventListener("keydown", event => {
    const button = event.target.closest(".day-button");
    if (!button) return;

    const date = dateFromKey(button.dataset.date);
    let offset = null;
    if (event.key === "ArrowLeft") offset = -1;
    if (event.key === "ArrowRight") offset = 1;
    if (event.key === "ArrowUp") offset = -7;
    if (event.key === "ArrowDown") offset = 7;
    if (event.key === "Home") offset = -date.getDay();
    if (event.key === "End") offset = 6 - date.getDay();

    if (offset !== null) {
      event.preventDefault();
      moveFocus(button, offset);
      return;
    }

    if (event.key === "PageUp" || event.key === "PageDown") {
      event.preventDefault();
      const monthOffset = event.key === "PageUp" ? -1 : 1;
      const targetMonth = new Date(date.getFullYear(), date.getMonth() + monthOffset, 1, 12);
      const lastDay = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0, 12).getDate();
      const target = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), Math.min(date.getDate(), lastDay), 12);
      visibleMonth = new Date(target.getFullYear(), target.getMonth(), 1, 12);
      renderCalendar(dateKey(target));
    }
  });

  document.getElementById("previous-month").addEventListener("click", () => {
    visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1, 12);
    renderCalendar();
  });

  document.getElementById("next-month").addEventListener("click", () => {
    visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1, 12);
    renderCalendar();
  });

  document.getElementById("show-today").addEventListener("click", () => selectDate(today));

  watchButton.addEventListener("click", () => {
    if (!hasPlayableVideo(selectedSong)) return;
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(selectedSong.youtubeId)}?autoplay=1&rel=0`;
    iframe.title = `${selectedSong.title} — original recording`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    media.classList.add("is-playing");
    media.replaceChildren(iframe);
    playbackStatus.textContent = "If this player shows an error, use Watch on YouTube instead.";
  });

  updateFeaturedSong(selectedDate, false);
  renderCalendar();
})();
