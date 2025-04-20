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
});
