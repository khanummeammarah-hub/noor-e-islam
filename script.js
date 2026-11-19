
let count = 0;

function increaseCount() {
    count++;
    document.getElementById("count").innerText = count;
}

function resetCount() {
    count = 0;
    document.getElementById("count").innerText = count;
}


function showMessage(feature) {
    if (feature === "Quran Shareef") {
        openQuran();
    } else {
        alert(feature + " coming soon!");
    }
}

async function openQuran() {
    let section = document.createElement("div");

    section.style.cssText = `
        position: fixed;
        inset: 5%;
        background: white;
        color: #064e3b;
        padding: 20px;
        border-radius: 15px;
        overflow-y: auto;
        z-index: 9999;
    `;

    section.innerHTML = `
        <button id="closeQuran">✖ Close</button>
        <h2>📖 Quran Shareef</h2>
        <p>Choose a Surah</p>
        <div id="surahList">Loading Surahs...</div>
        <div id="ayahs"></div>
    `;

    document.body.appendChild(section);

    section.querySelector("#closeQuran").onclick = () => {
        section.remove();
    };

    try {
        let response = await fetch(
            "https://api.alquran.cloud/v1/surah"
        );

        let data = await response.json();

        let list = section.querySelector("#surahList");

        list.innerHTML = data.data.map(surah => `
            <button class="surahBtn" data-id="${surah.number}"
            style="display:block;width:100%;padding:12px;margin:5px 0;">
                ${surah.number}. ${surah.englishName}
                (${surah.name})
            </button>
        `).join("");

        list.querySelectorAll(".surahBtn").forEach(btn => {
            btn.onclick = async () => {
                let res = await fetch(
                    "https://api.alquran.cloud/v1/surah/" +
                    btn.dataset.id
                );

                let result = await res.json();

                section.querySelector("#ayahs").innerHTML =
                    "<h2>" + result.data.name + "</h2>" +
                    result.data.ayahs.map(ayah =>
                        `<p style="font-size:25px;text-align:right;line-height:2;">
                        ${ayah.text} ۝</p>`
                    ).join("");
            };
        });

    } catch (error) {
        section.querySelector("#surahList").innerText =
            "Internet connection required. Please try again.";
    }
}


