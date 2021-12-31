import { NgModule } from "@angular/core";

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';


const modules = [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule
]

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule { }