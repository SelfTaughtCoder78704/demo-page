/* global ga, gtag, fbq */

export function trackEvent(action, category, label) {
  const eventAction = action || 'cta-click'
  const eventCategory = category || 'thesis-page-interaction'
  const eventLabel = label || window.location.pathname

  if (typeof ga !== 'undefined') {
    ga('send', 'event', eventCategory, eventAction, eventLabel)
  }

  if (typeof gtag !== 'undefined') {
    gtag('event', eventAction, {
      event_category: eventCategory,
      event_label: eventLabel,
    })
  }

  if (typeof fbq !== 'undefined') {
    fbq('trackCustom', eventAction, {
      path: eventLabel,
      location: eventCategory,
    })
  }
}

export const addTrackingToCTAs = (btns) => {
  btns.forEach((el) => {
    el.addEventListener(
      'click',
      () => {
        const interaction =
          el.dataset.interaction && el.dataset.interaction !== '0'
            ? el.dataset.interaction
            : 'cta-click'
        const trackable = el.dataset.trackable ? `${el.dataset.trackable}-cta` : 'cta'

        trackEvent(interaction, trackable)
      },
      false,
    )
  })
}
