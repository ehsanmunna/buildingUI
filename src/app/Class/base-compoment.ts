import { UnsubscribeAdapter } from './unsubscribe-adapter';

export class BaseCompoment extends UnsubscribeAdapter {
    public isLoading = false;
    constructor() {
        super();
    }
}