async function showNamaz() {
    let section = document.createElement("div");

    section.style.cssText = `
        position: fixed;
        inset: 5%;
        background: white;
        color: #075c40;
        padding: 20px;
        border-radius: 15px;
        overflow-y: auto;
        z-index: 9999;
        text-align: center;
    `;

    section.innerHTML = `
        <button id="closeNamaz">✖ Close</button>
        <h2>🕌 Namaz Timings</h2>
        <p>Mumbai, India</p>
        <div id="namazList">Loading timings...</div>
    `;

    document.body.appendChild(section);

    section.querySelector("#closeNamaz").onclick = () => {
        section.remove();
    };

    try {
        let response = await fetch(
            "https://api.aladhan.com/v1/timingsByCity?city=Mumbai&country=India&method=1"
        );

        let result = await response.json();
        let times = result.data.timings;

        let prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

        section.querySelector("#namazList").innerHTML =
            prayers.map(name => `
                <div style="
                    background:#e7f4ed;
                    padding:15px;
                    margin:10px;
                    border-radius:10px;
                    font-size:20px;
                ">
                    ${name} : <b>${times[name]}</b>
                </div>
            `).join("");

    } catch (error) {
        section.querySelector("#namazList").innerText =
            "Please check your internet connection.";
    }
}

    function showDuas() {
    let box = document.createElement("div");

    box.style.cssText = `
        position:fixed;
        inset:5%;
        background:white;
        color:#075c40;
        padding:20px;
        border-radius:15px;
        overflow-y:auto;
        z-index:9999;
        text-align:center;
    `;

    box.innerHTML = `
        <button id="closeDuas">✖ Close</button>
        <h2>🤲 Daily Duas</h2>

        <h3>1. Dua Before Eating</h3>
        <p>بِسْمِ اللَّهِ</p>
        <p>Bismillah</p>
        <p>Meaning: In the name of Allah.</p>

        <hr>

        <h3>2. Dua After Eating</h3>
        <p>الْحَمْدُ لِلَّهِ</p>
        <p>Alhamdulillah</p>
        <p>Meaning: All praise is for Allah.</p>

        <hr>

        <h3>3. Dua Before Sleeping</h3>
        <p>بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا</p>
        <p>Bismika Allahumma amootu wa ahya</p>
        <p>Meaning: In Your name, O Allah, I die and I live.</p>

        <hr>

        <h3>4. Dua After Waking Up</h3>
        <p>الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا</p>
        <p>Alhamdulillahil-ladhi ahyana</p>
        <p>Meaning: All praise is for Allah who gave us life.</p>

        <hr>

        <h3>5. Dua Before Entering Home</h3>
        <p>بِسْمِ اللَّهِ وَلَجْنَا</p>
        <p>Bismillahi walajna</p>
        <p>Meaning: In the name of Allah, we enter.</p>
    `;

    document.body.appendChild(box);

    document.getElementById("closeDuas").onclick = () => {
        box.remove();
    };
}
function showHadith() {
    let box = document.createElement("div");

    box.style.cssText = `
        position:fixed;
        inset:5%;
        background:white;
        color:#075c40;
        padding:20px;
        border-radius:15px;
        overflow-y:auto;
        z-index:9999;
        text-align:center;
    `;

    box.innerHTML = `
        <button id="closeHadith">✖ Close</button>

        <h2>📜 Daily Hadith</h2>

        <hr>

        <h3>Hadith 1</h3>
        <p>إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ</p>
        <p><b>Meaning:</b> Actions are judged by intentions.</p>
        <p><b>Reference:</b> Sahih al-Bukhari 1</p>

        <hr>

        <h3>Hadith 2</h3>
        <p>الدِّينُ النَّصِيحَةُ</p>
        <p><b>Meaning:</b> Religion is sincere advice.</p>
        <p><b>Reference:</b> Sahih Muslim 55</p>

        <hr>

        <h3>Hadith 3</h3>
        <p>لَا تَغْضَبْ</p>
        <p><b>Meaning:</b> Do not become angry.</p>
        <p><b>Reference:</b> Sahih al-Bukhari 6116</p>

        <hr>

        <h3>Hadith 4</h3>
        <p>الطُّهُورُ شَطْرُ الْإِيمَانِ</p>
        <p><b>Meaning:</b> Purity is half of faith.</p>
        <p><b>Reference:</b> Sahih Muslim 223</p>
    `;

    document.body.appendChild(box);

    document.getElementById("closeHadith").onclick = () => {
        box.remove();
    };
}
function showCalendar() {
    let box = document.createElement("div");

    box.style.cssText = `
        position:fixed;
        inset:5%;
        background:white;
        color:#075c40;
        padding:20px;
        border-radius:15px;
        overflow-y:auto;
        z-index:9999;
        text-align:center;
    `;

    let current = new Date();

    const hijri = new Intl.DateTimeFormat(
        "en-u-ca-islamic-umalqura",
        {
            day:"numeric",
            month:"long",
            year:"numeric"
        }
    );

    function getParts(date) {
        let parts = hijri.formatToParts(date);
        let result = {};

        parts.forEach(p => result[p.type] = p.value);
        return result;
    }

    function renderCalendar() {
        let info = getParts(current);
        let month = info.month;
        let year = info.year;

        let first = new Date(current);
        let count = 0;

        while (count < 30) {
            let previous = new Date(first);
            previous.setDate(previous.getDate() - 1);

            let p = getParts(previous);

            if (p.month !== month || p.year !== year) break;

            first = previous;
            count++;
        }

        let days = [];
        let date = new Date(first);

        while (true) {
            let p = getParts(date);

            if (p.month !== month || p.year !== year) break;

            days.push({
                day: p.day,
                date: new Date(date)
            });

            date.setDate(date.getDate() + 1);
        }

        let html = `
            <h2>🌙 Islamic Calendar</h2>
            <h3>${month} ${year} AH</h3>
            <p>Today's Hijri Date: ${hijri.format(new Date())}</p>
            <p>Today's Gregorian Date: ${new Date().toDateString()}</p>

            <button id="prevMonth">❮ Previous</button>
            <button id="nextMonth">Next ❯</button>

            <div style="
                display:grid;
                grid-template-columns:repeat(7,1fr);
                gap:5px;
                margin-top:20px;
            ">
        `;

        ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].forEach(day => {
            html += `<b>${day}</b>`;
        });

        for (let i = 0; i < first.getDay(); i++) {
            html += `<div></div>`;
        }

        days.forEach(item => {
            html += `
                <div style="
                    background:#e7f4ed;
                    padding:12px 2px;
                    border-radius:8px;
                ">
                    <b>${item.day}</b>
                </div>
            `;
        });

        html += `</div>
            <p>May Allah bless your days. 🤍</p>
            <button id="closeCalendar">✖ Close</button>
        `;

        box.innerHTML = html;

        document.getElementById("prevMonth").onclick = () => {
            current = new Date(first);
            current.setDate(current.getDate() - 15);
            renderCalendar();
        };

        document.getElementById("nextMonth").onclick = () => {
            current = new Date(date);
            current.setDate(current.getDate() + 15);
            renderCalendar();
        };

        document.getElementById("closeCalendar").onclick = () => {
            box.remove();
        };
    }

    document.body.appendChild(box);
    renderCalendar();
}
let tasbeehCount = 0;
let tasbeehTarget = 33;

