import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeComponent} from './home.component';
import {FormsModule} from '@angular/forms';
import {CopyModule} from '../../icons/copy/copy.module';
import {ArrowModule} from '../../icons/arrow/arrow.module';

@NgModule({
    declarations: [HomeComponent],
	imports: [CommonModule, FormsModule, CopyModule, ArrowModule],
})
export class HomeModule {}
