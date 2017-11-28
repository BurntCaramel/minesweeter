import React from 'react'
import padStart from 'lodash/padStart'

export default function HeaderCounter({
  count
}) {
  return (
    <span
      className='game-header_counter'
    >
      { padStart(count, 3, '0') }
    </span>
  )
}