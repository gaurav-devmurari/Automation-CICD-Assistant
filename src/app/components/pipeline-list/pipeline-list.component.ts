import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Pipeline {
  id: number;
  repository: string;
  projectType: string;
  nodeVersion: string;
  currentVersion: number;
  createdAt: string;
}

/**
 * Pipeline list component showing CI/CD pipelines in a table format
 */
@Component({
  selector: 'app-pipeline-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pipeline-list.component.html',
  styleUrls: ['./pipeline-list.component.css']
})
export class PipelineListComponent implements OnInit {
  
  pipelines: Pipeline[] = [
    {
      id: 1,
      repository: 'GitLab',
      projectType: 'Angular',
      nodeVersion: '16',
      currentVersion: 1,
      createdAt: '16-05-2025 1:05:54 PM'
    },
    {
      id: 2,
      repository: 'GitLab',
      projectType: 'Angular',
      nodeVersion: '20.00.00',
      currentVersion: 1,
      createdAt: '29-05-2025 6:32:59 PM'
    },
    {
      id: 3,
      repository: 'GitHub',
      projectType: 'React',
      nodeVersion: '18',
      currentVersion: 2,
      createdAt: '15-06-2025 3:22:15 PM'
    },
    {
      id: 4,
      repository: 'GitLab',
      projectType: 'Vue',
      nodeVersion: '16.14.2',
      currentVersion: 1,
      createdAt: '22-06-2025 9:45:30 AM'
    },
    {
      id: 5,
      repository: 'GitHub',
      projectType: 'Node.js',
      nodeVersion: '20.5.1',
      currentVersion: 3,
      createdAt: '01-07-2025 2:18:45 PM'
    },
    {
      id: 6,
      repository: 'GitHub',
      projectType: 'React',
      nodeVersion: '18',
      currentVersion: 2,
      createdAt: '15-06-2025 3:22:15 PM'
    },
    {
      id: 7,
      repository: 'GitLab',
      projectType: 'Angular',
      nodeVersion: '16',
      currentVersion: 1,
      createdAt: '16-05-2025 1:05:54 PM'
    },
    {
      id: 8,
      repository: 'GitLab',
      projectType: 'Angular',
      nodeVersion: '20.00.00',
      currentVersion: 1,
      createdAt: '29-05-2025 6:32:59 PM'
    },
    {
      id: 9,
      repository: 'GitHub',
      projectType: 'React',
      nodeVersion: '18',
      currentVersion: 2,
      createdAt: '15-06-2025 3:22:15 PM'
    }
  ];

  ngOnInit(): void {
    // Component initialization
  }

  /**
   * Handle edit pipeline action
   */
  editPipeline(pipeline: Pipeline): void {
    console.log('Editing pipeline:', pipeline);
    // Handle edit logic here
  }

  /**
   * Handle delete pipeline action
   */
  deletePipeline(pipeline: Pipeline): void {
    console.log('Deleting pipeline:', pipeline);
    // Handle delete logic here
    this.pipelines = this.pipelines.filter(p => p.id !== pipeline.id);
  }

  /**
   * Handle create new pipeline action
   */
  createNewPipeline(): void {
    console.log('Creating new pipeline...');
    // Handle create new pipeline logic here
  }

  /**
   * Track by function for ngFor performance
   */
  trackByPipeline(index: number, pipeline: Pipeline): number {
    return pipeline.id;
  }
}