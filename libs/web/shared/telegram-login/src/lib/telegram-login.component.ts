import {
    Attribute,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    NgZone,
    OnDestroy,
    Output,
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {WINDOW} from '@ng-web-apis/common';
import {
    TELEGRAM_LOGIN_CONFIG,
    TelegramLoginConfig,
    TelegramUserCredentials,
} from './models';

const enum DataAttribute {
    TelegramLogin = 'data-telegram-login',
    Size = 'data-size',
    Userpic = 'data-userpic',
    Radius = 'data-radius',
    RequestAccess = 'data-request-access',
    OnAuth = 'data-onauth',
}

@Component({
    selector: 'hoba-telegram-login',
    template: ``,
})
export class TelegramLoginComponent implements OnDestroy {
    private static authCallbackName = 'onTelegramAuth';

    private readonly script = this.createWidget();

    @Output()
    auth = new EventEmitter<TelegramUserCredentials>();

    @Output()
    widgetLoad: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    widgetError: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        @Inject(TELEGRAM_LOGIN_CONFIG)
        private readonly config: TelegramLoginConfig,
        @Inject(DOCUMENT)
        private readonly document: Document,
        @Inject(WINDOW)
        private readonly window: Window,
        private ngZone: NgZone,
        @Attribute('botUserName')
        botUserName: string | undefined,
        @Attribute('requestAccess')
        requestAccess: TelegramLoginConfig['requestAccess'] | undefined,
        @Attribute('authorizationType')
        authorizationType: TelegramLoginConfig['authorizationType'] | undefined,
        @Attribute('size')
        size: TelegramLoginConfig['size'] | undefined,
        @Attribute('radius')
        radius: string | undefined,
        @Attribute('showUserPhoto')
        showUserPhoto: 'true' | 'false' | undefined,
        elementRef: ElementRef<HTMLElement>,
    ) {
        this.botUserName = botUserName ?? this.config.botUserName;
        this.requestAccess = requestAccess ?? this.config.requestAccess;
        this.authorizationType = authorizationType ?? this.config.authorizationType;
        this.size = size ?? this.config.size;
        this.radius = radius ?? this.config.radius;
        this.showUserPhoto = showUserPhoto ?? this.config.showUserPhoto;

        elementRef.nativeElement.appendChild(this.script);
    }

    set botUserName(botUserName: string) {
        this.script.setAttribute(DataAttribute.TelegramLogin, botUserName);
    }

    set requestAccess(requestAccess: TelegramLoginConfig['requestAccess'] | undefined) {
        requestAccess
            ? this.script.setAttribute(DataAttribute.RequestAccess, requestAccess)
            : this.script.removeAttribute(DataAttribute.RequestAccess);
    }

    set authorizationType(authorizationType: TelegramLoginConfig['authorizationType']) {
        if (authorizationType === 'callback') {
            const onAuth = `${TelegramLoginComponent.authCallbackName}(user)`;
            this.script.setAttribute(DataAttribute.OnAuth, onAuth);
            this.setAuthCallback();

            return;
        }
    }

    set size(size: TelegramLoginConfig['size']) {
        this.script.setAttribute(DataAttribute.Size, size);
    }

    set showUserPhoto(value: boolean | 'false' | 'true') {
        const showUserPhoto = `${value}`;

        if (showUserPhoto === 'false') {
            this.script.setAttribute(DataAttribute.Userpic, 'false');
        }
    }

    set radius(radius: number | string) {
        this.script.setAttribute(DataAttribute.Radius, `${radius}`);
    }

    ngOnDestroy() {
        this.clearAuthCallback();
    }

    private createWidget() {
        const script = this.document.createElement('script');
        script.async = true;
        script.src = this.config.src;

        script.onload = () => this.widgetLoad.emit();
        script.onerror = () => this.widgetError.emit();

        return script;
    }

    private setAuthCallback() {
        (this.window as any)[TelegramLoginComponent.authCallbackName] = (
            user: TelegramUserCredentials,
        ) => this.ngZone.run(() => this.auth.emit(user));
    }

    private clearAuthCallback() {
        (this.window as any)[TelegramLoginComponent.authCallbackName] = undefined;
    }
}
