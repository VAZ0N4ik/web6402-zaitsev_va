// Заявка на анализ МРТ: хранит данные из формы и выводит их в консоль
class AnalysisRequest {
    constructor(doctor, email, examDate, priority, sequences, comment) {
        this.doctor = doctor;
        this.email = email;
        this.examDate = examDate;
        this.priority = priority;
        this.sequences = sequences;
        this.comment = comment;
        this.createdAt = new Date();
    }

    // форматированный вывод: заголовок группы и по строке на каждое поле, значения выровнены
    print() {
        // из поля даты приходит 2026-11-20, разворачиваем в 20.11.2026
        const examDate = this.examDate.split('-').reverse().join('.');
        const rows = [
            ['Врач', this.doctor],
            ['E-mail', this.email],
            ['Дата исследования', examDate],
            ['Срочность', this.priority],
            ['Последовательности', this.sequences.length > 0 ? this.sequences.join(', ') : 'не выбраны'],
            ['Комментарий', this.comment || 'нет'],
        ];

        console.group(`Заявка на анализ от ${this.createdAt.toLocaleString('ru-RU')}`);
        for (const [label, value] of rows) {
            console.log(`${(label + ':').padEnd(20)}${value}`);
        }
        console.groupEnd();
    }
}

const form = document.querySelector('#request-form');
const formStatus = document.querySelector('#form-status');

// submit срабатывает, только когда браузер проверил все поля с required
form.addEventListener('submit', (event) => {
    // сервера у сайта нет, поэтому отменяем отправку и перезагрузку страницы
    event.preventDefault();

    const data = new FormData(form);
    const request = new AnalysisRequest(
        data.get('doctor').trim(),
        data.get('email'),
        data.get('exam-date'),
        data.get('priority'),
        data.getAll('sequences'),
        data.get('comment').trim(),
    );

    request.print();
    formStatus.textContent = 'Заявка сформирована, данные выведены в консоль (F12 → Console).';
});
