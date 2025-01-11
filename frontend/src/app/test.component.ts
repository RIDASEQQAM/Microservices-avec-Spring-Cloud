import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; background-color: lightblue;">
      <h2>Test Component</h2>
      <p>If you can see this, Angular is working!</p>
    </div>
  `
})
export class TestComponent {}