function openTasbeeh() {
    let box = document.createElement("div");

    box.style.cssText = `
        position:fixed;
        inset:5%;
        background:white;
        color:#075c40;
        padding:20px;
        border-radius:20px;
        z-index:9999;
        text-align:center;
        overflow-y:auto;
    `;

    box.innerHTML = `
        <button id="closeTasbeeh">✖ Close</button>

        <h2>📿 Digital Tasbeeh</h2>
        <p>Choose your target</p>

        <button onclick="setTarget(33)">33</button>
        <button onclick="setTarget(99)">99</button>
        <button onclick="setTarget(100)">100</button>

        <h1 id="tasbeehCount"
            style="font-size:65px;margin:25px;">
            ${tasbeehCount}
        </h1>

        <p id="tasbeehProgress">
            ${tasbeehCount} / ${tasbeehTarget}
        </p>

        <div style="
            background:#ddd;
            height:15px;
            border-radius:20px;
            overflow:hidden;
        ">
            <div id="tasbeehBar" style="
                width:${Math.min(100,tasbeehCount/tasbeehTarget*100)}%;
                height:100%;
                background:#075c40;
            "></div>
        </div>

        <br>

        <button id="countTasbeeh"
            style="font-size:22px;padding:20px 35px;">
            📿 Count +
        </button>

        <br><br>

        <button id="resetTasbeeh">Reset</button>

        <h3 id="tasbeehMessage">Keep remembering Allah 🤍</h3>
    `;

    document.body.appendChild(box);

    document.getElementById("closeTasbeeh").onclick = () => {
        box.remove();
    };

    document.getElementById("countTasbeeh").onclick = () => {
        tasbeehCount++;

        if (navigator.vibrate) {
            navigator.vibrate(50);
        }

        updateTasbeeh();
    };

    document.getElementById("resetTasbeeh").onclick = () => {
        tasbeehCount = 0;
        updateTasbeeh();
    };

    updateTasbeeh();
}

function setTarget(target) {
    tasbeehTarget = target;
    updateTasbeeh();
}

function updateTasbeeh() {
    let count = document.getElementById("tasbeehCount");
    if (!count) return;

    count.innerText = tasbeehCount;

    document.getElementById("tasbeehProgress").innerText =
        tasbeehCount + " / " + tasbeehTarget;

    document.getElementById("tasbeehBar").style.width =
        Math.min(100, tasbeehCount / tasbeehTarget * 100) + "%";

    document.getElementById("tasbeehMessage").innerText =
        tasbeehCount >= tasbeehTarget
        ? "Alhamdulillah! Target completed 🤍"
        : "Keep remembering Allah 🤍";
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(() => console.log("Noor-e-Islam is ready!"))
      .catch(error => console.log("Service Worker Error:", error));
  });
}
