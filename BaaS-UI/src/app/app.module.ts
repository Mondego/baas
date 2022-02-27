import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from "@angular/material/divider";
import {JbfBuildService} from "./services/jbf.build.service";
import {GitHubApiService} from "./services/github.api.service";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatSliderModule} from "@angular/material/slider";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgxSpinnerModule} from "ngx-spinner";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatExpansionModule} from "@angular/material/expansion";
import {NotFoundComponent} from "./not-found/not-found.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {JgiganticComponent} from './jgigantic/jgigantic.component';
import {FooterComponent} from "./layout/footer/footer.component";
import {HeaderComponent} from "./layout/header/header.component";
import {DefaultComponent} from "./layout/default/default.component";
import {SidenavService} from "./layout/side-nav/sidenav.service";
import {SideNavComponent} from "./layout/side-nav/side-nav.component";
import {NgChartsModule} from 'ng2-charts';
import {StatComponent} from "./recent-build/stat/stat.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatChipsModule} from "@angular/material/chips";
import {FlexLayoutModule} from "@angular/flex-layout";
import {JbfComponent} from './jbf/jbf.component';
import {MatTableModule} from "@angular/material/table";
import {JgiganticService} from "./services/jgigantic.service";
import {MatSortModule} from "@angular/material/sort";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {provideFirestore, getFirestore} from '@angular/fire/firestore';
import {AngularFireModule} from "@angular/fire/compat";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {BuildResponseComponent} from './baas/dialog/build-response/build-response.component';
import {MatDialogModule} from "@angular/material/dialog";
import {RecentBuildComponent} from './recent-build/recent-build.component';
import {BaasService} from "./services/baas.service";
import {BaasComponent} from "./baas/baas.component";
import {MatMenuModule} from '@angular/material/menu';
import * as credential from "service.json";

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    BaasComponent,
    NotFoundComponent,
    JgiganticComponent,
    FooterComponent,
    HeaderComponent,
    DefaultComponent,
    StatComponent,
    JbfComponent,
    BuildResponseComponent,
    RecentBuildComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSliderModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatGridListModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatCardModule,
    MatTabsModule,
    NgxSpinnerModule,
    MatProgressBarModule,
    FontAwesomeModule,
    NgChartsModule,
    MatPaginatorModule,
    MatChipsModule,
    FlexLayoutModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    provideFirebaseApp(() => initializeApp(credential)),
    provideFirestore(() => getFirestore()),
    // AngularFireModule.initializeApp(environment.firebase),
    /* AngularFirestoreModule,*/
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    AngularFireModule.initializeApp(credential),
    MatMenuModule,
  ],
  providers: [JbfBuildService, GitHubApiService, SidenavService, JgiganticService, BaasService
    , {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance: "fill"}
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
