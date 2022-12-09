# BuildCasa.com Get Offer Flow

This repo stores and serves the custom JavaScript code that powers the BuildCasa.com Get Offer flow — providing the state management and business logic for the site UI built and hosted in Webflow.

## Development

`index.js` includes all of the custom code that must be imported into the BuildCasa site for the Get Offer Flow — any desired changes should be made directly to this file.

_Note: This file is intentionally more comment-heavy than 'normal' codebases, to make it more easily accessible for new developers (even those with more limited JavaScript experience) to be able to understand and make updates, as necessary._

`dev-prototype.html` is a development-only HTML page that directly imports the local `index.js` script, and can be used to locally test site functionality during the development process. It uses [TailwindCSS](https://tailwindcss.com/) for fast/convenient styling. Neither this HTML file, nor the repo's TailwindCSS config, have any impact or connection with the code that gets imported into the production Webflow site.

## Deployment

The production Webflow site uses [JSDelivr](https://www.jsdelivr.com/?docs=gh) to import a versioned, minified, and hosted (via CDN) copy of the `index.js` code.

This repo must remain public to maintain access for the existing BuildCasa.com site. Old versions continue to be hosted and importable, even if newer versions are released going forward.

To 'deploy' new versions of the code, commit changes to `index.js` on the `main` branch, and add a git tag to the commit with a [SemVer](https://semver.org/) compliant version number — e.g. `v2.0.0` — progressing from the current version.

That new version can then be imported directly into the BuildCasa.com site (in Webflow, or otherwise) by adding the following `script` tag (replacing the `1.0.1` with the desired version number) to any page that will have this flow:

```
<script src="https://cdn.jsdelivr.net/gh/Friends-Ship-Studio/bc-get-offer-flow@1.0.1/index.min.js"></script>
```

## AlpineJS

[AlpineJS](https://alpinejs.dev/start-here) is the only external code / development dependency, and the lightweight frontend framework that makes this possible.

It provides a simple set of directives, globals, and methods to integrate JavaScript logic with HTML elements via element attributes.

## Webflow / HTML Integration

[Webflow](https://webflow.com/) is a no/low-code website design, development, and publishing platform. The BuildCasa.com site was built and hosted on Webflow prior to this new Get Offer flow.

This code is designed specifically for a tight integration with the BuildCasa.com site currently built and hosted in Webflow. So many of the design choices were made with the capabilities and constraints of that platform in mind.

That said, it should be possible / easy to integrate into any future version of the site, in Webflow or any other platform. As long as you can import the JacaScript file, and have access to edit the attributes of the HTML elements, you should be able to wire up a working flow with this custom code.
<img width="1680" alt="image" src="https://user-images.githubusercontent.com/6130917/206641246-8390820c-e114-4a9f-bc81-a1276f620fe9.png">

_Note: Remember that — as long as it is kept up-to-date by future developers — you can always use the `dev-prototype.html` file as an implementation reference before making changes!_

### Project Setup

#### With Webflow

Add and HTML Embed element, and the following `style` tag to the bottom of the page you are adding this functionality to:

```
<style>
[x-cloak] {
	display: none !important;
}
input:disabled {
  opacity: 0.75;
}
</style>
```

Adding these styles in this way ensures that Webflow will pick up and reflect these styles in the Designer — which helps maintain the site building workflows in that no-code environment.

The `[x-cloak]` style rule ensures that elements that must be hidden until AlpineJS can
control visibility via `x-show`, and that those elements are hidden in the Webflow Designer.
To view and edit them in the Designer, select them and temporarily remove the `x-cloak` attribute.
Just be sure to add it back in to hide them again before pulishing.

The `input:disabled` style rule just adds a simple opacity treatment for disabled input fields
Webflow currently doesn't provide the ability to do this natively through their style panel

Add another HTML Embed element to the bottom of the page to import this custom JavaScript that powers the Get Offer Flow — replacing the `1.0.1` with whatever version number you want to use.

```
<script src="https://cdn.jsdelivr.net/gh/Friends-Ship-Studio/bc-get-offer-flow@1.0.1/index.min.js"></script>
```

#### Without Weblow

If building the HTML site outside of Webflow, you should just be able to apply these same style rules wherever you are specifying your other CSS.

And add the `script` tag to load this custom code directly to the HTML template, right before closing the `</body>` tag.

### Enter Address Typeahead

#### With Webflow

With Webflow, getting the address typeahead to work is the trickiest part.

The form element must be bound to the submit handler with the directive: `x-on:submit = $store.addressViewModel.handleSubmit($event)`

Within the addres field form, ensure that the main `input` element is nested inside an div with a `position: relative` style applied. This `input` element should have the following directives to enable the interactive functionality:
- `x-model = $store.addressViewModel.inputValue`
- `x-bind:disabled = $store.flowState.value == 'addressFormProcessing'`
- `x-ref = addressInput`
- `x-bind = {['x-on:input.debounce.300ms']() {$store.addressViewModel.handleInput()}}`

Inside of this same div, add an HTML Embed element with the following custom code (this is what displays the matching addresses when using the typeahead):

```
<ul x-show="!$store.addressViewModel.isSelected &amp;&amp; $store.addressViewModel.matches.length" role="list" class="v2-typeahead-results-list" x-cloak>
	<template x-for="(match, index) in $store.addressViewModel.matches">
  	<li class="v2-typeahead-result-item" x-bind:class="($store.addressViewModel.keyboardNavIndex === index) ? 'selected' : ''" x-on:click="$store.addressViewModel.handleMatchSelection(match)" class="">
    	<div class="v2-typeahead-result-text-primary" x-text="match.address"></div>
      <div class="v2-typeahead-result-text-secondary" x-text="match.context"></div>
    </li>
	</template>
</ul>
```

To make it possible to see and style what these results will look like using Webflow's visual design tools, this div also includes an above `v2-typeahead-results-list.designer-placeholder` element IN Webflow
can be used to update the style rules for the classes used here (it has all of the style settings needed to make the results display as desired) — `overflow: scroll`, `position: absolute`, `top: 100%`, `left: 0`, `right: 0`, `bottom: auto`, `z-index: 10` (or some higher value).

The `designer-placeholder`combo class can be removed to design, and then must be added back on before publishing — so this placeholder element is never actually displayed in the live site.

_Note: this workaround is only needed because the Alpine `x-for` directive can only be added to`template` tags — which Webflow currently does not natively support._

#### Without Webflow

Without Webflow, there isn't a workaround needed, you can just structure the typeahead results HTML within a `ul > template` tag structure (and the appropriate styles), that match the above snippet.

#### Regrid Typeahead API Integration

Behind the scenes, this implementation uses the Regrid Typeahed API to fetch and filter the matching addresses that are displayed for the user to select, as they type into the `input`.

The code that drives this data fetching and filtering can all be found in the `addressViewModel.handleInput()` method in `index.js`

### Modal Get Offer Flow

#### With Webflow

All of the flow states that will be displayed within the modal are nested within a `v2-modal-backdrop` element at the bottom of the page, right above the HTML Embeds described in the project setup section.

This element / class has the necessary styles applied to ensure that the modal states and backdrop display correctly, 'on top of' the main site content.

It also needs the following Alpine directives added as element attributes (in Element Settings tab in the right sidebar) to ensure that it is only displayed during the appropriate flow states:

- `x-show = $store.modalHelpers.isOpen`
- `x-on:click = $store.modalHelpers.handleModalClose()`
- `x-transition`
- `x-cloak`

To display this modal content in the Webflow Designer to edit the designs, you can temporarily remove the `x-cloak` attribute and make your changes. Just make sure to add it back when you are done.

Within that element, there are three `v2-modal-state-box` elements, that contain the modal content to be displayed for each of the three flow states that are possible — each with the following Alpine directives applied to control this conditional display:

- Contact Form
  - `x-show = $store.flowState.value == 'contactForm' || $store.flowState.value == 'contactFormProcessing' || $store.flowState.value == 'contactFormError'`
  - `x-transition`
- Estimate Results
  - `x-show = $store.flowState.value == 'estimateResults'`
  - `x-transition`
- Schedule Consultation
  - `x-show = $store.flowState.value == 'scheduleConsultation'`
  - `x-transition`

Each modal panel should also have a click handler to STOP the modal from being closed when the content panel itself is clicked (vs the black backdrop): `x-on:click = $event.stopPropagation()`

And each should also contact a close icon that _should_ close the modal when clicked, via `x-on:click = $store.modalHelpers.handleModalClose()`

##### Contact Form

Within the Contact Form, the form element must be bound to the submit handler with the directive: `x-on:submit = $store.contactViewModel.handleSubmit($event)`

The fields themselves must have 2-way bindings with their associated custom code representations:

- `x-model = $store.contactViewModel.firstName`
- `x-model = $store.contactViewModel.lastName`
- `x-model = $store.contactViewModel.email`
- `x-model = $store.contactViewModel.phone`

And each should also be disabled when the form is processing, via `x-bind:disabled = $store.flowState.value == 'contactFormProcessing'`

The submit button should also apply the same directive, to be disabled when submitting as well. Additionally, the button text can be dynamically changed when processing via `x-bind:value = ($store.flowState.value == 'contactFormProcessing') ? $store.contactViewModel.submitButtonText.processing : $store.contactViewModel.submitButtonText.normal`

##### Estimate Results

There are also three different possible results for the Estimate Results content, with the following Alpine directives applied to control this conditional display:

- Address in Active Jurisdiction, w/ Estimate Values
  - `x-show = $store.estimateViewModel.jurisdiction.status == 'active' && $store.estimateViewModel.estimate.low && $store.estimateViewModel.estimate.high`
- Address in Active Jurisdiction, w/o Estimate Values
  - `x-show = $store.estimateViewModel.jurisdiction.status == 'active' && (!$store.estimateViewModel.estimate.low || !$store.estimateViewModel.estimate.high)`
- Address in Inactive Jurisdiction
  - `x-show = $store.estimateViewModel.jurisdiction.status == 'inactive'`

In the case where there ARE estimate results, those can be displayed in the modal content via the following directives:

- `x-text = $store.estimateViewModel.lowEstimateString`
- `x-text = $store.estimateViewModel.highEstimateString`

And a button to go to the self-serve scheduling state can be added with `x-on:click = $store.estimateViewModel.handleScheduleConsultationClick($event)`

##### Schedule Consultation

The schedule consultation modal uses an HTML Embed with Calendly code:

```
<div class="calendly-inline-widget" data-url="https://calendly.com/buildcasa/chat?text_color=575757&primary_color=4cbd98" style="min-width:320px;height:630px;"></div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

#### Without Webflow

Without Webflow, just make sure your HTML template is using the same structure, syles, and Alpine directives as described above — or as found in the `dev-prototype.html` file in this repo. And you should be good-to-go.

#### Regrid Parcel API Integration

Behind the scenes, when a site visitor submits their address and contact info, we call the Regrid Parcel API to obtain full parcel details to generate their offer: jursidiction, APN, address fields.

#### Make.com Get Estimate and Create Lead API Integrations

And we submit that Address/Parcel and Contact data to two Make.com endpoints that we have created and control:

1. Creates a contact in Hubspot with the info provided
2. Queries our offer database with the parcel info to get the jurisdiction status and offer estimate range

## For Future Development

- Pre-filling fields via URL params / QR codes
- Spam-protection / API security layer — via a proprietary backend that we call directly for all data submission and/or fetching requests (Address Typeahead, Parcel Details, Create Lead, Get Estimate, etc.)
