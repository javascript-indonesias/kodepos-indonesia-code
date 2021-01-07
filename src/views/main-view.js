/* eslint-disable no-restricted-syntax */
import {
    getListDaftarProvinsiAsync,
    getListDaftarKotaKabupatenAsync,
    getListKodePosAsync,
} from '../network/requests';
import {
    getDataLocal,
    saveDataLocal,
    searchKodePosArray,
    getRentangKodePos,
} from '../parsers/data-parser';
import { KEY_STORAGE_PROVINSI } from '../utils/config-constant';
import debounceProcess from '../utils/debounces';

class MainView {
    constructor() {
        this.isStatusLoading = false;
        this.isInputEnable = false;
        this.listKodePos = [];
        this.stringPlaceholderInput = '';
    }

    initSearchComponent() {
        this.selectProvinsiEl = document.querySelector('#select-provinsi');
        this.selectKotaProvinsiEl = document.querySelector('#select-kotakab');
        this.inputSearchEl = document.querySelector('#search-key-input');
        this.buttonSearchEl = document.querySelector('#button-search');
        this.divInputSearchEl = document.querySelector(
            '#container-inputsearch',
        );

        this.versiAplikasiEl = document.querySelector('#versi-aplikasi');

        this.setEnableInputSearch(false);
        this.showProgressInputPencarian(false);

        this.getDaftarProvinsi();

        this.setListenerInputDebounce();

        this.setListenerButtonSearch();

        this.setDateTanggalVersiAplikasi();
    }

    async getDaftarProvinsi() {
        try {
            this.showProgressProvinsi(true);

            const dataLocal = await getDataLocal(KEY_STORAGE_PROVINSI);
            if (dataLocal && dataLocal.length > 0) {
                this.setViewDaftarProvinsi(dataLocal);
            } else {
                const result = await getListDaftarProvinsiAsync();
                if (result && result.length > 0) {
                    await saveDataLocal(KEY_STORAGE_PROVINSI, result).catch();
                    this.setViewDaftarProvinsi(result);
                }
            }
        } catch (err) {
            console.log(err);
        }
        this.showProgressProvinsi(false);
    }

    setViewDaftarProvinsi(listProvinsi) {
        const selectElement = document.createElement('select');

        const placeholderSelect = document.createElement('option');
        placeholderSelect.setAttribute('value', '');
        placeholderSelect.setAttribute('selected', '');
        placeholderSelect.setAttribute('disabled', '');
        placeholderSelect.innerText = 'Pilih Provinsi di Indonesia';

        const listOptionsProvinsi = [];
        for (const provinsi of listProvinsi) {
            const idProvinsi = provinsi.id;
            const namaProvinsi = provinsi.name;

            const optionProvEl = document.createElement('option');
            optionProvEl.setAttribute('value', idProvinsi);
            optionProvEl.innerText = namaProvinsi;
            listOptionsProvinsi.push(optionProvEl);
        }

        selectElement.appendChild(placeholderSelect);
        selectElement.append(...listOptionsProvinsi);

        this.selectProvinsiEl.innerHTML = '';
        this.selectProvinsiEl.append(selectElement);

        this.setListenerSelectProvinsi();
    }

    setListenerSelectProvinsi() {
        const selectElement = this.selectProvinsiEl.querySelector('select');
        selectElement.addEventListener('change', (event) => {
            const valueOptions = event.target.value;
            if (this.isStatusLoading === false) {
                this.getDaftarKotaKabupatenProvinsi(valueOptions);
            }
        });
    }

    async getDaftarKotaKabupatenProvinsi(valueoption) {
        this.showProgressDaftarKotaKab(true);

        try {
            const result = await getListDaftarKotaKabupatenAsync(valueoption);

            if (result && result.length > 0) {
                this.setViewDaftarKotaKab(result);
            }
        } catch (err) {
            console.log(err);
        }

        this.showProgressDaftarKotaKab(false);
    }

    setViewDaftarKotaKab(listkotakab = []) {
        const selectElement = document.createElement('select');

        const placeholderSelect = document.createElement('option');
        placeholderSelect.setAttribute('value', '');
        placeholderSelect.setAttribute('selected', '');
        placeholderSelect.setAttribute('disabled', '');
        placeholderSelect.innerText = 'Pilih Kota/Kabupaten';

        const listOptionsKotaKab = [];
        for (const kotakab of listkotakab) {
            const idKota = kotakab.id;
            const namaKota = kotakab.name;

            const optionKotaEl = document.createElement('option');
            optionKotaEl.setAttribute('value', idKota);
            optionKotaEl.innerText = namaKota;
            listOptionsKotaKab.push(optionKotaEl);
        }

        selectElement.append(placeholderSelect);
        selectElement.append(...listOptionsKotaKab);

        this.selectKotaProvinsiEl.innerHTML = '';
        this.selectKotaProvinsiEl.append(selectElement);

        this.setListenerSelectKotaKab();
    }

