import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {NavigationComponent} from "src/app/component/navigation/navigation.component";
import {GameComponent} from "src/app/component/game/game.component";
import {StatisticsComponent} from "src/app/component/statistics/statistics.component";
import {NotfoundComponent} from "src/app/component/notfound/notfound.component";
import { SolverComponent } from './component/solver/solver.component';

const routes: Routes = [
  // {path: "", component: NavigationComponent }
  {path: "", component: GameComponent },
  {path: "solver", component: SolverComponent },
  {path: "statistics", component: StatisticsComponent },
  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
