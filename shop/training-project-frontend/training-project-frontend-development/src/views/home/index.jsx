import React, { useEffect, useState } from 'react'
import { Container, Grid, Box } from '@material-ui/core'
import ProductCard from '../../components/product-card'
import { useSelector, useDispatch } from 'react-redux'
import { getData } from '../../requests/requests'
import { searchItems, setItems, sortItems } from '../../redux/reducers/cartReducer'
import ErrorSnackbar from '../../components/error-snackbar'
import LoadingContainer from '../../components/loading-container'
import CustomCarousel from '../../components/custom-carousel'
import firstImage from '../../assets/slider-1.jpg'
import secondImage from '../../assets/slider-2.jpg'
import thirdImage from '../../assets/slider-3.jpg'
import SortSelect from '../../components/sort-select'
import SearchBar from '../../components/searchbar'

const Home = () => {

  const dispatch = useDispatch()

  const [error, setError] = useState('')
  const [isErrorShown, setIsErrorShown] = useState(false)
  const [sortType, setSortType] = useState('')
  const [searchText, setSearchText] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getData('/api/products')
      .then(response => {
        dispatch(setItems({ items: response }))
      })
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
      .finally(() => setTimeout(() => setLoading(false), 1000))
  }, [])

  useEffect(() => {
    dispatch(sortItems({ sortType }))
  }, [sortType])

  useEffect(() => {
    dispatch(searchItems({ searchText: searchText.trim() }))
    dispatch(sortItems({ sortType }))
  }, [searchText])

  const items = useSelector(state => state.cart.filteredItems)
  const images = [firstImage, secondImage, thirdImage]
  return (
    <Container>
      <LoadingContainer loading={loading}>
        <CustomCarousel items={images} />
        <Box display='flex' justifyContent='space-evenly' mb={6}>
          <SearchBar setSearchText={setSearchText} />
          <SortSelect setSortType={setSortType} />
        </Box>
        <Grid data-testid='grid' spacing={10} container>

          {items && items.map((item, index) => {
            return (
              <Grid item key={index}>
                <ProductCard item={item} />
              </Grid>
            )
          }
          )}
        </Grid>
      </LoadingContainer>

      {isErrorShown && <ErrorSnackbar errorMessage={error} setIsErrorShown={setIsErrorShown} />}
    </Container>
  )
}

export default Home

