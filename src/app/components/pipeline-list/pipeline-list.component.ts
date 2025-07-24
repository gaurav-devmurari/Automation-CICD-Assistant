import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ProjectList } from "../../model/project.model";
import { PipelineService } from '../../services/pipeline.service';
import { PROJECT_TYPE_OPTIONS } from "../../model/project.enum";

/**
 * Pipeline list component showing CI/CD pipelines in a table format
 */
@Component({
  selector: "app-pipeline-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./pipeline-list.component.html",
  styleUrls: ["./pipeline-list.component.css"],
})
export class PipelineListComponent implements OnInit {
  pipelines: ProjectList[] = [];
  PROJECT_TYPE_OPTIONS = PROJECT_TYPE_OPTIONS;

  constructor(private pipelineService: PipelineService) {

  }

  loadPipelines() {
    this.pipelineService.getPipelines().subscribe({
      next: (res) => {
        const data = res as unknown as {
          total: number;
          documents: ProjectList[];
        };
        this.pipelines = data.documents;
        // this.loader.hide();
      },
      error: (error) => {
        // this.notifyService.error(error.message);
        // this.loader.hide();
      },
    });
  }

  ngOnInit(): void {
    this.loadPipelines();
  }

  editPipeline(pipeline: any): void {
    
  }

  deletePipeline(pipeline: any): void {
    

    
  }

  // trackByPipeline(index: number, pipeline: Pipeline): number {
  //   return pipeline.id;
  // }
}
