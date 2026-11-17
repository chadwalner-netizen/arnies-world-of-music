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
  const playPlaylistButton = document.getElementById("play-playlist");
  const previousTrackButton = document.getElementById("previous-track");
  const nextTrackButton = document.getElementById("next-track");
  const togglePlaybackButton = document.getElementById("toggle-playback");
  const playerPosition = document.getElementById("player-position");
  const playerStatus = document.getElementById("player-status");
  const youtubeLink = document.getElementById("player-youtube-link");

  let playbackQueue = [];
  let playbackIndex = -1;
  let youtubePlayer = null;
  let playerReady = false;
  let playbackSession = 0;
  let youtubeApiPromise = null;
  const mobileBrowser = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || navigator.userAgentData?.mobile === true;
  let nativePlaylist = false;
  let fallbackActive = false;
  let playerGeneration = 0;
  let playerReadyTimer = null;
  let playbackMonitor = null;
  let endRecoveryTimer = null;
  let nearEndReadings = 0;
  let manualSelectionAt = 0;

  if (!data || !playlistStore || !Array.isArray(data.videos) || !Array.isArray(data.photos)) {
    emptyState.querySelector("h3").textContent = "Your playlist could not be loaded.";
    emptyState.querySelector("p").textContent = "Please return to the Video Library and try again.";
    clearButton.disabled = true;
    return;
  }

  const videosById = new Map(data.videos.map(video => [video.id, video]));
  let state = playlistStore.read();
  const tabs=document.getElementById("playlist-tabs");
  const nameInput=document.getElementById("playlist-name");
  function renderTabs(){const all=playlistStore.read();tabs.replaceChildren(...all.playlists.map((pl,i)=>{const b=document.createElement("button");b.type="button";b.className="playlist-tab"+(i===all.active?" active":"");b.textContent=`${pl.name} (${pl.ids.length})`;b.setAttribute("aria-pressed",String(i===all.active));b.addEventListener("click",()=>updateState(playlistStore.select(i)));return b}));nameInput.value=all.playlists[all.active].name;}
  document.getElementById("rename-playlist").addEventListener("click",()=>{if(!nameInput.value.trim())return;updateState(playlistStore.rename(playlistStore.read().active,nameInput.value),"Playlist renamed.")});


  function hasYouTubeVideo(video) {
    return typeof video.youtubeId === "string" && /^[A-Za-z0-9_-]{6,20}$/.test(video.youtubeId);
  }

  function hasPlayableVideo(video) {
    return hasYouTubeVideo(video) && video.embeddable !== false;
  }

  function validPlaylistIds(ids) {
    return ids.filter(id => videosById.has(id));
  }

  const migratedIds = validPlaylistIds(state.ids);
  if (migratedIds.length !== state.ids.length) {
    state = playlistStore.replace(migratedIds);
  }

  function updateState(nextState, message = "") {
    const validIds = validPlaylistIds(nextState.ids);
    state = { ids: validIds, available: nextState.available };
    storageWarning.hidden = state.available;
    if (message) feedback.textContent = message;
    renderTabs();
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
    if (dialog.open && playbackQueue[playbackIndex]?.id === video.id) {
      item.classList.add("currently-playing");
      item.setAttribute("aria-current", "true");
    }
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
    meta.textContent = `${video.artistRole || "Song artist"}: ${video.artist} · ${video.genre}`;
    copy.append(title, meta);
    if (hasPlayableVideo(video)) {
      status.className = "video-status";
      status.textContent = "This performance is ready to watch.";
      copy.append(status);
    }

    actions.className = "item-actions";
    if (hasPlayableVideo(video)) {
      const watch = document.createElement("button");
      watch.type = "button";
      watch.className = "watch-song";
      watch.dataset.action = "watch";
      watch.dataset.id = String(video.id);
      watch.innerHTML = '<span aria-hidden="true">▶</span> Watch';
      actions.append(watch);
    } else if (hasYouTubeVideo(video)) {
      const watch = document.createElement("a");
      watch.className = "watch-song";
      watch.href = video.youtubeUrl || `https://www.youtube.com/watch?v=${encodeURIComponent(video.youtubeId)}`;
      watch.target = "_blank";
      watch.rel = "noopener";
      watch.innerHTML = '<span aria-hidden="true">▶</span> Watch on YouTube';
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
    playPlaylistButton.disabled = !videos.some(hasPlayableVideo);
    emptyState.hidden = total > 0;
    list.hidden = total === 0;
    list.replaceChildren(...videos.map((video, index) => createPlaylistItem(video, index, total)));
  }

  // The YouTube IFrame API provides the ENDED event; a plain iframe cannot.
  function loadYouTubeApi() {
    if (window.YT && typeof window.YT.Player === "function") return Promise.resolve();
    if (youtubeApiPromise) return youtubeApiPromise;

    youtubeApiPromise = new Promise((resolve, reject) => {
      const previousCallback = window.onYouTubeIframeAPIReady;
      const script = document.createElement("script");
      let complete = false;
      const timeout = window.setTimeout(() => fail(new Error("YouTube took too long to load.")), 15000);
      function fail(error) {
        if (complete) return;
        complete = true;
        window.clearTimeout(timeout);
        reject(error);
      }
      window.onYouTubeIframeAPIReady = () => {
        if (typeof previousCallback === "function") previousCallback();
        if (complete) return;
        complete = true;
        window.clearTimeout(timeout);
        resolve();
      };
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => fail(new Error("YouTube's player could not be loaded."));
      document.head.append(script);
    }).catch(error => {
      youtubeApiPromise = null; // Allow another attempt if the connection recovers.
      throw error;
    });
    return youtubeApiPromise;
  }

  function playbackStatus(message, showExternalLink = false) {
    playerStatus.textContent = message;
    youtubeLink.hidden = !showExternalLink;
  }

  function refreshPlayerControls() {
    previousTrackButton.disabled = playbackIndex <= 0;
    nextTrackButton.disabled = playbackIndex < 0 || playbackIndex >= playbackQueue.length - 1;
    togglePlaybackButton.disabled = !playerReady;
  }

  function refreshCurrentTrack() {
    const video = playbackQueue[playbackIndex];
    if (!video) return;
    playerTitle.textContent = video.title;
    playerPosition.textContent = `Song ${playbackIndex + 1} of ${playbackQueue.length} · ${video.artist}`;
    youtubeLink.href = video.youtubeUrl || `https://www.youtube.com/watch?v=${encodeURIComponent(video.youtubeId)}`;
    refreshPlayerControls();
    list.querySelectorAll(".playlist-item").forEach(item => {
      const active = Number(item.dataset.id) === video.id;
      item.classList.toggle("currently-playing", active);
      if (active) item.setAttribute("aria-current", "true");
      else item.removeAttribute("aria-current");
    });
  }

  function cancelEndRecovery() {
    if (endRecoveryTimer !== null) window.clearTimeout(endRecoveryTimer);
    endRecoveryTimer = null;
    nearEndReadings = 0;
  }

  function syncNativePlaylistIndex() {
    if (!nativePlaylist || !playerReady || !youtubePlayer ||
        typeof youtubePlayer.getPlaylistIndex !== "function" ||
        Date.now() - manualSelectionAt < 1200) return;
    try {
      const index = youtubePlayer.getPlaylistIndex();
      if (Number.isInteger(index) && index >= 0 && index < playbackQueue.length && index !== playbackIndex) {
        playbackIndex = index;
        cancelEndRecovery();
        refreshCurrentTrack();
      }
    } catch { /* Keep the visible position until the API responds again. */ }
  }

  // On some phones the embedded player misses its ENDED notification. Let
  // YouTube advance its own queue first, then recover only if it remains stuck.
  function recoverAfterEnd() {
    if (playbackIndex >= playbackQueue.length - 1) {
      playbackStatus("Playlist complete. Thank you for listening!");
      togglePlaybackButton.textContent = "↻ Replay Song";
      return;
    }
    if (endRecoveryTimer !== null) return;
    const endedIndex = playbackIndex;
    endRecoveryTimer = window.setTimeout(() => {
      endRecoveryTimer = null;
      if (!dialog.open || !playerReady || !nativePlaylist) return;
      syncNativePlaylistIndex();
      if (playbackIndex === endedIndex) advanceTrack(1);
    }, 2000);
  }

  function startMobileMonitor(session, generation) {
    if (playbackMonitor !== null) window.clearInterval(playbackMonitor);
    playbackMonitor = window.setInterval(() => {
      if (!dialog.open || playbackSession !== session || playerGeneration !== generation ||
          !playerReady || !nativePlaylist || !youtubePlayer) return;
      syncNativePlaylistIndex();
      try {
        const playerState = youtubePlayer.getPlayerState();
        if (playerState === window.YT.PlayerState.ENDED) {
          recoverAfterEnd();
          return;
        }
        const duration = youtubePlayer.getDuration?.();
        const currentTime = youtubePlayer.getCurrentTime?.();
        if (playerState === window.YT.PlayerState.PLAYING && Number.isFinite(duration) &&
            duration >= 5 && Number.isFinite(currentTime) && currentTime >= duration - 0.5) {
          nearEndReadings++;
          if (nearEndReadings >= 3) recoverAfterEnd();
        } else {
          nearEndReadings = 0;
        }
      } catch { /* A temporarily disconnected YouTube iframe should not crash the page. */ }
    }, 1200);
  }

  function advanceTrack(direction) {
    const nextIndex = playbackIndex + direction;
    if (nextIndex < 0 || nextIndex >= playbackQueue.length) return;
    cancelEndRecovery();
    playbackIndex = nextIndex;
    manualSelectionAt = Date.now();
    refreshCurrentTrack();
    playbackStatus("Starting the next recording…");
    togglePlaybackButton.textContent = "⏸ Pause";
    if (playerReady && youtubePlayer) {
      try {
        if (nativePlaylist && typeof youtubePlayer.playVideoAt === "function") {
          youtubePlayer.playVideoAt(playbackIndex);
        } else if (typeof youtubePlayer.loadVideoById === "function") {
          youtubePlayer.loadVideoById(playbackQueue[playbackIndex].youtubeId);
        } else {
          showManualPlayer();
        }
      } catch {
        showManualPlayer();
      }
    } else if (mobileBrowser) {
      // An uninitialized player should never leave Next looking unresponsive.
      showManualPlayer();
    } else if (playerFrame.querySelector("iframe")) {
      showManualPlayer();
    }
  }

  function showManualPlayer() {
    // Useful if the API is blocked, though this fallback cannot auto-advance.
    const video = playbackQueue[playbackIndex];
    if (!video || !dialog.open) return;
    fallbackActive = true;
    playerGeneration++;
    playerReady = false;
    nativePlaylist = false;
    if (playerReadyTimer !== null) window.clearTimeout(playerReadyTimer);
    playerReadyTimer = null;
    if (playbackMonitor !== null) window.clearInterval(playbackMonitor);
    playbackMonitor = null;
    cancelEndRecovery();
    try { youtubePlayer?.destroy?.(); } catch { /* The player may already be disconnected. */ }
    youtubePlayer = null;
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(video.youtubeId)}?autoplay=1&rel=0&playsinline=1`;
    iframe.title = `${video.title} performed by Arnie`;
    iframe.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;
    playerFrame.replaceChildren(iframe);
    playbackStatus("Automatic advancement is unavailable. Use the video controls or open this recording on YouTube.", true);
    togglePlaybackButton.disabled = true;
  }

  function startPlayback(startId) {
    playbackQueue = state.ids.map(id => videosById.get(id)).filter(video => video && hasPlayableVideo(video));
    if (!playbackQueue.length) return;
    const requestedIndex = playbackQueue.findIndex(video => video.id === startId);
    playbackIndex = requestedIndex < 0 ? 0 : requestedIndex;
    playerReady = false;
    nativePlaylist = false;
    fallbackActive = false;
    manualSelectionAt = 0;
    cancelEndRecovery();
    const session = ++playbackSession;
    const generation = ++playerGeneration;
    dialog.showModal();
    refreshCurrentTrack();
    playbackStatus("Loading the YouTube player…");
    togglePlaybackButton.textContent = "⏸ Pause";

    loadYouTubeApi().then(() => {
      if (!dialog.open || playbackSession !== session || fallbackActive || playerGeneration !== generation) return;
      const mount = document.createElement("div");
      mount.id = "arnie-youtube-player";
      playerFrame.replaceChildren(mount);
      const playerVars = { autoplay: 1, controls: 1, rel: 0, playsinline: 1 };
      if (/^https?:$/.test(window.location.protocol)) playerVars.origin = window.location.origin;
      const initialVideoId = playbackQueue[playbackIndex].youtubeId;
      youtubePlayer = new window.YT.Player(mount, {
        height: "100%",
        width: "100%",
        videoId: initialVideoId,
        playerVars,
        events: {
          onReady(event) {
            if (!dialog.open || playbackSession !== session || playerGeneration !== generation) return;
            if (playerReadyTimer !== null) window.clearTimeout(playerReadyTimer);
            playerReadyTimer = null;
            playerReady = true;
            refreshPlayerControls();
            playbackStatus("If playback doesn't begin, press Play. Some mobile browsers require another tap.");
            // YouTube's own queue controls mobile transitions more reliably
            // than repeatedly replacing individual videos via JavaScript.
            if (mobileBrowser && typeof event.target.loadPlaylist === "function") {
              try {
                nativePlaylist = true;
                event.target.loadPlaylist(playbackQueue.map(video => video.youtubeId), playbackIndex);
                startMobileMonitor(session, generation);
                return;
              } catch {
                nativePlaylist = false;
              }
            }
            // Desktop behavior is unchanged, including early Next clicks.
            if (playbackQueue[playbackIndex].youtubeId !== initialVideoId) {
              event.target.loadVideoById(playbackQueue[playbackIndex].youtubeId);
            } else event.target.playVideo();
          },
          onStateChange(event) {
            if (!dialog.open || playbackSession !== session || playerGeneration !== generation) return;
            const states = window.YT.PlayerState;
            if (event.data === states.ENDED) {
              if (nativePlaylist) recoverAfterEnd();
              else if (playbackIndex < playbackQueue.length - 1) advanceTrack(1);
              else {
                playbackStatus("Playlist complete. Thank you for listening!");
                togglePlaybackButton.textContent = "↻ Replay Song";
              }
            } else if (event.data === states.PLAYING) {
              syncNativePlaylistIndex();
              playbackStatus("Playing automatically — enjoy the music!");
              togglePlaybackButton.textContent = "⏸ Pause";
            } else if (event.data === states.PAUSED) {
              playbackStatus("Paused.");
              togglePlaybackButton.textContent = "▶ Play";
            }
          },
          onError() {
            if (!dialog.open || playbackSession !== session || playerGeneration !== generation) return;
            playbackStatus("This recording could not play here. Try the YouTube link or choose Next.", true);
            togglePlaybackButton.textContent = "▶ Retry";
          },
          onAutoplayBlocked() {
            if (!dialog.open || playbackSession !== session || playerGeneration !== generation) return;
            playbackStatus("Your browser blocked automatic playback. Tap Play in the video player or use the Play button below.");
            togglePlaybackButton.textContent = "▶ Play";
          }
        }
      });
      // Some mobile embeds never finish initializing: make Next usable
      // through a manual player instead of leaving the dialog stuck forever.
      playerReadyTimer = window.setTimeout(() => {
        playerReadyTimer = null;
        if (dialog.open && playbackSession === session && playerGeneration === generation && !playerReady) {
          showManualPlayer();
        }
      }, 12000);
    }).catch(() => {
      if (dialog.open && playbackSession === session && playerGeneration === generation) showManualPlayer();
    });
  }

  function closeDialog() {
    if (dialog.open) dialog.close();
  }

  function stopPlayer() {
    playbackSession++;
    playerGeneration++;
    if (playerReadyTimer !== null) window.clearTimeout(playerReadyTimer);
    playerReadyTimer = null;
    if (playbackMonitor !== null) window.clearInterval(playbackMonitor);
    playbackMonitor = null;
    cancelEndRecovery();
    try { youtubePlayer?.destroy?.(); } catch { /* Player may already be gone. */ }
    youtubePlayer = null;
    playerReady = false;
    nativePlaylist = false;
    fallbackActive = false;
    playbackQueue = [];
    playbackIndex = -1;
    playerFrame.replaceChildren();
    list.querySelectorAll(".currently-playing").forEach(item => {
      item.classList.remove("currently-playing");
      item.removeAttribute("aria-current");
    });
  }

  playPlaylistButton.addEventListener("click", () => startPlayback());
  previousTrackButton.addEventListener("click", () => advanceTrack(-1));
  nextTrackButton.addEventListener("click", () => advanceTrack(1));
  togglePlaybackButton.addEventListener("click", () => {
    if (!playerReady || !youtubePlayer) return;
    const current = youtubePlayer.getPlayerState();
    if (current === window.YT.PlayerState.PLAYING) youtubePlayer.pauseVideo();
    else if (current === window.YT.PlayerState.ENDED) {
      youtubePlayer.seekTo(0, true);
      youtubePlayer.playVideo();
    } else youtubePlayer.playVideo();
  });

  list.addEventListener("click", event => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const video = videosById.get(Number(button.dataset.id));
    if (!video) return;

    if (button.dataset.action === "watch") {
      startPlayback(video.id);
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
  dialog.addEventListener("close", stopPlayer);

  window.addEventListener(playlistStore.eventName, event => {
    const next = event.detail;
    if (next && Array.isArray(next.ids)) updateState(next);
  });

  updateState(state);
})();
