/*
 * ----------------------------------------------------------------
 * Classes
 * ----------------------------------------------------------------
 */

/** Class definition for a FullStoryTrackingService. */
class FullStoryTrackingService {
  FS
  globalStore

  /**
   * Create a FullStoryTrackingService.
   * @param {object} FS - The third-party FullStory object (if available in the current window).
   * @param {object} globalStore - The global store object.
   */
  constructor(FS, globalStore) {
    this.FS = FS
    this.globalStore = globalStore
  }

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
        ...this.defaultTrackingProperties,
        ...eventProperties,
      })
      if (this.FS) {
        this.FS.event(eventName, {
          ...this.defaultTrackingProperties,
          ...eventProperties,
        })
      }
    } catch (error) {
      // FUTURE DEV: Update w/ error tracking / reporting through integrated system
      console.log(error)
    }
  }

  /**
   * Getter for an object with the default properties to be included in tracked events.
   * Includes address, estimate, and contact details, as well as active experiment variations.
   * @returns {object} An object with the default event properties.
   */
  get defaultTrackingProperties() {
    let eventProperties = {}

    // Include address-related properties
    // If parcel details are available, use them to populate address properties
    // Else, if selected match is available, use it to populate address properties
    if (this.globalStore.addressViewModel.hasParcelDetails) {
      const parcelDetailsProperties = {
        address_str: this.globalStore.addressViewModel.parcelDetails.address,
        address_city_str: this.globalStore.addressViewModel.parcelDetails.city,
        address_state_str:
          this.globalStore.addressViewModel.parcelDetails.state,
        address_zip_str: this.globalStore.addressViewModel.parcelDetails.zip,
        parcel_apn_str: this.globalStore.addressViewModel.parcelDetails.apn,
        parcel_jurisdiction_str:
          this.globalStore.addressViewModel.parcelDetails.jurisdiction,
      }
      eventProperties = {
        ...eventProperties,
        ...parcelDetailsProperties,
      }
    } else if (this.globalStore.addressViewModel.selectedMatch) {
      const selectedMatchProperties = {
        address_str: this.globalStore.addressViewModel.selectedMatch.address,
        address_context_str:
          this.globalStore.addressViewModel.selectedMatch.context,
        regrid_ll_uuid_str:
          this.globalStore.addressViewModel.selectedMatch.ll_uuid,
      }
      eventProperties = {
        ...eventProperties,
        ...selectedMatchProperties,
      }
    }

    // Include estimate-related properties
    // If estimate results are available, use them to populate estimate properties
    if (this.globalStore.estimateViewModel.hasEstimateResults) {
      const estimateProperties = {
        jurisdiction_status_str:
          this.globalStore.estimateViewModel.jurisdiction.status,
        estimate_low_real: this.globalStore.estimateViewModel.estimate.low,
        estimate_high_real: this.globalStore.estimateViewModel.estimate.high,
      }
      eventProperties = {
        ...eventProperties,
        ...estimateProperties,
      }
    }

    // Include contact-related properties
    // If contact details are available, use them to populate contact properties
    if (this.globalStore.contactViewModel.hasAnyContactDetails) {
      const contactProperties = {
        contact_first_name_str: this.globalStore.contactViewModel.firstName,
        contact_last_name_str: this.globalStore.contactViewModel.lastName,
        contact_email_str: this.globalStore.contactViewModel.email,
        contact_phone_str: this.globalStore.contactViewModel.phone,
        contact_desired_timeline_str:
          this.globalStore.contactViewModel.desiredTimeline,
      }
      eventProperties = {
        ...eventProperties,
        ...contactProperties,
      }
    }

    // Include active experiment variations
    eventProperties.active_experiment_variations_strs =
      this.globalStore.experimentationViewModel.getFullStoryActiveExperimentVariationsEventPropertyValue()

    return eventProperties
  }
}

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
  return new FullStoryTrackingService(FS, globalStore)
}

/*
 * ----------------------------------------------------------------
 * Exports
 * ----------------------------------------------------------------
 */
export { createFullStoryTrackingService }
