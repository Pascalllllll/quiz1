document.addEventListener("DOMContentLoaded", function () {

    // --- 1. Real-time Clock ---
    const clockElement = document.getElementById("clock");
    if (clockElement) {
        const updateClock = () => {
            const now = new Date();
            const h = String(now.getHours()).padStart(2, "0");
            const m = String(now.getMinutes()).padStart(2, "0");
            const s = String(now.getSeconds()).padStart(2, "0");
            clockElement.textContent = `${h}:${m}:${s}`;
        };
        setInterval(updateClock, 1000);
        updateClock();
    }

    // --- 2. Dark Mode Toggle ---
    const toggleBtn = document.getElementById("darkToggle");
    if (toggleBtn) {
        let darkMode = localStorage.getItem("dark-mode");

        const enableDarkMode = () => {
            document.body.classList.add("dark");
            toggleBtn.checked = true;
            localStorage.setItem("dark-mode", "enabled");
        };

        const disableDarkMode = () => {
            document.body.classList.remove("dark");
            toggleBtn.checked = false;
            localStorage.setItem("dark-mode", "disabled");
        };

        if (darkMode === "enabled") {
            enableDarkMode();
        }

        toggleBtn.addEventListener("change", () => {
            darkMode = localStorage.getItem("dark-mode");
            if (darkMode !== "enabled") {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        });
    }

    // --- 3. Page-Specific Animations ---
    // For index.html fade-in
    const hfs = document.getElementById("hfs");
    if (hfs) {
        const ru = document.getElementById("ru");
        const jp = document.getElementById("jp");
        setTimeout(() => {
            hfs.classList.add("show");
            ru.classList.add("show");
            jp.classList.add("show");
        }, 100);
    }

    // For scroll-based fade-in on other pages
    const sections = document.querySelectorAll('.section');
    if (sections.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.5 });
        sections.forEach(sec => observer.observe(sec));
    }
    
    // For profile.html age calculation
    const ageSpan = document.getElementById("age");
    if (ageSpan) {
        const calculateAge = (birthDate) => {
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        }
        const birthday = new Date(2006, 5, 19); // Month is 0-indexed (5 = June)
        ageSpan.textContent = calculateAge(birthday);
    }


    // --- 4. Sparkle Effect on Click ---
    document.addEventListener("click", function (e) {
        for (let i = 0; i < 9; i++) {
            const spark = document.createElement("div");
            spark.classList.add("spark");
            spark.style.left = `${e.pageX}px`;
            spark.style.top = `${e.pageY}px`;

            const angle = (360 / 9) * i;
            const distance = Math.random() * 60 + 30;

            spark.style.setProperty("--angle", `${angle}deg`);
            spark.style.setProperty("--distance", `${distance}px`);
            document.body.appendChild(spark);

            setTimeout(() => spark.remove(), 1000);
        }
    });
});

    // --- 5. Navigation Highlighting ---
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main .section');
    const options = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const navLink = document.querySelector(`nav ul li a[href="#${id}"]`);
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }, options);
    sections.forEach(section => {
        if (section.id) {
            observer.observe(section);
        }
    });
});
