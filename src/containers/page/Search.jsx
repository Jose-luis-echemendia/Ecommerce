import { Link } from "react-router-dom";
import { CardProductSearch } from "../../components/product/CardProductSearch";
import { Layout } from "../../hocs/Layout";
import { useProduct } from "../../hooks/useProduct";


export const Search = () => {
  const { stateProduct } = useProduct();
  const { searchProducts } = stateProduct;

  return (
    <Layout>
      <div>
        <header className="min-h-screen bg-white ">
          <nav className="flex items-center py-8 px-14 justify-between"></nav>
          <div className="md:flex space-x-16 mt-20 md:mr-0 mr-10">
            <div className="md:flex items-center pl-16 ">
              <div className="-ml-12">
                <h1 className="lg:text-4xl font-bold leading-tight text-3xl">
                  Dress elegantly with our online store
                </h1>
                <p className="mt-4 text-lg font-normal ">
                  Discover a wide range of sophisticated styles that will make
                  you stand out on any occasion. Explore our collections and
                  find your perfect look today!
                </p>
                <div className="flex mt-10 w-40 items-center space-x-3 py-3 px-6 bg-indigo-600 text-white rounded-lg  transition-all duration-400 transform hover:scale-105 cursor-pointer hover:shadow-lg">
                  <Link to="/shopping" className="text-lg text-md ">
                    Buy now
                  </Link>
                </div>
              </div>
            </div>
            <div className="max-w-xl h-full md:flex justify-center items-center hidden">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="grid gap-4">
                  <div>
                    <img
                      className="h-auto max-w-full mt-20 rounded-lg object-cover object-center "
                      src="/ropa-elegante-5.jpg"
                      alt="gallery-photo"
                    />
                  </div>
                </div>
                <div className="grid gap-4">
                  <div>
                    <img
                      className="h-auto max-w-full rounded-lg object-cover object-center"
                      src="/ropa-elegante-4.jpg"
                      alt="gallery-photo"
                    />
                  </div>

                  <div>
                    <img
                      className="h-auto max-w-full rounded-lg object-cover object-center "
                      src="/ropa-elegante-3.jpg"
                      alt="gallery-photo"
                    />
                  </div>
                </div>
                <div className="grid gap-4">
                  <div>
                    <img
                      className="h-auto max-w-full rounded-lg object-cover object-center "
                      src="/ropa-elegante.jpg"
                      alt="gallery-photo"
                    />
                  </div>
                  <div>
                    <img
                      className="h-full max-w-full rounded-lg object-cover object-center"
                      src="/ropa-elegante-2.jpg"
                      alt="gallery-photo"
                    />
                  </div>
                </div>
                <div className="grid gap-4">
                  <div>
                    <img
                      className="h-auto max-w-full mt-44 rounded-lg object-cover object-center"
                      src="/ropa-elegante-6.jpg"
                      alt="gallery-photo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div>
          <div>
            {searchProducts ? (
              <>
                <h1 className="lg:text-4xl font-semibold leading-tight text-3xl">
                  Search Product ({searchProducts.length}):
                </h1>
                <div className="grid grid-cols-4 mt-20">
                  {searchProducts.map((product) => (
                    <CardProductSearch key={product.id} product={product}></CardProductSearch>
                  ))}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
