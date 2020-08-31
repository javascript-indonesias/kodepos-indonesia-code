/* eslint-disable no-restricted-syntax */
import startAnimate from '../utils/animate-start';

class AppBarMenu extends HTMLElement {
    constructor() {
        super();
        this.isPageSearchShow = false;
        this.isPageAboutShow = false;
    }

    connectedCallback() {
        this.renderElement();
    }

    renderElement() {
        // Render element app bar
        const navElement = /* html */ `
        <nav
        class="navbar is-danger"
        role="navigation"
        aria-label="main navigation"
        >
            <div class="navbar-brand">
                <a class="navbar-item menu-navbar" href="">
                    <img
                        src="./img/mail-send.png"
                        alt="Logo app"
                        width="34"
                        loading="lazy"
                    />
                </a>
                <a
                    role="button"
                    class="navbar-burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navMenu"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div class="navbar-menu" id="navMenu">
                <div class="navbar-start">
                    <!-- navbar items -->
                    <a id="nav-pencarian"
                        class="navbar-item bold-title-header"
                    >
                        Kode Pos Indonesia
                    </a>
                </div>
                <div class="navbar-end">
                    <a class="navbar-item" id="nav-aboutapp">
                        Tentang Aplikasi
                    </a>
                </div>
            </div>
        </nav>
        `;

        this.innerHTML = navElement;

        this.isPageSearchShow = true;
        this.isPageAboutShow = false;

        this.initListenerHeader();
    }

    initListenerHeader() {
        // Init hamburger menu responsive
        const navbarBurger = document.querySelectorAll('.navbar-burger');
        if (navbarBurger.length > 0) {
            navbarBurger.forEach((element) => {
                element.addEventListener('click', () => {
                    const { target } = element.dataset;
                    const targetEl = document.querySelector(`#${target}`);
                    element.classList.toggle('is-active');
                    targetEl.classList.toggle('is-active');
                });
            });
        }

        // Menambahkan atribut href baru ke dalam a tag
        const navbarMenuItems = document.querySelectorAll('.menu-navbar');
        if (navbarMenuItems.length > 0) {
            for (const navbaritem of navbarMenuItems) {
                // tambahkan fungsi reload halaman yang di klik
                const urls = window.location.href;
                navbaritem.setAttribute('href', urls);
            }
        }

        // Sub menu halaman utama
        const navbarPencarian = document.querySelector('#nav-pencarian');
        this.sectionPagePencarian = document.querySelector(
            '#section-pencarian',
        );
        // Sub menu tentang aplikasi
        this.sectionPageAbout = document.querySelector('#section-about');
        const navbarAboutApp = document.querySelector('#nav-aboutapp');

        navbarPencarian.addEventListener('click', () => {
            this.animatePagePencarian();
        });

        navbarAboutApp.addEventListener('click', () => {
            this.animatePageAboutApp();
        });
    }

    async animatePagePencarian() {
        if (
            this.isPageSearchShow === false &&
            this.sectionPagePencarian.classList.contains('remove-els')
        ) {
            // Jika halaman pencarian tidak kelihatan, maka tampilkan
            await startAnimate('#section-about', 'fadeOutRight');
            this.sectionPageAbout.classList.add('remove-els');

            this.sectionPagePencarian.classList.remove('remove-els');
            await startAnimate('#section-pencarian', 'fadeInLeft');

            this.isPageSearchShow = true;
            this.isPageAboutShow = false;
        }
        this.hideNavbarMobileClick();
    }

    async animatePageAboutApp() {
        if (
            this.isPageAboutShow === false &&
            this.sectionPageAbout.classList.contains('remove-els')
        ) {
            // Jika halaman about tidak kelihatan, maka tampilkan
            await startAnimate('#section-pencarian', 'fadeOutRight');
            this.sectionPagePencarian.classList.add('remove-els');

            this.sectionPageAbout.classList.remove('remove-els');
            await startAnimate('#section-about', 'fadeInLeft');
            this.isPageAboutShow = true;
            this.isPageSearchShow = false;
        }
        this.hideNavbarMobileClick();
    }

    // Menyembunyikan navbar menu di mobile yang telah di click
    hideNavbarMobileClick() {
        const navbarBurger = document.querySelectorAll('.navbar-burger');
        if (navbarBurger.length > 0) {
            navbarBurger.forEach((element) => {
                const { target } = element.dataset;
                const targetEl = document.querySelector(`#${target}`);
                element.classList.toggle('is-active');
                targetEl.classList.toggle('is-active');
            });
        }
    }
}

customElements.define('app-bar', AppBarMenu);
export default AppBarMenu;
