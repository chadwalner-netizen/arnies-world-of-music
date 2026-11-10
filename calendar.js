"use strict";

(() => {
  const data = window.ARNIE_MUSIC_DATA;
  const grid = document.getElementById("calendar-grid");
  const monthTitle = document.getElementById("month-title");
  const featuredLabel = document.getElementById("featured-label");
  const featuredHeading = document.getElementById("featured-heading");
  const featuredOverline = document.getElementById("featured-overline");
  const selectedDateLabel = document.getElementById("selected-date");
  const featuredTitle = document.getElementById("featured-song-title");
  const featuredMeta = document.getElementById("featured-song-meta");
  const thumbnail = document.getElementById("featured-thumbnail");
  const media = document.getElementById("featured-media");
  const watchButton = document.getElementById("watch-performance");
  const playbackStatus = document.getElementById("playback-status");
  const announcement = document.getElementById("selection-announcement");

  if (!data || !Array.isArray(data.videos) || !data.videos.length || !Array.isArray(data.photos)) {
    featuredTitle.textContent = "The Video Library data could not be loaded.";
    featuredMeta.textContent = "Please return to the Video Library and try again.";
    playbackStatus.textContent = "No song data is available for the calendar.";
    watchButton.disabled = true;
    grid.setAttribute("aria-label", "Calendar unavailable because song data could not be loaded");
    return;
  }

  const videos = data.videos.filter(video => Number.isInteger(video.thumb) && data.photos[video.thumb]);
  const today = localDate(new Date());
  let selectedDate = today;
  let visibleMonth = new Date(today.getFullYear(), today.getMonth(), 1, 12);
  let selectedVideo = null;

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
    const key = dateKey(date);
    let hash = 2166136261;
    for (let index = 0; index < key.length; index += 1) {
      hash ^= key.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return videos[(hash >>> 0) % videos.length];
  }

  function hasPlayableVideo(video) {
    return typeof video.youtubeId === "string" && /^[A-Za-z0-9_-]{6,20}$/.test(video.youtubeId);
  }

  function resetFeaturedMedia(video) {
    media.classList.remove("is-playing");
    media.replaceChildren(thumbnail, createMusicNote());
    thumbnail.src = data.photos[video.thumb];
    thumbnail.alt = `Arnie performing ${video.title}`;
  }

  function createMusicNote() {
    const note = document.createElement("span");
    note.className = "media-note";
    note.setAttribute("aria-hidden", "true");
    note.textContent = "♫";
    return note;
  }

  function updateFeaturedSong(date, shouldAnnounce = true) {
    selectedDate = localDate(date);
    selectedVideo = songForDate(selectedDate);
    const isToday = sameDate(selectedDate, today);

    featuredLabel.textContent = isToday ? "Today’s Featured Song" : "Featured Song";
    featuredHeading.textContent = isToday ? "A Performance for Today" : "Featured Performance";
    featuredOverline.textContent = isToday ? "Today’s Selection" : "Selected Performance";
    selectedDateLabel.textContent = fullDateFormatter.format(selectedDate);
    featuredTitle.textContent = selectedVideo.title;
    featuredMeta.textContent = `${selectedVideo.artist} · ${selectedVideo.genre}`;
    resetFeaturedMedia(selectedVideo);

    if (hasPlayableVideo(selectedVideo)) {
      watchButton.disabled = false;
      watchButton.innerHTML = '<span aria-hidden="true">▶</span> Watch the Performance';
      playbackStatus.textContent = "Play this performance without leaving the calendar.";
    } else {
      watchButton.disabled = true;
      watchButton.textContent = "Video Link Coming Soon";
      playbackStatus.textContent = "This performance is in the Video Library, but its YouTube link has not been added yet.";
    }

    if (shouldAnnounce) {
      announcement.textContent = `${fullDateFormatter.format(selectedDate)}: ${selectedVideo.title} by ${selectedVideo.artist}.`;
    }
  }

  function renderCalendar(focusKey = null) {
    const year = visibleMonth.getFullYear();
    const month = visibleMonth.getMonth();
    const firstOfMonth = new Date(year, month, 1, 12);
    const firstCellDate = new Date(year, month, 1 - firstOfMonth.getDay(), 12);
    const selectedInVisibleMonth = selectedDate.getFullYear() === year && selectedDate.getMonth() === month;
    const fragment = document.createDocumentFragment();
    let tabStopAssigned = false;

    monthTitle.textContent = monthFormatter.format(firstOfMonth);
    document.getElementById("previous-month").setAttribute("aria-label", `Show ${monthFormatter.format(new Date(year, month - 1, 1, 12))}`);
    document.getElementById("next-month").setAttribute("aria-label", `Show ${monthFormatter.format(new Date(year, month + 1, 1, 12))}`);
    grid.replaceChildren();

    for (let index = 0; index < 42; index += 1) {
      const cellDate = new Date(
        firstCellDate.getFullYear(),
        firstCellDate.getMonth(),
        firstCellDate.getDate() + index,
        12
      );
      const song = songForDate(cellDate);
      const key = dateKey(cellDate);
      const isOutside = cellDate.getMonth() !== month;
      const isToday = sameDate(cellDate, today);
      const isSelected = sameDate(cellDate, selectedDate);
      const cell = document.createElement("div");
      const button = document.createElement("button");
      const number = document.createElement("span");
      const mark = document.createElement("span");

      cell.className = "calendar-cell";
      cell.setAttribute("role", "gridcell");
      cell.setAttribute("aria-selected", String(isSelected));

      button.type = "button";
      button.className = "day-button";
      button.dataset.date = key;
      button.setAttribute("aria-label", `${fullDateFormatter.format(cellDate)} — ${song.title} by ${song.artist}`);
      button.setAttribute("aria-pressed", String(isSelected));
      if (isOutside) button.classList.add("outside-month");
      if (isToday) {
        button.classList.add("is-today");
        button.setAttribute("aria-current", "date");
      }
      if (isSelected) button.classList.add("is-selected");

      const shouldBeTabStop = selectedInVisibleMonth
        ? isSelected
        : (!tabStopAssigned && !isOutside);
      button.tabIndex = shouldBeTabStop ? 0 : -1;
      if (shouldBeTabStop) tabStopAssigned = true;

      number.className = "day-number";
      number.textContent = String(cellDate.getDate());
      mark.className = "day-song-mark";
      mark.setAttribute("aria-hidden", "true");
      mark.textContent = "♫";
      button.append(number, mark);
      cell.append(button);
      fragment.append(cell);
    }

    grid.append(fragment);

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
      renderCalendar(targetKey);
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
    if (!hasPlayableVideo(selectedVideo)) return;
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(selectedVideo.youtubeId)}?autoplay=1&rel=0`;
    iframe.title = `${selectedVideo.title} performed by Arnie`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    media.classList.add("is-playing");
    media.replaceChildren(iframe);
    playbackStatus.textContent = `Now playing ${selectedVideo.title} by ${selectedVideo.artist}.`;
  });

  updateFeaturedSong(today, false);
  renderCalendar();
})();
