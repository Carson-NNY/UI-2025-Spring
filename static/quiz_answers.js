// Correct answers for each quiz
const CORRECT_ANSWERS = {
    quiz1: 'B', // To create balanced and eye-catching compositions...
    quiz2: 'B', // Align the Linear Elements With Grid Lines
    quiz3: 'A', // Align the Subject With Lines or Intersections
    quiz4: 'B', // Align the Linear Elements With Grid Lines
    quiz5: {
        // Each drop zone's correct photo ID
        '1': '3', // Align the Subject With Lines or Intersections -> photo 3
        '2': '1', // Align the Linear Elements With Grid Lines -> photo 1
        '3': '4', // Align Objects Diagonally -> photo 4
        '4': '2'  // Break the Rule of Thirds -> photo 2
    }
};

// Store user's answers in localStorage
function saveAnswer(quizNumber, answer) {
    localStorage.setItem(`quiz${quizNumber}_answer`, JSON.stringify(answer));
}

// Get user's answer for a specific quiz
function getAnswer(quizNumber) {
    return JSON.parse(localStorage.getItem(`quiz${quizNumber}_answer`));
}

// Check if answer is correct
function isCorrect(quizNumber, answer) {
    if (quizNumber === 5) {
        // For quiz 5, check each drop zone
        const correctAnswers = CORRECT_ANSWERS.quiz5;
        return Object.entries(answer).every(([zone, photoId]) => 
            correctAnswers[zone] === photoId
        );
    } else {
        return answer === CORRECT_ANSWERS[`quiz${quizNumber}`];
    }
}

// Calculate total score and update result page
function calculateScore() {
    let score = 0;
    let results = {};

    // Check each quiz answer
    for (let i = 1; i <= 5; i++) {
        const answer = getAnswer(i);
        const correct = isCorrect(i, answer);
        results[i] = correct;
        if (correct) score++;
    }

    // Update the result page
    const totalScoreElement = document.getElementById('total-score');
    if (totalScoreElement) {
        totalScoreElement.textContent = score;
    }

    // Update feedback icons
    for (let i = 1; i <= 5; i++) {
        const feedbackElement = document.getElementById(`q${i}-feedback`);
        if (feedbackElement) {
            feedbackElement.innerHTML = results[i] 
                ? '<i class="fas fa-check correct"></i>'
                : '<i class="fas fa-times incorrect"></i>';
        }
    }
}

