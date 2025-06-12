// --- 1. Simple Interactive Quiz Demo ---
const quizQuestions = [
    {
        question: "What is the primary benefit of using quizzes for employee training?",
        options: [
            "They are inexpensive to create.",
            "They provide immediate feedback and identify knowledge gaps.",
            "They replace the need for instructors.",
            "They are primarily for entertainment."
        ],
        answer: "They provide immediate feedback and identify knowledge gaps."
    },
    {
        question: "Which HTML tag is used to embed a JavaScript file?",
        options: [
            "<javascript>",
            "<js>",
            "<script>",
            "<src>"
        ],
        answer: "<script>"
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Syntax",
            "Custom Style System"
        ],
        answer: "Cascading Style Sheets"
    }
];

const quizQuestionsDiv = document.getElementById('quiz-questions');
const submitQuizBtn = document.getElementById('submit-quiz');
const quizResultsDiv = document.getElementById('quiz-results');

function renderQuiz() {
    quizQuestionsDiv.innerHTML = ''; // Clear previous questions
    quizQuestions.forEach((q, index) => {
        const questionHtml = `
            <div class="question-item">
                <h4>Question ${index + 1}: ${q.question}</h4>
                <div class="options">
                    ${q.options.map(option => `
                        <label>
                            <input type="radio" name="question${index}" value="${option}">
                            ${option}
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
        quizQuestionsDiv.innerHTML += questionHtml;
    });
    submitQuizBtn.style.display = 'block'; // Show submit button
}

function checkQuiz() {
    let score = 0;
    let allAnswered = true;
    quizQuestions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption) {
            if (selectedOption.value === q.answer) {
                score++;
            }
        } else {
            allAnswered = false;
        }
    });

    if (!allAnswered) {
        quizResultsDiv.style.display = 'block';
        quizResultsDiv.style.backgroundColor = '#f2dede'; // Light red for warning
        quizResultsDiv.style.borderColor = '#ebccd1';
        quizResultsDiv.style.color = '#a94442';
        quizResultsDiv.innerHTML = 'Please answer all questions before submitting.';
        return;
    }

    const percentage = (score / quizQuestions.length) * 100;
    quizResultsDiv.style.display = 'block';
    quizResultsDiv.style.backgroundColor = '#dff0d8'; // Light green for success
    quizResultsDiv.style.borderColor = '#d6e9c6';
    quizResultsDiv.style.color = '#3c763d';
    quizResultsDiv.innerHTML = `You scored ${score} out of ${quizQuestions.length} (${percentage.toFixed(0)}%).`;
    submitQuizBtn.style.display = 'none'; // Hide submit button after submission
}

submitQuizBtn.addEventListener('click', checkQuiz);
document.addEventListener('DOMContentLoaded', renderQuiz); // Render quiz on page load

// --- 2. Testimonials Carousel ---
const testimonials = [
    {
        quote: "This quiz maker transformed our employee training. Highly recommend!",
        author: "- Jane Doe, HR Manager at Corp Solutions"
    },
    {
        quote: "Analytics are incredibly insightful. We finally understand our students' progress.",
        author: "- John Smith, Educator at LearnWell Academy"
    },
    {
        quote: "The customization options are fantastic. We've branded every quiz perfectly.",
        author: "- Emily White, Marketing Lead at Creative Brands"
    }
];

const testimonialCarousel = document.querySelector('.testimonial-carousel');
const prevBtn = document.querySelector('.carousel-nav.prev');
const nextBtn = document.querySelector('.carousel-nav.next');
let currentIndex = 0;

function renderTestimonials() {
    testimonialCarousel.innerHTML = ''; // Clear existing
    testimonials.forEach(testimonial => {
        const item = document.createElement('div');
        item.classList.add('testimonial-item');
        item.innerHTML = `
            <p>"${testimonial.quote}"</p>
            <p class="author">${testimonial.author}</p>
        `;
        testimonialCarousel.appendChild(item);
    });
    updateCarousel();
}

function updateCarousel() {
    // Calculate the scroll position
    const itemWidth = testimonialCarousel.querySelector('.testimonial-item').clientWidth;
    testimonialCarousel.scrollLeft = currentIndex * itemWidth;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? testimonials.length - 1 : currentIndex - 1;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === testimonials.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
});

document.addEventListener('DOMContentLoaded', renderTestimonials); // Render testimonials on page load

// Optional: Auto-slide
// let autoSlideInterval = setInterval(() => {
//     currentIndex = (currentIndex === testimonials.length - 1) ? 0 : currentIndex + 1;
//     updateCarousel();
// }, 5000); // Change slide every 5 seconds

// // Pause on hover
// testimonialCarousel.addEventListener('mouseover', () => clearInterval(autoSlideInterval));
// testimonialCarousel.addEventListener('mouseleave', () => {
//     autoSlideInterval = setInterval(() => {
//         currentIndex = (currentIndex === testimonials.length - 1) ? 0 : currentIndex + 1;
//         updateCarousel();
//     }, 5000);
// });


// --- 3. Simple Form Validation ---
const signupForm = document.getElementById('signup-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

function validateForm() {
    let isValid = true;

    // Validate Name
    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Name is required.';
        isValid = false;
    } else {
        nameError.textContent = '';
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required.';
        isValid = false;
    } else if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    // Validate Password
    if (passwordInput.value.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
        isValid = false;
    } else {
        passwordError.textContent = '';
    }

    return isValid;
}

signupForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    if (validateForm()) {
        // If validation passes, you would typically send the data to a server
        // For this example, we'll just log it and give a success message
        console.log('Form submitted successfully!', {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value // In a real app, never send plaintext passwords
        });
        alert('Sign up successful! (Data logged to console)');
        signupForm.reset(); // Clear the form
    } else {
        console.log('Form validation failed.');
    }
});

// Real-time validation on input
nameInput.addEventListener('input', validateForm);
emailInput.addEventListener('input', validateForm);
passwordInput.addEventListener('input', validateForm);

// --- 4. Google Analytics Event Tracking (Conceptual) ---
// The basic gtag('config', 'G-YOUR_MEASUREMENT_ID'); is already in index.html

// Example: Tracking CTA button click
document.querySelector('.cta-button').addEventListener('click', function() {
    // Check if gtag is defined (i.e., Google Analytics is loaded)
    if (typeof gtag === 'function') {
        gtag('event', 'click', {
            'event_category': 'engagement',
            'event_label': 'hero_get_started_button',
            'value': 1 // Optional: assign a value
        });
        console.log('GA Event: hero_get_started_button clicked');
    } else {
        console.warn('Google Analytics gtag function not found.');
    }
});

// Example: Tracking quiz submission
submitQuizBtn.addEventListener('click', function() {
    if (typeof gtag === 'function') {
        gtag('event', 'quiz_submission', {
            'event_category': 'conversion',
            'event_label': 'mini_quiz_completed',
            'value': (score / quizQuestions.length) * 100 // Send percentage score
        });
        console.log('GA Event: mini_quiz_completed');
    } else {
        console.warn('Google Analytics gtag function not found.');
    }
});

// Example: Tracking form submission (only if validation passes)
signupForm.addEventListener('submit', function(event) {
    // event.preventDefault() is handled earlier in the form validation
    if (validateForm()) {
        if (typeof gtag === 'function') {
            gtag('event', 'form_submission', {
                'event_category': 'conversion',
                'event_label': 'signup_form_submitted'
            });
            console.log('GA Event: signup_form_submitted');
        } else {
            console.warn('Google Analytics gtag function not found.');
        }
        // ... rest of your form submission logic
    }
});