import React from 'react'
import { PropTypes } from 'prop-types'
import Spinner from '../spinner'

const LoadingContainer = ({ loading, children }) => {

  return (
    <>
      {loading && <Spinner />}
      {!loading && children}
    </>
  )
}
LoadingContainer.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node
}
export default LoadingContainer