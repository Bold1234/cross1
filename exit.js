const Confirm1 = {
    open (options) {
        options = Object.assign({}, {
            title: '',
            message: '',
            okText: 'Yes',
            cancelText: 'No',
            onok: function () {},
            oncancel: function () {}
        }, options);
        
        const html = `
            <div class="confirm1">
                <div class="confirm1__window">
                    <div class="confirm1__titlebar">
                        <span class="confirm1__title">${options.title}</span>
                        <button class="confirm1__close">&times;</button>
                    </div>
                    <div class="confirm1__content">${options.message}</div>
                    <div class="confirm1__buttons">
                        <button class="confirm__button1 confirm__button1--ok confirm__button--fill">${options.okText}</button>
                        <button class="confirm__button2 confirm__button2--cancel">${options.cancelText}</button>
                    </div>
                </div>
            </div>
        `;

        const template = document.createElement('template');
        template.innerHTML = html;
        

        // Elements
        const confirmEl = template.content.querySelector('.confirm1');
        const btnClose = template.content.querySelector('.confirm1__close');
        const btnOk = template.content.querySelector('.confirm__button1--ok');
        const btnCancel = template.content.querySelector('.confirm__button2--cancel');

        confirmEl.addEventListener('click', e => {
            if (e.target === confirmEl) {
                options.oncancel();
                this._close(confirmEl);
            }
        });

        btnOk.addEventListener('click', () => {
            options.onok();
            this._close(confirmEl);
        });

        [btnCancel, btnClose].forEach(el => {
            el.addEventListener('click', () => {
                options.oncancel();
                this._close(confirmEl);
            });
        });

        document.body.appendChild(template.content);
    },

    _close (confirmEl) {
        confirmEl.classList.add('confirm--close');

        confirmEl.addEventListener('animationend', () => {
            document.body.removeChild(confirmEl);
        });
    }
};
