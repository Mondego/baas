import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BuildResponse} from "../../build.response.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-build-response',
  templateUrl: './build-response.component.html',
  styleUrls: ['./build-response.component.scss']
})
export class BuildResponseComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BuildResponseComponent>,
              @Inject(MAT_DIALOG_DATA) public data: BuildResponse,
              private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
  }


  private popUpSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      // 'top' | 'bottom'
      horizontalPosition: 'start',
      // 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }

  public goToRecentBuild(): void {
    this.dialogRef.close();
    this.router.navigate(['/recent-build']).then(r => {
      console.log("Redirecting to /recent-build")
    });
  }

  public downloadBuild(): void {
    let test_link = "https://mondego.ics.uci.edu/projects/jbf/ase-22-java-build/dir_226/skylabspune%23%23EyeMouseControll.zip";
    window.open(test_link);
    this.popUpSnackBar("Build Downloading...")
    this.dialogRef.close();
  }

}
