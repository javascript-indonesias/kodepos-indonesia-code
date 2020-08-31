/* eslint-disable no-restricted-syntax */
import cloneDeep from 'lodash-es/cloneDeep';
import localForage from 'localforage';

const parseDataProvinsiList = (objectProvinsi) => {
    const objectProvinsiRaw = cloneDeep(objectProvinsi);
    const arrayProvinsi = [];
    const keysObject = Object.keys(objectProvinsiRaw);

    for (const key of keysObject) {
        const objProvinsi = {
            id: key,
            name: objectProvinsiRaw[key],
        };
        arrayProvinsi.push(objProvinsi);
    }

    arrayProvinsi.sort((a, b) => {
        const namaProvinsiA = a.name.toLowerCase();
        const namaProvinsiB = b.name.toLowerCase();

        let comparison = 0;
        if (namaProvinsiA > namaProvinsiB) {
            comparison = 1;
        } else if (namaProvinsiA < namaProvinsiB) {
            comparison = -1;
        }

        // ascending sort
        return comparison;
    });
    return arrayProvinsi;
};

const parseDataKotaKabList = (listobjectkotakab) => {
    const objectKotaKabProv = cloneDeep(listobjectkotakab);
    const arrayKotaKabProv = [];
    const keysObject = Object.keys(objectKotaKabProv);

    for (const key of keysObject) {
        const objectKotaKab = {
            id: key,
            name: objectKotaKabProv[key],
        };
        arrayKotaKabProv.push(objectKotaKab);
    }

    arrayKotaKabProv.sort((a, b) => {
        const namaKotaA = a.name.toLowerCase();
        const namaKotaB = b.name.toLowerCase();

        let comparison = 0;
        if (namaKotaA > namaKotaB) {
            comparison = 1;
        } else if (namaKotaA < namaKotaB) {
            comparison = -1;
        }

        // ascending sort
        return comparison;
    });

    return arrayKotaKabProv;
};

const parseDataKodePostSort = (listkodepos) => {
    const listKodeposSort = cloneDeep(listkodepos);

    listKodeposSort.sort((a, b) => {
        const namaKelurahanA = a.kelurahan.toLowerCase();
        const namaKelurahanB = b.kelurahan.toLowerCase();

        let comparison = 0;
        if (namaKelurahanA > namaKelurahanB) {
            comparison = 1;
        } else if (namaKelurahanA < namaKelurahanB) {
            comparison = -1;
        }

        // sort ascending
        return comparison;
    });

    return listKodeposSort;
};

const searchKodePosArray = (katakunci = '', arrayKodePos = []) => {
    const kataKunciSearch = cloneDeep(katakunci.toLowerCase());
    const arrayKodePosRaw = cloneDeep(arrayKodePos);

    const arrayFiltered = arrayKodePosRaw.reduce((accum, currentval) => {
        const namaKecamatan = currentval.kecamatan.toLowerCase();
        const namaKelurahan = currentval.kelurahan.toLowerCase();
        const kodePos = currentval.kodepos;

        if (
            namaKecamatan.includes(kataKunciSearch) ||
            namaKelurahan.includes(kataKunciSearch) ||
            kodePos.includes(kataKunciSearch)
        ) {
            accum.push(currentval);
        }
        return accum;
    }, []);

    return arrayFiltered;
};

const generateListPencarianComponent = (listhasilpencarian = []) => {
    const listElPencarian = [];
    const panjangData = listhasilpencarian.length;
    for (let i = 0; i < panjangData; i += 1) {
        const kodepostObject = listhasilpencarian[i];

        const kodeposItemComp = document.createElement('kodepos-item');
        kodeposItemComp.classList.add('column', 'is-4');
        kodeposItemComp.kodePostItem = kodepostObject;

        if (i === 0) {
            kodeposItemComp.setStatusRenderData(true);
            listElPencarian.push(kodeposItemComp);
        } else {
            kodeposItemComp.setStatusRenderData(false);
            listElPencarian.push(kodeposItemComp);
        }
    }

    return listElPencarian;
};

const saveDataLocal = async (key, value) => {
    try {
        const valueSaved = await localForage.setItem(key, value);
        return await Promise.resolve(valueSaved);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

const getDataLocal = async (key) => {
    try {
        const value = await localForage.getItem(key);
        return await Promise.resolve(value);
    } catch (err) {
        return Promise.reject(err);
    }
};

// Menghitung nilai minimum dari dalam array
const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);

// Menghitung nilai maksimum dari dalam array
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);

const getRentangKodePos = (listkodepos = []) => {
    // Ambil nilai maksimum dan minimum di dalam rentang
    // Untuk placeholder input pencarian
    const arrayKodeposNumber = listkodepos.reduce((accum, currentval) => {
        const stringKodepos = currentval.kodepos;
        const numberKodepos = Number(stringKodepos);
        accum.push(numberKodepos);
        return accum;
    }, []);

    const minNumber = minN(arrayKodeposNumber, 1);
    const maxNumber = maxN(arrayKodeposNumber, 1);
    const stringRentangKodePos = `${minNumber} - ${maxNumber}`;
    return stringRentangKodePos;
};

export {
    parseDataProvinsiList,
    parseDataKotaKabList,
    searchKodePosArray,
    parseDataKodePostSort,
    saveDataLocal,
    getDataLocal,
    generateListPencarianComponent,
    getRentangKodePos,
};
