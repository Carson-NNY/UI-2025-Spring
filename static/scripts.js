// Rule of Thirds Photography Tutorial
document.addEventListener('DOMContentLoaded', function() {
  console.log('Rule of Thirds Tutorial loaded');
  
  // Initialize any interactive elements
  const nextButtons = document.querySelectorAll('.btn-next');
  if (nextButtons) {
    nextButtons.forEach(button => {
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
      });
      button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    });
  }

  // Quiz functionality
  const answerPanels = document.querySelectorAll('.answer-panel');
  const nextButton = document.getElementById('next-btn');
  const reviewButton = document.getElementById('review-btn');
  const reviewTip = document.getElementById('review-tip');
  let selectedAnswer = null;

  // Handle answer selection
  if (answerPanels) {
    answerPanels.forEach(panel => {
      panel.addEventListener('click', () => {
        // Remove selection from other panels
        answerPanels.forEach(p => p.classList.remove('selected'));
        // Add selection to clicked panel
        panel.classList.add('selected');
        selectedAnswer = panel.dataset.choice;
        // Enable next button
        if (nextButton) {
          nextButton.disabled = false;
          nextButton.style.pointerEvents = 'auto';
          nextButton.style.opacity = '1';
        }
      });
    });
  }

  // Handle review button click
  if (reviewButton) {
    reviewButton.addEventListener('click', () => {
      reviewTip.style.display = 'block';
      // Hide tip after 5 seconds
      setTimeout(() => {
        reviewTip.style.display = 'none';
      }, 5000);
    });
  }

  // Initialize next button state
  if (nextButton && !selectedAnswer) {
    nextButton.style.pointerEvents = 'none';
    nextButton.style.opacity = '0.5';
  }

  // Quiz 5 Drag and Drop functionality
  const draggablePhotos = document.querySelectorAll('.draggable-photo');
  const dropZones = document.querySelectorAll('.drop-zone');
  let draggedPhoto = null;

  if (draggablePhotos.length && dropZones.length) {
    // Drag events for photos
    draggablePhotos.forEach(photo => {
      photo.addEventListener('dragstart', (e) => {
        draggedPhoto = photo;
        photo.classList.add('dragging');
        e.dataTransfer.setData('text/plain', photo.dataset.photoId);
      });

      photo.addEventListener('dragend', () => {
        photo.classList.remove('dragging');
        draggedPhoto = null;
      });
    });

    // Drop events for zones
    dropZones.forEach(zone => {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('dragover');
      });

      zone.addEventListener('dragleave', () => {
        zone.classList.remove('dragover');
      });

      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('dragover');
        
        if (draggedPhoto) {
          // Clear previous content
          const content = zone.querySelector('.zone-content');
          content.innerHTML = '';
          
          // Create new image in drop zone
          const img = document.createElement('img');
          img.src = draggedPhoto.src;
          img.alt = draggedPhoto.alt;
          content.appendChild(img);
          
          // Hide original photo
          draggedPhoto.style.display = 'none';
          
          // Mark zone as filled
          zone.classList.add('filled');
          
          // Check if all zones are filled
          const allZonesFilled = Array.from(dropZones)
            .every(z => z.classList.contains('filled'));
          
          // Enable next button if all zones are filled
          if (allZonesFilled && nextButton) {
            nextButton.disabled = false;
            nextButton.style.pointerEvents = 'auto';
            nextButton.style.opacity = '1';
          }
        }
      });
    });
  }
});
