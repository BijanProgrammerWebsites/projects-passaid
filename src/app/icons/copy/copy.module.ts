import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CopyComponent} from './copy.component';

@NgModule({
    declarations: [CopyComponent],
    imports: [CommonModule],
    exports: [CopyComponent],
})
export class CopyModule {}
