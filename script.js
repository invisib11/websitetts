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
        // Jika semua jawaban benar, tampilkan SweetAlert
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

// Menambahkan event listener untuk setiap input box
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
                    box.disabled = true; // Disable input after correct answer
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

// Menambahkan event listener pada tombol submit
document.getElementById('submit-button').addEventListener('click', checkAnswers);

let currentCrossword = 0;
const crosswords = document.querySelectorAll('.crossword');

function navigate(direction) {
    crosswords[currentCrossword].style.display = 'none'; // Sembunyikan yang sekarang
    currentCrossword += direction; // Pindah ke crossword berikutnya atau sebelumnya

    // Jika melewati batas, kembalikan ke batas yang sesuai
    if (currentCrossword < 0) {
        currentCrossword = 0;
    } else if (currentCrossword >= crosswords.length) {
        currentCrossword = crosswords.length - 1;
    }

    crosswords[currentCrossword].style.display = 'block'; // Tampilkan yang baru
}

const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const container = document.querySelector('.container');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    container.classList.toggle('shifted'); // Geser konten
});
