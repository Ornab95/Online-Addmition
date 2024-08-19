// Toggle the visibility of the menu and change the menu icon
document.getElementById('menuButton').addEventListener('click', function () {
    var menu = document.getElementById('menu');
    var menuIcon = document.getElementById('menuIcon');
    menu.classList.toggle('max-h-0');
    menu.classList.toggle('max-h-screen');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-xmark');
});

// Initialize dropdown menu and handle department section display
document.addEventListener('DOMContentLoaded', function () {
    const dropdownButton = document.getElementById('dropdownHoverButton');
    const dropdownMenu = document.getElementById('dropdownHover');
    const departmentSections = document.querySelectorAll('.department-section');

    // Function to hide all department sections
    function hideAllSections() {
        departmentSections.forEach(section => {
            section.classList.add('hidden');
        });
    }

    // Function to show the selected department section
    function showDepartmentSection(department) {
        hideAllSections();
        const sectionToShow = document.getElementById(`${department}-section`);
        if (sectionToShow) {
            sectionToShow.classList.remove('hidden');
        }
    }

    // Toggle dropdown menu visibility with animation
    dropdownButton.addEventListener('click', function () {
        if (dropdownMenu.classList.contains('hidden')) {
            dropdownMenu.classList.remove('hidden');
            dropdownMenu.style.opacity = 0;
            dropdownMenu.style.transform = 'translateY(-10px)';
            requestAnimationFrame(() => {
                dropdownMenu.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
                dropdownMenu.style.opacity = 1;
                dropdownMenu.style.transform = 'translateY(0)';
            });
        } else {
            dropdownMenu.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            dropdownMenu.style.opacity = 0;
            dropdownMenu.style.transform = 'translateY(-10px)';
            dropdownMenu.addEventListener('transitionend', function () {
                dropdownMenu.classList.add('hidden');
            }, { once: true });
        }
    });

    // Handle click outside the dropdown to close it
    document.addEventListener('click', function (event) {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            dropdownMenu.style.opacity = 0;
            dropdownMenu.style.transform = 'translateY(-10px)';
            dropdownMenu.addEventListener('transitionend', function () {
                dropdownMenu.classList.add('hidden');
            }, { once: true });
        }
    });

    // Prevent event propagation when clicking inside the dropdown
    dropdownMenu.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    // Handle dropdown item click
    dropdownMenu.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const department = item.getAttribute('data-value');
            showDepartmentSection(department);
            dropdownButton.textContent = item.textContent.trim();
            dropdownMenu.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
            dropdownMenu.style.opacity = 0;
            dropdownMenu.style.transform = 'translateY(-10px)';
            dropdownMenu.addEventListener('transitionend', function () {
                dropdownMenu.classList.add('hidden');
            }, { once: true });
        });
    });

    // Set default visible section
    showDepartmentSection('cse');
});

// Initialize Flatpickr date picker
flatpickr("#dob", {
    dateFormat: "Y-m-d",
    theme: "light"
});

// // Toggle dropdown menu visibility
// document.getElementById('dropdownButton').addEventListener('click', function () {
//     var dropdownMenu = document.getElementById('dropdownMenu');
//     dropdownMenu.classList.toggle('hidden');
// });

// Navigate to the next section with smooth transition
function nextSection() {
    const currentSection = Array.from(document.querySelectorAll('.section')).find(section => !section.classList.contains('hidden'));
    const next = currentSection.nextElementSibling;
    if (next && next.classList.contains('section')) {
        currentSection.style.opacity = 0;
        currentSection.style.transform = 'translateX(-100%)';
        currentSection.addEventListener('transitionend', function() {
            currentSection.classList.add('hidden');
            next.style.opacity = 1;
            next.style.transform = 'translateX(0)';
            next.classList.remove('hidden');
            updateStepper(next.id);
        }, { once: true });
    }
}

