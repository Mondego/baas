import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GitHubApiService} from '../services/github.api.service';
import {NgxSpinnerService} from "ngx-spinner";
import {JbfBuildService} from "../services/jbf.build.service";
import {Branch} from "./branch.model";
import {BuildRequest} from "./build.request.model";
import {BuildResponse} from "./build.response.model";
import {MatDialog} from "@angular/material/dialog";
import {BuildResponseComponent} from "./dialog/build-response/build-response.component";
import * as sample from "./sample-response.json"
import {BaasService} from "../services/baas.service";

@Component({
  selector: 'app-repo-form',
  templateUrl: './baas.component.html',
  styleUrls: ['./baas.component.css']
})
export class BaasComponent implements OnInit {

  public org = "";
  public repo = "";
  public repoSearchForm!: FormGroup;
  public branches: Branch[] = [];
  public dropdownSelectedBranch = "";
  public githubPastedOrTypedURL = "";
  public loadingMessage = "Loading..."
  public branchCommitPair = new Map<string, Branch>();

  constructor(private jbfBuildService: JbfBuildService, private baasService: BaasService,
              private router: Router, private formBuilder: FormBuilder, private dialog: MatDialog, private repoService: GitHubApiService,
              private spinner: NgxSpinnerService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.reactiveForm();
    this.spinner.show().then(r => {

    });
    setTimeout(() => {
      this.spinner.hide().then(r => {

      });
    }, 1000);
  }

  public reactiveForm(): void {
    this.repoSearchForm = this.formBuilder.group({
      gitURLForm: [null, [Validators.required]], // from-UI
      branchForm: [null, [Validators.required]], // from-UI auto generated
    });
  }

  private errorSnackBar(): void {
    this.snackBar.open('Provided Repository or Branches Not Found', 'Close', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }

  private wrongURL(): void {
    this.snackBar.open('Non-GitHub URL', 'Close', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
    this.clearForm();
  }

  private languageErrorSnackBar(): void {
    this.snackBar.open('Sorry!! Currently BaaS Can Only Build Java Repository', 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'start',
    });
  }

  private successSnackBar(): void {
    this.snackBar.open('Branches Loaded!! Select a Branch', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'start',
    });
  }

  public onPaste(event: any) {
    let val = event.clipboardData.getData('Text')
    this.loadingMessage = "Loading Branches"
    this.spinner.show().then(r => {

    });
    setTimeout(() => {
    }, 3000);
    if (val.includes("https://github.com/")) {
      this.loadBranches(val)
    } else {
      this.wrongURL();
    }
    setTimeout(() => {
      this.spinner.hide().then(r => {

      });
    }, 2000);
  }

  public onBranchSelected(event: any): void {
    this.dropdownSelectedBranch = event.value;
  }

  public loadBranches(value: any): void {
    let url = value;
    let map = url.split("https://github.com/");
    let org_repo = map[1].split("/");
    this.org = org_repo[0];
    this.repo = org_repo[1];
    this.repoService.getBranches(this.org, this.repo).subscribe(
      (bran) => { //Next callback
        bran.forEach(b => {
          this.branches.push(b);
          this.branchCommitPair.set(b.name, b);
          this.githubPastedOrTypedURL = url;
        });
        setTimeout(() => {
          this.successSnackBar();
          // @ts-ignore
          this.repoSearchForm.get('gitURLForm').disable();
        }, 2000);
      },
      (error) => {
        console.error('error caught in component')
        setTimeout(() => {
          this.errorSnackBar();
          this.githubPastedOrTypedURL = "";
        }, 2000);
      }
    );
  }

  public clearForm() {
    this.reactiveForm();
    this.githubPastedOrTypedURL = "";
    // @ts-ignore
    this.repoSearchForm.get('gitURLForm').enable();
    this.branches = [];
    this.dropdownSelectedBranch = "";


  }

  public build() {
    this.loadingMessage = "Building Project..."
    this.spinner.show().then(r => {

    });
    this.repoService.checkBranch(this.org, this.repo, this.repoSearchForm.value['branchForm']).subscribe(
      (response) => { //Next callback
        this.repoService.checkLanguage(this.org, this.repo).subscribe((response) => {
            let lan = response['items'][0]['language'];
            console.log(lan);
            if (lan == "Java") {
              console.log(this.githubPastedOrTypedURL);
              console.log(this.dropdownSelectedBranch);
              this.invokeJBFBuild();
            } else {
              this.clearForm();
              this.languageErrorSnackBar();
              this.spinner.hide().then(r => {
              })
            }
          },
          (errors) => {
          });
      },
      (error) => { //Error callback
        this.errorSnackBar()
      });
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

  public invokeJBFBuild() {
    //https://github.com/owner/repo/archive/commit.sha.zip
    let url = this.githubPastedOrTypedURL;
    // @ts-ignore
    let commit_sha = this.branchCommitPair.get(this.dropdownSelectedBranch).commit.sha;
    //http://127.0.0.1:5000/project?url=https://github.com/vishalsurya/APPROXIMATE-TEXT-MATCH&commit_sha=2a768682e92b9cf6f1566e74dd854ccb0407ad71
    console.log("repoURL: " + url)
    console.log("commit: " + commit_sha)
    let base = "https://github.com/"
    let owner_repo = url.split(base)[1];
    let owner = owner_repo.split("/")[0];
    let repo = owner_repo.split("/")[1];
    let branch = this.dropdownSelectedBranch;
    let buildRequest = {"owner": owner, "repo": repo, "branch": branch, "commit_sha": commit_sha} as BuildRequest;
    this.jbfBuildService.executeJBFBuild(buildRequest).subscribe(response => {
      console.log(response)
      this.baasService.addProject(response).then(res => {
        this.spinner.hide().then(r => {
          console.log(res)
          this.clearForm();
          this.showBuildResponse(response);
        }).catch(error => console.log(error));
        ;
      }).catch(error => console.log(error));
    })
    //dummy response
    // this.spinner.hide().then(r => {
    //   this.clearForm();
    //   this.showBuildResponse(sample);
    // });

  }

}
