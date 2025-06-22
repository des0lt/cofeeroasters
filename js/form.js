document.addEventListener('DOMContentLoaded', () => {
    const formOptionWrap = document.querySelectorAll('.form-option-wrap'),
          formOptionWrapBtn = document.querySelectorAll('.form-option-wrap button'),
          formOptionLabel = document.querySelectorAll('.form-option label'),
          planFormMenuBtn = document.querySelectorAll('.plan-form-menu button');


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
            let isCheked = formOptionWrap[i].querySelector('input:checked');
            if (!isCheked) {
                addDataClass(formOptionWrap, i);
                swithDataClass(planFormMenuBtn, i);
                setTimeout(() => {
                    formOptionWrap[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
                break
            }
        }
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
});
