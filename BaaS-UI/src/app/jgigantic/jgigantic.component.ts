import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {BuiltProject} from "./built.project.model";
import {JgiganticService} from "../services/jgigantic.service";
import {MatTableDataSource} from "@angular/material/table";
import {NgxSpinnerService} from "ngx-spinner";


@Component({
  selector: 'app-jgigantic',
  templateUrl: './jgigantic.component.html',
  styleUrls: ['./jgigantic.component.scss']
})
export class JgiganticComponent implements OnInit {
  public displayedColumns = ['git_repository_link', 'stars', 'java_files', 'jars', 'build_type', 'class_files', 'repository_zip_link', 'bytecode_zip_link'];
  public dataSource = new MatTableDataSource<BuiltProject>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  clickedRows = new Set<any>();
  public loadingMessage = "Loading..."

  constructor(private repoService: JgiganticService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show().then(r => {
      this.repoService.getData()
        .subscribe((res) => {
          this.dataSource.data = res as BuiltProject[];
        })
      this.spinner.hide().then(r => {
      });
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public customSort = (event: any) => {
    console.log(event);
  }

  public doFilter = (target: any) => {
    this.dataSource.filter = target.value.trim().toLocaleLowerCase();
  }

  public clickedOnRows(row: any) {
    this.clickedRows.add(row.bytecode_zip_link);
  }

}


