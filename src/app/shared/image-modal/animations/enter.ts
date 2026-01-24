import { Animation } from '@ionic/core';
import { createAnimation } from '@ionic/core';

export function myEnterAnimation(baseEl: HTMLElement): Animation {

    const baseAnimation = createAnimation();

    const backdropAnimation = createAnimation();
    backdropAnimation.addElement(baseEl.querySelector('ion-backdrop'));

    const wrapperAnimation = createAnimation();
    wrapperAnimation.addElement(baseEl.querySelector('.modal-wrapper'));

    wrapperAnimation
        .fromTo('transform', 'scaleX(0.1) scaleY(0.1)', 'translateX(0%) scaleX(1) scaleY(1)')
        .fromTo('opacity', 0, 1);

    backdropAnimation.fromTo('opacity', 0.01, 0.4);

    return baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .duration(200)
        .beforeAddClass('show-modal')
        .addAnimation([backdropAnimation, wrapperAnimation]);

}
