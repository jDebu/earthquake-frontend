import { Container } from '../components/Container.jsx'
import FormFilter from '../components/ui/FormFilter.jsx'
import { ENTRIES_PER_PAGE_OPTIONS, MAGNITUDE_TYPE_OPTIONS } from '../constants/globals.jsx'
import useFilters from '../hooks/useFilters.jsx'
import { EarthquakeList } from '../components/earthquakes/EarthquakeList.jsx'

export const HomePage = () => {
  const { onFilter, initialFilters, results } = useFilters('earthquakes.json', {})
  const customOnFilter = values => {
    onFilter({ ...values })
  }
  return (
    <Container>
      <div className="px-5 md:px-20 pt-4 md:pt-8 pb-14 md:pb-18">
        <FormFilter
          initialFilters={initialFilters}
          onFilter={customOnFilter}
          total={results?.pagination?.total}
          entriesPerPageOptions={ENTRIES_PER_PAGE_OPTIONS}
          magnitudeTypeOptions={MAGNITUDE_TYPE_OPTIONS}
        >
        <EarthquakeList 
          earthquakes={results.data || []} 
          total={results?.pagination?.total}
          perPage={results?.pagination?.per_page} 
        />
      </FormFilter>
      </div>
    </Container>
  )
}