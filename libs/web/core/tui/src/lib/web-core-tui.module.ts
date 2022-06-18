import {NgModule} from '@angular/core';
import {TuiAlertModule, TuiDialogModule, TuiRootModule} from '@taiga-ui/core';

@NgModule({
    imports: [TuiRootModule, TuiAlertModule, TuiDialogModule],
    exports: [TuiRootModule],
})
export class WebCoreTuiModule {}
