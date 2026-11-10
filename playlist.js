"use strict";

(() => {
  const data = window.ARNIE_MUSIC_DATA;
  const playlistStore = window.ARNIE_PLAYLIST_STORAGE;
  const list = document.getElementById("playlist-list");
  const emptyState = document.getElementById("empty-playlist");
  const count = document.getElementById("playlist-count");
  const clearButton = document.getElementById("clear-playlist");
  const storageWarning = document.getElementById("storage-warning");
  const feedback = document.getElementById("playlist-feedback");
  const dialog = document.getElementById("player-dialog");
  const playerTitle = document.getElementById("player-title");
  const playerFrame = document.getElementById("player-frame");
  const closePlayer = document.getElementById("close-player");

  if (!data || !playlistStore || !Array.isArray(data.videos) || !Array.isArray(data.photos)) {
    emptyState.querySelector("h3").textContent = "Your playlist could not be loaded.";
    emptyState.querySelector("p").textContent = "Please return to the Video Library and try again.";
    clearButton.disabled = true;
    return;
  }

  const videosById = new Map(data.videos.map(video => [video.id, video]));
  let state = playlistStore.read();

  function hasPlayableVideo(video) {
    return typeof video.youtubeId === "string" && /^[A-Za-z0-9_-]{6,20}$/.test(video.youtubeId);
  }

  function validPlaylistIds(ids) {
    return ids.filter(id => videosById.has(id));
  }

  function updateState(nextState, message = "") {
    const validIds = validPlaylistIds(nextState.ids);
    state = { ids: validIds, available: nextState.available };
    storageWarning.hidden = state.available;
    if (message) feedback.textContent = message;
    render();
  }

  function makeButton(label, className, action, video, disabled = false) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `playlist-control ${className}`;
    button.dataset.action = action;
    button.dataset.id = String(video.id);
    button.disabled = disabled;
    button.textContent = label;
    return button;
  }

  function createPlaylistItem(video, index, total) {
    const item = document.createElement("li");
    const thumb = document.createElement("div");
    const image = document.createElement("img");
    const track = document.createElement("span");
    const copy = document.createElement("div");
    const title = document.createElement("h3");
    const meta = document.createElement("p");
    const status = document.createElement("p");
    const actions = document.createElement("div");

    item.className = "playlist-item";
    item.dataset.id = String(video.id);
    thumb.className = "playlist-thumb";
    image.src = data.photos[video.thumb];
    image.alt = `Arnie performing ${video.title}`;
    image.loading = "lazy";
    track.className = "track-number";
    track.textContent = String(index + 1);
    track.setAttribute("aria-label", `Playlist position ${index + 1}`);
    thumb.append(image, track);

    copy.className = "playlist-copy";
    title.textContent = video.title;
    meta.className = "song-meta";
    meta.textContent = `${video.artist} · ${video.genre}`;
    status.className = "video-status";
    status.textContent = hasPlayableVideo(video)
      ? "This performance is ready to watch."
      : "Video Link Coming Soon.";
    copy.append(title, meta, status);

    actions.className = "item-actions";
    if (hasPlayableVideo(video)) {
      const watch = document.createElement("button");
      watch.type = "button";
      watch.className = "watch-song";
      watch.dataset.action = "watch";
      watch.dataset.id = String(video.id);
      watch.innerHTML = '<span aria-hidden="true">▶</span> Watch';
      actions.append(watch);
    } else {
      const comingSoon = document.createElement("span");
      comingSoon.className = "coming-soon";
      comingSoon.textContent = "Video Link Coming Soon";
      actions.append(comingSoon);
    }

    actions.append(
      makeButton("↑ Move Up", "move-up", "up", video, index === 0),
      makeButton("↓ Move Down", "move-down", "down", video, index === total - 1),
      makeButton("Remove", "remove-song", "remove", video)
    );
    item.append(thumb, copy, actions);
    return item;
  }

  function render() {
    const videos = state.ids.map(id => videosById.get(id)).filter(Boolean);
    const total = videos.length;
    count.textContent = `${total} ${total === 1 ? "performance" : "performances"}`;
    clearButton.disabled = total === 0;
    emptyState.hidden = total > 0;
    list.hidden = total === 0;
    list.replaceChildren(...videos.map((video, index) => createPlaylistItem(video, index, total)));
  }

  function closeDialog() {
    if (dialog.open) dialog.close();
    playerFrame.replaceChildren();
  }

  function playVideo(video) {
    if (!hasPlayableVideo(video)) return;
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.youtubeId)}?autoplay=1&rel=0`;
    iframe.title = `${video.title} performed by Arnie`;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    playerTitle.textContent = video.title;
    playerFrame.replaceChildren(iframe);
    dialog.showModal();
  }

  list.addEventListener("click", event => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const video = videosById.get(Number(button.dataset.id));
    if (!video) return;

    if (button.dataset.action === "watch") {
      playVideo(video);
      return;
    }

    if (button.dataset.action === "remove") {
      updateState(playlistStore.remove(video.id), `Removed ${video.title} from your playlist.`);
      return;
    }

    const direction = button.dataset.action === "up" ? -1 : 1;
    const result = playlistStore.move(video.id, direction);
    updateState(result, result.moved ? `Moved ${video.title} ${direction < 0 ? "up" : "down"}.` : "That song cannot move any farther.");
    const movedButton = list.querySelector(`[data-id="${video.id}"] [data-action="${button.dataset.action}"]`);
    movedButton?.focus();
  });

  clearButton.addEventListener("click", () => {
    if (!state.ids.length) return;
    if (window.confirm("Clear every song from your playlist?")) {
      updateState(playlistStore.clear(), "Your playlist has been cleared.");
    }
  });

  closePlayer.addEventListener("click", closeDialog);
  dialog.addEventListener("click", event => {
    if (event.target === dialog) closeDialog();
  });
  dialog.addEventListener("close", () => playerFrame.replaceChildren());

  window.addEventListener(playlistStore.eventName, event => {
    const next = event.detail;
    if (next && Array.isArray(next.ids)) updateState(next);
  });

  updateState(state);
})();
