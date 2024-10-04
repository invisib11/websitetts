const inputs = document.querySelectorAll('.input-box');

// Fungsi untuk memeriksa jawaban
function checkAnswers() {
    const inputBoxes = document.querySelectorAll('.input-box');
    let allCorrect = true;

    inputBoxes.forEach(box => {
        if (box.value.toUpperCase() !== box.dataset.answer) {
            allCorrect = false; // Set menjadi false jika ada jawaban yang salah
        }
    });

    if (allCorrect) {
        swal({
            title: "Selamat!",
            text: "Semua jawaban Anda benar!",
            icon: "success",
            button: "OK",
        });
    } else {
        swal({
            title: "Oops!",
            text: "Ada jawaban yang masih salah. Coba lagi!",
            icon: "error",
            button: "OK",
        });
    }
}

inputs.forEach(input => {
    input.addEventListener('input', function() {
        const inputBoxes = Array.from(this.parentElement.parentElement.querySelectorAll('.input-box'));
        const answers = inputBoxes.map(box => box.dataset.answer.toUpperCase());
        const userAnswers = inputBoxes.map(box => box.value.toUpperCase());

        const isAllFilled = userAnswers.every(answer => answer.length === 1);
        if (isAllFilled) {
            inputBoxes.forEach((box, index) => {
                if (userAnswers[index] === answers[index]) {
                    box.classList.add('correct');
                    box.classList.remove('incorrect');
                    box.disabled = true;
                } else {
                    box.classList.add('incorrect');
                }
            });
        } else {
            inputBoxes.forEach(box => {
                box.classList.remove('correct', 'incorrect');
            });
        }
    });
});

document.getElementById('submit-button').addEventListener('click', checkAnswers);

let currentCrossword = 0;
const crosswords = document.querySelectorAll('.crossword');

function navigate(direction) {
    crosswords[currentCrossword].style.display = 'none';
    currentCrossword += direction;

    if (currentCrossword < 0) {
        currentCrossword = 0;
    } else if (currentCrossword >= crosswords.length) {
        currentCrossword = crosswords.length - 1;
    }

    crosswords[currentCrossword].style.display = 'block';
}

const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const container = document.querySelector('.container');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    container.classList.toggle('shifted');
});
