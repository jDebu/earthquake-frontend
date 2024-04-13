import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'

import equal from 'fast-deep-equal'
import queryString from 'query-string'

import { request } from '../api/apiCore.jsx'

const useFilters = (url, defaultFilters = {}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const filters =
    location.search !== '' ? queryString.parse(location.search, { arrayFormat: 'bracket' }) : defaultFilters
  const initialFilters = useMemo(() => filters, [])
  const fetchData = search => { return request({ url: `/${url}${search}` }) }
  const { data: results = { data: [], pagination: { total: 0, per_page: 1, current_page: 1 } }, status } = useQuery(
    [url, location.search],
    () => fetchData(location.search),
    { keepPreviusData: true }
  )

  const onFilter = value => {
    const validFilters = {}
    for (const key in value) {
      if (value[key] !== null && value[key] !== '' && !equal(value[key], [])) validFilters[key] = value[key]
    }
    navigate({ search: queryString.stringify(validFilters, { arrayFormat: 'bracket' }) })
  }

  return { initialFilters, filters, status, results, onFilter }
}

export default useFilters
