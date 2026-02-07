document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Helper Functions ---
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    // --- 2. Scroll Active State ---
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    // --- 3. Mobile Nav Toggle ---
    on('click', '.mobile-nav-toggle', function(e) {
        document.querySelector('body').classList.toggle('mobile-nav-active')
        this.classList.toggle('fa-bars')
        this.classList.toggle('fa-xmark')
    })

    on('click', '.scrollto', function(e) {
        if (select('body').classList.contains('mobile-nav-active')) {
            document.querySelector('body').classList.remove('mobile-nav-active')
            let navbarToggle = select('.mobile-nav-toggle')
            navbarToggle.classList.toggle('fa-bars')
            navbarToggle.classList.toggle('fa-xmark')
        }
    }, true)

    // --- 4. Portfolio Modal Logic ---
    
    // DATABASE PROJECT (Diupdate Sesuai CV)
    const projectData = [
        {
            id: 1,
            title: "AI & LLM Model Evaluation",
            tech: "Python | RLHF | Data Annotation",
            // Ganti 'assets/img/ai_project.jpg' dengan nama file gambarmu jika sudah ada
            img: "assets/img/profile.jpg", 
            desc: "<strong>Project at Innodata:</strong> Leverage advanced data evaluation techniques to improve Large Language Model (LLM) performance. Enhanced AI model accuracy by 20% by evaluating 500+ Indonesian language responses against strict rubrics for cultural relevance.",
            link: "#", 
            linkType: "detail"
        },
        {
            id: 2,
            title: "USD/JPY Market Prediction Model",
            tech: "Forex Analysis | Statistics | Modeling",
            img: "assets/img/profile.jpg",
            desc: "<strong>Project at Traders Family:</strong> Engineered daily market prediction models for USD/JPY by synthesizing technical indicators and fundamental news. Optimized trading strategies during Asian and London sessions based on historical price action data.",
            link: "#",
            linkType: "detail"
        },
        {
            id: 3,
            title: "Business Development Reporting",
            tech: "Excel | Power BI | Data Reporting",
            img: "assets/img/profile.jpg",
            desc: "<strong>Project at GAOTEK:</strong> Streamlined management reporting by compiling weekly progress updates on business development activities, ensuring 100% on-time delivery of key performance metrics in a fully remote environment.",
            link: "#", // Masukkan link contoh laporan jika ada
            linkType: "detail"
        }
    ];

    const modal = document.getElementById("portfolio-modal");
    const closeModal = document.querySelector(".close-modal");
    
    // Modal Elements
    const mTitle = document.getElementById("modal-title");
    const mTech = document.getElementById("modal-tech");
    const mImg = document.getElementById("modal-img");
    const mDesc = document.getElementById("modal-desc");
    const mLink = document.getElementById("modal-link");

    // Event Listener Tombol Project
    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = parseInt(btn.getAttribute('data-id'));
            const project = projectData.find(p => p.id === projectId);

            if (project) {
                mTitle.innerText = project.title;
                mTech.innerText = project.tech;
                mImg.src = project.img;
                mDesc.innerHTML = project.desc;
                mLink.href = project.link;

                // Cek Tipe Link
                if (project.linkType === 'download') {
                    mLink.innerHTML = '<i class="fa-solid fa-download"></i> Download File';
                    mLink.setAttribute('download', '');
                } else if (project.linkType === 'pdf') {
                    mLink.innerHTML = '<i class="fa-solid fa-file-pdf"></i> View PDF';
                    mLink.removeAttribute('download');
                    mLink.setAttribute('target', '_blank');
                } else {
                    mLink.innerHTML = 'View Details / Certificate';
                    mLink.removeAttribute('download');
                    // Jika linknya '#' (kosong), hilangkan tombol link
                    if(project.link === "#") {
                        mLink.style.display = 'none';
                    } else {
                        mLink.style.display = 'inline-block';
                        mLink.setAttribute('target', '_blank');
                    }
                }
                
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const hideModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    };

    closeModal.addEventListener('click', hideModal);

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            hideModal();
        }
    });

});
