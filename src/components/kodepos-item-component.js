class KodePosItem extends HTMLElement {
    constructor() {
        super();
        this._kodepositem = {};
    }

    set kodePostItem(kodepostitem) {
        this._kodepositem = kodepostitem;
    }

    get kodePostItem() {
        return this._kodepositem;
    }

    setStatusRenderData(isFirstItem = false) {
        this._isFirstItem = isFirstItem;
        this.renderKodePosItem();
    }

    renderKodePosItem() {
        // Render data kode pos
        const { kecamatan } = this._kodepositem;
        const { kelurahan } = this._kodepositem;
        const { kodepos } = this._kodepositem;

        let templateFirstResult = '';
        if (this._isFirstItem) {
            templateFirstResult = /* html */ `
                <article class="message is-success shadow-card">
                    <div class="message-header">
                        <p>${kelurahan}</p>
                    </div>
                    <div class="message-body">
                        Kode pos <strong>${kodepos}</strong> untuk daerah
                        Kelurahan ${kelurahan}, Kecamatan ${kecamatan}.
                    </div>
                </article>
            `;
        } else {
            templateFirstResult = /* html */ `
                <article class="message is-warning shadow-card">
                    <div class="message-header">
                        <p>${kelurahan}</p>
                    </div>
                    <div class="message-body">
                        Kode pos <strong>${kodepos}</strong> untuk daerah
                        Kelurahan ${kelurahan}, Kecamatan ${kecamatan}.
                    </div>
                </article>
            `;
        }

        this.innerHTML = templateFirstResult;
    }
}

customElements.define('kodepos-item', KodePosItem);
export default KodePosItem;
