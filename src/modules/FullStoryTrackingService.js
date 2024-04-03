/*
 * ----------------------------------------------------------------
 * Classes
 * ----------------------------------------------------------------
 */

/** Class definition for a FullStoryTrackingService. */
class FullStoryTrackingService {
  _FS
  _globalStore

  /**
   * Create a FullStoryTrackingService.
   * @param {object} FS - The third-party FullStory object (if available in the current window).
   * @param {object} globalStore - The global store object.
   */
  constructor(FS, globalStore) {
    this._FS = FS
    this._globalStore = globalStore
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
        ...this._defaultTrackingProperties,
        ...eventProperties,
      })
      if (this._FS) {
        this._FS.event(eventName, {
          ...this._defaultTrackingProperties,
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
  get _defaultTrackingProperties() {
    let eventProperties = {}

    // Include address-related properties
    // If parcel details are available, use them to populate address properties
    // Else, if selected match is available, use it to populate address properties
    if (this._globalStore.addressViewModel.hasParcelDetails) {
      const parcelDetailsProperties = {
        address_str: this._globalStore.addressViewModel.parcelDetails.address,
        address_city_str: this._globalStore.addressViewModel.parcelDetails.city,
        address_state_str:
          this._globalStore.addressViewModel.parcelDetails.state,
        address_zip_str: this._globalStore.addressViewModel.parcelDetails.zip,
        parcel_apn_str: this._globalStore.addressViewModel.parcelDetails.apn,
        parcel_jurisdiction_str:
          this._globalStore.addressViewModel.parcelDetails.jurisdiction,
      }
      eventProperties = {
        ...eventProperties,
        ...parcelDetailsProperties,
      }
    } else if (this._globalStore.addressViewModel.selectedMatch) {
      const selectedMatchProperties = {
        address_str: this._globalStore.addressViewModel.selectedMatch.address,
        address_context_str:
          this._globalStore.addressViewModel.selectedMatch.context,
        regrid_ll_uuid_str:
          this._globalStore.addressViewModel.selectedMatch.ll_uuid,
      }
      eventProperties = {
        ...eventProperties,
        ...selectedMatchProperties,
      }
    }

    // Include estimate-related properties
    // If estimate results are available, use them to populate estimate properties
    if (this._globalStore.estimateViewModel.hasEstimateResults) {
      const estimateProperties = {
        jurisdiction_status_str:
          this._globalStore.estimateViewModel.jurisdiction.status,
        estimate_low_real: this._globalStore.estimateViewModel.estimate.low,
        estimate_high_real: this._globalStore.estimateViewModel.estimate.high,
      }
      eventProperties = {
        ...eventProperties,
        ...estimateProperties,
      }
    }

    // Include contact-related properties
    // If contact details are available, use them to populate contact properties
    if (this._globalStore.contactViewModel.hasAnyContactDetails) {
      const contactProperties = {
        contact_first_name_str: this._globalStore.contactViewModel.firstName,
        contact_last_name_str: this._globalStore.contactViewModel.lastName,
        contact_email_str: this._globalStore.contactViewModel.email,
        contact_phone_str: this._globalStore.contactViewModel.phone,
        contact_desired_timeline_str:
          this._globalStore.contactViewModel.desiredTimeline,
      }
      eventProperties = {
        ...eventProperties,
        ...contactProperties,
      }
    }

    // Include active experiment variations
    eventProperties.active_experiment_variations_strs =
      this._globalStore.experimentationViewModel.getFullStoryActiveExperimentVariationsEventPropertyValue()

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
