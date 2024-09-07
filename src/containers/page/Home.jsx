import { Layout } from '../../hocs/Layout'
import { Banner } from '../../components/home/Banner'
import { ProductsArrival } from '../../components/home/ProductsArrival'
import { ProductsSold } from '../../components/home/ProductsSold'


export const Home = () => {


  return (
    <Layout>
      <Banner></Banner>
      <ProductsArrival></ProductsArrival>
      <ProductsSold></ProductsSold>
    </Layout>
  )
}
