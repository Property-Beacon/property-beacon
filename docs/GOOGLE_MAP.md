# Google Maps

The `Google Maps Javascript API` and `Places API` from Google Cloud Platform are the key ingredients of our **address** and **location** related features such as `GoogleAddressForm` component.

## API key

Ensure you have api key in your local `.env`

```
GOOGLE_MAP_API_KEY={askMeTheKey}
```

To triage dev/prod traffic to avoid billing, we have one API key under `ralphbliu@gmail.com` account for dev purpose and one API key under `bigbliu1016@gmail.com` for prod purpose.

## Dynamic import

The API library is dynamically loaded via `@googlemaps/js-api-loader` to align with modern EMS module import. All API logic should sit inside the resolve function of `load()` **Promise** to ensure API is ready to be consumed.

### Places API

The `places` is the primary library we need for the moment.

```jsx
import { Loader } from '@googlemaps/js-api-loader'

const loader = new Loader({
  libraries: ['places'], // Load Places API only
  apiKey: process.env.GOOGLE_MAP_API_KEY
})

loader.load().then(() => {
  // logic after API is loaded and ready to be consumed
})
```

## Render a Google Map

Follow the steps to render a Google Map on a page

1. Create a `ref` via `useRef()`
2. Load `Places` library and initialize a map via `google.maps.Map`, [more Map options](https://developers.google.com/maps/documentation/javascript/overview#MapOptions)
3. Assign `ref` to the target container in JSX

```jsx
// Step 1
const mapDivEl = useRef < HTMLDivElement > null

useEffect(() => {
  // Step 2
  const loader = new Loader({
    libraries: ['places'], // Load Places API only
    apiKey: process.env.GOOGLE_MAP_API_KEY
  })

  loader.load().then(() => {
    const _map = new google.maps.Map(mapDivEl.current, {
      zoom: 12,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      center: { lat: 33.555, lng: 150.32331 }
    })
  })
}, [])

// Step 3
return <div ref={mapDivEl}>...</div>
```

### Change center of the map

`map` instance exported `setCenter` setter function for changing map center geometry

```jsx
_map.setCenter({ lat: 11.111, lng: 123.333 })
```

### Add a marker on the map

Create a marker instance and assign the `map` instance

```jsx
const marker = new google.maps.Marker({ map: _map, draggable: false })
```

toggle visibility of the marker

```jsx
marker.setVisible(false)
marker.setVisible(true)
```

## Search places autocomplete

Follow the steps to create an `input` with place search autocomplete

1. Create a `ref` via `useRef()`
2. Load `Places` library and initialize a **Autocomplete** via `google.maps.places.Autocomplete`, [see more](https://developers.google.com/maps/documentation/javascript/places-autocomplete#add-autocomplete)
3. Add an event listener to get `place` data
4. Assign `ref` to the target container in JSX

```jsx
// Step 1
const locationInputEl = useRef < HTMLInputElement > null

useEffect(() => {
  // Step 2
  const loader = new Loader({
    libraries: ['places'], // Load Places API only
    apiKey: process.env.GOOGLE_MAP_API_KEY
  })

  loader.load().then(() => {
    const autocomplete = new google.maps.places.Autocomplete(
      locationInputEl.current,
      {
        fields: [
          /** These fields are free basic data, see more paid fields
           * Adding more fields will increase API calls as data come from different end points
           * https://developers.google.com/maps/documentation/places/web-service/usage-and-billing#autocomplete
           */
          'name',
          'types',
          'geometry',
          'place_id',
          'address_components'
        ],
        // Restrict support countries
        componentRestrictions: { country: ['au', 'us'] }
      }
    )

    // Step 3 Add event listener for input onChange
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()

      // place data object the fields above
      console.info(place)
    })
  })
}, [])

// Step 4
return <input ref={locationInputEl} />
```
