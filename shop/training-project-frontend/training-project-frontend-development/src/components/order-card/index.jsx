import React from 'react'
import { Slider, Typography, Card, CardActions, CardContent, Box } from '@material-ui/core'
import { PropTypes } from 'prop-types'
import './styles.scss'
import { orderStatus } from '../../clientConfig'


const OrderCard = ({ item }) => {


  const marks = [
    {
      value: 0,
      label: orderStatus.DECLINED,
    },
    {
      value: 25,
      label: orderStatus.CREATED,
    },
    {
      value: 50,
      label: orderStatus.CONFIRMED,
    },
    {
      value: 75,
      label: orderStatus.SHIPPING,
    },
    {
      value: 100,
      label: orderStatus.ARRIVED,
    },
  ]
  return (
    <Card className='order-card-container'>
      <CardContent>
        <Box className='card-title-section'>
          <Typography variant='body1' component='p'>
            Your email: {item.email}
          </Typography>

          <Typography variant='body1' component='p'>
            Your phone: {item.phone}
          </Typography>

        </Box>

        <Box className='card-title-section' mt={3}>
          <Typography variant='h5' component='p'>
            Total quantity: {item.cart.items.reduce((a, b) => a + b.quantity, 0)}
          </Typography>

          <Typography variant='h5' component='p'>
            Totalprice: {item.cart.totalPrice}$
          </Typography>
        </Box>
        <CardActions className='card-actions-section'>
          <Box sx={{ width: 400 }}>
            {item.status && <Slider
              disabled={true}
              value={marks.filter(mark => mark.label === item.status)[0].value}
              step={25}
              valueLabelDisplay="off"
              marks={marks}
            />}
          </Box>


        </CardActions>
      </CardContent>
    </Card>
  )
}


OrderCard.propTypes = {
  item: PropTypes.shape({
    cart: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
      totalPrice: PropTypes.number
    }),
    _id: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    status: PropTypes.string,
  }),
}
export default OrderCard


