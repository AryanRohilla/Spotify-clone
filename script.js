console.log("Spotify API");
let currentSong = new Audio();
let songs;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

async function getSongs() {
  return [
    "Water - Diljit Dosanjh.mp3",
    "Tich Button (Parahuna) - Kulwinder Billa.mp3",
    "Jo Tum Mere Ho Anuv Jain 128 Kbps.mp3",
    "Tere Layi - Nirvair Pannu.mp3",
    "Tayyari Haan Di - Kulwinder Billa.mp3",
    "Suniyan Suniyan - DjPunjab.Com.Se.mp3",
    "Parindey - B Praak.mp3",
    "Magic - Diljit Dosanjh.mp3",
    "Do Vaari Jatt - Jordan Sandhu.mp3",
    "Mera Mann.mp3",
    "Udaarian - Satinder Sartaaj.mp3",
    "Kamlee - Sarrb.mp3",
    "Kulwinder Billa - Sangdi Sangdi.mp3",
    "Kho Na Baithan - Kulwinder Billa.mp3",
    "Ishq - Nirvair Pannu.mp3",
    "Irshad - Kanwar Grewal.mp3",
    "Dildarian - Kambi Rajpuria.mp3",
    "College - Mankirt Aulakh.mp3",
    "Akhiyan - Harkirat Sangha.mp3",
    "Beretta Amanraj Gill.mp3",
    "Chaaha Hai Tujhko.mp3",
    "Dhundle Dhundle - Bunny Johal.mp3",
    "Dil Tu Jaan Tu Gurnazar.mp3",
    "Snowfall - Jordan Sandhu.mp3",
    "Humko Humise Chura Lo.mp3",
    "Jo Bhi Kasmein Raaz.mp3",
    "Main Agar Saamne.mp3",
    "Tumhare Siva.mp3",
    "Woh Ladki Bahut Yaad Aati  - Qayamat .mp3",
    "Zaroor – Aparshakti Khurana .mp3"
  ];
}

const playMusic = (track, pause = false) => {
    currentSong.src = "/songs/" + track;
    if (!pause) {
        currentSong.play();
        play.src = "img/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};

async function main() {
    songs = await getSongs();
    playMusic(songs[0], true);

    let songUL = document.querySelector(".songList ul");
    songs.forEach(song => {
        songUL.innerHTML += `<li>
            <img class="invert" width="34" src="img/music.svg" alt="">
            <div class="info">
                <div>${song.replaceAll("%20", " ")}</div>
                <div>Punjabi Music</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="img/play.svg" alt="">
            </div>
        </li>`;
    });

    document.querySelectorAll(".songList li").forEach((e, index) => {
        e.addEventListener("click", () => {
            playMusic(songs[index]);
        });
    });

    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            play.src = "img/pause.svg";
        } else {
            currentSong.pause();
            play.src = "img/play.svg";
        }
    });

    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = Math.min((currentSong.currentTime / currentSong.duration) * 100) + "%";
    });

    document.querySelector(".seekbar").addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent) / 100;
    });

    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-130%";
    });

    // Fix previous button
    previous.addEventListener("click", () => {
        currentSong.pause();
        let currentFilename = decodeURIComponent(currentSong.src.split("/").pop());
        let index = songs.indexOf(currentFilename);
        if (index > 0) {
            playMusic(songs[index - 1]);
        }
    });

    // Fix next button
    next.addEventListener("click", () => {
        currentSong.pause();
        let currentFilename = decodeURIComponent(currentSong.src.split("/").pop());
        let index = songs.indexOf(currentFilename);
        if (index < songs.length - 1) {
            playMusic(songs[index + 1]);
        }
    });

    document.querySelector(".range input").addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100;
        document.querySelector(".volume>img").src = currentSong.volume > 0 ? "img/volume.svg" : "img/mute.svg";
    });

    document.querySelector(".volume>img").addEventListener("click", e => {
        if (e.target.src.includes("img/volume.svg")) {
            e.target.src = "img/mute.svg";
            currentSong.volume = 0;
            document.querySelector(".range input").value = 0;
        } else {
            e.target.src = "img/volume.svg";
            currentSong.volume = 0.1;
            document.querySelector(".range input").value = 10;
        }
    });
}

main();






// It is not used in the code but it is a function to get songs from a folder using fetch API
// // async function getSongs(folder) {
//     currFolder = folder;
//     try {
//         let response = await fetch(http://127.0.0.1:5500/${folder}/);
//         let text = await response.text();
//         let div = document.createElement("div");
//         div.innerHTML = text;
//         let as = div.getElementsByTagName("a");
//         let songList = [];
        
//         for (let element of as) {
//             if (element.href.endsWith(".mp3")) {
//                 songList.push(decodeURIComponent(element.href.split("/songs/")[1]));
//             }
//         }
//         return songList;
//     } catch (error) {
//         console.error("Error fetching songs:", error);
//         return [];
//     }
// }