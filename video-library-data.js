"use strict";

(() => {
  const playlistUrl = "https://www.youtube.com/playlist?list=PLHNwQ7xl7u1E";
  const photos = [
    "https://i.ytimg.com/vi/8psPWGta_zo/hqdefault.jpg",
    "https://i.ytimg.com/vi/Xdsb9u6d8q8/hqdefault.jpg",
    "https://i.ytimg.com/vi/0qIqh7VOs70/hqdefault.jpg",
    "https://i.ytimg.com/vi/Jfzl9nfUk0U/hqdefault.jpg",
    "https://i.ytimg.com/vi/lnB50AoYhJU/hqdefault.jpg",
    "https://i.ytimg.com/vi/FF3gnLnczaI/hqdefault.jpg",
    "https://i.ytimg.com/vi/WQ69BOg7ReM/hqdefault.jpg",
    "https://i.ytimg.com/vi/oJN4yJhgxok/hqdefault.jpg",
    "https://i.ytimg.com/vi/pmhGp5Qgczg/hqdefault.jpg",
    "https://i.ytimg.com/vi/R2OBKnPrmLI/hqdefault.jpg",
    "https://i.ytimg.com/vi/tc9rp47y9dI/hqdefault.jpg",
    "https://i.ytimg.com/vi/yZOGKIlRV_c/hqdefault.jpg",
    "https://i.ytimg.com/vi/zDkPizB6hcY/hqdefault.jpg",
    "https://i.ytimg.com/vi/-J2DoDgy5oA/hqdefault.jpg",
    "https://i.ytimg.com/vi/dlVheTJkerw/hqdefault.jpg",
    "https://i.ytimg.com/vi/LObBiMbhKBI/hqdefault.jpg",
    "https://i.ytimg.com/vi/GpVKPFU_pEY/hqdefault.jpg",
    "https://i.ytimg.com/vi/hJ1Kkwqoam4/hqdefault.jpg",
    "https://i.ytimg.com/vi/IPwy2h-b73Y/hqdefault.jpg",
    "https://i.ytimg.com/vi/pbYYr-hAwRo/hqdefault.jpg",
    "https://i.ytimg.com/vi/ZRxzgjfjpeQ/hqdefault.jpg",
    "https://i.ytimg.com/vi/fHUBM50JrOE/hqdefault.jpg",
    "https://i.ytimg.com/vi/wMm1Z3G-4LI/hqdefault.jpg"
  ];

  const videos = [
    { id: 101, title: "It Hurts Me Too", artist: "Tampa Red", artistRole: "Original artist", genre: "Blues", thumb: 0, featured: true, youtubeId: "8psPWGta_zo", youtubeUrl: "https://www.youtube.com/watch?v=8psPWGta_zo", embeddable: true },
    { id: 102, title: "The Wind Blows Chilly", artist: "B&B", artistRole: "Original artist", genre: "Unclassified", thumb: 1, featured: false, youtubeId: "Xdsb9u6d8q8", youtubeUrl: "https://www.youtube.com/watch?v=Xdsb9u6d8q8", embeddable: true },
    { id: 103, title: "I'll Be Your Baby Tonight", artist: "Bob Dylan", artistRole: "Original artist", genre: "Folk", thumb: 2, featured: true, youtubeId: "0qIqh7VOs70", youtubeUrl: "https://www.youtube.com/watch?v=0qIqh7VOs70", embeddable: true },
    { id: 104, title: "Helplessly Hoping", artist: "Crosby, Stills & Nash", artistRole: "Original artist", genre: "Folk Rock", thumb: 3, featured: true, youtubeId: "Jfzl9nfUk0U", youtubeUrl: "https://www.youtube.com/watch?v=Jfzl9nfUk0U", embeddable: true },
    { id: 105, title: "Going Home Version 4", artist: "Mark Knopfler", artistRole: "Original artist", genre: "Instrumental Rock", thumb: 4, featured: false, youtubeId: "lnB50AoYhJU", youtubeUrl: "https://www.youtube.com/watch?v=lnB50AoYhJU", embeddable: true },
    { id: 106, title: "Going Home Version 3", artist: "Mark Knopfler", artistRole: "Original artist", genre: "Instrumental Rock", thumb: 5, featured: false, youtubeId: "FF3gnLnczaI", youtubeUrl: "https://www.youtube.com/watch?v=FF3gnLnczaI", embeddable: true },
    { id: 107, title: "Going Home Version 2", artist: "Mark Knopfler", artistRole: "Original artist", genre: "Instrumental Rock", thumb: 6, featured: false, youtubeId: "WQ69BOg7ReM", youtubeUrl: "https://www.youtube.com/watch?v=WQ69BOg7ReM", embeddable: true },
    { id: 108, title: "Going Home Version 1", artist: "Mark Knopfler", artistRole: "Original artist", genre: "Instrumental Rock", thumb: 7, featured: false, youtubeId: "oJN4yJhgxok", youtubeUrl: "https://www.youtube.com/watch?v=oJN4yJhgxok", embeddable: true },
    { id: 109, title: "For A Dancer", artist: "Jackson Browne", artistRole: "Original artist", genre: "Folk Rock", thumb: 8, featured: true, youtubeId: "pmhGp5Qgczg", youtubeUrl: "https://www.youtube.com/watch?v=pmhGp5Qgczg", embeddable: true },
    { id: 110, title: "Father and Daughter", artist: "Paul Simon", artistRole: "Original artist", genre: "Folk Rock", thumb: 9, featured: false, youtubeId: "R2OBKnPrmLI", youtubeUrl: "https://www.youtube.com/watch?v=R2OBKnPrmLI", embeddable: true },
    { id: 111, title: "Beast of Burden", artist: "The Rolling Stones", artistRole: "Original artist", genre: "Rock", thumb: 10, featured: true, youtubeId: "tc9rp47y9dI", youtubeUrl: "https://www.youtube.com/watch?v=tc9rp47y9dI", embeddable: true },
    { id: 112, title: "Why Worry - Three Different Sample Tracks", artist: "Mark Knopfler", artistRole: "Original artist", genre: "Rock", thumb: 11, featured: false, youtubeId: "yZOGKIlRV_c", youtubeUrl: "https://www.youtube.com/watch?v=yZOGKIlRV_c", embeddable: true },
    { id: 113, title: "Why Worry", artist: "Mark Knopfler", artistRole: "Original artist", genre: "Rock", thumb: 12, featured: false, youtubeId: "zDkPizB6hcY", youtubeUrl: "https://www.youtube.com/watch?v=zDkPizB6hcY", embeddable: true },
    { id: 114, title: "Isn't It A Pity", artist: "George Harrison", artistRole: "Original artist", genre: "Rock", thumb: 13, featured: false, youtubeId: "-J2DoDgy5oA", youtubeUrl: "https://www.youtube.com/watch?v=-J2DoDgy5oA", embeddable: true },
    { id: 115, title: "Beautiful Boy", artist: "John Lennon", artistRole: "Original artist", genre: "Rock", thumb: 14, featured: false, youtubeId: "dlVheTJkerw", youtubeUrl: "https://www.youtube.com/watch?v=dlVheTJkerw", embeddable: true },
    { id: 116, title: "If Not For You - Version 2", artist: "Bob Dylan", artistRole: "Original artist", genre: "Folk Rock", thumb: 15, featured: false, youtubeId: "LObBiMbhKBI", youtubeUrl: "https://www.youtube.com/watch?v=LObBiMbhKBI", embeddable: true },
    { id: 117, title: "If Not For You - Version 1", artist: "Bob Dylan", artistRole: "Original artist", genre: "Folk Rock", thumb: 16, featured: false, youtubeId: "GpVKPFU_pEY", youtubeUrl: "https://www.youtube.com/watch?v=GpVKPFU_pEY", embeddable: true },
    { id: 118, title: "The Man In Me - Version 2", artist: "Bob Dylan", artistRole: "Original artist", genre: "Folk Rock", thumb: 17, featured: false, youtubeId: "hJ1Kkwqoam4", youtubeUrl: "https://www.youtube.com/watch?v=hJ1Kkwqoam4", embeddable: true },
    { id: 119, title: "The Man In Me - Version 1", artist: "Bob Dylan", artistRole: "Original artist", genre: "Folk Rock", thumb: 18, featured: false, youtubeId: "IPwy2h-b73Y", youtubeUrl: "https://www.youtube.com/watch?v=IPwy2h-b73Y", embeddable: true },
    { id: 120, title: "Sounds of Silence - Version 2", artist: "Simon & Garfunkel", artistRole: "Original artist", genre: "Folk", thumb: 19, featured: false, youtubeId: "pbYYr-hAwRo", youtubeUrl: "https://www.youtube.com/watch?v=pbYYr-hAwRo", embeddable: true },
    { id: 121, title: "Sounds of Silence - Version 1", artist: "Simon & Garfunkel", artistRole: "Original artist", genre: "Folk", thumb: 20, featured: false, youtubeId: "ZRxzgjfjpeQ", youtubeUrl: "https://www.youtube.com/watch?v=ZRxzgjfjpeQ", embeddable: true },
    { id: 122, title: "Sign On The Window", artist: "Bob Dylan", artistRole: "Original artist", genre: "Folk Rock", thumb: 21, featured: false, youtubeId: "fHUBM50JrOE", youtubeUrl: "https://www.youtube.com/watch?v=fHUBM50JrOE", embeddable: true },
    { id: 123, title: "It Takes A Lot To Laugh", artist: "Bob Dylan", artistRole: "Original artist", genre: "Blues Rock", thumb: 22, featured: false, youtubeId: "wMm1Z3G-4LI", youtubeUrl: "https://www.youtube.com/watch?v=wMm1Z3G-4LI", embeddable: true }
  ];

  window.ARNIE_MUSIC_DATA = Object.freeze({
    playlistUrl,
    photos: Object.freeze(photos),
    videos: Object.freeze(videos.map(video => Object.freeze(video)))
  });
})();
