class BreathingExercise {
    constructor() {
        this.isRunning = false;
        this.cycleCount = 0;
        this.currentPhase = 'inhale';
        this.phaseTime = 0;
        
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.breathingText = document.getElementById('breathingText');
        this.cycleCounter = document.getElementById('cycleCounter');
        this.svg = document.getElementById('breathingCurve');
        this.avatarContainer = document.getElementById('avatarContainer');
        
        this.startBtn.addEventListener('click', () => this.start());
        this.stopBtn.addEventListener('click', () => this.stop());
        
        this.createCircle();
        
        this.phaseTimings = {
            inhale: 4000,
            hold: 4000,
            exhale: 4000
        };
    }
    
    createCircle() {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '150');
        circle.setAttribute('cy', '150');
        circle.setAttribute('r', '12');
        circle.setAttribute('fill', '#C4956E');
        circle.setAttribute('id', 'breathingCircle');
        circle.style.filter = 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2))';
        this.svg.appendChild(circle);
        this.circle = circle;
    }
    
    start() {
        this.isRunning = true;
        this.cycleCount = 0;
        this.currentPhase = 'inhale';
        this.phaseTime = 0;
        this.cycleCounter.textContent = '0';
        
        this.startBtn.style.display = 'none';
        this.stopBtn.style.display = 'block';
        
        this.avatarContainer.style.display = 'none';
        this.svg.style.display = 'block';
        this.breathingText.style.display = 'block';
        
        this.animate();
    }
    
    stop() {
        this.isRunning = false;
        this.startBtn.style.display = 'block';
        this.stopBtn.style.display = 'none';
        this.breathingText.textContent = 'Prepare';
        this.circle.setAttribute('cy', '150');
        
        this.avatarContainer.style.display = 'flex';
        this.svg.style.display = 'none';
        this.breathingText.style.display = 'none';
    }
    
    animate = () => {
        if (!this.isRunning) return;
        
        this.phaseTime += 16;
        const phaseDuration = this.phaseTimings[this.currentPhase];
        let progress = this.phaseTime / phaseDuration;
        
        if (progress > 1) {
            progress = 1;
            this.phaseTime = 0;
            this.advancePhase();
        }
        
        this.updateCirclePosition(progress);
        
        const phaseText = {
            inhale: 'Inhale',
            hold: 'Hold',
            exhale: 'Exhale'
        };
        this.breathingText.textContent = phaseText[this.currentPhase];
        
        requestAnimationFrame(this.animate);
    }
    
    updateCirclePosition(progress) {
        const centerY = 150;
        const maxHeight = 80;
        let yPosition;
        
        if (this.currentPhase === 'inhale') {
            yPosition = centerY - (progress * maxHeight);
        } else if (this.currentPhase === 'hold') {
            yPosition = centerY - maxHeight;
        } else if (this.currentPhase === 'exhale') {
            yPosition = centerY - (maxHeight * (1 - progress));
        }
        
        this.circle.setAttribute('cy', yPosition);
    }
    
    advancePhase() {
        const phases = ['inhale', 'hold', 'exhale'];
        const currentIndex = phases.indexOf(this.currentPhase);
        const nextIndex = (currentIndex + 1) % phases.length;
        
        this.currentPhase = phases[nextIndex];
        
        if (this.currentPhase === 'inhale') {
            this.cycleCount++;
            this.cycleCounter.textContent = this.cycleCount;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BreathingExercise();
});
