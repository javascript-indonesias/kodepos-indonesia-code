import {
    BASE_URL_API,
    ENDPOINT_LIST_KOTAKAB,
    ENDPOINT_KODEPOST_KOTAKAB,
} from '../utils/config-constant';
import {
    parseDataProvinsiList,
    parseDataKotaKabList,
    parseDataKodePostSort,
} from '../parsers/data-parser';

// https://kodepos-2d475.firebaseio.com/list_propinsi.json?print=pretty
const getListDaftarProvinsiAsync = () => {
    const urlRequest = `${BASE_URL_API}/list_propinsi.json`;
    const request = fetch(urlRequest, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })
        .then((resp) => {
            if (resp.status === 200) {
                return resp.json();
            }
            return Promise.reject(
                new Error(`Error request code ${resp.status}`),
            );
        })
        .then(
            (resjson) =>
                new Promise((resolve) => {
                    const listProvinsiParsed = parseDataProvinsiList(resjson);
                    resolve(listProvinsiParsed);
                }),
        )
        .catch((err) => Promise.reject(err));

    return request;
};

// https://kodepos-2d475.firebaseio.com/list_kotakab/p10.json?print=pretty
const getListDaftarKotaKabupatenAsync = (idProvinsi) => {
    const urlRequest = `${BASE_URL_API}/${ENDPOINT_LIST_KOTAKAB}/${idProvinsi}.json`;

    const request = fetch(urlRequest, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })
        .then((resp) => {
            if (resp.status === 200) {
                return resp.json();
            }
            return Promise.reject(
                new Error(`Error request code ${resp.status}`),
            );
        })
        .then(
            (resjson) =>
                new Promise((resolve) => {
                    const listKotaProvinsiParsed = parseDataKotaKabList(
                        resjson,
                    );
                    resolve(listKotaProvinsiParsed);
                }),
        )
        .catch((err) => Promise.reject(err));

    return request;
};

// https://kodepos-2d475.firebaseio.com/kota_kab/k102.json?print=pretty
const getListKodePosAsync = (idKotaKab) => {
    const urlRequest = `${BASE_URL_API}/${ENDPOINT_KODEPOST_KOTAKAB}/${idKotaKab}.json`;

    const request = fetch(urlRequest, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
    })
        .then((resp) => {
            if (resp.status === 200) {
                return resp.json();
            }
            return Promise.reject(
                new Error(`Error request code ${resp.status}`),
            );
        })
        .then(
            (resjson) =>
                new Promise((resolve) => {
                    const listKotaProvinsiParsed = parseDataKodePostSort(
                        resjson,
                    );
                    resolve(listKotaProvinsiParsed);
                }),
        )
        .catch((err) => Promise.reject(err));

    return request;
};

export {
    getListDaftarProvinsiAsync,
    getListDaftarKotaKabupatenAsync,
    getListKodePosAsync,
};
