/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */
function createModalHelpers(globalStore, trackingService) {
  return {
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

      trackingService.track('Modal Get Offer Flow Opened', eventProperties)
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

        trackingService.track('Get Offer Modal Closed')
      }
    },
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createModalHelpers }
