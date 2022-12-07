import React from 'react'
import PropTypes from 'prop-types'
import Carousel from 'react-material-ui-carousel'
import { Paper, Box } from '@material-ui/core'
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
const CustomCarousel = ({ items }) => {

  return (
    <Box mb={7}>
      <Carousel
        NextIcon={<ArrowForwardIos />}
        PrevIcon={<ArrowBackIos />}
        navButtonsAlwaysVisible
      >
        {
          items.map((item, index) => {
            return (
              <Paper elevation={2} style={{ height: '90vh' }} key={index} >
                <img width='100%' height='100%' src={item} alt='product' />
              </Paper>
            )
          })
        }
      </Carousel>
    </Box>
  )
}


CustomCarousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string)
}

export default CustomCarousel