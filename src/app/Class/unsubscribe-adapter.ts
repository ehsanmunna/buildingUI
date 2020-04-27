
import { SubSink } from "subsink";
import { OnDestroy } from '@angular/core';
export class UnsubscribeAdapter implements OnDestroy {
    public subs = new SubSink();
    ngOnDestroy() {
        this.subs.unsubscribe();
      }
}