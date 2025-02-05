import { Directive, ElementRef } from '@angular/core';
import { take } from 'rxjs';
import { SocialAuthService } from '@abacritt/angularx-social-login';

declare const google: any;

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'google-signin-button',
  standalone: true,
})
export class GoogleSigninButtonDirective {
  constructor(el: ElementRef, private socialAuthService: SocialAuthService) {
    this.render(el);
  }

  render(el: ElementRef) {
    this.socialAuthService.initState.pipe(take(1)).subscribe(() => {
      google.accounts.id.renderButton(el.nativeElement, {
        type: 'standard',
        size: 'large',
        text: 'signin',
        theme: 'outline',
      });
    });
  }
}
