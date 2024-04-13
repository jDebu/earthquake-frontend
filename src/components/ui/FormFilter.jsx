import { Field, Form } from 'react-final-form'
import Select from 'react-select'
import PropTypes from 'prop-types'
import AutoSave from '../AutoSave.jsx'

const FormFilter = ({
  children,
  initialFilters,
  onFilter,
  total,
  className,
  displayTotal = false,
  displayEntriesPerPage = true,
  entriesPerPageOptions,
  displayMagnitudeType = true,
  magnitudeTypeOptions
}) => {
  return (
    <div className={className}>
      <Form onSubmit={onFilter} initialValues={initialFilters}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <AutoSave debounce={1000} save={onFilter} />
            <section className="p-4">
              <article className="grid grid-flow-col justify-stretch">
                {displayEntriesPerPage && (
                  <div className='flex'>
                    <label htmlFor='per_page' className="flex items-center justify-center font-bold min-w-24 mr-4">
                      Entries per page
                    </label>
                    <Field 
                      name="per_page"
                      render={({ input }) => (
                        <Select
                          {...input}
                          size="full"
                          options={entriesPerPageOptions}
                          className="my-4 min-w-32"
                          isClearable
                          placeholder="Select option"
                          value={entriesPerPageOptions.find(option => option.value === input.value)}
                          onChange={(selectedOption) => input.onChange(selectedOption ? selectedOption.value : '')}
                        />
                      )}
                    />
                  </div>
                )}
                {displayMagnitudeType && (
                  <div className='flex justify-center'>
                    <label htmlFor='mag_type' className="flex items-center justify-center font-bold min-w-24 mr-4">
                      Magnitude Type
                    </label>
                    <Field 
                      name="mag_type"
                      render={({ input }) => {
                        const selectedValues = input.value || []
                        return (
                          <Select
                            options={magnitudeTypeOptions}
                            className="my-4 min-w-32"
                            isClearable
                            isSearchable
                            placeholder="Select option"
                            value={magnitudeTypeOptions.filter(option => selectedValues.includes(option.value))}
                            onChange={(selectedOptions) => {
                              const values = selectedOptions ? selectedOptions.map(option => option.value) : []
                              input.onChange(values)
                            }}
                            isMulti
                          />
                        )
                      }}
                    />
                  </div>
                )}
              </article>
              <article className="flex justify-center flex-wrap">
                {displayTotal && (
                  <p className="font-medium mr-auto mb-6 mt-9">Resultados encontrados: {total}</p>
                )}
                <div className="w-full">{children}</div>
              </article>
            </section>
          </form>
        )}
      </Form>
    </div>
  )
}

export default FormFilter

FormFilter.propTypes = {
  children: PropTypes.node,
  initialFilters: PropTypes.object,
  onFilter: PropTypes.func,
  total: PropTypes.number,
  className: PropTypes.string,
  displayTotal: PropTypes.bool,
  displayEntriesPerPage: PropTypes.bool,
  displayMagnitudeType: PropTypes.bool,
  entriesPerPageOptions: PropTypes.array,
  magnitudeTypeOptions: PropTypes.array,
}
