import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {NavigationComponent} from "src/app/component/navigation/navigation.component";
import {GameComponent} from "src/app/component/game/game.component";
const routes: Routes = [
  // {path: "", component: NavigationComponent }
  {path: "", component: GameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
