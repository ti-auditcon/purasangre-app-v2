import { Animation } from '@ionic/core';
import { createAnimation } from '@ionic/core';

export function myLeaveAnimation(baseEl: HTMLElement): Animation {

    const baseAnimation = createAnimation();

    const backdropAnimation = createAnimation();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    const wrapperAnimation = createAnimation();
    const wrapperEl = baseEl.querySelector('.modal-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    // tslint:disable-next-line: no-non-null-assertion
    const wrapperElRect = wrapperEl!.getBoundingClientRect();

    wrapperAnimation
      .fromTo('transform', 'scaleX(1) scaleY(1)', 'scaleX(0.1) scaleY(0.1)')
      .fromTo('opacity', 1, 0);

    backdropAnimation.fromTo('opacity', 0.4, 0.0);

    return baseAnimation
      .addElement(baseEl)
      .easing('ease-out')
      .duration(200)
      .addAnimation([backdropAnimation, wrapperAnimation]);

}
