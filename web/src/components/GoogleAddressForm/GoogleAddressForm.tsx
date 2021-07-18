import { Loader } from '@googlemaps/js-api-loader'
import { TextField } from '@redwoodjs/forms'
import { useEffect, useRef } from 'react'
import { FormProvider, useFormContext } from 'react-hook-form'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import type { Address } from 'web/types/graphql'

interface Props {
  loading?: boolean
  address: Address
}

// Google Place API data fields mapping
const ADDRESS_NAME_FORMAT = {
  route: 'long_name',
  country: 'long_name',
  locality: 'long_name',
  subpremise: 'long_name',
  postal_code: 'short_name',
  street_number: 'short_name',
  administrative_area_level_1: 'short_name'
}

const GoogleAddressForm = ({ loading, address }: Props) => {
  const formMethods = useFormContext<{ address?: Address }>()
  const mapDivEl = useRef<HTMLDivElement>(null)
  const locationInputEl = useRef<HTMLInputElement>(null)

  useEffect(
    () => {
      const loader = new Loader({
        libraries: ['places'],
        apiKey: process.env.GOOGLE_MAP_API_KEY
      })

      loader.load().then(() => {
        const map = new google.maps.Map(mapDivEl.current, {
          zoom: 12,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          // Default Sydney centre
          center: { lat: -33.865143, lng: 151.2099 }
        })
        const marker = new google.maps.Marker({ map, draggable: false })
        const autocomplete = new google.maps.places.Autocomplete(
          locationInputEl.current
        )

        autocomplete.addListener('place_changed', () => {
          marker.setVisible(false)

          const place = autocomplete.getPlace()

          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            return
          }

          const getAddressFieldValue = function (type) {
            for (const component of place.address_components) {
              if (component.types[0] === type) {
                return component[ADDRESS_NAME_FORMAT[type]]
              }
            }
            return ''
          }

          // Render address pin on the map
          map.setCenter(place.geometry.location)
          marker.setPosition(place.geometry.location)
          marker.setVisible(true)

          // Set form fields
          formMethods.setValue(
            'address.name',
            getAddressFieldValue('subpremise'),
            {
              shouldDirty: true
            }
          )
          formMethods.setValue(
            'address.street',
            `${getAddressFieldValue('street_number')} ${getAddressFieldValue(
              'route'
            )}`,
            { shouldDirty: true }
          )
          formMethods.setValue(
            'address.suburb',
            getAddressFieldValue('locality'),
            {
              shouldDirty: true
            }
          )
          formMethods.setValue(
            'address.state',
            getAddressFieldValue('administrative_area_level_1'),
            { shouldDirty: true }
          )
          formMethods.setValue(
            'address.postalCode',
            getAddressFieldValue('postal_code'),
            { shouldDirty: true }
          )
          formMethods.setValue(
            'address.country',
            getAddressFieldValue('country'),
            {
              shouldDirty: true
            }
          )
        })
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <FormProvider {...formMethods}>
      <div className="mb-6">
        <div className="flex place-items-center mb-4">
          <HiOutlineLocationMarker size={32} className="text-secondary mr-2" />
          <TextField
            disabled={loading}
            ref={locationInputEl}
            placeholder="Search address"
            name="address.formattedAddress"
            errorClassName="input input-error"
            defaultValue={address?.formattedAddress}
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <TextField
            name="address.premise"
            disabled={loading}
            placeholder="Premise"
            defaultValue={address?.premise}
            className="input input-bordered w-full"
            errorClassName="input input-error"
          />
        </div>
        <div className="flex flex-col sm:flex-row mb-4">
          <TextField
            name="address.street"
            disabled={loading}
            placeholder="Street"
            defaultValue={address?.street}
            className="input input-bordered w-full mb-6 sm:mb-0 mr-4"
            errorClassName="input input-error"
          />
          <TextField
            name="address.suburb"
            disabled={loading}
            placeholder="Suburb"
            defaultValue={address?.suburb}
            className="input input-bordered w-full"
            errorClassName="input input-error"
          />
        </div>
        <div className="flex flex-col sm:flex-row mb-4">
          <TextField
            name="address.state"
            disabled={loading}
            placeholder="state"
            defaultValue={address?.state}
            className="input input-bordered w-full mb-6 sm:mb-0 mr-4"
            errorClassName="input input-error"
          />
          <TextField
            name="address.postalCode"
            disabled={loading}
            placeholder="Postal code"
            validation={{ pattern: /^[0-9]+$/i }}
            defaultValue={address?.postalCode}
            className="input input-bordered w-full"
            errorClassName="input input-error"
          />
        </div>
        <TextField
          name="address.country"
          disabled={loading}
          placeholder="Country"
          validation={{ pattern: /^[A-Za-z]+$/i }}
          defaultValue={address?.country}
          className="input input-bordered w-full"
          errorClassName="input input-error"
        />
      </div>
      <div className="h-80 shadow-md" ref={mapDivEl}></div>
    </FormProvider>
  )
}

export default GoogleAddressForm
