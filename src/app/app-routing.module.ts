import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayGameComponent } from './play-game/play-game.component';
import { AdminComponent } from './admin/admin.component';
import { ResultComponent } from './result/result.component';
import { JigSawComponent } from './jig-saw/jig-saw.component';
import { PlayGroundComponent } from './play-ground/play-ground.component';
import { QueriesComponent } from './queries/queries.component';

const routes: Routes = [
  {path:'',redirectTo:'/playgames',pathMatch:'full'},
  {path:'playgames', component:PlayGameComponent},
  {path:'admin/123123', component:AdminComponent},
  {path:'queries', component:QueriesComponent},
  {path:'result/123123', component:ResultComponent},   
  {path:'playgames/:gameid/:id/:name',component: PlayGroundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
