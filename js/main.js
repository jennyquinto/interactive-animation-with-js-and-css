window.addEventListener('DOMContentLoaded', function (e) {
    const presentation = document.querySelector('hp-presentation')
    presentation.onclick = handlePresentationClick
    presentation.addEventListener('animationend', handleAnimationEnd, false)
})

const handlePresentationClick = function (e) {
    let current = document.querySelector('hp-slide.active')
    let next = current.nextElementSibling
    while (next && next.tagName != 'HP-SLIDE') {
        next = next.nextElementSibling
    }

    if (next) {
        current.classList.remove("active")
        next.classList.add("active")
        next.querySelectorAll('.match').forEach(function (el) {
            setTimeout(function () {
                el.classList.remove('match')
            }, 0);
        });

        let aa = parseInt(next.getAttribute('data-autoadvance'))

        if (!isNaN(aa)) {
            setTimeout(function (e) {
                handlePresentationClick(e)
            }, aa);
        }

        const osa = next.getAttribute('data-onshow')
        if (osa) {
            window[osa]()
        }
    }


}
const handleAnimationEnd = function (e) {
    const slide = e.target.closest('hp-slide')
    const aa = slide.getAttribute('data-autoadvance')

    if (aa == 'animationend' && slide.classList.contains('active')) {
        handlePresentationClick(e)
    }
}

function setLearnImage(imageName) {
    const img = document.querySelector('hp-slide.active hp-learn img')
    img.src = 'images/' + imageName + '.svg'
}

const shapes = ['circle', 'diamond', 'square', 'triangle']

function showLearning() {
    const ii = Math.floor(Math.random() * shapes.length)
    setLearnImage(shapes[ii])

    const slide = document.querySelector('hp-slide.active')

    slide.classList.remove('learn-yes')
    slide.classList.remove('learn-no')

    slide.classList.add(ii ? 'learn-no' : 'learn-yes')
}
function startLearning(learningDelay) {
    showLearning()

    setTimeout(function () {
        showLearning()
        if (learningDelay > 1.1) {
            learningDelay = Math.pow(learningDelay, 1 / 1.05)
            startLearning(learningDelay)
        }
    }, learningDelay)

}
function runLearningSequence() {
    startLearning(1500)
}

function animateSVGStep() {
    const slide = document.querySelector('hp-slide.active')

    const svgs = slide.querySelectorAll('svg')

    if (svgs[0].children.length > 0) {
        const el = svgs[0].children[0]
        if (el) {
            svgs[1].appendChild(el.parentNode.removeChild(el))
        }

        return true
    }

    return false
}

function animateSVG() {
    if (animateSVGStep()) {
        setTimeout(animateSVG,30)
    }
}
