import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BuildResponse} from "../../build.response.model";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-build-response',
  templateUrl: './build-response.component.html',
  styleUrls: ['./build-response.component.scss']
})
export class BuildResponseComponent implements OnInit {


  archiveBasePath = environment.backendBaseUrl + "compiled";

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

  public downloadBuild(compiled_url: string): void {
    let test_link = this.archiveBasePath + "/" + compiled_url
    window.open(test_link);
    this.popUpSnackBar("Build Downloading...")
    this.dialogRef.close();
  }

}
