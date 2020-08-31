import { generateListPencarianComponent } from '../parsers/data-parser';
import './kodepos-item-component';

class KodePosList extends HTMLElement {
    constructor() {
        super();
        this._listKodePosItem = [];
        this._h1ElementTitle = document.createElement('h1');
        this._h2ElementSubtitle = document.createElement('h2');
        this._strongElement = document.createElement('strong');
    }

    set stringPencarian(katakunci = '') {
        this._stringKataKunciPencarian = katakunci;
    }

    get stringPencarian() {
        return this._stringKataKunciPencarian;
    }

    set listKodePostItem(listkodepositem) {
        this._listKodePosItem = listkodepositem;
        this.renderResultItem();
    }

    get listKodePostItem() {
        return this._listKodePosItem;
    }

    connectedCallback() {
        if (this._listKodePosItem && this._listKodePosItem.length > 0) {
            this.renderResultItem();
        }
    }

    async renderResultItem() {
        // Render kode pos item ke dalam list
        try {
            this._h1ElementTitle.classList.add('title');
            this._h2ElementSubtitle.classList.add('subtitle');

            this._strongElement.innerText = ` "${this._stringKataKunciPencarian}" `;
            this._h2ElementSubtitle.innerHTML =
                'Hasil pencarian kode pos dengan menggunakan kata kunci ';
            this._h2ElementSubtitle.append(this._strongElement);

            const resultTemplate = await new Promise((resolve) => {
                resolve(generateListPencarianComponent(this._listKodePosItem));
            });

            const elementDivContainer = document.createElement('div');
            elementDivContainer.classList.add('columns', 'is-multiline');

            this._h1ElementTitle.innerText = 'Hasil Pencarian';
            if (this._listKodePosItem && this._listKodePosItem.length > 0) {
                this._h2ElementSubtitle.innerHTML += ` telah ditemukan sebanyak ${this._listKodePosItem.length} buah.`;

                elementDivContainer.append(...resultTemplate);
            } else {
                this._h2ElementSubtitle.innerHTML += ' tidak ditemukan';
                elementDivContainer.innerHTML = '';
            }

            this.innerHTML = '';
            this.append(this._h1ElementTitle);
            this.append(this._h2ElementSubtitle);
            this.append(elementDivContainer);
        } catch (err) {
            console.log(err);
            this.innerHTML = '';
        }
    }
}

customElements.define('list-kodepos', KodePosList);
export default KodePosList;
