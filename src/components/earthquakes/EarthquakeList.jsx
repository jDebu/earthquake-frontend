import { Fragment } from "react"
import CardInfo from "../ui/CardInfo"

export const EarthquakeList= ({ earthquakes = [], total = 0, perPage = 10 }) => {
  console.log(total)
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
        {earthquakes.map(earthquake => (
          <Fragment key={earthquake.id}>
            <CardInfo
              title={earthquake.attributes.title}
              infoText={`
                Magnitude: ${earthquake.attributes.magnitude}<br>
                Type: ${earthquake.attributes.mag_type}<br>
                Date: ${earthquake.attributes.time}
              `}
              cardUrl={`/feature/${earthquake.id}`}
              cardClassName="md:mr-5 mb-5 md:mb-0"
              renderHtml
            />
          </Fragment>
        ))}
      </div>
    </>
  )
}