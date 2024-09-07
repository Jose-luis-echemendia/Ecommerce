import { Layout } from "../../hocs/Layout";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { Star } from "react-feather";
import { ImageGallery } from "../../components/product/ImageGallery";
import { LoadingProduct } from "../../components/loading/LoadingProduct";
import { SectionDetailsProduct } from "../../components/product/SectionDetailsProduct";
import { FormDetailProduct } from "../../components/product/FormDetailProduct";
import { CardProduct } from "../../components/store/CardProduct";
import { CardProductArrival } from "../../components/product/CardProductArrival";
import { useWishlist } from "../../hooks/useWishlist";
import { useReviews } from "../../hooks/useReviews";
import { Reviews } from "../../components/product/Reviews";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const DetailProduct = () => {
  const params = useParams();
  const { stateProduct, getProduct, getRelatedProduct } = useProduct();
  const { getReviews, getReview, getPermissionsReviewMake } = useReviews();

  const { product, relatedProducts } = stateProduct;

  const { getWishlistItems, getWishlistItemTotal } = useWishlist();
  
  const productId = params.productId;

  useEffect(() => {
    //window.scrollTo(0, 0);

    getWishlistItems(), getWishlistItemTotal();
    getProduct(productId);
    getRelatedProduct(productId);
    getReviews(productId);
    getReview(productId)
    getPermissionsReviewMake(productId)
  }, [params]);

  return (
    <Layout>
      {product ? (
        <>
          <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                {/* Image gallery */}
                <ImageGallery
                  photos={product.photos}
                  alt={product.name}
                ></ImageGallery>

                {/* Product info */}
                <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                  <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                    {product.name}
                  </h1>

                  <div className="mt-3">
                    <h2 className="sr-only">Product information</h2>
                    <p className="text-3xl text-gray-900">$ {product.price}</p>
                  </div>

                  {/* Reviews */}
                  <div className="mt-3">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <Star
                            key={rating}
                            className={classNames(
                              product.rating > rating
                                ? "text-indigo-500"
                                : "text-gray-300",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{product.rating} out of 5 stars</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="sr-only">Description</h3>

                    <div
                      className="text-base text-gray-700 space-y-6"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>

                  <FormDetailProduct
                    colors={product.colors}
                    sizes={product.sizes}
                    productId={product.id}
                  ></FormDetailProduct>

                  <section aria-labelledby="details-heading" className="mt-12">
                    <h2 id="details-heading" className="sr-only">
                      Additional details
                    </h2>

                    {/**details product*/}

                    <div className="border-t divide-y divide-gray-200">
                      {product.details.map((detail) => (
                        <SectionDetailsProduct
                          key={detail.name}
                          detail={detail}
                        ></SectionDetailsProduct>
                      ))}
                    </div>
                  </section>
                </div>
              </div>

              <div className="flex flex-col mt-10 space-y-10">
                {/**SECTION REVIEWS */}
                <div>
                  <Reviews></Reviews>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-18 lg:grid-cols-4">
                  {relatedProducts ? (
                    relatedProducts.map((product) => (
                      <CardProduct
                        key={product.id}
                        product={product}
                      ></CardProduct>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <LoadingProduct></LoadingProduct>
      )}
    </Layout>
  );
};
