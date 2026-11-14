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
    "https://i.ytimg.com/vi/wMm1Z3G-4LI/hqdefault.jpg",
    "https://i.ytimg.com/vi/3urL2qmECMI/hqdefault.jpg",
    "https://i.ytimg.com/vi/8rmA93NcL_0/hqdefault.jpg",
    "https://i.ytimg.com/vi/ih-ZGA9pJCU/hqdefault.jpg",
    "https://i.ytimg.com/vi/fd6hRqX4g5A/hqdefault.jpg",
    "https://i.ytimg.com/vi/a1yGJl6QSjE/hqdefault.jpg",
    "https://i.ytimg.com/vi/0dvq_g4UJuw/hqdefault.jpg",
    "https://i.ytimg.com/vi/ek4EcxwxPKE/hqdefault.jpg",
    "https://i.ytimg.com/vi/yJBLCHpnBXk/hqdefault.jpg",
    "https://i.ytimg.com/vi/B2DJPTa3Tl8/hqdefault.jpg",
    "https://i.ytimg.com/vi/oF4QvMUu8nk/hqdefault.jpg"
,
    "https://i.ytimg.com/vi/DUff4fg9_Bs/hqdefault.jpg",
    "https://i.ytimg.com/vi/my9ULYZc7lE/hqdefault.jpg",
    "https://i.ytimg.com/vi/NaC5JgE1xoI/hqdefault.jpg",
    "https://i.ytimg.com/vi/Q0al3ygprwc/hqdefault.jpg",
    "https://i.ytimg.com/vi/XoSa2R6RMgM/hqdefault.jpg",
    "https://i.ytimg.com/vi/xDZ25Xf4EsE/hqdefault.jpg",
    "https://i.ytimg.com/vi/TW2Ho5CbTOk/hqdefault.jpg",
    "https://i.ytimg.com/vi/19GA07yAUbQ/hqdefault.jpg",
    "https://i.ytimg.com/vi/kQNkvM-riSA/hqdefault.jpg",
    "https://i.ytimg.com/vi/dV8Kj1wTUD8/hqdefault.jpg",
    "https://i.ytimg.com/vi/Hc0UrLW1M4g/hqdefault.jpg",
    "https://i.ytimg.com/vi/gb6SvfHYnxM/hqdefault.jpg",
    "https://i.ytimg.com/vi/TDeF4Nu_FA8/hqdefault.jpg",
    "https://i.ytimg.com/vi/VIyDxwuAWFo/hqdefault.jpg",
    "https://i.ytimg.com/vi/dhz8GQTAzkk/hqdefault.jpg",
    "https://i.ytimg.com/vi/qcwEax-hPfU/hqdefault.jpg",
    "https://i.ytimg.com/vi/697DN3L2LpA/hqdefault.jpg",
    "https://i.ytimg.com/vi/MvMIxuGITAs/hqdefault.jpg",
    "https://i.ytimg.com/vi/M1lf7kaugSc/hqdefault.jpg",
    "https://i.ytimg.com/vi/HAJspIT0w3c/hqdefault.jpg",
    "https://i.ytimg.com/vi/kmSezc0-G_U/hqdefault.jpg",
    "https://i.ytimg.com/vi/f5H6de0PEdg/hqdefault.jpg",
    "https://i.ytimg.com/vi/zkICbhKH39A/hqdefault.jpg",
    "https://i.ytimg.com/vi/dKEi43KF5q0/hqdefault.jpg",
    "https://i.ytimg.com/vi/eJK_KI-TRZw/hqdefault.jpg",
    "https://i.ytimg.com/vi/Zsa_u8Hg8Hw/hqdefault.jpg",
    "https://i.ytimg.com/vi/9wdI3V7hk4A/hqdefault.jpg",
    "https://i.ytimg.com/vi/Wpv8JCYB4tw/hqdefault.jpg",
    "https://i.ytimg.com/vi/cOXdI6gNPus/hqdefault.jpg",
    "https://i.ytimg.com/vi/yhxD-kMhIdU/hqdefault.jpg",
    "https://i.ytimg.com/vi/zAa-nPxXlcI/hqdefault.jpg",
    "https://i.ytimg.com/vi/elYPVmh7158/hqdefault.jpg",
    "https://i.ytimg.com/vi/bwzsCoHrXAk/hqdefault.jpg",
    "https://i.ytimg.com/vi/_NzEGjPzXls/hqdefault.jpg"
  ];

  const videos = [
    { id: 101, title: "It Hurts Me Too", artist: "Bob Dylan", artistRole: "Original artist", genre: "Blues", thumb: 0, featured: true, youtubeId: "8psPWGta_zo", youtubeUrl: "https://www.youtube.com/watch?v=8psPWGta_zo", embeddable: true },
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
    ,
    { id: 124, title: "Yogurt Lady", artist: "To be confirmed", artistRole: "Original artist", genre: "Unclassified", thumb: 23, featured: false, youtubeId: "3urL2qmECMI", youtubeUrl: "https://www.youtube.com/watch?v=3urL2qmECMI", embeddable: true },
    { id: 125, title: "Up on Cripple Creek", artist: "The Band", artistRole: "Original artist", genre: "Roots Rock", thumb: 24, featured: false, youtubeId: "8rmA93NcL_0", youtubeUrl: "https://www.youtube.com/watch?v=8rmA93NcL_0", embeddable: true },
    { id: 126, title: "Take It Easy", artist: "Jackson Browne", artistRole: "Songwriters", genre: "Rock", thumb: 25, featured: false, youtubeId: "ih-ZGA9pJCU", youtubeUrl: "https://www.youtube.com/watch?v=ih-ZGA9pJCU", embeddable: true },
    { id: 127, title: "Silver Cup Silver Spoon", artist: "To be confirmed", artistRole: "Original artist", genre: "Unclassified", thumb: 26, featured: false, youtubeId: "fd6hRqX4g5A", youtubeUrl: "https://www.youtube.com/watch?v=fd6hRqX4g5A", embeddable: true },
    { id: 128, title: "Noodling", artist: "Improvisation", artistRole: "Instrumental", genre: "Instrumental", thumb: 27, featured: false, youtubeId: "a1yGJl6QSjE", youtubeUrl: "https://www.youtube.com/watch?v=a1yGJl6QSjE", embeddable: true },
    { id: 129, title: "Mr. Tambourine Man", artist: "Bob Dylan", artistRole: "Original artist", genre: "Folk Rock", thumb: 28, featured: false, youtubeId: "0dvq_g4UJuw", youtubeUrl: "https://www.youtube.com/watch?v=0dvq_g4UJuw", embeddable: true },
    { id: 130, title: "I Got the Hots for You Babe", artist: "To be confirmed", artistRole: "Original artist", genre: "Unclassified", thumb: 29, featured: false, youtubeId: "ek4EcxwxPKE", youtubeUrl: "https://www.youtube.com/watch?v=ek4EcxwxPKE", embeddable: true },
    { id: 131, title: "Her Majesty", artist: "The Beatles", artistRole: "Original artist", genre: "Rock", thumb: 30, featured: false, youtubeId: "yJBLCHpnBXk", youtubeUrl: "https://www.youtube.com/watch?v=yJBLCHpnBXk", embeddable: true },
    { id: 132, title: "Acoustic Noodling", artist: "Improvisation", artistRole: "Instrumental", genre: "Instrumental", thumb: 31, featured: false, youtubeId: "B2DJPTa3Tl8", youtubeUrl: "https://www.youtube.com/watch?v=B2DJPTa3Tl8", embeddable: true },
    { id: 133, title: "Yogurt Lady", artist: "Bob Dylan", artistRole: "Original artist", genre: "Folk Rock", thumb: 32, featured: false, youtubeId: "oF4QvMUu8nk", youtubeUrl: "https://www.youtube.com/watch?v=oF4QvMUu8nk", embeddable: true }
,
    { id: 134, title: "Keep Me in Your Heart", artist: "Warren Zevon", artistRole: "Song artist", genre: "Music", thumb: 33, featured: false, youtubeId: "DUff4fg9_Bs", youtubeUrl: "https://www.youtube.com/watch?v=DUff4fg9_Bs", embeddable: true },
    { id: 135, title: "No Expectations", artist: "The Rolling Stones", artistRole: "Song artist", genre: "Music", thumb: 34, featured: false, youtubeId: "my9ULYZc7lE", youtubeUrl: "https://www.youtube.com/watch?v=my9ULYZc7lE", embeddable: true },
    { id: 136, title: "Desolation Row", artist: "Bob Dylan", artistRole: "Song artist", genre: "Music", thumb: 35, featured: false, youtubeId: "NaC5JgE1xoI", youtubeUrl: "https://www.youtube.com/watch?v=NaC5JgE1xoI", embeddable: true },
    { id: 137, title: "Early Morning Rain", artist: "Gordon Lightfoot", artistRole: "Song artist", genre: "Music", thumb: 36, featured: false, youtubeId: "Q0al3ygprwc", youtubeUrl: "https://www.youtube.com/watch?v=Q0al3ygprwc", embeddable: true },
    { id: 138, title: "Queen Jane Approximately", artist: "Bob Dylan", artistRole: "Song artist", genre: "Music", thumb: 37, featured: false, youtubeId: "XoSa2R6RMgM", youtubeUrl: "https://www.youtube.com/watch?v=XoSa2R6RMgM", embeddable: true },
    { id: 139, title: "Angel from Montgomery", artist: "John Prine", artistRole: "Song artist", genre: "Music", thumb: 38, featured: false, youtubeId: "xDZ25Xf4EsE", youtubeUrl: "https://www.youtube.com/watch?v=xDZ25Xf4EsE", embeddable: true },
    { id: 140, title: "City of New Orleans", artist: "Steve Goodman", artistRole: "Song artist", genre: "Music", thumb: 39, featured: false, youtubeId: "TW2Ho5CbTOk", youtubeUrl: "https://www.youtube.com/watch?v=TW2Ho5CbTOk", embeddable: true },
    { id: 141, title: "I Can’t Help Myself", artist: "Four Tops", artistRole: "Song artist", genre: "Music", thumb: 40, featured: false, youtubeId: "19GA07yAUbQ", youtubeUrl: "https://www.youtube.com/watch?v=19GA07yAUbQ", embeddable: true },
    { id: 142, title: "Children of Darkness", artist: "Richard Fariña", artistRole: "Song artist", genre: "Music", thumb: 41, featured: false, youtubeId: "kQNkvM-riSA", youtubeUrl: "https://www.youtube.com/watch?v=kQNkvM-riSA", embeddable: true },
    { id: 143, title: "Coming Into Los Angeles", artist: "Arlo Guthrie", artistRole: "Song artist", genre: "Music", thumb: 42, featured: false, youtubeId: "dV8Kj1wTUD8", youtubeUrl: "https://www.youtube.com/watch?v=dV8Kj1wTUD8", embeddable: true },
    { id: 144, title: "Pack Up Your Sorrows", artist: "Richard Fariña", artistRole: "Song artist", genre: "Music", thumb: 43, featured: false, youtubeId: "Hc0UrLW1M4g", youtubeUrl: "https://www.youtube.com/watch?v=Hc0UrLW1M4g", embeddable: true },
    { id: 145, title: "Telegraph Road - Version 2", artist: "Dire Straits", artistRole: "Song artist", genre: "Music", thumb: 44, featured: false, youtubeId: "gb6SvfHYnxM", youtubeUrl: "https://www.youtube.com/watch?v=gb6SvfHYnxM", embeddable: true },
    { id: 146, title: "Telegraph Road - Version 1", artist: "Dire Straits", artistRole: "Song artist", genre: "Music", thumb: 45, featured: false, youtubeId: "TDeF4Nu_FA8", youtubeUrl: "https://www.youtube.com/watch?v=TDeF4Nu_FA8", embeddable: true },
    { id: 147, title: "Before the Deluge", artist: "Jackson Browne", artistRole: "Song artist", genre: "Music", thumb: 46, featured: false, youtubeId: "VIyDxwuAWFo", youtubeUrl: "https://www.youtube.com/watch?v=VIyDxwuAWFo", embeddable: true },
    { id: 148, title: "Days Like This", artist: "Van Morrison", artistRole: "Song artist", genre: "Music", thumb: 47, featured: false, youtubeId: "dhz8GQTAzkk", youtubeUrl: "https://www.youtube.com/watch?v=dhz8GQTAzkk", embeddable: true },
    { id: 149, title: "Running on Empty", artist: "Jackson Browne", artistRole: "Song artist", genre: "Music", thumb: 48, featured: false, youtubeId: "qcwEax-hPfU", youtubeUrl: "https://www.youtube.com/watch?v=qcwEax-hPfU", embeddable: true },
    { id: 150, title: "When the Ship Comes In", artist: "Bob Dylan", artistRole: "Song artist", genre: "Music", thumb: 49, featured: false, youtubeId: "697DN3L2LpA", youtubeUrl: "https://www.youtube.com/watch?v=697DN3L2LpA", embeddable: true },
    { id: 151, title: "All Along the Watchtower", artist: "Bob Dylan", artistRole: "Song artist", genre: "Music", thumb: 50, featured: false, youtubeId: "MvMIxuGITAs", youtubeUrl: "https://www.youtube.com/watch?v=MvMIxuGITAs", embeddable: true },
    { id: 152, title: "Brown Eyed Girl", artist: "Van Morrison", artistRole: "Song artist", genre: "Music", thumb: 51, featured: false, youtubeId: "M1lf7kaugSc", youtubeUrl: "https://www.youtube.com/watch?v=M1lf7kaugSc", embeddable: true },
    { id: 153, title: "Buckets of Rain", artist: "Bob Dylan", artistRole: "Song artist", genre: "Music", thumb: 52, featured: false, youtubeId: "HAJspIT0w3c", youtubeUrl: "https://www.youtube.com/watch?v=HAJspIT0w3c", embeddable: true },
    { id: 154, title: "Into the Mystic", artist: "Van Morrison", artistRole: "Song artist", genre: "Music", thumb: 53, featured: false, youtubeId: "kmSezc0-G_U", youtubeUrl: "https://www.youtube.com/watch?v=kmSezc0-G_U", embeddable: true },
    { id: 155, title: "Nobody’s Got the Gun", artist: "Mark Knopfler", artistRole: "Song artist", genre: "Music", thumb: 54, featured: false, youtubeId: "f5H6de0PEdg", youtubeUrl: "https://www.youtube.com/watch?v=f5H6de0PEdg", embeddable: true },
    { id: 156, title: "Someone Like You", artist: "Van Morrison", artistRole: "Song artist", genre: "Music", thumb: 55, featured: false, youtubeId: "zkICbhKH39A", youtubeUrl: "https://www.youtube.com/watch?v=zkICbhKH39A", embeddable: true },
    { id: 157, title: "Tupelo Honey", artist: "Van Morrison", artistRole: "Song artist", genre: "Music", thumb: 56, featured: false, youtubeId: "dKEi43KF5q0", youtubeUrl: "https://www.youtube.com/watch?v=dKEi43KF5q0", embeddable: true },
    { id: 158, title: "We’ll Meet Again", artist: "Vera Lynn", artistRole: "Song artist", genre: "Music", thumb: 57, featured: false, youtubeId: "eJK_KI-TRZw", youtubeUrl: "https://www.youtube.com/watch?v=eJK_KI-TRZw", embeddable: true },
    { id: 159, title: "In My Life", artist: "The Beatles", artistRole: "Song artist", genre: "Music", thumb: 58, featured: false, youtubeId: "Zsa_u8Hg8Hw", youtubeUrl: "https://www.youtube.com/watch?v=Zsa_u8Hg8Hw", embeddable: true },
    { id: 160, title: "Everybody Pays", artist: "Mark Knopfler", artistRole: "Song artist", genre: "Music", thumb: 59, featured: false, youtubeId: "9wdI3V7hk4A", youtubeUrl: "https://www.youtube.com/watch?v=9wdI3V7hk4A", embeddable: true },
    { id: 161, title: "Human", artist: "The Killers", artistRole: "Song artist", genre: "Music", thumb: 60, featured: false, youtubeId: "Wpv8JCYB4tw", youtubeUrl: "https://www.youtube.com/watch?v=Wpv8JCYB4tw", embeddable: true },
    { id: 162, title: "Blue Bayou", artist: "Roy Orbison", artistRole: "Song artist", genre: "Music", thumb: 61, featured: false, youtubeId: "cOXdI6gNPus", youtubeUrl: "https://www.youtube.com/watch?v=cOXdI6gNPus", embeddable: true },
    { id: 163, title: "Matchstick Man", artist: "Mark Knopfler", artistRole: "Song artist", genre: "Music", thumb: 62, featured: false, youtubeId: "yhxD-kMhIdU", youtubeUrl: "https://www.youtube.com/watch?v=yhxD-kMhIdU", embeddable: true },
    { id: 164, title: "Our House - Version 1", artist: "Crosby, Stills, Nash & Young", artistRole: "Song artist", genre: "Music", thumb: 63, featured: false, youtubeId: "zAa-nPxXlcI", youtubeUrl: "https://www.youtube.com/watch?v=zAa-nPxXlcI", embeddable: true },
    { id: 165, title: "Our House - Version 2", artist: "Crosby, Stills, Nash & Young", artistRole: "Song artist", genre: "Music", thumb: 64, featured: false, youtubeId: "elYPVmh7158", youtubeUrl: "https://www.youtube.com/watch?v=elYPVmh7158", embeddable: true },
    { id: 166, title: "Up on the Roof", artist: "The Drifters", artistRole: "Song artist", genre: "Music", thumb: 65, featured: false, youtubeId: "bwzsCoHrXAk", youtubeUrl: "https://www.youtube.com/watch?v=bwzsCoHrXAk", embeddable: true },
    { id: 167, title: "You Ain’t Going Nowhere", artist: "Bob Dylan", artistRole: "Song artist", genre: "Music", thumb: 66, featured: false, youtubeId: "_NzEGjPzXls", youtubeUrl: "https://www.youtube.com/watch?v=_NzEGjPzXls", embeddable: true }
  ];

  // Keep each song's versions together, in numerical order, while preserving
  // the original placement of every song group and all unrelated songs.
  // New versions added to this data file are ordered automatically.
  const versionInfo = title => {
    const match = title.match(/^(.*?)\s*(?:[-–—]\s*)?\(?Version\s+(\d+)\)?\s*$/i);
    return match ? { song: match[1].trim().toLowerCase(), number: Number(match[2]) } : null;
  };
  const songGroups = new Map();
  for (const video of videos) {
    const info = versionInfo(video.title);
    if (!info) continue;
    if (!songGroups.has(info.song)) songGroups.set(info.song, []);
    songGroups.get(info.song).push(video);
  }
  for (const group of songGroups.values()) {
    group.sort((a, b) => versionInfo(a.title).number - versionInfo(b.title).number);
  }
  const emitted = new Set();
  const orderedVideos = [];
  for (const video of videos) {
    const info = versionInfo(video.title);
    if (!info) { orderedVideos.push(video); continue; }
    if (emitted.has(info.song)) continue;
    orderedVideos.push(...songGroups.get(info.song));
    emitted.add(info.song);
  }

  const weekendTitles = new Set(["noodling", "her majesty", "up on cripple creek", "harvest moon", "acoustic noodling", "i got the hots for you babe", "mr. tambourine man", "take it easy", "yogurt lady", "silver cup silver spoon", "the wind blows chilly", "i shall be released", "when i paint my masterpiece", "queen jane approximately", "early morning rain", "desolation row", "louise", "i can’t help falling in love", "city of new orleans", "angel from montgomery", "telegraph road", "pack up your sorrows", "coming into los angeles", "children of darkness", "when the ship comes in", "running on empty", "days like this", "call it a loan", "before the deluge", "brown eyed girl", "into the mystic", "tupelo honey", "someone like you"]);
  for (const video of orderedVideos) {
    const base = video.title.replace(/\s*[-–—]\s*Version\s+\d+$/i, "").toLowerCase();
    video.weekendInMaine = weekendTitles.has(base);
  }

  window.ARNIE_MUSIC_DATA = Object.freeze({
    playlistUrl,
    photos: Object.freeze(photos),
    videos: Object.freeze(orderedVideos.map(video => Object.freeze(video)))
  });
})();
