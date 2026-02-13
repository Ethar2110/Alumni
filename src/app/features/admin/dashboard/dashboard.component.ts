import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h1>Admin Dashboard</h1>
      <p class="welcome">Welcome, {{ authService.user()?.name }}!</p>
      
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Alumni</h3>
          <p class="number">2,543</p>
        </div>
        <div class="stat-card">
          <h3>New Registrations</h3>
          <p class="number">12</p>
          <span class="trend">↑ 5% this week</span>
        </div>
        <div class="stat-card">
          <h3>Pending Approvals</h3>
          <p class="number">8</p>
          <button class="btn btn-sm">Review</button>
        </div>
        <div class="stat-card">
          <h3>Messages</h3>
          <p class="number">5</p>
          <span class="unread">2 unread</span>
        </div>
      </div>
      
      <div class="recent-activity">
        <h2>Recent Activity</h2>
        <ul>
          <li><strong>John Doe</strong> updated their profile. <span class="time">2 mins ago</span></li>
          <li><strong>Jane Smith</strong> posted a new success story. <span class="time">1 hour ago</span></li>
          <li>New registration from <strong>Michael Brown</strong>. <span class="time">3 hours ago</span></li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      
      h1 { color: var(--primary-color); margin-bottom: 0.5rem; }
      .welcome { font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.8; }
      
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 3rem;
        
        .stat-card {
          background: var(--card-bg);
          padding: 1.5rem;
          border-radius: var(--border-radius);
          box-shadow: var(--shadow);
          text-align: center;
          
          h3 { margin: 0 0 0.5rem; font-size: 1rem; opacity: 0.7; }
          .number { font-size: 2.5rem; font-weight: bold; margin: 0.5rem 0; color: var(--text-color); }
          .trend { color: #28a745; font-size: 0.9rem; }
          .unread { color: #dc3545; font-size: 0.9rem; }
          
          .btn { margin-top: 0.5rem; width: 100%; }
        }
      }
      
      .recent-activity {
        background: var(--card-bg);
        padding: 2rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        
        h2 { margin-top: 0; margin-bottom: 1.5rem; font-size: 1.5rem; }
        
        ul {
          list-style: none;
          padding: 0;
          
          li {
            padding: 1rem 0;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            
            &:last-child { border-bottom: none; }
            
            .time { opacity: 0.6; font-size: 0.9rem; }
          }
        }
      }
    }
  `]
})
export class DashboardComponent {
  authService = inject(AuthService);
}
