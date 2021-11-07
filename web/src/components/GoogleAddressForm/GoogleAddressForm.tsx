import { Loader } from '@googlemaps/js-api-loader'
import { HiddenField, TextField } from '@redwoodjs/forms'
import { useEffect, useRef, useState } from 'react'
import { FormProvider, useFormContext } from 'react-hook-form'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import type { Address } from 'web/types/graphql'

// TODO: Hard code country for the moment as our focus market
const COUNTRIES = ['au']

interface Props {
  loading?: boolean
  address: Address
}

function isEqualGeometry(
  g1?: google.maps.LatLngLiteral,
  g2?: google.maps.LatLngLiteral
) {
  if (!g1 || !g2) {
    return false
  }

  return g1.lat === g2.lat && g1.lng === g1.lng
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
  const [map, setMap] = useState<google.maps.Map>(null)
  const [marker, setMarker] = useState<google.maps.Marker>(null)
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
        const _map = new google.maps.Map(mapDivEl.current, {
          zoom: 12,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        })
        const _marker = new google.maps.Marker({ map: _map, draggable: false })
        // TODO: Currently Autocomplete doesn't support debounce and need to work around it
        const autocomplete = new google.maps.places.Autocomplete(
          locationInputEl.current,
          {
            fields: [
              /** Basic data are free but others are paid
               * https://developers.google.com/maps/documentation/places/web-service/usage-and-billing#autocomplete
               */
              'name',
              'types',
              'geometry',
              'place_id',
              'address_components'
            ],
            componentRestrictions: { country: COUNTRIES }
          }
        )

        autocomplete.addListener('place_changed', () => {
          _marker.setVisible(false)

          const place = autocomplete.getPlace()

          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            return
          }

          const getAddressFieldValue = (type) => {
            for (const component of place.address_components) {
              if (component.types[0] === type) {
                return component[ADDRESS_NAME_FORMAT[type]]
              }
            }

            return type === 'subpremise' ? place.name : ''
          }

          // Render address pin on the map
          _map.setCenter(place.geometry.location)
          _marker.setPosition(place.geometry.location)
          _marker.setVisible(true)

          // Set form fields
          formMethods.setValue(
            'address.premise',
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
          !!place?.geometry?.location?.lat &&
            formMethods.setValue(
              'address.lat',
              `${place.geometry.location.lat()}`,
              {
                shouldDirty: true
              }
            )
          !!place?.geometry?.location?.lng &&
            formMethods.setValue(
              'address.lng',
              `${place.geometry.location.lng()}`,
              {
                shouldDirty: true
              }
            )
          !!place?.place_id &&
            formMethods.setValue('address.gPlaceId', place.place_id, {
              shouldDirty: true
            })
        })

        // Set map instance for component context
        setMap(_map)
        setMarker(_marker)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (address) {
      // Default Sydney centre
      const geometry = {
        lat: address?.lat ? parseFloat(address.lat) : -33.865143,
        lng: address?.lng ? parseFloat(address.lng) : 151.2099
      }

      !!map &&
        !isEqualGeometry(map.getCenter()?.toJSON(), geometry) &&
        map.setCenter(geometry)
      !!marker &&
        !isEqualGeometry(marker.getPosition()?.toJSON(), geometry) &&
        marker.setPosition(geometry)
    }
  }, [map, marker, address])

  return (
    <FormProvider {...formMethods}>
      <div className="mb-6">
        <div className="flex place-items-center mb-4">
          <HiOutlineLocationMarker size={32} className="text-secondary mr-2" />
          {/* Enable this when we have budget to pay */}
          <TextField
            disabled
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
            disabled={loading}
            name="address.street"
            placeholder="Street"
            defaultValue={address?.street}
            className="input input-bordered w-full mb-6 sm:mb-0 mr-4"
            errorClassName="input input-error"
          />
          <TextField
            disabled={loading}
            name="address.suburb"
            placeholder="Suburb"
            defaultValue={address?.suburb}
            className="input input-bordered w-full"
            errorClassName="input input-error"
          />
        </div>
        <div className="flex flex-col sm:flex-row mb-4">
          <TextField
            disabled={loading}
            name="address.state"
            placeholder="state"
            defaultValue={address?.state}
            className="input input-bordered w-full mb-6 sm:mb-0 mr-4"
            errorClassName="input input-error"
          />
          <TextField
            disabled={loading}
            name="address.postalCode"
            placeholder="Postal code"
            validation={{ pattern: /^[0-9]+$/i }}
            defaultValue={address?.postalCode}
            className="input input-bordered w-full"
            errorClassName="input input-error"
          />
        </div>
        <TextField
          disabled={loading}
          name="address.country"
          placeholder="Country"
          validation={{ pattern: /^[A-Za-z]+$/i }}
          defaultValue={address?.country}
          className="input input-bordered w-full"
          errorClassName="input input-error"
        />
        <HiddenField name="address.lat" defaultValue={address?.lat} />
        <HiddenField name="address.lng" defaultValue={address?.lng} />
        <HiddenField name="address.gPlaceId" defaultValue={address?.gPlaceId} />
      </div>
      {/* Enable this when we have budget to pay */}
      <div className="h-0 shadow-md" ref={mapDivEl}></div>
    </FormProvider>
  )
}

export default GoogleAddressForm
