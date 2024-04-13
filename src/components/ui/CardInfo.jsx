import { Link } from 'react-router-dom'

import clsx from 'clsx'
import PropTypes from 'prop-types'

const CardInfo = ({
  cardIcon,
  title,
  infoText,
  cardUrl,
  cardClassName,
  contentClassName,
  renderHtml
}) => {
  return (
    <div className=''>
      <Link to={cardUrl}>
        <div
          className={clsx(
            'border-b border-gray-800 p-8 max-w-80 shadow-card grid grid-cols-1 content-between',
            cardClassName
          )}
        >
          <div className={contentClassName}>
            {cardIcon && <div className="pb-7 flex justify-center">{cardIcon}</div>}
            <div className="font-bold text-xl md:text-2xl pb-4 ">{title}</div>
            {renderHtml ? (
              <div className="pb-6" dangerouslySetInnerHTML={{ __html: infoText }} />
            ) : (
              <div className="pb-6">{infoText}</div>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

CardInfo.propTypes = {
  cardIcon: PropTypes.element,
  title: PropTypes.string,
  infoText: PropTypes.string,
  cardUrl: PropTypes.string,
  cardClassName: PropTypes.string,
  contentClassName: PropTypes.string
}

export default CardInfo
