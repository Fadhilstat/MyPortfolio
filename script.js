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
    
    // DATABASE PROJECT
    const projectData = [
        {
            id: 1,
            title: "Customer Churn Analysis",
            tech: "Python | Pandas | PPT",
            img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", 
            desc: "Analisis mendalam mengenai tingkat atrisi pelanggan. Saya menggunakan Random Forest untuk prediksi dan menyajikan hasilnya kepada manajemen.",
            link: "assets/documents/laporan_churn.pptx", // Pastikan file ada
            linkType: "download"
        },
        {
            id: 2,
            title: "COVID-19 Dashboard",
            tech: "R | Shiny | Web App",
            img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
            desc: "Aplikasi web interaktif untuk memantau tren pandemi secara real-time. Dibangun menggunakan R Shiny.",
            link: "https://shinyapps.io/user/app-demo",
            linkType: "website"
        },
        {
            id: 3,
            title: "Thesis: Statistical Modeling",
            tech: "SPSS | Academic Writing",
            img: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80",
            desc: "Penelitian akademis lengkap mengenai pemodelan statistik untuk data ekonomi makro.",
            link: "assets/documents/skripsi_statistik.pdf", // Pastikan file ada
            linkType: "pdf"
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

                // Cek Tipe Link (Download vs View)
                if (project.linkType === 'download') {
                    mLink.innerHTML = '<i class="fa-solid fa-download"></i> Download File';
                    mLink.setAttribute('download', '');
                } else if (project.linkType === 'pdf') {
                    mLink.innerHTML = '<i class="fa-solid fa-file-pdf"></i> View PDF';
                    mLink.removeAttribute('download');
                    mLink.setAttribute('target', '_blank');
                } else {
                    mLink.innerHTML = 'View Live Project <i class="fa-solid fa-arrow-up-right-from-square"></i>';
                    mLink.removeAttribute('download');
                    mLink.setAttribute('target', '_blank');
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