// Navigate to the previous section with smooth transition
function prevSection() {
    const currentSection = Array.from(document.querySelectorAll('.section')).find(section => !section.classList.contains('hidden'));
    const prev = currentSection.previousElementSibling;
    if (prev && prev.classList.contains('section')) {
        currentSection.style.opacity = 0;
        currentSection.style.transform = 'translateX(100%)';
        currentSection.addEventListener('transitionend', function() {
            currentSection.classList.add('hidden');
            prev.style.opacity = 1;
            prev.style.transform = 'translateX(0)';
            prev.classList.remove('hidden');
            updateStepper(prev.id);
        }, { once: true });
    }
}

// Update the stepper based on the current section
function updateStepper(currentSectionId) {
    const stepMap = {
        'section-program': 0,
        'section-initiate': 1,
        'section-masters': 1,
        'section-basicinfo': 2,
        'section-education': 3,
        'section-address': 4,
        'section-confirmation': 5
    };
    const currentStepIndex = stepMap[currentSectionId];
    const steps = document.querySelectorAll('.stepper-step');
    steps.forEach((step, index) => {
        if (index < currentStepIndex) {
            step.classList.add('text-black', 'animate-pulse');
            step.querySelector('span').classList.add('bg-black', 'animate-pulse');
        } else if (index === currentStepIndex) {
            step.classList.add('text-black');
            step.querySelector('span').classList.add('bg-black', 'animate-pulse');
        } else {
            step.classList.remove('text-black', 'animate-pulse');
            step.querySelector('span').classList.remove('bg-black', 'animate-pulse');
        }
    });
    document.getElementById('prevBtn').style.display = (currentSectionId === 'section-program') ? 'none' : 'inline-block';
    document.getElementById('nextBtn').style.display = (currentSectionId === 'section-confirmation') ? 'none' : 'inline-block';
}

// Show a specific page (section)
function showPage(pageNumber) {
    document.querySelectorAll('.section').forEach(section => section.classList.add('hidden'));
    const pageId = `section-${pageNumber}`;
    document.getElementById(pageId).classList.remove('hidden');
    updateStepper(pageId);
}

// Function to show Emergency Information
function showEmergencyInfo(type) {
    const emergencyForm = document.getElementById('emergencyForm');
    const buttons = {
        'father': document.getElementById('fatherButtonEmergency'),
        'mother': document.getElementById('motherButtonEmergency'),
        'other': document.getElementById('otherButtonEmergency')
    };

    if (type === 'other') {
        emergencyForm.classList.remove('hidden');
        buttons['other'].classList.add('bg-blue-300');
    } else {
        emergencyForm.classList.add('hidden');
        if (buttons[type]) {
            buttons[type].classList.add('bg-blue-300');
        }
    }
    Object.keys(buttons).forEach(key => {
        if (key !== type) buttons[key].classList.remove('bg-blue-300');
    });
}

// Function to show Guardian Information
function showGuardianInfo(type) {
    const guardianForm = document.getElementById('guardianForm');
    const buttons = {
        'father': document.getElementById('fatherButtonGuardian'),
        'mother': document.getElementById('motherButtonGuardian'),
        'other': document.getElementById('otherButtonGuardian')
    };

    if (type === 'other') {
        guardianForm.classList.remove('hidden');
        buttons['other'].classList.add('bg-blue-300');
    } else {
        guardianForm.classList.add('hidden');
        if (buttons[type]) {
            buttons[type].classList.add('bg-blue-300');
        }
    }
    Object.keys(buttons).forEach(key => {
        if (key !== type) buttons[key].classList.remove('bg-blue-300');
    });
}

// Handle confirmation modal
document.getElementById('applyNowBtn').addEventListener('click', function () {
    document.getElementById('confirmationModal').classList.remove('hidden');
});

document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('confirmationModal').classList.add('hidden');
});

// Handle SEU ID section visibility
document.getElementById('isSEU').addEventListener('change', function () {
    const seuIdSection = document.getElementById('seuIdSection');
    const nonSEUSection = document.getElementById('nonSEUSection');
    if (this.value === 'yes') {
        seuIdSection.classList.remove('hidden');
        nonSEUSection.classList.add('hidden');
    } else {
        seuIdSection.classList.add('hidden');
        nonSEUSection.classList.remove('hidden');
    }
});
