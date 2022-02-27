import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BaasComponent} from "./baas/baas.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {DefaultComponent} from "./layout/default/default.component";
import {JgiganticComponent} from "./jgigantic/jgigantic.component";
import {JbfComponent} from "./jbf/jbf.component";
import {RecentBuildComponent} from "./recent-build/recent-build.component";

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [
    {path: '', component: BaasComponent, pathMatch: 'full'},
    {path: 'baas', component: BaasComponent},
    {path: 'recent-build', component: RecentBuildComponent},
    {path: 'jbf', component: JbfComponent},
    {path: 'jgigantic', component: JgiganticComponent},
    {path: '**', component: NotFoundComponent},
  ]
}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
