function _creatModal(options) {                   // нижние подчеркив указываем что это системная функция, должна быть вызвана отдельно, приватно
    const modal = document.createElement('div')   // 
    modal.classList.add('vmodal')                 // обращаемся к модальному окну, к его обьекту classList и добавим корневой класс 'vmodal'
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal-overlay">   
            <div class="modal-window">
                <div class="modal-header">
                    <span class="modal-title">Modal title</span>
                    <span class="modal-close">&times;</span>
                </div>
                <div class="modal-body">
                    <p>Lorem ipsum dolor sit.</p>
                    <p>Consectetur adipisicing elit.</p>
                </div>
                <div class="modal-footer">
                    <button>Ok</button>
                    <button>Cansel</button>
                </div>
            </div>
        </div>
    `)
    document.body.appendChild(modal)    // мы создали модальное окно, но он нигде не находится в dom-дереве. помещаем модальное окно с помощью appendChild
    return modal
}



$.modal = function(options) {                    // обьект с опциями, он будет настраивать модальное окно 
    const ANIMATION_SPEED = 200                  // заведем константу, 200мл сек за которых идет анимация
    const $modal = _creatModal(options)          // создаем приватную переменную, заносим сюда результат функции _creatModal
    let closing = false                          // защита чтобы при работе close, случайно не вызвалось open

    return {
        open() {
            !closing && $modal.classList.add('open')          // обращаемся к $modal, этот элемент с классом vmodal, говорим ему его classList мы добавляем ему класс 'open' // добавляем если не (!closing) тогда добавляем метод 'open'
        },
        close() {
            closing: true                         // как только вызываем метод close => closing: true..
            $modal.classList.remove('open')       // для метода close мы будем удалять даный класс
            $modal.classList.add('hide')          // (для анимирования мод окна при исчезании) нашему элементу $modal и его полю classList добавляем класс 'hide'
            setTimeout(() => {                    // заводим setTimeout который будет идти по нашей константе ANIMATION_SPEED после которого ...
                $modal.classList.remove('hide')      // ...мы удалим даный класс
                closing = false                    //..как только setTimeout пройдет => closing = false
            }, ANIMATION_SPEED)                          
        },
        destroy() {},                             // метод, не позволит приложению работать медленно
    }
}













