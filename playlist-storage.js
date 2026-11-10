"use strict";

(() => {
  const STORAGE_KEY = "arnie-playlist";
  const CHANGE_EVENT = "arnie:playlist-change";
  let memoryIds = [];
  let storage = null;

  function normalize(ids) {
    const normalized = [];
    const seen = new Set();

    if (!Array.isArray(ids)) return normalized;

    for (const value of ids) {
      const id = Number(value);
      if (Number.isInteger(id) && id > 0 && !seen.has(id)) {
        seen.add(id);
        normalized.push(id);
      }
    }
    return normalized;
  }

  try {
    storage = window.localStorage;
    storage.getItem(STORAGE_KEY);
  } catch {
    storage = null;
  }

  function read() {
    if (!storage) return { ids: [...memoryIds], available: false };

    try {
      const stored = JSON.parse(storage.getItem(STORAGE_KEY) || "[]");
      memoryIds = normalize(stored);
      return { ids: [...memoryIds], available: true };
    } catch {
      memoryIds = [];
      return { ids: [], available: true };
    }
  }

  function notify(available) {
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, {
      detail: { ids: [...memoryIds], available }
    }));
  }

  function write(ids) {
    memoryIds = normalize(ids);
    let available = Boolean(storage);

    if (storage) {
      try {
        storage.setItem(STORAGE_KEY, JSON.stringify(memoryIds));
      } catch {
        storage = null;
        available = false;
      }
    }

    notify(available);
    return { ids: [...memoryIds], available };
  }

  function add(id) {
    const current = read();
    const numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId <= 0 || current.ids.includes(numericId)) {
      return { ...current, added: false };
    }
    return { ...write([...current.ids, numericId]), added: true };
  }

  function remove(id) {
    const numericId = Number(id);
    const current = read();
    const next = current.ids.filter(item => item !== numericId);
    return { ...write(next), removed: next.length !== current.ids.length };
  }

  function move(id, direction) {
    const numericId = Number(id);
    const step = direction < 0 ? -1 : 1;
    const current = read();
    const from = current.ids.indexOf(numericId);
    const to = from + step;

    if (from < 0 || to < 0 || to >= current.ids.length) {
      return { ...current, moved: false };
    }

    const next = [...current.ids];
    [next[from], next[to]] = [next[to], next[from]];
    return { ...write(next), moved: true };
  }

  function clear() {
    return write([]);
  }

  function replace(ids) {
    return write(ids);
  }

  window.addEventListener("storage", event => {
    if (event.key !== STORAGE_KEY) return;
    try {
      memoryIds = normalize(JSON.parse(event.newValue || "[]"));
    } catch {
      memoryIds = [];
    }
    notify(true);
  });

  window.ARNIE_PLAYLIST_STORAGE = Object.freeze({
    key: STORAGE_KEY,
    eventName: CHANGE_EVENT,
    read,
    add,
    remove,
    move,
    clear,
    replace
  });
})();
