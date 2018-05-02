import React from 'react'
import PropTypes from 'prop-types'
import './PageLayout.scss'
import Header from '../../components/Header/index'

export const PageLayout = ({ children }) => (
  <div style={{ height: '100%', display:'flex', flexDirection:'column' }}>
    <Header />
    <div className='page-layout__viewport'>
      {children}
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
