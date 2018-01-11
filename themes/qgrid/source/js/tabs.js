function select(source, cls) {
    return Array.from(source.getElementsByClassName(cls));
}

function init() {
    const tabs = select(document, 'tabs');
    tabs.forEach(function (tab) {
        const btns = select(tab, 'tab');
        btns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                select(tab, 'tab-panel')
                    .forEach(function (panel) {
                        panel.classList.remove('active');
                    });

                const cls = btn.dataset['tab'];
                const panel = select(tab, cls)[0];
                panel.classList.add('active')
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', init);
