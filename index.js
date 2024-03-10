document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('expense-form');
    const addedDiv = document.getElementById('added');
    const addBtn = document.getElementById('btn');
    addBtn.addEventListener('click',function(){
        console.log("Expenses Added succesfully");

    });

    addBtn.addEventListener('click', function(event) {
        event.preventDefault(); 
       
        const formData = new FormData(form);

        fetch('/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add expense');
            }
            return response.json();
        })
        .then(data => {
            console.log('Expense added successfully:', data);
            
            addedDiv.style.display = 'block';
        })
        .catch(error => {
            console.error('Error adding expense:', error);
           
            alert('Failed to add expense. Please try again.');
        });
    });
});
