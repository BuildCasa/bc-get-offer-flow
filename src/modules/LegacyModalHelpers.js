/*
 * ----------------------------------------------------------------
 * Imports
 * ----------------------------------------------------------------
 */
import Alpine from 'alpinejs'
import { trackEvent } from './LegacyTracking'

/**
 * ----------------------------------------------------------------
 * createModalHelpers
 * ----------------------------------------------------------------
 * Creates and returns reference to an Alpine store for modalHelpers
 * Which help control the UX for the modal-based implementation of the Get Offer flow
 * Centralizes some more complex expressions to make Webflow dev safer and more convenient
 * Can be accessed in HTML via directive attribute values w/ `$store.modalHelpers`
 *
 * - iOpen: Getter, that returns true if modal should be displayed based on current flowState, generally bound via `x-show`
 * - handleModalClose: Function, that triggers the flowStateMachine EXIT transition if called, bound UI events via `x-on:click` or `@click`
 */
function createModalHelpers(globalStore) {
  Alpine.store('modalHelpers', {
    get isOpen() {
      return (
        globalStore.flowState.value == 'modalAddressForm' ||
        globalStore.flowState.value == 'modalAddressFormProcessing' ||
        globalStore.flowState.value == 'modalAddressFormError' ||
        globalStore.flowState.value == 'contactForm' ||
        globalStore.flowState.value == 'contactFormProcessing' ||
        globalStore.flowState.value == 'contactFormError' ||
        globalStore.flowState.value == 'estimateResults' ||
        globalStore.flowState.value == 'scheduleConsultation' ||
        globalStore.flowState.value == 'requestedCommunity'
      )
    },
    handleModalFlowStart(cta = null) {
      globalStore.flowState.value = globalStore.flowStateMachine.transition(
        globalStore.flowState.value,
        'START_MODAL_FLOW',
      )

      let eventProperties = {}
      if (cta) {
        eventProperties = {
          cta_str: cta,
        }
      }

      trackEvent('Modal Get Offer Flow Opened', globalStore, eventProperties)
    },
    handleModalClose() {
      // TODO: Move this logic into the flowStateMachine
      let proceedWithExit = true

      // If the user is on the contact form, and has entered any data,
      // confirm they want to exit before closing the modal
      if (
        globalStore.flowState.value == 'contactForm' &&
        globalStore.contactViewModel.hasAnyContactDetails
      ) {
        proceedWithExit = confirm(
          "Are you sure you want to stop before you've seen how much your extra lot space could be worth?",
        )
      }

      // If the user is on the contact form processing state,
      // prevent them from exiting until the processing is complete
      if (globalStore.flowState.value == 'contactFormProcessing') {
        proceedWithExit = false
      }

      if (proceedWithExit) {
        globalStore.flowState.value = globalStore.flowStateMachine.transition(
          globalStore.flowState.value,
          'EXIT',
        )

        trackEvent('Get Offer Modal Closed', globalStore)
      }
    },
  })

  // Add a reference to the new modalHelpers Alpine store to the global store
  globalStore.modalHelpers = Alpine.store('modalHelpers')
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createModalHelpers }
