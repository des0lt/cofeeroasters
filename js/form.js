document.addEventListener('DOMContentLoaded', () => {
    const formOptionWrap = document.querySelectorAll('.form-option-wrap'),
        formOptionWrapBtn = document.querySelectorAll('.form-option-wrap button'),
        formOptionLabel = document.querySelectorAll('.form-option label'),
        planFormMenuBtn = document.querySelectorAll('.plan-form-menu li a'),
        createPlanBtn = document.getElementById('create-plan');

    dataNumAdd(formOptionWrap);
    dataNumAdd(planFormMenuBtn);

    function dataNumAdd(elements) {
        elements.forEach((element, i) => {
            element.dataset.num = i;
        })
    }

    function swithDataClass(parent, dataSelector) {
        const num = Number(dataSelector);
        for (let i = 0; i < parent.length; i++) {
            if (i === num) {
                parent[i].classList.add('active');
            } else {
                parent[i].classList.remove('active');
            }
        }
    }

    function addDataClass(parent, dataSelector) {
        const num = Number(dataSelector);
        for (let i = 0; i < parent.length; i++) {
            if (i === num) {
                parent[i].classList.add('active');
                break
            }
        }
    }

    function nextQuestion() {
        for (let i = 0; i < formOptionWrap.length; i++) {
            let isChecked = formOptionWrap[i].querySelector('input:checked');

            if (!isChecked) {
                addDataClass(formOptionWrap, i);
                swithDataClass(planFormMenuBtn, i);
                setTimeout(() => {
                    formOptionWrap[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
                return;
            }
        }

        const orderSummary = document.getElementById('order-summary');
        setTimeout(() => {
            orderSummary.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        createPlanBtn.disabled = false;
    }

    function orderSummery(dataNum, content) {
        const orderSummarySpan = document.querySelectorAll('.order-summary p span')
        orderSummarySpan[dataNum].innerHTML = content
    }

    formOptionWrapBtn.forEach((element, i) => {
        element.addEventListener('click', () => {
            element.parentElement.classList.toggle('active');
            swithDataClass(planFormMenuBtn, element.closest('.form-option-wrap').dataset.num);
        });
    });


    formOptionLabel.forEach(element => {
        element.addEventListener('click', () => {
            const num = Number(element.closest('.form-option-wrap').dataset.num);
            planFormMenuBtn[num].classList.add('filled');
            swithDataClass(planFormMenuBtn, num);
            nextQuestion();
            let inputValue = element.querySelector('input').value;
            orderSummery(num, inputValue)
        })
    })

    planFormMenuBtn.forEach((element, i) => {
        element.addEventListener('click', () => {
            addDataClass(formOptionWrap, element.dataset.num);
            swithDataClass(planFormMenuBtn, element.dataset.num);
            const targetWrap = formOptionWrap[i];
            setTimeout(() => {
                targetWrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        })
    })

    const overlay = document.querySelector('.overlay'),
        modalWindow = document.querySelector('.modal-window'),
        modalWindowContentText = document.querySelector('.modal-window .content .summary'),
        orderSummary = document.querySelector('.order-summary p'),
        totalPrice = document.getElementById('total-price'),
        checkoutBtn = document.getElementById('checkout')

    function openModal() {
        modalWindowContentText.innerHTML = orderSummary.innerHTML;
        let priceSelector = document.querySelector('.price-selector label input:checked').value;
        let price = ''
        switch (priceSelector) {
            case 'Every Week':
                price = `7.20`
                break;
            case 'Every 2 Weeks':
                price = `9.60`
                break;
            case 'Every Month':
                price = `12.00`
                break;
            default:
                price = `-`
        }
        if (window.innerWidth < 717) {
            checkoutBtn.innerHTML = `Chekout - $${price}/ mo`
        } else {
            totalPrice.innerHTML = `$${price}/ mo`
        }
        
        modalWindow.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('noscroll');
    }

    createPlanBtn.addEventListener('click', () => {
        openModal();
    })

    function closeModal() {
        modalWindow.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('noscroll');
    }


    overlay.addEventListener('click', () => {
        closeModal()
    })

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
        if (e.key === 'Enter') {
            if (modalWindow.classList.contains('active')) {
                checkoutBtn.click();
            } else {
                if (createPlanBtn.disabled === false) {
                    openModal();
                }
            }

        }
    });

});