// Initialize quiz page handlers
document.addEventListener('DOMContentLoaded', function() {
    // For quiz pages 1-4
    const answerPanels = document.querySelectorAll('.answer-panel');
    if (answerPanels.length > 0) {
        const quizNumber = window.location.pathname.match(/quiz(\d+)/)?.[1] || '1';
        
        answerPanels.forEach(panel => {
            panel.addEventListener('click', () => {
                const answer = panel.dataset.choice;
                saveAnswer(quizNumber, answer);
            });
        });
    }

    // For quiz 5
    const dropZones = document.querySelectorAll('.drop-zone');
    const draggablePhotos = document.querySelectorAll('.draggable-photo');
    const photoContainer = document.querySelector('.draggable-photos');
    let draggedPhoto = null;
    let sourceZone = null;

    if (dropZones.length > 0) {
        // Initialize answers object if not exists
        let currentAnswers = getAnswer(5) || {};
        saveAnswer(5, currentAnswers);

        // Make photos draggable
        draggablePhotos.forEach(photo => {
            photo.addEventListener('dragstart', (e) => {
                draggedPhoto = photo;
                photo.classList.add('dragging');
                e.dataTransfer.setData('text/plain', photo.dataset.photoId);
                
                // Check if photo is in a zone
                const parentZone = photo.closest('.zone-content');
                if (parentZone) {
                    sourceZone = parentZone.closest('.drop-zone');
                } else {
                    sourceZone = photoContainer;
                }
            });

            photo.addEventListener('dragend', () => {
                photo.classList.remove('dragging');
                draggedPhoto = null;
                sourceZone = null;
            });
        });

        // Handle drop zones
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                const zoneContent = zone.querySelector('.zone-content');
                // Show dragover effect for all zones to allow swapping
                zone.classList.add('dragover');
            });

            zone.addEventListener('dragleave', () => {
                zone.classList.remove('dragover');
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('dragover');
                
                if (!draggedPhoto) return;

                const zoneContent = zone.querySelector('.zone-content');
                const zoneId = zone.dataset.zone;
                
                // If zone already has a photo, handle swapping
                if (zoneContent.hasChildNodes()) {
                    const existingPhoto = zoneContent.querySelector('img');
                    
                    // If dragging from another zone
                    if (sourceZone && sourceZone !== photoContainer) {
                        const sourceContent = sourceZone.querySelector('.zone-content');
                        
                        // Swap photos between zones
                        sourceContent.innerHTML = '';
                        sourceContent.appendChild(existingPhoto);
                        sourceZone.classList.add('filled');
                        
                        zoneContent.innerHTML = '';
                        zoneContent.appendChild(draggedPhoto);
                        zone.classList.add('filled');
                        
                        // Update answers
                        const sourceZoneId = sourceZone.dataset.zone;
                        currentAnswers[sourceZoneId] = existingPhoto.dataset.photoId;
                        currentAnswers[zoneId] = draggedPhoto.dataset.photoId;
                    } else {
                        // If dragging from photo container, move existing photo back
                        photoContainer.appendChild(existingPhoto);
                        zoneContent.innerHTML = '';
                        zoneContent.appendChild(draggedPhoto);
                        zone.classList.add('filled');
                        currentAnswers[zoneId] = draggedPhoto.dataset.photoId;
                    }
                } else {
                    // Empty zone case
                    if (sourceZone && sourceZone !== photoContainer) {
                        const sourceZoneId = sourceZone.dataset.zone;
                        const sourceContent = sourceZone.querySelector('.zone-content');
                        delete currentAnswers[sourceZoneId];
                        sourceContent.innerHTML = '';
                        sourceZone.classList.remove('filled');
                    }
                    
                    zoneContent.appendChild(draggedPhoto);
                    zone.classList.add('filled');
                    currentAnswers[zoneId] = draggedPhoto.dataset.photoId;
                }
                
                saveAnswer(5, currentAnswers);

                // Enable next button if all zones are filled
                const allZonesFilled = Array.from(dropZones)
                    .every(z => z.querySelector('.zone-content').hasChildNodes());
                
                const nextButton = document.getElementById('next-btn');
                if (nextButton) {
                    nextButton.disabled = !allZonesFilled;
                    nextButton.style.pointerEvents = allZonesFilled ? 'auto' : 'none';
                    nextButton.style.opacity = allZonesFilled ? '1' : '0.5';
                }
            });
        });

        // Make photo container droppable
        photoContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            photoContainer.classList.add('dragover');
        });

        photoContainer.addEventListener('dragleave', () => {
            photoContainer.classList.remove('dragover');
        });

        photoContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            photoContainer.classList.remove('dragover');

            if (!draggedPhoto || sourceZone === photoContainer) return;

            // If photo is from a zone, remove it from answers
            if (sourceZone) {
                const sourceZoneId = sourceZone.dataset.zone;
                const sourceContent = sourceZone.querySelector('.zone-content');
                delete currentAnswers[sourceZoneId];
                sourceContent.innerHTML = '';
                sourceZone.classList.remove('filled');
                saveAnswer(5, currentAnswers);
            }

            // Move photo back to container
            photoContainer.appendChild(draggedPhoto);
            
            // Update next button state
            const allZonesFilled = Array.from(dropZones)
                .every(z => z.querySelector('.zone-content').hasChildNodes());
            
            const nextButton = document.getElementById('next-btn');
            if (nextButton) {
                nextButton.disabled = !allZonesFilled;
                nextButton.style.pointerEvents = allZonesFilled ? 'auto' : 'none';
                nextButton.style.opacity = allZonesFilled ? '1' : '0.5';
            }
        });
    }

    // For result page
    if (window.location.pathname.includes('result')) {
        calculateScore();
    }
}); 