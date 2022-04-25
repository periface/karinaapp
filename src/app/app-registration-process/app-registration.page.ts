import { LocalStorageLocations } from './../shared/services/localstorage/localstorage.constants';
import { UserInfoModel } from './../shared/services/user-service/user.model';
import { UserService } from './../shared/services/user-service/user.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { BaseComponent } from '../shared/components/base-component.component';
import { Router } from '@angular/router';
@Component({
  templateUrl: './app-registration.page.html',
  styleUrls: ['./app-registration.page.scss'],
})
export class AppRegistrationPage
  extends BaseComponent
  implements AfterViewInit
{
  /**
   *
   */
  @ViewChild('slider') slider: IonSlides;
  sexo = 'masculino';
  loading = false;
  slideOpts = {
    allowTouchMove: false,
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.originalParams = Object.assign(
          swiper.originalParams,
          overwriteParams
        );
      },
      setTranslate() {
        const swiper = this;
        const { $, slides, rtlTranslate: rtl } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let progress = $slideEl[0].progress;
          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          }
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          const rotate = -180 * progress;
          let rotateY = rotate;
          let rotateX = 0;
          let tx = -offset$$1;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
            rotateX = -rotateY;
            rotateY = 0;
          } else if (rtl) {
            rotateY = -rotateY;
          }

          $slideEl[0].style.zIndex =
            -Math.abs(Math.round(progress)) + slides.length;

          if (swiper.params.flipEffect.slideShadows) {
            // Set shadows
            let shadowBefore = swiper.isHorizontal()
              ? $slideEl.find('.swiper-slide-shadow-left')
              : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = swiper.isHorizontal()
              ? $slideEl.find('.swiper-slide-shadow-right')
              : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(
                `<div class="swiper-slide-shadow-${
                  swiper.isHorizontal() ? 'left' : 'top'
                }"></div>`
              );
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(
                `<div class="swiper-slide-shadow-${
                  swiper.isHorizontal() ? 'right' : 'bottom'
                }"></div>`
              );
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) {
              shadowBefore[0].style.opacity = Math.max(-progress, 0);
            }
            if (shadowAfter.length) {
              shadowAfter[0].style.opacity = Math.max(progress, 0);
            }
          }
          $slideEl.transform(
            `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          );
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, activeIndex, $wrapperEl } = swiper;
        slides
          .transition(duration)
          .find(
            '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left'
          )
          .transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          // eslint-disable-next-line
          slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
            if (eventTriggered) {
              return;
            }
            if (!swiper || swiper.destroyed) {
              return;
            }

            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    },
  };

  enfermedadesCronicas = [
    {
      name: 'Hipertensión',
      checked: false,
    },
    {
      name: 'Diabetes',
      checked: false,
    },
    {
      name: 'Asma',
      checked: false,
    },
  ];
  objetivos = [
    {
      name: 'Bajar de peso',
      value: 'bajarpeso',
      checked: false,
    },
    {
      name: 'Musculación',
      value: 'musculacion',
      checked: false,
    },
    {
      name: 'Definir',
      value: 'definicion',
      checked: false,
    },
  ];
  user: UserInfoModel;
  constructor(private userService: UserService, private router: Router) {
    super();
    this.userService
      .getUserInfoByUId(this.localStorageService.getUserId)
      .then((user) => {
        this.user = { ...user.data(), id: user.id };
        console.log(this.user);
      });
  }
  loadNext() {
    this.slider.slideNext();
  }
  loadPrev() {
    this.slider.slidePrev();
  }
  async saveAndNext() {
    try {
      const enfermedades = this.enfermedadesCronicas
        .map((a) => {
          if (a.checked) {
            return a.name;
          }
        })
        .filter((a) => a !== undefined);
      const objetivos = this.objetivos
        .map((a) => {
          if (a.checked) {
            return a.value;
          }
        })
        .filter((a) => a !== undefined);
      console.log(objetivos);

      if (enfermedades.length > 0) {
        this.user.enfermedades = enfermedades;
      }
      if (objetivos.length > 0) {
        this.user.objetivos = objetivos;
      }
      this.loading = true;
      await this.userService.saveUserData(this.user.id, this.user);
      this.loading = false;
      this.slider.slideNext();
    } catch (error) {
      this.loading = false;
      this.showMessage('Ocurrió un error...', '', {
        duration: 3000,
      });
      console.log(error);
    }
  }
  async end() {
    try {
      this.loading = true;
      this.user.registroFinalizado = true;
      await this.userService.saveUserData(this.user.id, this.user);
      this.loading = false;
      this.localStorageService.setItem(
        LocalStorageLocations.USER_ACCOUNT_INFO,
        JSON.stringify(this.user)
      );
      this.localStorageService.setItem(
        LocalStorageLocations.USER_SURVEY_FINISHED,
        JSON.stringify(this.user.registroFinalizado)
      );
      //ROUTER
      this.router.navigateByUrl('main-app/tab1');
    } catch (error) {
      this.loading = false;
      this.showMessage('Ocurrió un error...', '', {
        duration: 3000,
      });
      console.log(error);
    }
  }
  ngAfterViewInit(): void {
    console.log(this.slider);
  }
}
