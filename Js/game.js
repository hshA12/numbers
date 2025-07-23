class OddEvenGame {
    constructor() {
        this.minimal = [3, 11, 5, 15, 7, 25, 9, 35, 11, 45, 13, 55];
        this.maximal = [10, 30, 14, 34, 24, 44, 32, 54, 42, 64, 52, 74];
        this.currentLevel = 0;
        this.userInputs = [];
        this.gameCompleted = false;
        this.levels = [];
        
        this.generateLevels();
        this.initializeGame();
        this.setupEventListeners();
    }
    
    generateLevels() {
        this.levels = [];
        for (let level = 0; level < 12; level++) {
            const levelArray = [];
            const min = this.minimal[level];
            const max = this.maximal[level];
            
            for (let i = min; i <= max; i++) {
                levelArray.push(i);
            }
            this.levels.push(levelArray);
        }
    }
    
    initializeGame() {
        this.currentLevel = 0;
        this.gameCompleted = false;
        this.initializeInputs();
        this.updateUI();
    }
    
    initializeInputs() {
        const inputCount = this.currentLevel === 0 ? 4 : 10;
        this.userInputs = new Array(inputCount).fill('');
        this.renderInputs();
        this.updateSubmitButton();
    }
    
    renderInputs() {
        const container = document.getElementById('inputContainer');
        container.innerHTML = '';
        
        this.userInputs.forEach((value, index) => {
            const colDiv = document.createElement('div');
            colDiv.className = 'col-md-6 col-lg-4';
            
            colDiv.innerHTML = `
              
                    <input 
                        type="number" 
                        class="form-control  form-control-lg col-md-6 col-lg-4 mb-3" 
                        id="input-${index}"
                        value="${value}"
                        min="${this.minimal[this.currentLevel]}"
                        max="${this.maximal[this.currentLevel]}"
                        placeholder="أدخل الرقم ${index + 1}"
                    >
              
            `;
            
            container.appendChild(colDiv);
            
            // Add event listener
            const input = colDiv.querySelector(`#input-${index}`);
            input.addEventListener('input', (e) => {
                this.handleInputChange(index, e.target.value);
            });
        });
    }
    
    handleInputChange(index, value) {
        this.userInputs[index] = value;
        this.updateSubmitButton();
    }
    
    updateSubmitButton() {
        const submitBtn = document.getElementById('submitBtn');
        const allFilled = this.userInputs.every(input => input !== '' && input !== null);
        submitBtn.disabled = !allFilled;
    }
    
    validateAndSubmit() {
        const min = this.minimal[this.currentLevel];
        const max = this.maximal[this.currentLevel];
        
        // Validate range
        for (let i = 0; i < this.userInputs.length; i++) {
            const num = parseInt(this.userInputs[i]);
            if (isNaN(num) || num < min || num > max) {
                this.showMessage(`Number ${i + 1} must be between ${min} and ${max}`, 'danger');
                return;
            }
        }
        
        // Calculate results using level array
        const levelArray = this.levels[this.currentLevel];
        let oddSum = 0;
        let evenSum = 0;
        
        for (let i = 0; i < this.userInputs.length; i++) {
            const userNum = parseInt(this.userInputs[i]);
            const result = levelArray[userNum - min]; // Adjust for array indexing
            
            if (result % 2 === 0) {
                evenSum += result;
            } else {
                oddSum += result;
            }
        }
        
        // Check if balanced
        if (oddSum === evenSum) {
            this.showMessage(`Success! Odd sum: ${oddSum}, Even sum: ${evenSum}`, 'success');
            setTimeout(() => {
                this.nextLevel();
            }, 2000);
        } else {
            this.showMessage(`Try again! Odd sum: ${oddSum}, Even sum: ${evenSum}. They must be equal.`, 'danger');
        }
    }
    
    nextLevel() {
        this.currentLevel++;
        if (this.currentLevel >= 12) {
            this.gameCompleted = true;
            this.showGameCompleted();
        } else {
            this.initializeInputs();
            this.updateUI();
            this.clearMessages();
        }
    }
    
    updateUI() {
        document.getElementById('currentLevel').textContent = this.currentLevel + 1;
        const progress = Math.round(((this.currentLevel + 1) / 12) * 100);
        document.getElementById('progressPercent').textContent = progress;
        document.getElementById('progressBar').style.width = progress + '%';
        
        const rangeInfo = document.getElementById('rangeInfo');
        rangeInfo.innerHTML = `<strong>Range for Level ${this.currentLevel + 1}:</strong> ${this.minimal[this.currentLevel]} to ${this.maximal[this.currentLevel]}`;
    }
    
    showMessage(message, type) {
        const container = document.getElementById('messageContainer');
        container.innerHTML = `
            <div class="alert alert-${type} fade-in" role="alert">
                ${message}
            </div>
        `;
    }
    
    clearMessages() {
        document.getElementById('messageContainer').innerHTML = '';
    }
    
    showGameCompleted() {
        document.getElementById('gameArea').classList.add('d-none');
        document.getElementById('gameCompleted').classList.remove('d-none');
    }
    
    resetGame() {
        document.getElementById('gameCompleted').classList.add('d-none');
        document.getElementById('gameArea').classList.remove('d-none');
        this.initializeGame();
        this.clearMessages();
    }
    
    setupEventListeners() {
        document.getElementById('submitBtn').addEventListener('click', () => {
            this.validateAndSubmit();
        });
        
        document.getElementById('playAgainBtn').addEventListener('click', () => {
            this.resetGame();
        });
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new OddEvenGame();
});
