        // Get DOM elements
        const modelSelect = document.getElementById('modelSelect');
        const questionsGrid = document.getElementById('questionsGrid');
        const questionInput = document.getElementById('questionInput');

        // Add event listener to model select
        modelSelect.addEventListener('change', function() {
            console.log('Selected model:', this.value);
        });

        // Add event listeners to grid items
        questionsGrid.querySelectorAll('.grid-item').forEach(item => {
            item.addEventListener('click', function() {
                questionInput.value = this.textContent;
            });
        });

    

        // Add event listener to question input
        questionInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                console.log('Submitted question:', this.value);
                fetch('/generate_text', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        prompt: this.value
                    })
                }).then(response => response.json())
                    .then(data => {
                        console.log('Generated text:', data.text);
                        const allOutputContainer = document.getElementById('output');
                        const output = document.createElement('div');
                        output.innerHTML = `
                            <h3>Prompt:</h3>
                            <p>${this.value}</p>
                            <h3>Answer:</h3>
                            <p>${data.text}</p>
                        `;
                        allOutputContainer.appendChild(output);
                        this.value = ''; // Clear the input after submission
            });
        });

