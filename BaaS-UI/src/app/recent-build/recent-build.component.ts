import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {BuildResponse} from "../baas/build.response.model";
import {BaasService} from "../services/baas.service";
import {BuildResponseComponent} from "../baas/dialog/build-response/build-response.component";
import {MatDialog} from "@angular/material/dialog";
import {NgxSpinnerService} from "ngx-spinner";
import {Branch} from "../baas/branch.model";


@Component({
  selector: 'app-recent-build',
  templateUrl: './recent-build.component.html',
  styleUrls: ['./recent-build.component.scss']
})
export class RecentBuildComponent implements OnInit {

  constructor(private baasService: BaasService, private dialog: MatDialog, private spinner: NgxSpinnerService) {
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns = ['Repository', 'java_files', 'jars', 'build_type', 'class_files','build_version', 'build_time_stamp', "Build_Status", "actions"];
  public dataSource = new MatTableDataSource<BuildResponse>();

  public cover = 'cover';
  public totalBuildAttempt = "";
  public totalFailedBuild = "";
  public totalBuildSuccess = "";
  public averageBuildTime = "";
  public loadingMessage = "Loading..."

  ngOnInit(): void {
    this.spinner.show().then(r => {
      this.baasService.getProjects().subscribe((res: BuildResponse[]) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.calculateStatistic();
        this.spinner.hide().then(r => {
          console.log(this.averageBuildTime)
        });
      })
    });
  }

  private calculateStatistic() {
    let totalBuild = this.dataSource.data.length;
    let success = 0;
    let failed = 0;
    let averageTime = 0;
    let totalBuildTime = 0
    this.dataSource.data.forEach(r => {
      totalBuildTime += r.total_compilation_time;
      if (r.success) success++;
      else failed++;
    });
    if (totalBuild > 0) {
      averageTime = (totalBuildTime / totalBuild);
      console.log(totalBuild)
      console.log(averageTime);
    }
    this.totalBuildAttempt = totalBuild + "";
    this.totalBuildSuccess = success + "";
    this.totalFailedBuild = failed + "";
    this.averageBuildTime = averageTime.toFixed(2) + " sec";
  }


  public customSort = (event: any) => {
    console.log(event);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  public doFilter = (target: any) => {
    this.dataSource.filter = target.value.trim().toLocaleLowerCase();
  }

  public showBuildResponse(response: BuildResponse) {
    const dialogRef = this.dialog.open(BuildResponseComponent, {
        data: response
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log("dialog confirm")
      } else {
        console.log("dialog cancel")
      }
    });
  }

}