    setListenerSelectKotaKab() {
        const selectElementKotaKab = this.selectKotaProvinsiEl.querySelector(
            'select',
        );

        selectElementKotaKab.addEventListener('change', (event) => {
            const valueOptions = event.target.value;
            if (this.isStatusLoading === false) {
                this.getDaftarKodePosInput(valueOptions);
            }
        });
    }

    async getDaftarKodePosInput(valueoption) {
        // set status loading halaman
        this.showProgressInputPencarian(true);

        try {
            const resultKodePos = await getListKodePosAsync(valueoption);
            if (resultKodePos && resultKodePos.length > 0) {
                this.listKodePos = resultKodePos;
                this.setEnableInputSearch(true);
            } else {
                this.setEnableInputSearch(false);
                this.listKodePos = [];
            }

            if (resultKodePos && resultKodePos.length > 0) {
                this.stringPlaceholderInput = await new Promise((resolve) => {
                    const stringrentangkodepos = getRentangKodePos(
                        resultKodePos,
                    );
                    resolve(stringrentangkodepos);
                });

                this.setInputPlaceHolderPencarian();
            }
        } catch (err) {
            console.log(err);
            this.listKodePos = [];
        }

        this.showProgressInputPencarian(false);
    }

    setListenerInputDebounce() {
        // Kirim instance This ke dalam debounce agar tidak undefined
        const debounceFunction = debounceProcess(
            this.searchKodePos.bind(this),
            2000,
        );

        this.inputSearchEl.addEventListener('input', (event) => {
            if (
                this.listKodePos &&
                this.listKodePos.length > 0 &&
                this.isStatusLoading === false
            ) {
                // Jalankan debounce function
                this.showProgressInputPencarian(true);
                debounceFunction(event);
            }
        });
    }

    setInputPlaceHolderPencarian() {
        if (this.stringPlaceholderInput.length > 0) {
            this.inputSearchEl.setAttribute(
                'placeholder',
                `kode pos ${this.stringPlaceholderInput}`,
            );
        } else {
            this.inputSearchEl.setAttribute(
                'placeholder',
                'masukkan kata kunci pencarian disini',
            );
        }
    }

    setListenerButtonSearch() {
        const debounceFunc = debounceProcess(
            this.searchKodePos.bind(this),
            2000,
        );
        this.buttonSearchEl.addEventListener('click', () => {
            if (
                this.listKodePos &&
                this.listKodePos.length > 0 &&
                this.isStatusLoading === false
            ) {
                this.showProgressInputPencarian(true);
                debounceFunc();
            }
        });
    }

    async searchKodePos() {
        const stringPencarian = this.inputSearchEl.value;
        if (stringPencarian && stringPencarian.length > 1) {
            try {
                const resultPencarian = await new Promise((resolve) => {
                    const results = searchKodePosArray(
                        stringPencarian,
                        this.listKodePos,
                    );
                    resolve(results);
                });
                this.setViewHasilPencarian(resultPencarian, stringPencarian);
            } catch (err) {
                console.log(err);
            }
        }
        this.showProgressInputPencarian(false);
    }

    setViewHasilPencarian(listhasilpencarian = [], stringpencarian) {
        const listKodePosElement = document.querySelector('list-kodepos');
        listKodePosElement.classList.add('container', 'mt-4');

        if (listhasilpencarian.length > 0) {
            // set ke component list
            listKodePosElement.stringPencarian = stringpencarian;
            listKodePosElement.listKodePostItem = listhasilpencarian;
        } else {
            listKodePosElement.stringPencarian = stringpencarian;
            listKodePosElement.listKodePostItem = [];
        }
    }

    showProgressProvinsi(isloading = false) {
        this.isStatusLoading = isloading;
        if (isloading) {
            this.selectProvinsiEl.classList.add('is-loading');
        } else {
            this.selectProvinsiEl.classList.remove('is-loading');
        }
    }

    showProgressDaftarKotaKab(isloading = false) {
        this.isStatusLoading = isloading;
        if (isloading) {
            this.selectKotaProvinsiEl.classList.add('is-loading');
        } else {
            this.selectKotaProvinsiEl.classList.remove('is-loading');
        }
    }

    setEnableInputSearch(isenable = false) {
        this.isInputEnable = isenable;
        if (isenable) {
            this.inputSearchEl.removeAttribute('disabled');
            this.buttonSearchEl.removeAttribute('disabled');
        } else {
            this.inputSearchEl.setAttribute('disabled', '');
            this.buttonSearchEl.setAttribute('disabled', '');
        }
    }

    showProgressInputPencarian(isloading = false) {
        this.isStatusLoading = isloading;
        if (isloading) {
            this.buttonSearchEl.classList.add('is-loading');
        } else {
            this.buttonSearchEl.classList.remove('is-loading');
        }
    }

    setDateTanggalVersiAplikasi() {
        const date = new Date();
        const yearSekarang = date.getFullYear();
        const stringCopyrightTahun = `Versi 1.1.0 - GulajavaMinistudio @ ${yearSekarang}`;
        this.versiAplikasiEl.innerText = stringCopyrightTahun;
    }
}

export default MainView;
