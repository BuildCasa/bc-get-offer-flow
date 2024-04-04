// TODO: Create JSDoc interfaces for FS, an abstract TrackingService, and FullStoryTrackingService.

/*
 * ----------------------------------------------------------------
 * Functions
 * ----------------------------------------------------------------
 */

/**
 * Factory function for creating an FullStoryTrackingService instance.
 * @param {unknown} FS - Current FullStory instance.
 * @returns {FullStoryTrackingService} New FullStoryTrackingService instance.
 */
function createFullStoryTrackingService(FS, globalStore) {
  return {
    /**
     * Tracks an event with FullStory.
     * @param {string} eventName - The name of the event to track.
     * @param {object} eventProperties - The properties to include in the tracked event.
     * @returns {void}
     */
    track(eventName, eventProperties = {}) {
      // If FS is available (FullStory tracking is active), send event to FullStory
      try {
        console.log('Tracking event:', eventName, {
          ...this._defaultTrackingProperties,
          ...eventProperties,
        })
        if (FS) {
          FS.event(eventName, {
            ...this._defaultTrackingProperties,
            ...eventProperties,
          })
        }
      } catch (error) {
        // FUTURE DEV: Update w/ error tracking / reporting through integrated system
        console.log(error)
      }
    },

    /**
     * Getter for an object with the default properties to be included in tracked events.
     * Includes address, estimate, and contact details, as well as active experiment variations.
     * @returns {object} An object with the default event properties.
     */
    get _defaultTrackingProperties() {
      let eventProperties = {}

      // Include address-related properties
      // If parcel details are available, use them to populate address properties
      // Else, if selected match is available, use it to populate address properties
      if (globalStore.addressViewModel.hasParcelDetails) {
        const parcelDetailsProperties = {
          address_str: globalStore.addressViewModel.parcelDetails.address,
          address_city_str: globalStore.addressViewModel.parcelDetails.city,
          address_state_str: globalStore.addressViewModel.parcelDetails.state,
          address_zip_str: globalStore.addressViewModel.parcelDetails.zip,
          parcel_apn_str: globalStore.addressViewModel.parcelDetails.apn,
          parcel_jurisdiction_str:
            globalStore.addressViewModel.parcelDetails.jurisdiction,
        }
        eventProperties = {
          ...eventProperties,
          ...parcelDetailsProperties,
        }
      } else if (globalStore.addressViewModel.selectedMatch) {
        const selectedMatchProperties = {
          address_str: globalStore.addressViewModel.selectedMatch.address,
          address_context_str:
            globalStore.addressViewModel.selectedMatch.context,
          regrid_ll_uuid_str:
            globalStore.addressViewModel.selectedMatch.ll_uuid,
        }
        eventProperties = {
          ...eventProperties,
          ...selectedMatchProperties,
        }
      }

      // Include estimate-related properties
      // If estimate results are available, use them to populate estimate properties
      if (globalStore.estimateViewModel.hasEstimateResults) {
        const estimateProperties = {
          jurisdiction_status_str:
            globalStore.estimateViewModel.jurisdiction.status,
          estimate_low_real: globalStore.estimateViewModel.estimate.low,
          estimate_high_real: globalStore.estimateViewModel.estimate.high,
        }
        eventProperties = {
          ...eventProperties,
          ...estimateProperties,
        }
      }

      // Include contact-related properties
      // If contact details are available, use them to populate contact properties
      if (globalStore.contactViewModel.hasAnyContactDetails) {
        const contactProperties = {
          contact_first_name_str: globalStore.contactViewModel.firstName,
          contact_last_name_str: globalStore.contactViewModel.lastName,
          contact_email_str: globalStore.contactViewModel.email,
          contact_phone_str: globalStore.contactViewModel.phone,
          contact_desired_timeline_str:
            globalStore.contactViewModel.desiredTimeline,
        }
        eventProperties = {
          ...eventProperties,
          ...contactProperties,
        }
      }

      // Include active experiment variations
      eventProperties.active_experiment_variations_strs =
        globalStore.experimentationViewModel.getFullStoryActiveExperimentVariationsEventPropertyValue()

      return eventProperties
    },
  }
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createFullStoryTrackingService }
